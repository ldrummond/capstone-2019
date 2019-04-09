import BoidPoolController from './boidPoolController'; 
import CursorBoidController from './cursorBoidController'; 
import { ActiveBounds } from '../components/helperFunctions';

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
    this.caveContainer = caveContainer; // Ref for the colony simulation

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
      this.clearBoidFrames = boidSettings.clearFrames; 
      this.boidDrawFn = boidSettings.drawFn; 
      this.clickbufferDrawFn = boidSettings.clickbufferDrawFn; 
      this.drawActiveBounds = boidSettings.drawActiveBounds;
    }
  }

  createCursorBoid(cursorBoidSettings) {
    if(cursorBoidSettings.isVisible) {
      // Create the controller
      this.cursorController = new CursorBoidController({
        simulationType: this.simulationType,
        bounds: this.bounds, 
        ...cursorBoidSettings, 
      }); 
      this.clearCursorFrames = cursorBoidSettings.clearFrames; 
      this.cursorVisible = cursorBoidSettings.cursorVisible;
      this.drawCursorBounds = cursorBoidSettings.drawActiveBounds;
    }
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
    // Update and Draw
    if(this.updateFn) {
      this.boidPoolController.boidPool.map(boid => {
        this.updateFn(boid)
        this.activeBounds.update(boid.position, 20); 
        this.boidDrawFn(ctx, boid); 
      });
    }
    if(settings.stroke) {ctx.stroke()}
    if(settings.fill) {ctx.fill()}
  }

  step(ctx, mousePos) {
    // Clear cursor
    if(this.cursorController && this.clearCursorFrames) {
      this.cursorController.clear(ctx, 20);
    }
    // Clear boid position and reset boid bounds
    if(this.boidPoolController && this.clearBoidFrames) {
      this.activeBounds.clear(ctx, 20);
    }
    // Draw cursor if active
    if(this.cursorController) {
      this.cursorController.activeBounds.reset(); 
      this.updateAndDrawCursor(ctx, mousePos);
    }
    // Draw boids if active
    if(this.boidPoolController) {
      this.activeBounds.reset(); 
      this.boidPoolController.updateOtherBoids(ctx);
      this.updateAndDrawBoids(ctx);
    } 
    // If viewing bounds, draw them
    if(this.drawCursorBounds) {
      this.cursorController.activeBounds.draw(ctx, 20);
    }
    // If viewing bounds, draw them
    if(this.drawActiveBounds) {
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

  handleCrowdClick(val) {
    if(this.boidPoolController) {
      this.boidPoolController.updateBoidCount(val);
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

