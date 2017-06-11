import React from 'react'
import { Layer, Stage } from 'react-konva'

import Pixel from './Pixel/Pixel'

const columnWidth = 7
const viewportWidth = 1440
const dpi = 72
const mmInInch = 25.4
const squareWidth = 10
const cm = dpi / mmInInch * squareWidth

const pixels = () => {
  let columnCenter
  let horizontalSteps = viewportWidth / cm
  let pixelsArray = []
  let verticalSteps = horizontalSteps - columnWidth
  let x = 0
  let y = 0

  while (y < verticalSteps) {
    columnCenter = y + Math.floor(columnWidth / 2) // eslint-disable-line no-magic-numbers

    while (x < horizontalSteps) {
      pixelsArray.push(
        <Pixel
          cellX={x}
          cellY={y}
          cm={cm}
          columnCenter={columnCenter}
          viewportWidth={viewportWidth}
          key={`${x}-${y}`}
        />
      )

      x += 1
    }

    x = 0
    y += 1
  }

  return pixelsArray
}

const Canvas = () =>
  <Stage width={1440} height={700}>
    <Layer>
      {pixels()}
    </Layer>
  </Stage>

export default Canvas
