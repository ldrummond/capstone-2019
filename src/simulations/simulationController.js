import Boid from 'boid'; // import $ from 'jquery'; 
import BoidPoolController from '../components/boidPoolController'; 
import RafController from '../components/rafController'

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

    this.boidPoolController = new BoidPoolController({
      boidCount: options.boidCount,
      width: this.bounds.width, 
      height: this.bounds.height, 
      x: this.bounds.x,
      y: this.bounds.y
    })

    this.rafController = new RafController({fps: 1});
    this.rafController.onStep = function() {

    }

    this.cursorBoid = new Boid(); 
    this.cursorBoid.maxSpeed = 2;

    this.boidPoolController.setStateSchool();
    this.drawBuffer = []; 
    this.hasChanged = false; 
    this.isPaused = false;
  }

  play() {
    this.isPaused = false;
  }

  pause() {
    this.isPaused = true;
  }

  step = (ctx, mousePos, time) => {
    if(this.isPaused) {return}
    this.boidPoolController.updateChaser(mousePos.x, mousePos.y);
    this.boidPoolController.stepPool();
    // this.cursorBoid.arrive(Boid.vec2(mousePos.x, mousePos.y)).update(); 
    // ctx.strokeStyle = 'black'
    // ctx.beginPath();
    // ctx.moveTo(this.cursorBoid.position.x, this.cursorBoid.position.y)
    // ctx.lineTo(this.cursorBoid.position.x + this.cursorBoid.velocity.x * 6, this.cursorBoid.position.y + this.cursorBoid.velocity.y * 6);
    // ctx.stroke();

    // ctx.fillRect(mousePos.x, mousePos.y, 8, 8);
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.beginPath(); 
    this.boidPoolController.boidPool.map(boid => {
      // let rotation = boid.velocity.angle + Math.PI / 2
      // console.log(rotation)
      
      ctx.moveTo(boid.position.x, boid.position.y)
      ctx.lineTo(boid.position.x + boid.velocity.x * 6, boid.position.y + boid.velocity.y * 6);
      // ctx.strokeRect(boid.position.x, boid.position.y, 10, 10);
    })
    ctx.stroke();
  }
  
  resize(scale) {
    this.center = {x: this.center.x * scale.x, y: this.center.y * scale.y};
    this.width *= scale.x; 
    this.height *= scale.y; 
    this.drawBuffer = this.generateDrawBuffer();
    this.boidPoolController.setBounds(
      this.bounds.width, 
      this.bounds.height,
      this.bounds.x,
      this.bounds.y,
    ) 

    return (ctx, mousePos, time) => {
      this.boidPoolController.boidPool.map(boid => {
        ctx.strokeRect(boid.x, boid.y, 5, 5);
      })
    }
  }
}