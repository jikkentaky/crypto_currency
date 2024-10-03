"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as PIXI from 'pixi.js';
import { BubblesUtils } from "@/lib/bubbles.utils";
import { PixiUtils } from "@/lib/pixi.utils";
import { Circle, PriceChange, SORTING_BY } from "@/types/bubbles.type";
import { TokenFilterResult } from "@/types/tokenFilterResultType.type";
import { useStore } from "@/store";
import { formatPercentage } from "@/lib/format-percentage";
import { useWindowDimensions } from "@/hooks/use-window-dimensions";

type Props = {
  coins: TokenFilterResult[];
};

export default function Bubbles({ coins }: Props) {
  const displayChangeRef = useRef<PriceChange | null>(null);
  const { width, height } = useWindowDimensions();

  const {
    resolution: bubbleSort,
    searchCoin,
    setIsOpenModal,
    setChosenToken,
  } = useStore((state) => {
    displayChangeRef.current = state.currentResolution;
    return state;
  });

  const [circles, setCircles] = useState<Circle[] | null>(null);

  const appRef = useRef<HTMLDivElement>(null);
  const appInstance = useRef<PIXI.Application | null>(null);
  const gradientSpriteRef = useRef<PIXI.Sprite | null>(null);

  const scalingFactor = useMemo(() => {
    return BubblesUtils.getScalingFactor(coins, bubbleSort as SORTING_BY, width, height);
  }, [coins, width, height]); // Убрали bubbleSort из зависимостей

  // Инициализация кругов (только при первоначальном рендере или изменении coins)
  useEffect(() => {
    if (!coins) return;

    const shapes = BubblesUtils.generateCircles(
      coins,
      scalingFactor,
      bubbleSort as SORTING_BY,
      width,
      height
    );
    setCircles(shapes);
  }, [coins]); // Убрали width, height, bubbleSort из зависимостей

  // Инициализация приложения PIXI
  useEffect(() => {
    if (!appRef.current) return;

    const app = new PIXI.Application({
      clearBeforeRender: true,
      resizeTo: appRef.current,
      backgroundColor: "0x000000",
      antialias: true,
    });

    appInstance.current = app;

    appRef.current.appendChild(app.view);

    return () => {
      if (appInstance.current) {
        appInstance.current.destroy(true, { children: true });
        appInstance.current = null;
      }
    };
  }, []);

  // Добавление кругов на сцену (только при инициализации или изменении circles)
  useEffect(() => {
    if (!circles || !appInstance.current) return;

    const app = appInstance.current;

    const imageSprites: PIXI.Sprite[] = [];
    const textSprites: PIXI.Text[] = [];
    const text2Sprites: PIXI.Text[] = [];
    const circleGraphics: PIXI.Sprite[] = [];

    // Создание градиентного фона
    const gradient = new PIXI.Graphics();
    const texture = PIXI.Texture.from(
      PixiUtils.createGradientBackground(app.screen.width, app.screen.height)
    );
    const gradientSprite = new PIXI.Sprite(texture);
    gradient.addChild(gradientSprite);
    app.stage.addChild(gradient);

    gradientSpriteRef.current = gradientSprite;

    // Обработчик клика по пустому пространству
    const handleEmptySpaceClick = (e: MouseEvent) => {
      BubblesUtils.handleEmptySpaceClick(e, circles);
    };

    app.view.addEventListener("click", handleEmptySpaceClick);

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      const container = PixiUtils.createContainer(circle, setChosenToken, setIsOpenModal);

      const circleGraphic = new PIXI.Sprite(
        PixiUtils.createGradientTexture(circle.targetRadius * 4, circle.color, circle.isHovered)
      );
      circleGraphic.anchor.set(0.5);
      circle.graphicSprite = circleGraphic;
      circleGraphics.push(circleGraphic);
      container.addChild(circleGraphic);

      const imageSprite = PixiUtils.createImageSprite(circle);
      imageSprites.push(imageSprite);
      container.addChild(imageSprite);

      const text = PixiUtils.createText(circle);
      container.addChild(text);
      textSprites.push(text);

      const text2 = PixiUtils.createText2(circle, SORTING_BY.HOUR);
      container.addChild(text2);
      text2Sprites.push(text2);

      app.stage.addChild(container);

      circle.isSearched = !searchCoin
        ? false
        : circle.symbol.toLowerCase().startsWith(searchCoin.toLowerCase());

      circle.isPreviousSearched = circle.isSearched;
    }

    const ticker = BubblesUtils.update(
      circles,
      imageSprites,
      textSprites,
      text2Sprites,
      circleGraphics,
      displayChangeRef,
      appInstance
    );

    app.ticker?.add(ticker);

    return () => {
      app.ticker?.remove(ticker);
      if (app.view && handleEmptySpaceClick) {
        app.view.removeEventListener("click", handleEmptySpaceClick);
      }
      app.stage?.removeChildren();
    };
  }, [circles, setChosenToken, setIsOpenModal, searchCoin]);

  // Обновление размеров кругов при изменении bubbleSort
  useEffect(() => {
    if (circles) {
      const max = Math.min(width, height) * 0.15;
      const min = Math.min(width, height) * 0.065;

      const newScalingFactor = BubblesUtils.getScalingFactor(coins, bubbleSort as SORTING_BY, width, height);

      circles.forEach((circle) => {
        if (!circle[bubbleSort as SORTING_BY]) return;

        const radius = Math.abs(
          Math.floor(circle[bubbleSort as SORTING_BY] * newScalingFactor)
        );
        circle.targetRadius = radius > max ? max : radius > min ? radius : min;
        circle.color =
          circle[displayChangeRef.current as PriceChange] > 0 ? "green" : "red";

        const newText2Value =
          formatPercentage(circle[bubbleSort as SORTING_BY]) + " %";

        if (circle.text2) {
          if (!circle.previousText2) {
            circle.previousText2 = newText2Value;
          }

          circle.text2.text = newText2Value;
        }

        const isMatched = !searchCoin
          ? false
          : circle.symbol.toLowerCase().startsWith(searchCoin.toLowerCase());

        circle.isSearched = isMatched;
      });
    }
  }, [bubbleSort, coins, circles, width, height, displayChangeRef.current, searchCoin]);

  // Обновление градиентного фона при изменении размера окна
  useEffect(() => {
    if (appInstance.current && gradientSpriteRef.current) {
      const app = appInstance.current;

      // Обновление текстуры градиентного фона
      const texture = PIXI.Texture.from(
        PixiUtils.createGradientBackground(app.screen.width, app.screen.height)
      );
      gradientSpriteRef.current.texture = texture;
    }
  }, [width, height]);

  return (
    <div style={{ width: '100%', height: '100vh' }} ref={appRef}></div>
  );
}
