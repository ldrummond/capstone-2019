import Boid from 'boid'; // import $ from 'jquery'; 
import BoidPoolController from './boidPoolController'; 
import CursorController from './cursorController'; 
import { mergeObjects } from '../components/helperFunctions';


//////////////////////////////////////////////////
//
// Simulation Controller
//
//////////////////////////////////////////////////

export default class SimulationController {
  constructor(options = {}) {
    let {
      simulationType = 'colony', 
      width,
      height,
      padding = {width: 0, height: 0},
      boidSettings,
      cursorBoidSettings, 
    } = options; 

    // Creates the simulation bounds with padding and passes to pool controller.
    this.createBounds(width, height, padding);

    // Creates the pool controller.
    if(boidSettings.isVisible) {
      this.createBoidPoolController(boidSettings);
      this.boidSettings = boidSettings; 
      this.clearBoidFrames = boidSettings.clearFrames; 
    }

    // Creates the cursor controller. 
    if(cursorBoidSettings.isVisible) {
      this.createCursorBoid(cursorBoidSettings);
      this.clearCursorFrames = cursorBoidSettings.clearFrames; 
      this.cursorVisible = cursorBoidSettings.cursorVisible;
    }
  }

  createBounds(width, height, padding) {
    this.bounds = {
      x: padding.width / 2, 
      y: padding.height / 2, 
      width: width - padding.width,
      height: height - padding.height
    }
    this.activeBounds = this.bounds; 
    this.minX = this.bounds.x + this.bounds.width;
    this.maxX = 0; 
    this.minY = this.bounds.y + this.bounds.height;
    this.maxY = 0;
  }

  createBoidPoolController(boidSettings) {
    this.boidPoolController = new BoidPoolController({
      boidCount: boidSettings.boidCount,
      maxSpeed: boidSettings.maxSpeed, 
      width: this.bounds.width, 
      height: this.bounds.height, 
      x: this.bounds.x,
      y: this.bounds.y,
    })
    this.boidPoolController.setStateSchool();
  }

  createCursorBoid(cursorBoidSettings) {
    this.cursorController = new CursorController(
      mergeObjects(cursorBoidSettings, {x: this.width / 2, y: this.height / 2})
    ); 
  }

  resetBounds() {
    this.minX = this.bounds.x + this.bounds.width;
    this.maxX = 0; 
    this.minY = this.bounds.y + this.bounds.height;
    this.maxY = 0;
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

  drawBoid(ctx, boid) {
    // let rotation = boid.velocity.angle + Math.PI / 2
    // console.log(rotation)
    ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3)
    ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
    // ctx.strokeRect(boid.position.x, boid.position.y, 10, 10);
  }

  step(ctx, mousePos) {
    if(this.cursorController && this.clearCursorFrames) {
      let cursorBoid = this.cursorController.boid; 
      let prevMousePos = this.cursorController.mousePos;
      ctx.clearRect(cursorBoid.position.x - 20, cursorBoid.position.y - 20, 40, 40);
      
      // if(!this.cursorVisible) {
      //   ctx.clearRect(prevMousePos.x - 60, prevMousePos.y - 60, 120, 120);
      // }
    }
    if(this.boidPoolController && this.clearBoidFrames) {
      ctx.clearRect(this.activeBounds.x - 20, this.activeBounds.y - 20, this.activeBounds.width + 40, this.activeBounds.height + 40);
    }

    if(this.cursorController) {
      this.cursorController.update();
      let cursorBoid = this.cursorController.boid; 
      this.boidPoolController.updateChaser(cursorBoid.position.x, cursorBoid.position.y);
      this.cursorController.mousePos = mousePos; 
      this.cursorController.draw(ctx);
    }
    if(this.boidPoolController) {
      this.updateFn = this.boidPoolController.getUpdateFn(); 
      this.resetBounds(); 

      ctx.strokeStyle = this.boidSettings.color;
      ctx.lineWidth = this.boidSettings.width; 
      ctx.beginPath(); 

      this.boidPoolController.boidPool.map(boid => {
        this.updateFn(boid); 
        this.updateBounds(boid.position); 
        this.drawBoid(ctx, boid); 
      });

      ctx.stroke(); 

      this.activeBounds = {
        x: this.minX - 15,
        y: this.minY - 15,
        width: this.maxX - this.minX + 30,
        height: this.maxY - this.minY + 30, 
      }
    }
  }

  onClick() {
    this.cursorController.onClick();
    // this.boidPoolController.onClick(); 
  }

  onMouseLeave() {
    if(this.cursorController) {
      this.cursorController.pause(); 
    }
  }
  
  onMouseEnter() {
    if(this.cursorController) {
      this.cursorController.play(); 
    }
  }

  resize(scale) {
    this.center = {x: this.center.x * scale.x, y: this.center.y * scale.y};
    this.width *= scale.x; 
    this.height *= scale.y; 
    this.boidPoolController.setBounds(
      this.bounds.width, 
      this.bounds.height,
      this.bounds.x,
      this.bounds.y,
    ) 
  }

  shouldDraw() {
    return true
  }
}