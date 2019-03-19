import React, { Component } from 'react';
import $ from 'jquery'
import PentagonController from './pentagonController'
import CanvasBase from './canvasBase'
import RafController from '../components/rafController'
import data from '../data/data'
import { mergeObjects, clamp } from './helperFunctions';

export default class PentagonWheel extends Component {
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
    if(this.pentagonRef) {
      this.pentagon = this.pentagonRef.current; 
      this.width = $(this.pentagon).width();
      this.height = $(this.pentagon).height();
      this.center = {x: this.width / 2, y: this.height / 2};
      this.colors = data.systems.map(system => system.color);    
      this.wheelIndex = 0;

      const defaultOptions = {
        center: this.center,
        diameter: clamp(this.width / 2, 200),
        colors: this.colors,
        rotation: -(360 / 5 * this.wheelIndex) + 108,
        sides: 5
      }

      const pentagonOpts = mergeObjects(defaultOptions, this.props);
      this.pentagonController = new PentagonController(pentagonOpts)

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

  componentWillUpdate(nextProps) {
    if(this.state.mounted) {
      this.wheelIndex = nextProps.wheelIndex;
      this.pentagonController.rotateToEase(-(360 / 5 * this.wheelIndex) + 108, 666);
    }
  }

  onMouseMove = (e) => {
    if(this.canvasRect && this.rafController && this.rafController.ticker % 4 == 0) {
      this.mousePos.x = e.clientX - this.canvasRect.left;
      this.mousePos.y = e.clientY - this.canvasRect.top;
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
