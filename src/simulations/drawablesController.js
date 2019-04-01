import { CanvasTransition, fillCircle, strokeCircle, ActiveBounds} from '../components/helperFunctions'

//////////////////////////////////////////////////
//
// Drawables Controller
//
//////////////////////////////////////////////////

export default class DrawablesController {
  constructor() {
    this.drawBuffer = []; 
    this.activeBounds = new ActiveBounds();
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
        ctx.strokeStyle = `rgba(0, 0, 0, ${1 - per / 100})`;
        ctx.lineWidth = 1.5
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 25 * (per / 100), 0, 2 * Math.PI);
        ctx.stroke();
      }
    })
    this.drawBuffer.push(ripple);
  }

  clear(ctx) {
    this.activeBounds.clear(ctx, 25); 
  }

  step(ctx) {
    if(this.drawBuffer.length > 0) {
      this.drawBuffer = this.drawBuffer.filter(drawable => {
        this.activeBounds.update(drawable.pos); 
        drawable.step(ctx); 
        
        if(!drawable.isDone) {
          return drawable; 
        }
        return false;
      })
    }
    this.activeBounds.reset();
  }
}