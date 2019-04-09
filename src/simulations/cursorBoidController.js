import Boid from 'boid'; // import $ from 'jquery'; 
import { CanvasTransition, ActiveBounds } from '../components/helperFunctions';

//////////////////////////////////////////////////
//
// Cursor Controller
//
//////////////////////////////////////////////////

export default class CursorBoidController {
  constructor(opts = {}) {
    const {
      simulationType,
      color, 
      strokeWidth, 
      bounds, 
      clearFrames, 
      clickFn,
      updateFn, 
      drawFn,
    } = opts; 

    this.mousePos = {
      // x: bounds.width / 2,
      // y: bounds.height / 2,
      x: 0,
      y: -10,
    }

    this.initBoid(opts);

    // Default Settings
    this.initialColor = color; 
    this.color = color; 
    this.strokeWidth = strokeWidth;
    this.bounds = bounds;
    this.clearFrames = clearFrames; 
    
    // Custom Settings
    this.simulationType = simulationType;
    this.clickFn = clickFn;
    this.updateFn = updateFn;
    this.drawFn = drawFn;

    this.clickBuffer = [];
    this.drawBuffer = []; 
    this.activeBounds = new ActiveBounds();
    this.playing = true;
  }

  initBoid({maxSpeed = 2, bounds, edgeBehavior, initFn}) {
    // Boid Settings
    this.boid = new Boid();
    this.boid.position.x = this.mousePos.x; 
    this.boid.position.y = this.mousePos.y;
    this.boid.maxSpeed = maxSpeed;
    this.boid.velocity.x = 1;
    this.boid.velocity.y = 1;
    this.boid.edgeBehavior = edgeBehavior || 'EDGE_NONE';

    // Apply custom boid settings
    if(initFn) {
      initFn(this.boid, bounds); 
    }
  }

  pause() {
    this.playing = false; 
    this.color = 'rgba(0, 0, 0, 0.3)';
    this.slowdown = new CanvasTransition({startValue: 100, endValue: 0, durationMs: 666, onStep: value => {
      this.boid.position.x += this.boid.velocity.x * (value / 100); 
      this.boid.position.y += this.boid.velocity.y * (value / 100); 
    }});
  }

  play() {
    this.color = this.initialColor;
    this.playing = true; 
  }

  onClick(mousePos, options) {
    this.clickBuffer.push(mousePos);
    if(this.clickBuffer.length > 5) {
      this.clickBuffer.shift();
    }
    if(this.clickFn) {
      this.clickFn({
        mousePos: mousePos,
        clickBuffer: this.clickBuffer, 
        drawBuffer: this.drawBuffer,
        bounds: this.bounds,
        boid: this.boid, 
        ...options
      })
    }
  }

  clear(ctx) {
    if(this.simulationType === 'colony') {
      this.activeBounds.maxY = this.bounds.height; 
    }
    this.activeBounds.clear(ctx, 30); 
  }

  update(ctx) {
    // Update cursor
    if(this.updateFn) {
      this.updateFn({mousePos: this.mousePos, boid: this.boid, bounds: this.bounds});
      this.activeBounds.update(this.boid.position); 
    }
    // Update drawbuffer
    // console.log(this.drawBuffer)
    if(this.drawBuffer.length > 0) {
      this.drawBuffer = this.drawBuffer.filter(drawable => {
        this.activeBounds.update(drawable.position); 
        drawable.step(ctx); 
        if(!drawable.isDone) {
          return drawable; 
        }
        return false;
      })
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.strokeWidth; 

    if(this.drawFn) {
      this.drawFn(ctx, this.boid, this.bounds); 
    }
  }

  updateBounds = (bounds) => {
    this.bounds.width = bounds.width;
    this.bounds.height = bounds.height;
  }
}