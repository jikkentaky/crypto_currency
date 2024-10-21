"use client";

import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { BubblesUtils } from "@/lib/bubbles.utils";
import { PixiUtils } from "@/lib/pixi.utils";
import { Circle, PriceChange } from "@/types/bubbles.type";
import { useStore } from "@/store";
import { formatPercentage } from "@/lib/format-percentage";
import { useWindowDimensions } from "@/hooks/use-window-dimensions";
import styles from "./styles.module.scss";
import { CoingeckoCoinData } from "@/types/coingecko.type";
import { getMinMaxCircleSize } from "@/lib/getMinMaxCircleSize";

type Props = {
  coins: CoingeckoCoinData[];
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

  useEffect(() => {
    if (!coins) return;

    const scalingFactor = BubblesUtils.getScalingFactor(coins, bubbleSort, width, height);
    const shapes = BubblesUtils.generateCircles(
      coins,
      scalingFactor,
      bubbleSort,
      width,
      height
    );

    setCircles(shapes);
  }, [coins]);

  useEffect(() => {
    if (!appRef.current) return;

    const app = new PIXI.Application({
      clearBeforeRender: true,
      resizeTo: appRef.current,
      backgroundColor: "0x000000",
      autoDensity: true,
      resolution: 2,
      backgroundAlpha: 0,
    }) as unknown;

    appInstance.current = app as PIXI.Application;;
    appRef.current.appendChild((app as { view: Node }).view);

    return () => {
      if (appInstance.current) {
        appInstance.current?.destroy(true, { children: true });
        appInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!circles || !appInstance.current) return;

    const app = appInstance.current;
    const container = appRef.current

    const imageSprites: PIXI.Sprite[] = [];
    const textSprites: PIXI.Text[] = [];
    const text2Sprites: PIXI.Text[] = [];
    const circleGraphics: PIXI.Sprite[] = [];

    container?.children[0].addEventListener("click",
      (e: unknown) => BubblesUtils.handleEmptySpaceClick(e as MouseEvent, circles)
    );

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      const container = PixiUtils.createContainer(circle, setChosenToken, setIsOpenModal);

      const circleGraphic = new PIXI.Sprite(
        PixiUtils.createGradientTexture(circle.radius * 4, circle.color, circle.isHovered)
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

      const text2 = PixiUtils.createText2(circle, PriceChange.HOUR);
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

    setTimeout(() => {
      app.ticker?.add(ticker);
    }, 400)

    return () => {
      app.ticker?.remove(ticker);

      container?.children[0]?.removeEventListener("click", (e: unknown) => BubblesUtils.handleEmptySpaceClick(e as MouseEvent, circles));

      app.stage?.removeChildren();
    };
  }, [circles]);

  useEffect(() => {
    if (!circles) return;

    const scalingFactor = BubblesUtils.getScalingFactor(coins, bubbleSort, width, height);
    const [max, min] = getMinMaxCircleSize(width, height);

    circles.forEach((circle) => {
      if (!circle[bubbleSort]) return;

      const radius = Math.abs(
        Math.floor(circle[bubbleSort] * scalingFactor)
      );

      circle.targetRadius = radius > max
        ? max
        : radius > min
          ? radius
          : min;

      circle.color =
        circle[displayChangeRef.current as PriceChange] > 0 ? "green" : "red";

      const newText2Value =
        formatPercentage(circle[displayChangeRef.current as PriceChange]) + " %";

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
  }, [searchCoin, bubbleSort, width, height]);

  return (
    <div
      style={{
        width: '100%',
        height: `${width > 1160 ? 'calc(100dvh - 106px)' : 'calc(100dvh - 165px)'}`,
      }} ref={appRef} className={styles.container}></div>
  );
}