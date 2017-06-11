import React from 'react'
import PropTypes from 'prop-types'
import { Rect } from 'react-konva'

import palette from './sonic_running.json'
import plus from './plus.json'
import plusOutline from './plus_outline.json'

class Pixel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      palette:     palette,
      plus:        plus,
      plusOutline: plusOutline,
      size:        this.sizeForDistance(),
      x:           0,
      y:           0,
    }
  }

  componentWillMount = () => {
    this.setState({
      alpha: Number(this.willSpawn()),
      color: this.randomColor(),
      x:     this.getCoord(this.props.cellX),
      y:     this.getCoord(this.props.cellY),
    })
  }

  cellDistanceFromColumnCenter = () => Math.abs(this.props.cellX - this.props.columnCenter)

  cellIsInPlus = () => {
    return this.getValueForArray(this.state.plus)
  }

  cellIsInPlusOutline = () => {
    return this.getValueForArray(this.state.plusOutline)
  }

  colorWithAlpha = () => {
    return `rgba(${this.state.color}, ${this.state.alpha})`
  }

  clickHandler = () => {
    let newAlpha = this.state.alpha === 1 ? 0 : 1

    this.setState({
      alpha: newAlpha,
      color: this.randomColor(),
    })
  }

  getValueForArray = (array) => {
    if (this.props.cellY >= 6 || this.props.cellX >= 12) { // eslint-disable-line no-magic-numbers
      return false
    }

    let arrayY = array[this.props.cellY]

    if (typeof arrayY !== 'undefined') {
      let arrayX = arrayY[this.props.cellX]

      return typeof arrayX !== 'undefined' && arrayX
    }

    return false
  }

  randomColor = () => {
    if (this.cellIsInPlus()) {
      return '0, 0, 0'
    }

    let index = Math.floor(Math.random() * this.state.palette.length)

    return this.state.palette[index]
  }

  sizeForDistance = () => {
    let cellDistance = this.cellDistanceFromColumnCenter()
    let size = this.props.cm

    /* eslint-disable */
    if (cellDistance > 2)  { size = this.props.cm * 0.75  }
    if (cellDistance > 3)  { size = this.props.cm * 0.6  }
    if (cellDistance > 10) { size = this.props.cm * 0.5  }
    if (cellDistance > 20) { size = this.props.cm * 0.3  }
    if (cellDistance > 20) { size = this.props.cm * 0.2  }
    /* eslint-enable */

    return size
  }

  spawnProbabilityForDistance = () => { // eslint-disable-line complexity
    let cellDistance = this.cellDistanceFromColumnCenter()
    let spawnProbability = 1

    /* eslint-disable */
    if (cellDistance > 0)  { spawnProbability = 0.9   }
    if (cellDistance > 1)  { spawnProbability = 0.8   }
    if (cellDistance > 2)  { spawnProbability = 0.6   }
    if (cellDistance > 3)  { spawnProbability = 0.075 }
    if (cellDistance > 10) { spawnProbability = 0.05  }
    if (cellDistance > 20) { spawnProbability = 0.03  }
    if (cellDistance > 20) { spawnProbability = 0.01  }
    /* eslint-enable */

    return spawnProbability
  }

  willSpawn = () => {
    if (this.cellIsInPlus()) {
      return true
    }

    if (this.cellIsInPlusOutline()) {
      return false
    }

    return Math.random() < this.spawnProbabilityForDistance()
  }

  getCoord = (cellCoord) => {
    return cellCoord * this.props.cm + (this.props.cm - this.state.size) / 2 // eslint-disable-line no-magic-numbers
  }

  render() {
    return (
      <Rect
        fill={this.colorWithAlpha()}
        height={this.state.size}
        onClick={this.clickHandler}
        width={this.state.size}
        x={this.state.x}
        y={this.state.y}
      />
    )
  }
}

Pixel.propTypes = {
  cellX:         PropTypes.number.isRequired,
  cellY:         PropTypes.number.isRequired,
  cm:            PropTypes.number.isRequired,
  columnCenter:  PropTypes.number.isRequired,
  viewportWidth: PropTypes.number.isRequired,
}

export default Pixel
