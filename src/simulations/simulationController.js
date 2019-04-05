import BoidPoolController from './boidPoolController'; 
import CursorBoidController from './cursorBoidController'; 
import {ActiveBounds} from '../components/helperFunctions';

//////////////////////////////////////////////////
//
// Simulation Controller
//
//////////////////////////////////////////////////

export default class SimulationController {
  constructor(options = {}) {
    let {
      x = 0,
      y = 0,
      width,
      height,
      boidSettings,
      cursorBoidSettings, 
      simulationType, 
      caveContainer,
    } = options; 

    this.simulationType = simulationType;
    this.caveContainer = caveContainer; // For the colony simulation

    // Creates the simulation bounds, with active bounds for drawing. 
    this.bounds = {x: x, y: y, width: width, height: height}
    this.activeBounds = new ActiveBounds(); 

    // Creates the pool controller.
    this.createBoidPoolController(boidSettings);

    // Creates the cursor controller. 
    this.createCursorBoid(cursorBoidSettings);
  }

  createBoidPoolController(boidSettings) {
    if(boidSettings.isVisible) {
      // Create the controller
      this.boidPoolController = new BoidPoolController({
        simulationType: this.simulationType,
        bounds: this.bounds,
        ...boidSettings,
      })
      this.boidSettings = boidSettings; 
      this.clearBoidFrames = boidSettings.clearFrames || true; 
      this.boidDrawFn = boidSettings.drawFn; 
      this.clickbufferDrawFn = boidSettings.clickbufferDrawFn; 
      this.drawActiveBounds = boidSettings.drawActiveBounds;
    }
  }

  createCursorBoid(cursorBoidSettings) {
    if(cursorBoidSettings.isVisible) {
      this.clearCursorFrames = cursorBoidSettings.clearFrames || true; 
      this.cursorVisible = cursorBoidSettings.cursorVisible;
      // Create the controller
      this.cursorController = new CursorBoidController({
        bounds: this.bounds, 
        ...cursorBoidSettings, 
      }); 
    }
  }

  clearCursor(ctx) {
    this.cursorController.clear(ctx);
  }

  clearBounds(ctx, padding) {
    this.activeBounds.clear(ctx, padding);
    this.activeBounds.reset(); 
  }

  updateAndDrawCursor(ctx, mousePos) {
    this.cursorController.update(ctx);
    let pos = this.cursorController.boid.position; 
    this.boidPoolController.updateChaser(pos.x, pos.y);
    this.cursorController.mousePos = mousePos; 
    this.cursorController.draw(ctx);
  }

  updateAndDrawBoids(ctx) {
    let settings = this.boidSettings; 
    this.updateFn = this.boidPoolController.getUpdateFn(); 
    // Style Canvas
    ctx.lineWidth = settings.strokeWidth; 
    ctx.strokeStyle = settings.strokeColor;
    ctx.fillStyle = settings.fillColor;
    ctx.beginPath(); 
    // Update
    if(this.updateFn) {
      this.boidPoolController.boidPool.map(boid => {
        this.updateFn(boid)
        this.activeBounds.update(boid.position, 20); 
        this.boidDrawFn(ctx, boid); 
      });
    }
    if(settings.stroke) {ctx.stroke()}
    if(settings.fill) {ctx.fill()}
    //
    if(settings.otherDrawFn) {
      settings.otherDrawFn(ctx, this.bounds);
    }
  }

  step(ctx, mousePos) {
    // Clear cursor
    if(this.cursorController && this.clearCursorFrames) {
      this.clearCursor(ctx); 
    }
    // Clear boid position and reset boid bounds
    if(this.boidPoolController && (this.clearBoidFrames == true)) {
      this.clearBounds(ctx, 20); 
    }
    // Draw cursor if active
    if(this.cursorController) {
      this.updateAndDrawCursor(ctx, mousePos);
    }
    // Draw boids if active
    if(this.boidPoolController) {
      this.boidPoolController.updateOtherBoids(ctx);
      this.updateAndDrawBoids(ctx);
    } 
    // If viewing bounds, draw them
    if(this.drawBounds) {
      this.activeBounds.draw(ctx)
    }
  }

  onClick(mousePos) {
    if(this.cursorController) {
      this.cursorController.onClick(mousePos, {caveContainer: this.caveContainer});
    }
    if(this.boidPoolController) {
      this.boidPoolController.onClick(mousePos);
    }
  }

  onMouseLeave() {
    if(this.cursorController) {
      // this.cursorController.pause(); 
    }
  }
  
  onMouseEnter() {
    if(this.cursorController) {
      // this.cursorController.play(); 
    }
  }

  resize(newBounds) {
    this.center = {x: newBounds.width / 2, y: newBounds.height / 2};
    this.bounds.width = newBounds.width; 
    this.bounds.height = newBounds.height; 
    if(this.cursorBoidController) {
      this.cursorBoidController.updateBounds(newBounds);
    }
    if(this.boidPoolController) {
      this.boidPoolController.setBounds(
        this.bounds.width, 
        this.bounds.height,
        this.bounds.x,
        this.bounds.y,
      ) 
    }
  }
}

