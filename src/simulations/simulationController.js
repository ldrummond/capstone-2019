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
      padding = {width: 0, height: 0}
    } = options; 

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

    this.boidPoolController = new BoidPoolController({
      boidCount: options.boidCount,
      width: this.bounds.width, 
      height: this.bounds.height, 
      x: this.bounds.x,
      y: this.bounds.y
    })

    this.cursorBoid = new Boid();
    this.cursorBoid.position.x = this.bounds.width / 2 + this.bounds.x;
    this.cursorBoid.position.y = this.bounds.height / 2 + this.bounds.y;
    this.cursorBoid.maxSpeed = 2;

    this.boidPoolController.setStateSchool();
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

  updateCursor(mousePos) {
    this.cursorBoid.arrive(Boid.vec2(mousePos.x, mousePos.y)).update(); 
  }

  drawCursor(ctx, cursor) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.cursorBoid.position.x - this.cursorBoid.velocity.x * 4, this.cursorBoid.position.y - this.cursorBoid.velocity.y * 4);
    ctx.lineTo(this.cursorBoid.position.x + this.cursorBoid.velocity.x * 4, this.cursorBoid.position.y + this.cursorBoid.velocity.y * 4);
    ctx.stroke();
  }

  updateAndDrawCursor(ctx, mousePos) {

    ctx.clearRect(this.cursorBoid.position.x - 20, this.cursorBoid.position.y - 20, 40, 40);

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

  update = (mousePos) => {
    this.updateCursor(mousePos);
    this.updateFn = this.boidPoolController.getUpdateFn(); 
    this.boidPoolController.boidPool.map(boid => {
      this.updateFn(boid);       
    });
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

  draw(ctx, mousePos) {
    this.drawCursor(mousePos); 

    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.beginPath(); 
    this.boidPoolController.boidPool.map(boid => {
      this.drawBoid(ctx, boid); 
    })
    ctx.stroke();
  }

  updateAndDraw(ctx, mousePos) {
    // Batches update and draw calls to improve performance. 
    this.updateFn = this.boidPoolController.getUpdateFn(); 

    // Reset the bounds for the drawing area of the simulation.
    // Compares the bounds of each boid to the min to find the sim area.
    // Passes this to canvas to define clear area. 
    this.minX = this.bounds.x + this.bounds.width;
    this.maxX = 0; 
    this.minY = this.bounds.y + this.bounds.height;
    this.maxY = 0;

    ctx.strokeStyle = 'white'
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
}