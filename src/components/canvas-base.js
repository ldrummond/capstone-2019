import React, { Component } from 'react';
import $ from 'jquery'; 
import { } from './canvas-functions.js'; 

export default class Canvas extends Component {
  constructor(props) {
    super(props)

    this.canvasRef = React.createRef();
    this.canvas = undefined;
    this.ctx = undefined; 
    this.mousePos = {x: -100, y: -100}
    this.center = new Point(canvas.width / 2, canvas.height / 2);
  }
  
  componentDidMount() {
    this.canvas = this.canvasRef.current; 
    
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

  startUpdateLoop = (fps) => {
    var fps, fpsInterval, startTime, now, then, elapsed, ticker, increment;

    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    ticker = 0; 
    increment = 1;  
    this.updateCanvas();
  }

  updateCanvas = () => {
    requestAnimationFrame(this.updateCanvas);
    now = Date.now();
    elapsed = now - then;
    ticker += increment; 

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // Clear the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);



    }
  }
  
  render() {
    return (
      <canvas ref={this.canvasRef}></canvas>
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