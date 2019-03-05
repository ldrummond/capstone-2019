import React, { Component } from 'react';
import $ from 'jquery'
import PentagonController from './polygonController'
import CanvasBase from './canvasBase'
import RafController from '../components/rafController'
import data from '../data/data'

export class PentagonWheel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: undefined,
      height: undefined,
    }
    
    this.pentagonRef = React.createRef();
    
    this.pentagonOptions = {}; 
    this.canvasOptions = {}; 
    this.colors = data.systems.map(system => system.color);    

    this.hoistContext = _ctx => {
      this.ctx = _ctx;
    }
  }

  componentDidMount() {
    if(this.pentagonRef) {
      this.pentagon = this.pentagonRef.current; 
      this.width = $(this.pentagon).width();
      this.height = $(this.pentagon).height();
      this.center = {x: this.width / 2, y: this.height / 2};
      this.wheelIndex = 0;
      
      let clamp = (size, limit) => {
        if(size > limit) {
          return limit; 
        }
        return size; 
      }

      this.pentagonControllerOptions = {
        center: this.center,
        size: clamp(this.width / 2, 200),
        colors: this.colors,
      }
  
      this.pentagonController = new PentagonController(this.pentagonControllerOptions)
      this.pentagonController.rotateTo(-(360 / 5 * this.wheelIndex) + 108);

      // Executing the step function for the given framerate. 
      this.rafController = new RafController({fps: 60}); 
      this.rafController.onStep = ticker => {
        if(this.ctx) {
          this.pentagonController.update(); 
          if(this.pentagonController.shouldDraw) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.pentagonController.draw(this.ctx);
          }
        }
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
          <CanvasBase hoistContext={this.hoistContext} />}
      </span>
    );
  }
}
