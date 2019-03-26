import classnames from 'classnames';
import { CanvasTransition, fillCircle, strokeCircle} from '../components/helperFunctions'

//////////////////////////////////////////////////
//
// Drawables Controller
//
//////////////////////////////////////////////////

export default class DrawablesController {
  constructor(ctx) {

    this.ctx = ctx; 
    this.drawBuffer = []; 
  }

  shouldDraw() {
    return this.drawBuffer.length > 0; 
  }

  addRipple(mousePos) {
    const ripple = new CanvasTransition({
      startValue: 0, 
      endValue: 100, 
      durationMs: 666, 
      fps: 60, 
      onStep: per => {
        this.ctx.strokeStyle = `rgba(0, 0, 0, ${1 - per / 100})`;
        strokeCircle(this.ctx, mousePos.x, mousePos.y, 15 * (per / 100));
      }
    })
    this.drawBuffer.push(ripple);
  }

  step() {
    if(this.drawBuffer.length > 0) {
      this.drawBuffer = this.drawBuffer.filter(drawable => {
        drawable.step(); 
        
        if(!drawable.isDone) {
          return drawable; 
        }
        return false;
      })
    }
  }
}