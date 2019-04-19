import React, { Component } from 'react';
import $ from 'jquery'
import PentagonController from './pentagonController'
import CanvasBase from './canvasBase'
import RafController from './rafController'
import { posToCanvas } from './helperFunctions';

export default class IntroPentagon extends Component {
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
        diameter: this.width / 9 - 5, // 0,
        rotation: 18,
        sides: 5,
        colors: [],
        stroke: true,
        fill: false,
        strokeStyle: '#333', 
        strokeWidth: 1,
        fillStyle: 'none', 
        hasNoise: false, 
        amp: 10, 
        freq: 1 / 40,
      };

      this.pentagonController = new PentagonController(pentagonOpts)
      this.rotateDegrees = -1;
      this.slowRotation = false; 

      // Executing the step function for the given framerate. 
      this.rafController.onStep = ticker => {
        if(this.ctx) {
          this.pentagonController.update(); 
          if(this.pentagonController.shouldDraw) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.pentagonController.draw(this.ctx, {x: 1, y: 1}, ticker);
            if(Math.abs(this.rotateDegrees) >= 0.05) {
              if(this.slowRotation) {this.rotateDegrees *= 0.95};
              this.pentagonController.rotateBy(this.rotateDegrees);
            }
          }
        }
      }

      let duration = 999;
      // this.pentagonController.easeOpacity(0, 1, 666); 
      // this.pentagonController.easeAngleTo(36, duration * 10);
      // 
      // setTimeout(() => {
        // this.pentagonController.easeSides(20, 3, duration); 
        // this.pentagonController.easeAngle(-180, 18, duration);
        // }, (duration))
        
        this.setState({
          width: this.width,
          height: this.height,
          mounted: true, 
        })
      }
    }
    
    componentWillUnmount() {
      this.rafController.stopLoop(); 
    }
    
    componentDidUpdate() {
      let duration = 999;
      
      switch(this.props.stateIndex) {
        case 0: 
          // this.pentagonController.easeAngleTo(360, duration * 3);
          break; 
        
        case 1:
        // this.pentagonController.easeDiameter(this.width / 9 - 5, this.width / 2 - 5, duration * 3); 
        break; 
        
        case 2:
        break;
        
        case 3:
          this.slowRotation = true; 
          // this.pentagonController.rotateBy(this.pentagonController.rotation / 360, duration * 3);
          // this.pentagonController.easeSides({start: 2, end: 5, duration: duration * 3}); 
          // this.pentagonController.easeStrokeBrightness(255, 180, 999); 
          break;
        
        case 8:
          this.pentagonController.easeAngleTo(36, duration * 5);
          break;

      case 8:
        this.rafController.stopLoop(); 
          break;
    }
  }

  render() {
    const hoistCanvas = (_canvas, _ctx) => {
      this.canvas = _canvas; 
      this.ctx = _ctx; 
      this.canvasRect = this.canvas.getBoundingClientRect(); 
    }
    return (
      <div className='pentagon-container' ref={this.pentagonRef}>
        <div className='pentagon-inner'>
          {(this.state.width && this.state.height) &&
            <CanvasBase hoistCanvas={hoistCanvas}/>
          }
        </div>
      </div>
    );
  }
}
