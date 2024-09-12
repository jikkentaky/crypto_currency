'use client'

import React, { FC, useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import * as PIXI from 'pixi.js'
import { appConfig, BubblesUtils } from '@/lib/bubbles.utils'
import { Circle, PriceChangePercentage } from '@/types/bubbles.type'
import { useStore } from '@/store'
import { PixiUtils } from '@/lib/pixi.utils'
import { TokenFilterResult } from '@/types/tokenFilterResultType.type'


// import Loader from "../Loader/Loader";

type Props = {
  coins: TokenFilterResult[]
}

const { width, height, maxCircleSize, minCircleSize } = appConfig

const Bubbles: FC<Props> = ({ coins }) => {

  const [, setIsLoading] = useState<boolean>(true)

  const [circles, setCircles] = useState<Circle[] | null>(null)
  const { resolution, searchCoin } = useStore()

  const appRef = React.useRef<HTMLDivElement>(null)
  const appInstance = React.useRef<PIXI.Application | null>(null)

  const scalingFactor = useMemo(() => {
    return BubblesUtils.getScalingFactor(coins, resolution)
  }, [resolution, coins])

  useEffect(() => {
    if (coins) {
      const scalingFactor = BubblesUtils.getScalingFactor(coins, PriceChangePercentage.HOUR)
      const shapes = BubblesUtils.generateCircles(coins, scalingFactor)
      setCircles(shapes)
    }
  }, [coins])

  useEffect(() => {
    if (!circles) return

    if (appInstance.current) {
      appInstance.current.destroy(true, { children: true })
      appInstance.current = null
    }

    const imageSprites: PIXI.Sprite[] = []
    const textSprites: PIXI.Text[] = []
    const text2Sprites: PIXI.Text[] = []
    const circleGraphics: PIXI.Sprite[] = []
    const eventHandlers: (() => void)[] = []

    const app = new PIXI.Application({
      width: width,
      height,
      backgroundColor: '#0e1010',
      eventMode: 'dynamic',
      eventFeatures: {
        move: true,
        globalMove: false,
        click: true,
        wheel: true,
      },
    }) as unknown

    appInstance.current = app as PIXI.Application
    const appContainer = appRef.current

    appContainer?.appendChild((app as { view: Node }).view)
    appContainer?.children[0].addEventListener('click', (e: unknown) =>
      BubblesUtils.handleEmptySpaceClick(e as MouseEvent, circles),
    )

    for (const circle of circles) {
      const container = PixiUtils.createContainer(circle)

      const imageSprite = PixiUtils.createImageSprite(circle)
      imageSprites.push(imageSprite)
      container.addChild(imageSprite)

      const circleGraphic = new PIXI.Sprite(
        PixiUtils.createSolidColorTexture({
          radius: circle.targetRadius * 4,
          color: circle.color,
          isSearched: circle.isSearched,
        }),
      )

      circle.graphicSprite = circleGraphic

      circleGraphic.anchor.set(0.5)
      circleGraphics.push(circleGraphic)
      container.addChild(circleGraphic)

      // Create the text
      const text = PixiUtils.createText(circle)
      container.addChild(text)
      textSprites.push(text)

      const removeClickEvent = BubblesUtils.clickHandler(container, circle)
      eventHandlers.push(removeClickEvent)

      // Create the second text
      const text2 = PixiUtils.createText2(circle, PriceChangePercentage.HOUR)

      container.addChild(text2)
      text2Sprites.push(text2)
        ; (app as PIXI.Application<PIXI.ICanvas>).stage.addChild(container)
    }

    const ticker = BubblesUtils.update(
      circles,
      imageSprites,
      textSprites,
      text2Sprites,
      circleGraphics,
    )

    setTimeout(() => {
      (app as PIXI.Application<PIXI.ICanvas>).ticker?.add(ticker)
      setIsLoading(false)
    }, 200)

    return () => {
      ; (app as PIXI.Application<PIXI.ICanvas>).ticker.remove(ticker)

      appContainer?.children[0]?.removeEventListener('click', (e: unknown) =>
        BubblesUtils.handleEmptySpaceClick(e as MouseEvent, circles),
      )

      eventHandlers.forEach((removeClickEvent) => removeClickEvent())
    }
  }, [circles])

  useMemo(() => {
    if (circles) {
      const max = maxCircleSize;
      const min = minCircleSize;

      circles.forEach((circle) => {
        if (!circle[resolution]) return;

        const radius = Math.abs(Math.floor(circle[resolution] * scalingFactor));
        circle.targetRadius = radius > max ? max : radius > min ? radius : min;
        circle.color = circle[resolution] > 0 ? 'green' : 'red';

        if (searchCoin && circle.symbol.toLowerCase().includes(searchCoin.toLowerCase().trim())) {
          circle.isSearched = true;
        } else {
          circle.isSearched = false
        }

        if (circle.graphicSprite) {
          const container = circle.graphicSprite.parent;
          container.cacheAsBitmap = false;

          const newTexture = PixiUtils.createSolidColorTexture(
            {
              radius: circle.targetRadius * 4,
              color: circle.color,
              isSearched: circle.isSearched
            }
          );

          circle.graphicSprite.texture = newTexture;

          container.cacheAsBitmap = true;
        }

        if (circle.text2) {
          circle.text2.text = circle[resolution].toFixed(2) + '%';
        }
      });
    }
  }, [resolution, coins, circles, scalingFactor, searchCoin]);

  return (
    <Box className="flex rounded px-2 overflow-hidden bg-zinc-900 md:flex-col flex-col-reverse">
      <Box
        style={{ height: '84vh' }}
        className="bg-zinc-900 w-full overflow-hidden border-2 rounded border-gray-800"
        ref={appRef}
      ></Box>
      {/* {isLoading && <Loader / >} */}
    </Box>
  )
}

export { Bubbles }
