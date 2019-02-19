import React, { Component } from 'react';
import $ from 'jquery'; 
import BoidPoolController from './boid-pool-controller.js'; 
import {drawCirc, Ripple} from './canvas-functions.js'; 

export default class Canvas extends Component {
  constructor(props) {
    super(props)

    this.canvasRef = React.createRef();
    this.canvas = undefined;
    this.ctx = undefined; 
    this.mousePos = {x: -100, y: -100}
    this.drawBuffer = []; 
  }
  
  componentDidMount() {
    this.canvas = this.canvasRef.current; 
    
    // Make the canvas react to the Device Pixel Ratio. 
    this.sizeCanvasRender(); 
    // Add boids to the scene. 
    this.boidPoolController = new BoidPoolController({
      boidCount: 50,
      containerWidth: this.canvas.width / this.dpr - 5,
      containerHeight: this.canvas.height / this.dpr - 5,
    }); 

    // Bind events to canvas. 
    const namespace = "canvas" + Math.random() * 200; 
    $(this.canvas).on(`mousemove.${namespace}`, this.onMouseMove);
    $(this.canvas).on(`click.${namespace}`, this.onMouseClick);

    // Start the animation loop
    this.updateCanvas(); 
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

  onMouseMove = (e) => {
    var rect = this.canvas.getBoundingClientRect();
    this.mousePos = {
      x: (e.clientX - rect.left),
      y: (e.clientY - rect.top)
    };
    this.boidPoolController.updateChaser(this.mousePos.x, this.mousePos.y)
  }

  onMouseClick = (e) => {
    var rect = this.canvas.getBoundingClientRect();
    this.mousePos = {
      x: (e.clientX - rect.left),
      y: (e.clientY - rect.top)
    };
    this.boidPoolController.setStateFlee(); 
    this.drawBuffer.push(new Ripple({x: this.mousePos.x, y: this.mousePos.y, r: 20, ctx: this.ctx}))
  }

  updateCanvas = () => {
    window.requestAnimationFrame(this.updateCanvas);

    // Update boids
    this.boidPoolController.updatePool(); 
    
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw everything on the canvas.
    this.drawMouse(); 
    this.drawBoids(); 
    this.drawBuffer = this.drawBuffer.filter(item => {
      item.update(); 
      if(item.active) {
        item.draw();
        return item; 
      }
    });
  }
  
  drawMouseWhite() {
    this.ctx.strokeStyle = "#fff";
    drawCirc(this.mousePos.x, this.mousePos.y, 5, this.ctx)
  }

  drawMouse() {
    this.ctx.strokeStyle = "#FF0000";
    drawCirc(this.mousePos.x, this.mousePos.y, 5, this.ctx)
  }

  drawBoids() {
    this.boidPoolController.boidPool.map(boid => {
      drawCirc(boid.position.x, boid.position.y, 5, this.ctx); 
    })
  }

  render() {
    return (
      <div className='simulation-canvas'>
        <canvas ref={this.canvasRef}>
        </canvas>
      </div>
    );
  }
}

