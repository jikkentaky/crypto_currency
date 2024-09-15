import * as PIXI from 'pixi.js'

import { PixiUtils } from './pixi.utils'
import { Circle, PriceChangePercentage } from '@/types/bubbles.type'
import { TokenFilterResult } from '@/types/tokenFilterResultType.type'

type GenerateCirclesParams = {
  coins: TokenFilterResult[]
  bubbleSort: PriceChangePercentage
  scalingFactor: number
}

const appConfig = {
  width: 1920 - 320,
  height: 950,
  speed: 0.007,
  elasticity: 0.005,
  wallDamping: 0.5,
  maxCircleSize: 200,
  minCircleSize: 55,
}

const { wallDamping, width, height, speed, maxCircleSize, minCircleSize, elasticity } = appConfig

const changeSizeStep = 2

class BubblesUtils {
  static getScalingFactor = (
    data: TokenFilterResult[],
    bubbleSort: PriceChangePercentage = PriceChangePercentage.HOUR,
  ): number => {
    if (!data) return 1
    const max = data.map((item) => Math.abs(+item[bubbleSort]))
    let totalSquare = 0

    for (const item of max) {
      const area = Math.PI * item * item
      totalSquare += area
    }

    return Math.sqrt((width * height) / totalSquare) * 0.8
  }

  static handleEmptySpaceClick = (event: MouseEvent, circles: Circle[]) => {
    const waveForce = 100 // Adjust the wave force as needed

    circles.forEach((circle) => {
      const dx = circle.x - event.clientX
      const dy = circle.y - event.clientY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)

      // Apply a force to push the balls away from the click point
      circle.vx += (waveForce * Math.cos(angle)) / distance
      circle.vy += (waveForce * Math.sin(angle)) / distance
    })
  }

  static clickHandler = (props: { circle: Circle; container: PIXI.Container, setIsOpenModal: (isOpenModal: boolean) => void, setChosenToken: (chosenToken: string) => void }) => {
    const clickHandler = () => {
      props.setIsOpenModal(true)
      props.setChosenToken(props.circle.id)
    }

    props.container.on('pointerdown', clickHandler)

    return () => {
      props.container.off('pointerdown', clickHandler)
    }
  }

  static update = (
    circles: Circle[],
    imageSprites: PIXI.Sprite[],
    textSprites: PIXI.Text[],
    text2Sprites: PIXI.Text[],
    circleGraphics: PIXI.Sprite[] = [],
  ) => {
    return () => {
      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i]
        const circleGraphic = circleGraphics[i]
        const imageSprite = imageSprites[i]
        const text = textSprites[i]
        const text2 = text2Sprites[i]

        const updateCircleChilds = () => {
          const container = circleGraphic.parent as PIXI.Container
          container.cacheAsBitmap = false

          circleGraphic.texture = PIXI.Texture.EMPTY
          circleGraphic.texture = PixiUtils.createSolidColorTexture({
            radius: circle.targetRadius * 4,
            color: circle.color,
            isSearched: circle.isSearched,
          })
          circleGraphic.texture.update()

          container.cacheAsBitmap = true
          container.updateTransform()

          const fontSize = circle.radius * 0.5
          const isFullSize = circle.radius * 0.5 < 20
          const isTextVisible = fontSize >= 20

          if (imageSprite) {
            imageSprite.width = circle.radius * (isFullSize ? 1.2 : 0.5)
            imageSprite.height = circle.radius * (isFullSize ? 1.2 : 0.5)
            imageSprite.position = { x: 0, y: isFullSize ? 0 : -circle.radius / 2 }
          }

          const textStyle = new PIXI.TextStyle({
            fontSize: isTextVisible ? fontSize * 0.8 + 'px' : '1px',
            fill: '#ffffff',
          })

          const text2Style = new PIXI.TextStyle({
            fontSize: isTextVisible ? fontSize * 0.6 + 'px' : '1px',
            fill: '#ffffff',
          })

          text.style = textStyle
          text.position.y = 0.15 * circle.radius

          text2.style = text2Style
          text2.position.y = circle.targetRadius / 1.8
        }

        // Update circle position
        circle.x += circle.vx
        circle.y += circle.vy

        // Check for collisions with walls
        if (circle.x - circle.radius < 0) {
          circle.x = circle.radius // Keep the circle inside the left wall
          circle.vx *= -1
          circle.vx *= 1 - wallDamping // Apply wall damping
        } else if (circle.x + circle.radius > width) {
          circle.x = width - circle.radius // Keep the circle inside the right wall
          circle.vx *= -1
          circle.vx *= 1 - wallDamping // Apply wall damping
        }
        if (circle.y - circle.radius < 0) {
          circle.y = circle.radius // Keep the circle inside the top wall
          circle.vy *= -1
          circle.vy *= 1 - wallDamping // Apply wall damping
        } else if (circle.y + circle.radius > height) {
          circle.y = height - circle.radius // Keep the circle inside the bottom wall
          circle.vy *= -1
          circle.vy *= 1 - wallDamping // Apply wall damping
        }

        // Check for collisions with other circles
        for (let j = i + 1; j < circles.length; j++) {
          const otherCircle = circles[j]
          const dx = otherCircle.x - circle.x
          const dy = otherCircle.y - circle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < circle.radius + otherCircle.radius) {
            // Colliding circles
            const angle = Math.atan2(dy, dx)

            // Calculate the new velocities after collision with elasticity
            const totalRadius = circle.radius + otherCircle.radius
            const overlap = totalRadius - distance
            const force = overlap * elasticity

            const dampingFactor = wallDamping
            circle.vx -= force * Math.cos(angle) * dampingFactor + circle.vx * 0.01
            circle.vy -= force * Math.sin(angle) * dampingFactor + circle.vy * 0.01
            otherCircle.vx += force * Math.cos(angle) * dampingFactor
            otherCircle.vy += force * Math.sin(angle) * dampingFactor
          }
        }

        // Update container position
        const container = circleGraphic.parent as PIXI.Container
        container.position.set(circle.x, circle.y)

        // Smoothly change the size of the circle
        if (circle.radius !== circle.targetRadius) {
          container.cacheAsBitmap = false

          const sizeDifference = circle.targetRadius - circle.radius

          if (Math.abs(sizeDifference) <= changeSizeStep) {
            circle.radius = circle.targetRadius
            container.cacheAsBitmap = true
            container.hitArea = new PIXI.Circle(0, 0, circle.targetRadius)
          } else {
            circle.radius > circle.targetRadius
              ? (circle.radius -= changeSizeStep)
              : (circle.radius += changeSizeStep)
            updateCircleChilds()
          }
        }
      }
    }
  }

  static generateCircles = (
    coins: TokenFilterResult[],
    scalingFactor: number,
    bubbleSort: PriceChangePercentage = PriceChangePercentage.HOUR,
  ) => {
    const shapes: Circle[] = coins.map((item) => {
      const radius = Math.abs(+item[bubbleSort] * scalingFactor)

      const data = {
        id: item.token?.address,
        symbol: item.token.symbol?.slice(0, 6),
        image: item.token.info.imageThumbUrl || null,
        coinName: item.token.symbol,
        x: Math.random() * (width - radius * 2),
        y: Math.random() * (height - radius * 2),
        vx: Math.random() * speed * 2 - speed,
        vy: Math.random() * speed * 2 - speed,
        color: +item[bubbleSort] > 0 ? 'green' : 'red',
        graphicSprite: null,
        isSearched: false,
        targetRadius:
          radius > maxCircleSize ? maxCircleSize : radius > minCircleSize ? radius : minCircleSize,
        radius: minCircleSize,
        dragging: false,
        text2: null,
        [PriceChangePercentage.HOUR]: +item[PriceChangePercentage.HOUR],
        [PriceChangePercentage.FOUR_HOURS]: +item[PriceChangePercentage.FOUR_HOURS],
        [PriceChangePercentage.TWELVE_HOURS]: +item[PriceChangePercentage.TWELVE_HOURS],
        [PriceChangePercentage.DAY]: +item[PriceChangePercentage.DAY],
      }

      const shape = { ...data, text2: PixiUtils.createText2(data, bubbleSort) }

      return shape
    })

    return shapes
  }
}

export type { GenerateCirclesParams }
export { BubblesUtils, appConfig }
