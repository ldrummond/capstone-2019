import classnames from 'classnames';
import { CanvasTransition, fillCircle, strokeCircle} from '../components/helperFunctions'

//////////////////////////////////////////////////
//
// Drawables Controller
//
//////////////////////////////////////////////////

export default class DrawablesController {
  constructor() {

    this.drawBuffer = []; 
    this.activeBounds = {}; 
  }

  shouldDraw() {
    return this.drawBuffer.length > 0; 
  }

  addRipple(pos, fps) {
    const ripple = new CanvasTransition({
      startValue: 0, 
      endValue: 100, 
      durationMs: 666, 
      fps: fps || 60, 
      pos: pos,
      onStep: (per, ctx) => {
        ctx.strokeStyle = `rgba(200, 100, 0, ${1 - per / 100})`;
        ctx.lineWidth = 1.5
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 25 * (per / 100), 0, 2 * Math.PI);
        ctx.stroke();
      }
    })
    this.drawBuffer.push(ripple);
  }

  clear(ctx) {
    ctx.clearRect(this.activeBounds.x, this.activeBounds.y, this.activeBounds.width, this.activeBounds.height);
  }

  updateBounds = (position) => {
    if(position.x > this.maxX) {
      this.maxX = position.x;
    } else if (position.x < this.minX) {
      this.minX = position.x; 
    }
    if(position.y > this.maxY) {
      this.maxY = position.y;
    } else if (position.y < this.minY) {
      this.minY = position.y; 
    }
  }

  setActiveBounds() {
    this.activeBounds = {
      x: this.minX,
      y: this.minY,
      width: this.maxX - this.minX,
      height: this.maxY - this.minY, 
    }
  }

  step(ctx) {
    if(this.drawBuffer.length > 0) {
      this.drawBuffer = this.drawBuffer.filter(drawable => {
        // this.updateBounds(drawable.pos.x - 10, drawable.pos.y - 10) 
        // this.updateBounds(drawable.pos.x + 10, drawable.pos.y + 10) 
        drawable.step(ctx); 
        
        if(!drawable.isDone) {
          return drawable; 
        }
        return false;
      })
    }
    // this.setActiveBounds(); 
  }
}