import Boid from 'boid'; // import $ from 'jquery'; 
import { CanvasTransition, strokeCircle, ActiveBounds } from '../components/helperFunctions';

//////////////////////////////////////////////////
//
// Cursor Controller
//
//////////////////////////////////////////////////

export default class CursorBoidController {
  constructor(opts = {}) {
    const {
      color, 
      shape, 
      strokeWidth, 
      bounds, 
      clearFrames, 
      clickFn,
      updateFn, 
      drawFn,
    } = opts; 

    this.mousePos = {
      x: bounds.width / 2,
      y: bounds.height / 2,
    }

    this.initBoid(opts);

    // Default Settings
    this.initialColor = color; 
    this.color = color; 
    this.strokeWidth = strokeWidth;
    this.bounds = bounds;
    this.clearFrames = clearFrames; 
    
    // Custom Settings
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
    this.boid.position.x = bounds.width / 2; 
    this.boid.position.y = bounds.height / 2;
    this.boid.maxSpeed = maxSpeed;
    this.boid.velocity.x = 1;
    this.boid.velocity.y = 1;
    this.boid.edgeBehavior = edgeBehavior || 'EDGE_NONE';

    // Apply custom boid settings
    if(initFn) {
      initFn(this.boid); 
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

  onClick(mousePos) {
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
      })
    }
  }

  clear(ctx) {
    this.activeBounds.clear(ctx, 25); 
  }

  update(ctx) {
    // Update cursor
    if(this.updateFn) {
      this.updateFn({mousePos: this.mousePos, boid: this.boid, bounds: this.bounds});
      this.activeBounds.update(this.boid.position, 20); 
    }
    // Update drawbuffer
    // console.log(this.drawBuffer)
    if(this.drawBuffer.length > 0) {
      this.drawBuffer = this.drawBuffer.filter(drawable => {
        drawable.step(ctx); 
        this.activeBounds.update(drawable.position, 20); 
        if(!drawable.isDone) {
          return drawable; 
        }
        return false;
      })
    }
    // Reset bounds
    this.activeBounds.reset();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.strokeWidth; 

    if(this.drawFn) {
      this.drawFn(ctx, this.boid, this.bounds); 
    }
  }
}

// else if (this.slowdown) {
//   this.slowdown.step(); 
// }


    // ctx.moveTo(this.boid.position.x - this.boid.velocity.x * 3, this.boid.position.y - this.boid.velocity.y * 3)
    // ctx.lineTo(this.boid.position.x + this.boid.velocity.x * 3, this.boid.position.y + this.boid.velocity.y * 3);
    // ctx.stroke();
    
    // let rotation = this.boid.velocity.angle + Math.PI / 2;

    // ctx.beginPath(); 
    // ctx.strokeStyle = this.color;
    // ctx.lineWidth = this.width; 
    // ctx.ellipse(this.boid.position.x, this.boid.position.y, 
    //   4, 6 + 2 * Math.abs(this.boid.velocity.y), rotation, 0, 2 * Math.PI
    // );
    // ctx.fill();

    // ctx.lineWidth = 0.5;
    // strokeCircle(ctx, this.mousePos.x, this.mousePos.y, 10, 10);