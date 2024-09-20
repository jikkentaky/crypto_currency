import * as PIXI from "pixi.js";
import { PixiUtils } from "./pixi.utils";
import { Circle, PriceChangePercentage } from "@/types/bubbles.type";
import { TokenFilterResult } from "@/types/tokenFilterResultType.type";
import { calculateMinCircleSize } from "./calc-min-size-circle";

export type GenerateCirclesParams = {
  coins: TokenFilterResult[];
  bubbleSort: PriceChangePercentage;
  scalingFactor: number;
};

export const appConfig = {
  width: typeof window !== "undefined" ? window.innerWidth - 320 : 100,
  height: 720,
  speed: 0.005,
  elasticity: 0.005,
  wallDamping: 0.5,
  maxCircleSize: 160,
  minCircleSize: calculateMinCircleSize(),
};

const { wallDamping, width, height, speed, elasticity, maxCircleSize, minCircleSize } = appConfig;

const changeSizeStep = 2;

export class BubblesUtils {
  static getScalingFactor = (data: TokenFilterResult[], bubbleSort: PriceChangePercentage = PriceChangePercentage.HOUR): number => {
    if (!data) return 1;
    const max = data.map((item) => Math.abs(+item[bubbleSort]!));
    let totalSquare = 0;

    for (let i = 0; i < max.length; i++) {
      const area = Math.PI * max[i] * max[i];
      totalSquare += area;
    }

    return Math.sqrt((width * height) / totalSquare) * (width > 920 ? 0.8 : 0.5);
  };

  static update = (
    circles: Circle[],
    imageSprites: PIXI.Sprite[],
    textSprites: PIXI.Text[],
    text2Sprites: PIXI.Text[],
    circleGraphics: PIXI.Sprite[] = [],
    bubbleSortRef: React.RefObject<string>
  ) => {
    return () => {
      const bubbleSort = bubbleSortRef.current as PriceChangePercentage;
      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        const circleGraphic = circleGraphics[i];
        const imageSprite = imageSprites[i];
        const text = textSprites[i];
        const text2 = text2Sprites[i];

        const container = circleGraphic.parent as PIXI.Container;

        const newText2Value = circle[bubbleSort]?.toFixed(2) + "%";

        const updateCircleChilds = () => {
          const gradientColor = circle.isSearched ? "white" : circle.color;

          circleGraphic.texture = PixiUtils.createGradientTexture(
            circle.targetRadius * 4,
            gradientColor,
            circle.isHovered
          );

          const fontSize = circle.radius * 0.3;
          const isFullSize = circle.radius * 0.5 < 20;
          const isTextVisible = fontSize >= 10;

          if (imageSprite) {
            imageSprite.width = circle.radius * (isFullSize ? 1.2 : 0.5);
            imageSprite.height = circle.radius * (isFullSize ? 1.2 : 0.5);
            imageSprite.position = { x: 0, y: isFullSize ? 0 : -circle.radius / 2 };
          }

          const textStyle = new PIXI.TextStyle({
            fontFamily: "Press Start 2P, sans-serif",
            fontSize: isTextVisible ? fontSize + "px" : "1px",
            fill: "#ffffff",
          });

          const text2Style = new PIXI.TextStyle({
            fontFamily: "Press Start 2P, sans-serif",
            fontSize: isTextVisible ? fontSize * 0.5 + "px" : "1px",
            fill: "#ffffff",
          });

          text.style = textStyle;
          text.position.y = 0.15 * circle.radius;

          text2.style = text2Style;
          text2.position.y = circle.radius / 1.5;

          if (circle.text2) {
            circle.text2.text = newText2Value;
          }
        };

        circle.x += circle.vx;
        circle.y += circle.vy;

        if (circle.x - circle.radius < 0) {
          circle.x = circle.radius;
          circle.vx *= -1;
          circle.vx *= 1 - wallDamping;
        } else if (circle.x + circle.radius > width) {
          circle.x = width - circle.radius;
          circle.vx *= -1;
          circle.vx *= 1 - wallDamping;
        }
        if (circle.y - circle.radius < 0) {
          circle.y = circle.radius;
          circle.vy *= -1;
          circle.vy *= 1 - wallDamping;
        } else if (circle.y + circle.radius > height) {
          circle.y = height - circle.radius;
          circle.vy *= -1;
          circle.vy *= 1 - wallDamping;
        }

        for (let j = i + 1; j < circles.length; j++) {
          const otherCircle = circles[j];
          const dx = otherCircle.x - circle.x;
          const dy = otherCircle.y - circle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < circle.radius + otherCircle.radius) {
            const angle = Math.atan2(dy, dx);

            const totalRadius = circle.radius + otherCircle.radius;
            const overlap = totalRadius - distance;
            const force = overlap * elasticity;

            const dampingFactor = wallDamping;
            circle.vx -= force * Math.cos(angle) * dampingFactor + circle.vx * 0.01;
            circle.vy -= force * Math.sin(angle) * dampingFactor + circle.vy * 0.01;
            otherCircle.vx += force * Math.cos(angle) * dampingFactor;
            otherCircle.vy += force * Math.sin(angle) * dampingFactor;
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
              circle.radius > circle.targetRadius
                ? (circle.radius -= changeSizeStep)
                : (circle.radius += changeSizeStep);
            }

            radiusChanged = true;
          }

          if (radiusChanged) {
            container.hitArea = new PIXI.Circle(0, 0, circle.radius);
          }

          updateCircleChilds();

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

  static generateCircles = (coins: TokenFilterResult[], scalingFactor: number, bubbleSort: PriceChangePercentage = PriceChangePercentage.HOUR) => {
    const shapes: Circle[] = coins.map((item) => {
      const radius = Math.abs(item[bubbleSort]! * scalingFactor);

      const data = {
        id: item.token.address,
        symbol: item.token.symbol.slice(0, 5),
        image: item.token.info.imageThumbUrl || null,
        coinName: item.token.info.name,
        isSearched: false,
        isPreviousSearched: false,
        isHovered: false,
        graphicSprite: null,
        x: Math.random() * (width - radius * 2),
        y: Math.random() * (height - radius * 2),
        vx: Math.random() * speed * 2 - speed,
        vy: Math.random() * speed * 2 - speed,
        color: item[bubbleSort]! > 0 ? "green" : "red",
        previousColor: null,
        previousHovered: false,
        targetRadius: radius > maxCircleSize ? maxCircleSize : radius > minCircleSize ? radius : minCircleSize,
        radius: minCircleSize,
        dragging: false,
        text2: null,
        previousText2: null,
        [PriceChangePercentage.HOUR]: item[PriceChangePercentage.HOUR],
        [PriceChangePercentage.FOUR_HOURS]: item[PriceChangePercentage.FOUR_HOURS],
        [PriceChangePercentage.TWELVE_HOURS]: item[PriceChangePercentage.TWELVE_HOURS],
        [PriceChangePercentage.DAY]: item[PriceChangePercentage.DAY],
      };

      const shape = { ...data, text2: PixiUtils.createText2(data, bubbleSort) };

      return shape;
    });

    return shapes;
  };
}
