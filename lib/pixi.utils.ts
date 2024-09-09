import * as PIXI from 'pixi.js'

import { Circle, PriceChangePercentage } from '@/types/bubbles.type'

const gradientTextureCache = new Map<string, PIXI.Texture>()

export class PixiUtils {
  static createContainer = (circle: Circle) => {
    const container = new PIXI.Container()
    container.position.set(circle.x, circle.y)
    container.hitArea = new PIXI.Circle(0, 0, circle.targetRadius)
    container.sortableChildren = true

    // container.on('pointerover', () => {
    //   container.cacheAsBitmap = false;
    //   const borderSprite = container.children[0] as PIXI.Sprite;
    //   borderSprite.texture = PixiUtils.createSolidColorTexture(
    //     {
    //       radius: circle.targetRadius * 4,
    //       color: circle.color,
    //       isSearched: circle.isSearched
    //     },
    //     'white'
    //   );
    //   container.cacheAsBitmap = true;
    // });

    // container.on('pointerout', () => {
    //   container.cacheAsBitmap = false;
    //   const borderSprite = container.children[0] as PIXI.Sprite;
    //   borderSprite.texture = PixiUtils.createSolidColorTexture(
    //     {
    //       radius: circle.targetRadius * 4,
    //       color: circle.color,
    //       isSearched: circle.isSearched
    //     }
    //   );
    //   container.cacheAsBitmap = true;
    // });

    return container
  }

  // static createImageSprite = (circle: Circle) => {
  //   const imgUrl = circle.image || ''

  //   if (imgUrl) {
  //     const imageSprite = PIXI.Sprite.from(imgUrl)

  //     const isFullSize = circle.radius * 0.3 < 10

  //     imageSprite.anchor.set(0.5)
  //     imageSprite.width = circle.radius * (isFullSize ? 1.2 : 0.5)
  //     imageSprite.height = circle.radius * (isFullSize ? 1.2 : 0.5)
  //     imageSprite.position = { x: 0, y: isFullSize ? 0 : -circle.radius / 2 }
  //     imageSprite.zIndex = 1
  //     return imageSprite
  //   }
  // }

  static createImageSprite = (circle: Circle) => {
    const imgUrl = circle.image;

    if (imgUrl) {
      const imageSprite = PIXI.Sprite.from(imgUrl);

      const isFullSize = circle.radius * 0.3 < 10;

      imageSprite.anchor.set(0.5);
      imageSprite.width = circle.radius * (isFullSize ? 1.2 : 0.5);
      imageSprite.height = circle.radius * (isFullSize ? 1.2 : 0.5);
      imageSprite.position = { x: 0, y: isFullSize ? 0 : -circle.radius / 2 };
      imageSprite.zIndex = 1;
      return imageSprite;
    } else {
      const placeholderTexture = PIXI.Texture.WHITE;
      const placeholderSprite = new PIXI.Sprite(placeholderTexture);

      placeholderSprite.tint = '#f7d438';
      placeholderSprite.width = circle.radius * 0.5;
      placeholderSprite.height = circle.radius * 0.5;

      placeholderSprite.anchor.set(0.5);
      placeholderSprite.position = { x: 0, y: -23 };
      placeholderSprite.zIndex = 1;

      return placeholderSprite;
    }
  }

  static createText = (circle: Circle) => {
    const fontSize = circle.radius * 0.3
    const isTextVisible = fontSize > 10

    const textStyle = new PIXI.TextStyle({
      fontSize: isTextVisible ? fontSize + 'px' : 0,
      fill: '#ffffff',
    })

    const text = new PIXI.Text(circle.symbol?.toUpperCase(), textStyle)
    text.anchor.set(0.5)
    text.position.y = 0.15 * circle.radius
    return text
  }

  static createText2 = (circle: Circle, bubbleSort: PriceChangePercentage) => {
    const fontSize = circle.radius * 0.3
    const isTextVisible = fontSize > 10

    const text2Style = new PIXI.TextStyle({
      fontSize: isTextVisible ? fontSize + 'px' : 0,
      fill: '#ffffff',
    })

    const data = circle[bubbleSort] ? circle[bubbleSort]?.toFixed(2) + '%' : 'No data'

    const text2 = new PIXI.Text(data, text2Style)
    text2.anchor.set(0.5)
    text2.position.y = circle.radius / 1.5
    circle['text2'] = text2

    return text2
  }

  static createSolidColorTexture(
    { radius, color, isSearched }: Pick<Circle, 'radius' | 'color' | 'isSearched'>,
    borderColor = color,
  ): PIXI.Texture {
    const textureKey = `${radius}_${color}_${borderColor}_${isSearched}`

    if (gradientTextureCache.has(textureKey)) {
      return gradientTextureCache.get(textureKey) as PIXI.Texture<PIXI.Resource>
    }

    const canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = radius
    canvas.height = radius
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')

    if (context) {
      const gradient: CanvasGradient = context.createRadialGradient(
        radius / 2,
        radius / 2,
        0,
        radius / 2,
        radius / 2,
        radius / 2,
      )

      switch (color) {
        case 'green':
          gradient.addColorStop(0, 'rgba(6, 160, 49, 1)')
          gradient.addColorStop(0.82, 'rgba(6, 160, 49, 0.15)')
          gradient.addColorStop(0.9, 'rgba(6, 160, 49, 0.92)')
          break
        case 'red':
          gradient.addColorStop(0, 'rgba(190, 20, 20, 11)')
          gradient.addColorStop(0.82, 'rgba(190, 20, 20, 0.15)')
          gradient.addColorStop(0.9, 'rgba(190, 20, 20, 0.92)')
          break
      }

      context.fillStyle = isSearched ? '#fff' : borderColor
      // context.fillStyle = borderColor
      context.beginPath()
      context.arc(radius / 2, radius / 2, radius / 4, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = '#000'
      context.beginPath()
      context.arc(radius / 2, radius / 2, radius / 4 - 4, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = gradient
      context.beginPath()
      context.arc(radius / 2, radius / 2, radius / 4 - 4, 0, Math.PI * 2)
      context.fill()

      const texture: PIXI.Texture = PIXI.Texture.from(canvas)

      gradientTextureCache.set(textureKey, texture)

      return texture
    }

    return PIXI.Texture.from(canvas)
  }
}
