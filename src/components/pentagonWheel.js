import React, { Component } from 'react';
import CanvasBase from './canvasBase'
import $ from 'jquery'
import { PentagonController } from './polygonController'
import data from '../data/data'

export class PentagonWheel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: undefined,
      height: undefined,
    }

    this.pentagonOptions = {}; 
    this.canvasOptions = {}; 

    this.pentagonRef = React.createRef();
    this.colors = data.systems.map(system => system.color);
  }

  componentDidMount() {
    if(this.pentagonRef) {
      this.pentagon = this.pentagonRef.current; 
      this.width = $(this.pentagon).width();
      this.height = $(this.pentagon).height();
      this.center = {x: this.width / 2, y: this.height / 2};
      this.wheelIndex = 0;

      this.pentagonControllerOptions = {
        center: this.center,
        size: this.width / 2,
        colors: this.colors,
      }
  
      this.pentagonController = new PentagonController(this.pentagonControllerOptions)
      this.pentagonController.rotateTo(-(360 / 5 * this.wheelIndex) + 108);

      this.canvasOptions = {
        fps: 60,
        drawBuffer: [this.pentagonController]
      }

      this.setState({
        width: this.width,
        height: this.height,
      })
    }
  }

  componentWillUpdate(nextProps) {
    this.wheelIndex = nextProps.wheelIndex;
    this.pentagonController.rotateToEase(-(360 / 5 * this.wheelIndex) + 108, 666);
  }

  render() {
    return (
      <span className='pentagon-container' ref={this.pentagonRef}>
        {this.state.width && this.state.height &&
          <CanvasBase {...this.canvasOptions} />}
      </span>
    );
  }
}
