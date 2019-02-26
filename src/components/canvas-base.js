import React, { Component } from 'react';
import $ from 'jquery'; 

export default class Canvas extends Component {
  constructor(props) {
    super(props)

    this.canvasRef = React.createRef();
    this.canvas = undefined;
    this.ctx = undefined; 
    this.mousePos = {x: -100, y: -100}
    this.fps = props.fps || '60'; 
    this.onUpdate = props.onUpdate || function() {}; 
    this.drawBuffer = props.drawBuffer || [];  
  }

  onMouseMove = (e) => {
    var rect = this.canvas.getBoundingClientRect();
    this.mousePos = {
      x: (e.clientX - rect.left),
      y: (e.clientY - rect.top)
    };
  }
  
  componentDidMount() {
    this.canvas = this.canvasRef.current; 
    
    // Bind events to canvas. 
    this.namespace = 'canvas' + Math.random() * 200; 
    $(window).on(`resize.${this.namespace}`, this.onResize); 
    $(this.canvas).on(`mousemove.${this.namespace}`, this.onMouseMove);
    $(this.canvas).on(`click.${this.namespace}`, this.onMouseClick);
    
    // Make the canvas respond to the 
    // Device Pixel Ratio. 
    this.sizeCanvasRender(); 

    // Start the animation loop
    this.startUpdateLoop(); 
  }

  componentWillUnmount() {
    $(window).off(`resize.${this.namespace}`); 
    $(this.canvas).off(`mousemove.${this.namespace}`);
    $(this.canvas).off(`click.${this.namespace}`);
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

  resizeCanvas = () => {
    const $canvas = $(this.canvasRef.current); 
    this.canvas.width = $canvas.width() * this.dpr;
    this.canvas.height = $canvas.height() * this.dpr;
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

  updateCanvas = () => {
    requestAnimationFrame(this.updateCanvas);
    
    // Check the amount of time elapsed since previous animation frame. 
    // If it fits within the fps interval, draw that frame. 
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    this.ticker += this.increment; 

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);

      // Each frame, iterate through the buffer of items to be drawn.
      // If an item is encountered that should be drawn, clear the canvas,
      // then draw the item. 
      let hasDrawn = false; 
      this.drawBuffer.map(drawable => {

        // Get the draw function from the drawable shape. 
        // If the draw function is true, shape should be drawn.
        // If it is the first draw, clear the canvas. 
        let draw = drawable.getDrawFn();
        if(draw) {
          if(!hasDrawn) {
            hasDrawn = true;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          }
          draw(this.ctx, this.mousePos, this.now); 
        }
      })
    }
  }

  addToDrawBuffer(drawable) {
    this.drawBuffer.push(drawable)
  }

  shouldComponentUpdate() {
    return false 
  }

  render() {
    return (
      <canvas 
        ref={this.canvasRef} 
        onMouseMove={this.onMouseMove}
        className='canvas-base' 
      />
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