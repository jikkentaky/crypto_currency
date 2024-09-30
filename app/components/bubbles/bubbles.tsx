"use client";

import { BubblesUtils } from "@/lib/bubbles.utils";
import { PixiUtils } from "@/lib/pixi.utils";
import * as PIXI from 'pixi.js';
import { Circle, PriceChange, SORTING_BY, } from "@/types/bubbles.type";
import { useEffect, useMemo, useRef, useState } from "react";
import { TokenFilterResult } from "@/types/tokenFilterResultType.type";
import { useStore } from "@/store";
import { appConfig } from "@/lib/config";
import { formatPercentage } from "@/lib/format-percentage";

type Props = {
  coins: TokenFilterResult[];
};

const { width, height, maxCircleSize, minCircleSize } = appConfig;

export default function Bubbles({ coins }: Props) {
  const displayChangeRef = useRef<PriceChange | null>(null);
  const { resolution: bubbleSort, chosenNetwork, searchCoin, setIsOpenModal, setChosenToken } = useStore((state) => {
    displayChangeRef.current = state.currentResolution;
    return state;
  });

  const [circles, setCircles] = useState<Circle[] | null>(null);

  const appRef = useRef<HTMLDivElement>(null);
  const appInstance = useRef<PIXI.Application | null>(null);

  const scalingFactor = useMemo(() => {
    return BubblesUtils.getScalingFactor(coins, bubbleSort as SORTING_BY);
  }, [bubbleSort, coins]);

  useEffect(() => {
    if (coins && chosenNetwork) {
      const scalingFactor = BubblesUtils.getScalingFactor(coins, SORTING_BY.HOUR);
      const shapes = BubblesUtils.generateCircles(coins, scalingFactor);
      setCircles(shapes);
    }
  }, [coins, chosenNetwork.id]);

  useEffect(() => {
    if (!circles) return;

    const imageSprites: PIXI.Sprite[] = [];
    const textSprites: PIXI.Text[] = [];
    const text2Sprites: PIXI.Text[] = [];
    const circleGraphics: PIXI.Sprite[] = [];

    const app = new PIXI.Application({
      width,
      height,
      backgroundColor: "0x000000",
      eventMode: "dynamic",
      eventFeatures: {
        move: true,
        globalMove: false,
        click: true,
        wheel: true,
      },
    }) as unknown;

    const gradient = new PIXI.Graphics();
    const texture = PIXI.Texture.from(PixiUtils.createGradientBackground(width, height));
    const sprite = new PIXI.Sprite(texture);

    gradient.addChild(sprite);
    (app as { stage: PIXI.Container }).stage.addChild(gradient);

    const appContainer = appRef.current;
    appInstance.current = app as PIXI.Application;

    appContainer?.appendChild((app as { view: Node }).view);
    appContainer?.children[0].addEventListener("click", (e: unknown) => BubblesUtils.handleEmptySpaceClick(e as MouseEvent, circles));

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      const container = PixiUtils.createContainer(circle, setChosenToken, setIsOpenModal);

      const circleGraphic = new PIXI.Sprite(PixiUtils.createGradientTexture(circle.targetRadius * 4, circle.color, circle.isHovered));
      circleGraphic.anchor.set(0.5);
      circle.graphicSprite = circleGraphic;
      circleGraphics.push(circleGraphic);
      container.addChild(circleGraphic);

      const imageSprite = PixiUtils.createImageSprite(circle);
      imageSprites.push(imageSprite);
      container.addChild(imageSprite);

      // Create the text
      const text = PixiUtils.createText(circle);
      container.addChild(text);
      textSprites.push(text);

      // Create the second text
      const text2 = PixiUtils.createText2(circle, SORTING_BY.HOUR);

      container.addChild(text2);
      text2Sprites.push(text2);

      (app as PIXI.Application<PIXI.ICanvas>).stage.addChild(container);

      circle.isSearched = !searchCoin
        ? false
        : circle.symbol.toLowerCase().startsWith(searchCoin.toLowerCase());

      circle.isPreviousSearched = circle.isSearched;
    }

    const ticker = BubblesUtils.update(circles, imageSprites, textSprites, text2Sprites, circleGraphics, displayChangeRef);
    setTimeout(() => {
      (app as PIXI.Application<PIXI.ICanvas>).ticker?.add(ticker);
    }, 400);


    return () => {
      (app as PIXI.Application<PIXI.ICanvas>).ticker?.remove(ticker);

      if (appInstance.current) {
        appInstance.current.destroy(true, { children: true });
        appInstance.current = null;
      }

      appContainer?.children[0]?.removeEventListener("click", (e: unknown) => BubblesUtils.handleEmptySpaceClick(e as MouseEvent, circles));
    };
  }, [circles]);

  useEffect(() => {
    if (circles) {
      const max = maxCircleSize;
      const min = minCircleSize;

      circles.forEach((circle) => {
        if (!circle[bubbleSort as SORTING_BY]) return;

        const radius = Math.abs(Math.floor(circle[bubbleSort as SORTING_BY] * scalingFactor));
        circle.targetRadius = radius > max ? max : radius > min ? radius : min;
        circle.color = circle[displayChangeRef.current as PriceChange] > 0 ? "green" : "red";

        const newText2Value = formatPercentage(circle[bubbleSort as SORTING_BY]) + ' %';

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
  }, [bubbleSort, coins, circles, scalingFactor, searchCoin, displayChangeRef.current]);

  return (
    <div style={{ height: height }} ref={appRef}></div>
  );
}
