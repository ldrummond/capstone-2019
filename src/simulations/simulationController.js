import Boid from 'boid'; // import $ from 'jquery'; 
import BoidPoolController from '../components/boidPoolController'; 

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
    }

    // Creates the cursor controller. 
    if(cursorBoidSettings.isVisible) {
      this.createCursorBoid(cursorBoidSettings);
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
      width: this.bounds.width, 
      height: this.bounds.height, 
      x: this.bounds.x,
      y: this.bounds.y
    })
    this.boidPoolController.setStateSchool();
  }

  createCursorBoid(cursorBoidSettings) {
    this.cursorBoid = new Boid();
    this.cursorBoid.position.x = this.bounds.width / 2 + this.bounds.x;
    this.cursorBoid.position.y = this.bounds.height / 2 + this.bounds.y;
    this.cursorBoid.maxSpeed = 2;

    // this.cursorBoid.drawSettings = {
    //   lineWidth: 4, 
    //   color: cursorBoidSettings.color; 
    // }
  }

  updateAndDrawCursor(ctx, mousePos) {
    this.cursorBoid.arrive(Boid.vec2(mousePos.x, mousePos.y)).update();
    this.boidPoolController.updateChaser(this.cursorBoid.position.x, this.cursorBoid.position.y);
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.cursorBoid.position.x - this.cursorBoid.velocity.x * 5, this.cursorBoid.position.y - this.cursorBoid.velocity.y * 5);
    ctx.lineTo(this.cursorBoid.position.x + this.cursorBoid.velocity.x * 5, this.cursorBoid.position.y + this.cursorBoid.velocity.y * 5);
    ctx.stroke();
  }

  drawBoid(ctx, boid) {
      // let rotation = boid.velocity.angle + Math.PI / 2
      // console.log(rotation)
    ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3)
    ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
    // ctx.strokeRect(boid.position.x, boid.position.y, 10, 10);
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

  updateAndDraw(ctx, mousePos) {
    // Batches update and draw calls to improve performance. 
    // To do that, it pulls the boid update function out of the
    // the controller. 
    this.updateFn = this.boidPoolController.getUpdateFn(); 

    // Reset the bounds for the drawing area of the simulation.
    // Compares the bounds of each boid to the min to find the sim area.
    // Passes this to canvas to define clear area. 
    this.minX = this.bounds.x + this.bounds.width;
    this.maxX = 0; 
    this.minY = this.bounds.y + this.bounds.height;
    this.maxY = 0;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 2
    ctx.beginPath(); 

    this.boidPoolController.boidPool.map(boid => {
      this.updateFn(boid); 
      this.updateBounds(boid.position); 
      this.drawBoid(ctx, boid); 
    });

    // Sets the active bounds to match the mins and maxes
    this.activeBounds = {
      x: this.minX - 15,
      y: this.minY - 15,
      width: this.maxX - this.minX + 30,
      height: this.maxY - this.minY + 30, 
    }

    ctx.stroke(); 
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