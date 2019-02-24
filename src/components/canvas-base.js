import React, { Component } from 'react';
import $ from 'jquery'; 
import { Point } from './canvas-functions.js'; 

export default class Canvas extends Component {
  constructor(props) {
    super(props)

    this.canvasRef = React.createRef();
    this.canvas = undefined;
    this.ctx = undefined; 
    this.mousePos = {x: -100, y: -100}
    this.fps = props.fps || '60'; 
    this.onUpdate = props.onUpdate || function() {}; 
  }
  
  componentDidMount() {
    this.canvas = this.canvasRef.current; 
    this.center = new Point(this.canvas.width / 2, this.canvas.height / 2);
    
    // Make the canvas react to the Device Pixel Ratio. 
    this.sizeCanvasRender(); 
    
    // Bind events to canvas. 
    const namespace = 'canvas' + Math.random() * 200; 
    $(this.canvas).on(`mousemove.${namespace}`, this.onMouseMove);
    $(this.canvas).on(`click.${namespace}`, this.onMouseClick);

    // Start the animation loop
    this.startUpdateLoop(); 
  }

  sizeCanvasRender = () => {
    const $canvas = $(this.canvasRef.current); 
    this.dpr = window.devicePixelRatio || 1;
    // Give the canvas pixel dimensions of their CSS size * the device pixel ratio.
    this.canvas.width = $canvas.width() * this.dpr;
    this.canvas.height = $canvas.height() * this.dpr;
    this.ctx = this.canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you don't have to worry about the difference.
    this.ctx.scale(this.dpr, this.dpr);
  }

  startUpdateLoop = () => {
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
    this.startTime = this.then;
    this.ticker = 0; 
    this.increment = 1;  
    this.updateCanvas();
  }

  onMouseMove = (e) => {
    var rect = this.canvas.getBoundingClientRect();
    this.mousePos = {
      x: (e.clientX - rect.left),
      y: (e.clientY - rect.top)
    };
  }

  updateCanvas = () => {
    requestAnimationFrame(this.updateCanvas);
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    this.ticker += this.increment; 

    // if enough time has elapsed, draw the next frame
    if (this.elapsed > this.fpsInterval) {

      // Implement whatever functions are passed into this to extend the component. 
      this.onUpdate();
    }
  }
  
  render() {
    return (
      <canvas ref={this.canvasRef} className='canvas-base'></canvas>
    );
  }
}


// createHiddenCanvas = () => {
//   this.hiddenCanvas = document.createElement("canvas"); 
//   this.hiddenCanvas.width = canvas.width;
//   this.hiddenCanvas.height = canvas.height; 
//   this.hiddenCtx = hiddenCanvas.getContext("2d"); 
// }

// onMouseMove = (e) => {
//   var rect = this.canvas.getBoundingClientRect();
//   this.mousePos = {
//     x: (e.clientX - rect.left),
//     y: (e.clientY - rect.top)
//   };
// }

// onMouseClick = (e) => {
//   var rect = this.canvas.getBoundingClientRect();
//   this.mousePos = {
//     x: (e.clientX - rect.left),
//     y: (e.clientY - rect.top)
//   };

// }