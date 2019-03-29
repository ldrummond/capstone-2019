import React, { PureComponent } from 'react';
import $ from 'jquery'; 

export default class Canvas extends PureComponent {
  constructor(props) {
    super(props)

    this.canvasRef = React.createRef();
    this.canvas = undefined;
    this.ctx = undefined; 

    this.hoistCanvas = props.hoistCanvas || function(){}; 
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current; 
    this.$canvas = $(this.canvas); 

    // Make the canvas respond to the Device Pixel Ratio. 
    this.sizeCanvasRender(); 

    // Passes the context and canvas to the parent when the ref is defined. 
    this.hoistCanvas(this.canvas, this.ctx); 
  }

  sizeCanvasRender = () => {
    this.dpr = window.devicePixelRatio || 1;
    // Give the canvas pixel dimensions of their CSS size * the device pixel ratio.
    this.canvas.width = this.$canvas.width() * this.dpr;
    this.canvas.height = this.$canvas.height() * this.dpr;
    this.ctx = this.canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you don't have to worry about the difference.
    this.ctx.scale(this.dpr, this.dpr);
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef} 
        className='canvas-base' 
      />
    );
  }
}
