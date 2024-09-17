"use client";

import { Circle, PriceChangePercentage } from "@/types/bubbles.type";
import * as PIXI from "pixi.js";

const gradientTextureCache: Map<string, PIXI.Texture> = new Map();

export class PixiUtils {
  static createContainer = (circle: Circle, setChosenToken: (tokenAddress: string) => void, setIsOpenModal: (isOpen: boolean) => void) => {
    const container = new PIXI.Container();
    container.position.set(circle.x, circle.y);
    container.hitArea = new PIXI.Circle(0, 0, circle.radius);

    container.on('pointerover', () => {
      circle.isHovered = true;
    });

    container.on('pointerout', () => {
      circle.isHovered = false;
    });

    container.on('click', () => {
      setChosenToken(circle.id);
      setIsOpenModal(true);
    });

    return container;
  };

  static createImageSprite = (circle: Circle) => {
    const imgUrl = circle.image || '/images/unknown.png';

    const imageSprite = PIXI.Sprite.from(imgUrl);
    const isFullSize = circle.radius * 0.3 < 10;

    imageSprite.anchor.set(0.5);
    imageSprite.width = circle.radius * (isFullSize ? 1.2 : 0.5);
    imageSprite.height = circle.radius * (isFullSize ? 1.2 : 0.5);
    imageSprite.position = { x: 0, y: isFullSize ? 0 : -circle.radius / 2 };
    return imageSprite;
  };

  static createText = (circle: Circle) => {
    const fontSize = circle.radius * 0.3;
    const isTextVisible = fontSize > 10;

    const textStyle = new PIXI.TextStyle({
      fontSize: isTextVisible ? fontSize + "px" : 0,
      fill: "#ffffff",
    });

    const text = new PIXI.Text(circle.symbol.toUpperCase(), textStyle);
    text.anchor.set(0.5);
    text.position.y = 0.15 * circle.radius;
    return text;
  };

  static createText2 = (circle: Circle, bubbleSort: PriceChangePercentage) => {
    const fontSize = circle.radius * 0.3;
    const isTextVisible = fontSize > 10;

    const text2Style = new PIXI.TextStyle({
      fontSize: isTextVisible ? fontSize + "px" : 0,
      fill: "#ffffff",
    });

    const data = circle[bubbleSort] ? circle[bubbleSort]!.toFixed(2) + "%" : "";

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
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      } else {
        switch (color) {
          case "green":
            gradient.addColorStop(0, 'rgba(6, 160, 49, 1)')
            gradient.addColorStop(0.82, 'rgba(6, 160, 49, 0.15)')
            gradient.addColorStop(0.9, 'rgba(6, 160, 49, 0.92)')
            break;
          case "red":
            gradient.addColorStop(0, 'rgba(190, 20, 20, 11)')
            gradient.addColorStop(0.82, 'rgba(190, 20, 20, 0.15)')
            gradient.addColorStop(0.9, 'rgba(190, 20, 20, 0.92)')
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
