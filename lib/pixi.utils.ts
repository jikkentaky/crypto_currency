"use client";

import { Circle, PriceChange } from "@/types/bubbles.type";
import * as PIXI from "pixi.js";
import { formatPercentage } from "./format-percentage";

const gradientTextureCache: Map<string, PIXI.Texture> = new Map();

export class PixiUtils {
  static createContainer = (circle: Circle, setChosenToken: (tokenAddress: string) => void, setIsOpenModal: (isOpen: boolean) => void) => {
    const container = new PIXI.Container();
    container.position.set(circle.x, circle.y);
    container.hitArea = new PIXI.Circle(0, 0, circle.radius);
    container.eventMode = 'dynamic';

    container
      .on('pointerover', () => {
        circle.isHovered = true;
      }).on('pointerout', () => {
        circle.isHovered = false;
      }).on('click', () => {
        setChosenToken(circle.id);
        setIsOpenModal(true);
      }).on('touchstart', () => {
        setChosenToken(circle.id);
        setIsOpenModal(true);
      });

    return container;
  };

  static createImageSprite = (circle: Circle) => {
    const imgUrl = circle.image as string;
    const imageSprite = PIXI.Sprite.from(imgUrl);
    const isFullSize = circle.radius * 0.3 < 10;

    imageSprite.anchor.set(0.5);

    const scaleFactor = 1;
    imageSprite.width = circle.radius * scaleFactor;
    imageSprite.height = circle.radius * scaleFactor;

    const posY = isFullSize ? 0 : -circle.radius / 2;
    imageSprite.position.set(0, posY);

    return imageSprite;
  };

  static createText = (circle: Circle) => {
    const fontSize = circle.radius * 0.5;
    const isTextVisible = fontSize > 10;

    const textStyle = new PIXI.TextStyle({
      fontFamily: "Work Sans, sans-serif",
      fontSize: isTextVisible ? fontSize + "px" : 0,
      fill: "#ffffff",
    });

    const text = new PIXI.Text(circle.symbol.toUpperCase(), textStyle);
    text.anchor.set(0.5);
    text.position.y = 0.15 * circle.radius;
    return text;
  };

  static createText2 = (circle: Circle, bubbleSort: PriceChange) => {
    const fontSize = circle.radius * 0.5;
    const isTextVisible = fontSize > 10;

    const text2Style = new PIXI.TextStyle({
      fontFamily: "Work Sans, sans-serif",
      fontSize: isTextVisible ? fontSize + "px" : 0,
      fill: "#ffffff",
    });

    const data = circle[bubbleSort] ? formatPercentage(circle[bubbleSort]) + ' %' : "";

    const text2 = new PIXI.Text(data, text2Style);
    text2.anchor.set(0.5);
    text2.position.y = circle.radius / 1.5;
    circle["text2"] = text2;

    return text2;
  };

  static createGradientTexture(radius: number, color: string, isHovered: boolean = false): PIXI.Texture {
    const textureKey: string = `${radius}_${color}_${isHovered}`;

    if (gradientTextureCache.has(textureKey)) {
      return gradientTextureCache.get(textureKey)!;
    }

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = radius;
    canvas.height = radius;
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (context) {
      const centerX = radius / 2;
      const centerY = radius / 2;

      const gradient: CanvasGradient = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius / 2
      );

      if (isHovered) {
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(0.45, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.95)');
      } else {
        switch (color) {
          case "green":
            gradient.addColorStop(0, "rgba(46, 204, 113, 0.1)");
            gradient.addColorStop(0.45, "rgba(46, 204, 113, 0.15)");
            gradient.addColorStop(0.6, "rgba(46, 204, 113, 0.95)");
            break;

          case "red":
            gradient.addColorStop(0, "rgba(255,99,71, 0.1)");
            gradient.addColorStop(0.45, "rgba(255,99,71, 0.15)");
            gradient.addColorStop(0.6, "rgba(255,99,71, 0.95)");
            break;

          case "white":
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
            gradient.addColorStop(0.45, 'rgba(255, 255, 255, 0.5)');
            gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.95)');
            break;
        }
      }

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(centerX, centerY, radius / 4, 0, Math.PI * 2);
      context.fill();

      const texture: PIXI.Texture = PIXI.Texture.from(canvas);

      gradientTextureCache.set(textureKey, texture);

      return texture;
    }

    return PIXI.Texture.WHITE;
  }

  static updateCircleAppearance = (circle: Circle) => {
    const circleGraphic = circle.graphicSprite;

    if (!circleGraphic) return;

    const newTexture = PixiUtils.createGradientTexture(
      circle.radius * 4,
      circle.color,
      circle.isHovered
    );

    circleGraphic.texture = newTexture;
  };
}
