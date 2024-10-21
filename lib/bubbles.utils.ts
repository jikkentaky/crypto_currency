import * as PIXI from "pixi.js";
import { PixiUtils } from "./pixi.utils";
import { Circle, PriceChange } from "@/types/bubbles.type";
import { appConfig } from "./config";
import { formatPercentage } from "./format-percentage";
import { CoingeckoCoinData } from "@/types/coingecko.type";
import { getMinMaxCircleSize } from "./getMinMaxCircleSize";
import { checkBoundaryCollision } from "./checkBoundaryCollision";

export type GenerateCirclesParams = {
  coins: CoingeckoCoinData[];
  bubbleSort: PriceChange;
  scalingFactor: number;
};

const { wallDamping, speed, elasticity } = appConfig;

const changeSizeStep = 2;

export class BubblesUtils {
  static getScalingFactor = (
    data: CoingeckoCoinData[],
    bubbleSort: PriceChange = PriceChange.HOUR,
    width: number,
    height: number
  ): number => {
    if (!data || data.length === 0) return 1;

    const totalSquare = data.reduce((acc, item) => {
      const value = Math.abs(+item[bubbleSort]);
      return acc + Math.PI * value * value;
    }, 0);

    return Math.sqrt((width * height) / totalSquare);
  };

  static update = (
    circles: Circle[],
    imageSprites: PIXI.Sprite[],
    textSprites: PIXI.Text[],
    text2Sprites: PIXI.Text[],
    circleGraphics: PIXI.Sprite[] = [],
    displayChangeRef: React.RefObject<string>,
    appInstanceRef: React.RefObject<PIXI.Application>
  ) => {
    return () => {
      const app = appInstanceRef.current;
      if (!app) return;

      const width = app.screen.width;
      const height = app.screen.height;
      const displayChange = displayChangeRef.current as PriceChange;

      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        const circleGraphic = circleGraphics[i];
        const imageSprite = imageSprites[i];
        const text = textSprites[i];
        const text2 = text2Sprites[i];
        const container = circleGraphic.parent as PIXI.Container;
        const newText2Value = formatPercentage(circle[displayChange]) + ' %';

        const updateCircleChildren = () => {
          const gradientColor = circle.isSearched ? "white" : circle.color;

          circleGraphic.texture = PixiUtils.createGradientTexture(
            circle.targetRadius * 4,
            gradientColor,
            circle.isHovered
          );

          const fontSize = circle.radius * 0.7;
          const isFullSize = circle.radius * 0.5 < 20;

          if (imageSprite) {
            const scaleFactor = 0.6;

            imageSprite.width = circle.radius * (isFullSize ? 1.2 : scaleFactor);
            imageSprite.height = circle.radius * (isFullSize ? 1.2 : scaleFactor);
            imageSprite.position = { x: 0, y: isFullSize ? 0 : -circle.radius / 2 };
            imageSprite.zIndex = 1;
          }

          const textStyle = new PIXI.TextStyle({
            fontFamily: "Work Sans, sans-serif",
            fontSize: !isFullSize ? fontSize * 0.5 + "px" : "0",
            fill: "#ffffff",
          });

          const text2Style = new PIXI.TextStyle({
            fontFamily: "Work Sans, sans-serif",
            fontSize: !isFullSize ? fontSize * 0.37 + "px" : "0",
            fill: "#ffffff",
          });

          text.style = textStyle;
          text.zIndex = 1;
          text.position.y = 0.15 * circle.radius;

          text2.style = text2Style;
          text2.zIndex = 1;
          text2.position.y = circle.radius / 1.8;

          if (circle.text2) {
            circle.text2.text = newText2Value;
          }
        };

        circle.x += circle.vx;
        circle.y += circle.vy;

        const xResult = checkBoundaryCollision({
          pos: circle.x,
          velocity: circle.vx,
          radius: circle.radius,
          max: width,
          wallDamping,
        });
        circle.x = xResult.pos;
        circle.vx = xResult.velocity;

        const yResult = checkBoundaryCollision({
          pos: circle.y,
          velocity: circle.vy,
          radius: circle.radius,
          max: height,
          wallDamping,
        });
        circle.y = yResult.pos;
        circle.vy = yResult.velocity;

        for (let j = i + 1; j < circles.length; j++) {
          const otherCircle = circles[j];
          const dx = otherCircle.x - circle.x;
          const dy = otherCircle.y - circle.y;
          const distanceSquared = dx * dx + dy * dy;
          const radiusSum = circle.radius + otherCircle.radius;

          if (distanceSquared < radiusSum * radiusSum) {
            const distance = Math.sqrt(distanceSquared);
            const angle = Math.atan2(dy, dx);

            const overlap = radiusSum - distance;
            const force = overlap * elasticity;

            const dampingFactor = wallDamping;
            const forceX = force * Math.cos(angle);
            const forceY = force * Math.sin(angle);

            circle.vx -= forceX * dampingFactor + circle.vx * 0.01;
            circle.vy -= forceY * dampingFactor + circle.vy * 0.01;
            otherCircle.vx += forceX * dampingFactor;
            otherCircle.vy += forceY * dampingFactor;
          }
        }

        container.position.set(circle.x, circle.y);

        let radiusChanged = false;

        if (
          circle.radius !== circle.targetRadius ||
          circle.color !== circle.previousColor ||
          circle.isHovered !== circle.previousHovered ||
          circle.previousText2 !== newText2Value ||
          circle.isSearched !== circle.isPreviousSearched
        ) {
          container.cacheAsBitmap = false;

          circle.previousColor = circle.color;
          circle.previousHovered = circle.isHovered;
          circle.previousText2 = newText2Value;
          circle.isPreviousSearched = circle.isSearched;

          if (circle.radius !== circle.targetRadius) {
            const sizeDifference = circle.targetRadius - circle.radius;

            if (Math.abs(sizeDifference) <= changeSizeStep) {
              circle.radius = circle.targetRadius;
            } else {
              circle.radius += Math.sign(sizeDifference) * changeSizeStep;
            }

            radiusChanged = circle.radius !== circle.targetRadius;
          }

          if (radiusChanged) {
            container.hitArea = new PIXI.Circle(0, 0, circle.radius);
          }

          updateCircleChildren();

          container.cacheAsBitmap = true;
        }
      }
    };
  };

  static handleEmptySpaceClick = (event: MouseEvent, circles: Circle[]) => {
    const waveForce = 100; // Adjust the wave force as needed

    circles.forEach((circle) => {
      const dx = circle.x - event.clientX;
      const dy = circle.y - event.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Apply a force to push the balls away from the click point
      circle.vx += (waveForce * Math.cos(angle)) / distance;
      circle.vy += (waveForce * Math.sin(angle)) / distance;
    });
  };

  static handleMouseMove = (event: MouseEvent, circles: Circle[]) => {
    const index = circles.findIndex((circle) => circle.dragging);

    if (index !== -1) {
      const circle = circles[index];

      // Calculate the velocity based on mouse movement
      const dx = event.clientX - circle.x;
      const dy = event.clientY - circle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 3; // Adjust the speed factor as needed
      circle.vx = (dx / distance) * speed;
      circle.vy = (dy / distance) * speed;
    }
  };

  static generateCircles = (
    coins: CoingeckoCoinData[],
    scalingFactor: number,
    bubbleSort = PriceChange.HOUR,
    width: number,
    height: number
  ) => {
    const [maxCircleSize, minCircleSize] = getMinMaxCircleSize(width, height);

    const shapes: Circle[] = coins.map((item) => {
      const radius = Math.abs(parseFloat(item[bubbleSort].toString()) * scalingFactor);

      const data = {
        id: item.id,
        symbol: item.symbol.slice(0, 5),
        image: item.image,
        coinName: item.name,
        isSearched: false,
        isPreviousSearched: false,
        isHovered: false,
        graphicSprite: null,
        x: Math.random() * (width - radius * 2),
        y: Math.random() * (height - radius * 2),
        vx: Math.random() * speed * 2 - speed,
        vy: Math.random() * speed * 2 - speed,
        color: +item[bubbleSort]! > 0 ? "green" : "red",
        previousColor: null,
        previousHovered: false,
        targetRadius: radius > maxCircleSize ? maxCircleSize : radius > minCircleSize ? radius : minCircleSize,
        radius: minCircleSize,
        dragging: false,
        text2: null,
        previousText2: null,
        [PriceChange.HOUR]: item[PriceChange.HOUR],
        [PriceChange.DAY]: item[PriceChange.DAY],
        [PriceChange.WEEK]: item[PriceChange.WEEK],
        [PriceChange.MONTH]: item[PriceChange.MONTH],
        [PriceChange.YEAR]: item[PriceChange.YEAR],
      };

      const shape = { ...data, text2: PixiUtils.createText2(data, bubbleSort) };

      return shape;
    });

    return shapes;
  };
}
