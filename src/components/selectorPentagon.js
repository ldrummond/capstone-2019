import React, { Component } from 'react';
import $ from 'jquery'
import PentagonController from './pentagonController'
import CanvasBase from './canvasBase'
import RafController from '../components/rafController'
import data from '../data/data'
import { mergeObjects, clamp } from './helperFunctions';

export default class SelectorPentagon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: undefined,
      height: undefined,
      mounted: false, 
    }
    
    this.pentagonRef = React.createRef();
    this.rafController = new RafController({fps: 60}); 
  }

  componentDidMount() {
    if(this.pentagonRef.current) {
      this.pentagon = this.pentagonRef.current; 
      this.width = $(this.pentagon).width();
      this.height = $(this.pentagon).height();
      this.center = {x: this.width / 2, y: this.height / 2};
      this.colors = data.systems.map(system => system.color);    
      this.wheelIndex = 0;

      const defaultOptions = {
        center: this.center,
        diameter: 0, //this.width / 2.5,
        colors: this.colors,
        rotation: -(360 / 5 * this.wheelIndex) + 108,
        sides: 5
      }

      const pentagonOpts = mergeObjects(defaultOptions, this.props);
      this.pentagonController = new PentagonController(pentagonOpts);
      this.pentagonController.easeDiameter(0, this.width / 2.5, 999);

      // Executing the step function for the given framerate. 
      this.rafController.onStep = ticker => {
        if(this.ctx) {
          this.pentagonController.update(); 
          if(this.pentagonController.shouldDraw) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.pentagonController.draw(this.ctx, this.mousePos, ticker);
          }
        }
      }

      this.setState({
        width: this.width,
        height: this.height,
        mounted: true, 
      })
    }
  }

  onMouseMove = (e) => {
    if(this.canvasRect && this.rafController && this.rafController.ticker % 4 == 0) {
      this.mousePos.x = e.clientX - this.canvasRect.left;
      this.mousePos.y = e.clientY - this.canvasRect.top;
    }
  }

  render() {
    if(this.pentagonController) {
      this.pentagonController.rotateTo(-(360 / 5 * this.wheelIndex) + 108);
      this.pentagonController.rotateToEase(-(360 / 5 * this.props.wheelIndex) + 108, 666);
      this.wheelIndex = this.props.wheelIndex;
    } 

    const hoistCanvas = (_canvas, _ctx) => {
      this.canvas = _canvas; 
      this.ctx = _ctx; 
      this.canvasRect = this.canvas.getBoundingClientRect(); 
    }

    return (
      <div className='pentagon-container' ref={this.pentagonRef}>
        <div className='pentagon-inner'>
          {(this.state.width && this.state.height) &&
            <CanvasBase 
              hoistCanvas={hoistCanvas}
            />
          }
        </div>
      </div>
    );
  }
}
