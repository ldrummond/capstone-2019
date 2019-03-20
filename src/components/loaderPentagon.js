import React, { Component } from 'react';
import $ from 'jquery'
import PentagonController from './pentagonController'
import CanvasBase from './canvasBase'
import RafController from '../components/rafController'
import data from '../data/data'
import { mergeObjects, posToCanvas } from './helperFunctions';

export default class PentagonWheel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: undefined,
      height: undefined,
      mounted: false, 
    }
    
    this.mousePos = props.mousePos; 
    this.pentagonRef = React.createRef();
    this.rafController = new RafController({fps: 60}); 
  }

  componentDidMount() {
    if(this.pentagonRef) {
      this.pentagon = this.pentagonRef.current; 
      this.width = $(this.pentagon).width();
      this.height = $(this.pentagon).height();
      this.center = {x: this.width / 2, y: this.height / 2};
      this.wheelIndex = 0;

      const pentagonOpts = {
        center: this.center,
        diameter: this.width / 2 - 5, // 0,
        rotation: 18,
        sides: 5,
        colors: [],
        stroke: true,
        fill: false,
        strokeStyle: 'white', 
        fillStyle: 'none', 
        hasNoise: false, 
        amp: 10, 
        freq: 1 / 40,
      };

      this.pentagonController = new PentagonController(pentagonOpts)

      // Executing the step function for the given framerate. 
      this.rafController.onStep = ticker => {
        if(this.ctx) {
          this.pentagonController.update(); 
          // this.pentagonController.rotateBy(0.2)
          if(this.pentagonController.shouldDraw) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.pentagonController.draw(this.ctx, posToCanvas(this.mousePos, this.canvasRect), ticker);
          }
        }
      }

      let duration = 6000;
      // this.pentagonController.grow(0, this.width / 2 - 5, duration, _ => {console.log('done')});
      this.pentagonController.rotateToEase(360 + 18, duration); 
      this.pentagonController.changeSides(3, 20, duration); 

      setTimeout(() => {
        this.pentagonController.changeSides(20, 3, duration); 
        this.pentagonController.rotateToEase(0, duration);
      }, (duration))

      this.setState({
        width: this.width,
        height: this.height,
        mounted: true, 
      })
    }
  }

  render() {
    const hoistCanvas = _canvas => {
      this.canvas = _canvas; 
      this.canvasRect = this.canvas.getBoundingClientRect(); 
    }
    return (
      <div className='pentagon-container' ref={this.pentagonRef}>
        <div className='pentagon-inner'>
          {(this.state.width && this.state.height) &&
            <CanvasBase 
              hoistContext={_ctx => {this.ctx = _ctx}} 
              hoistCanvas={hoistCanvas}
            />
          }
        </div>
      </div>
    );
  }
}
