import Boid from 'boid'; // import $ from 'jquery'; 
import { CanvasTransition, strokeCircle } from '../components/helperFunctions'

//////////////////////////////////////////////////
//
// Cursor Controller
// https://github.com/ianmcgregor/boid
//
//////////////////////////////////////////////////

export default class CursorController {
  constructor(options = {}) {
    const {color, shape, width, clearFrames, x = -10, y = -10} = options; 

    this.mousePos = {
      x: x,
      y: y,
    }

    this.initialColor = color; 
    this.color = color; 
    this.width = width;
    this.clearFrames = clearFrames; 

    this.boid = new Boid();
    this.boid.position.x = 500; 
    this.boid.position.y = 500;
    this.boid.maxSpeed = 2;
    this.boid.velocity.x = 1;
    this.boid.velocity.y = 1;
    this.boid.edgeBehavior = 'EDGE_NONE';
    this.playing = true; 
  }

  distance(pointA, pointB) {
    return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y)
  }

  update() {
    if(this.playing) {
      this.boid.arrive(Boid.vec2(this.mousePos.x, this.mousePos.y)).update();   
    } 
    else if(this.slowdown) {
      this.slowdown.step(); 
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

  onClick() {
    // this.tempMaxSpeed = this.boid.maxSpeed * 2; 
    // this.boid.maxSpeed = this.tempMaxSpeed
  }

  // clear(ctx) {
  //   if(this.clearFrames){
  //     ctx.clearRect(this.boid.position.x - 20, this.boid.position.y - 20, 40, 40);
  //   }
  // }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width; 
    ctx.moveTo(this.boid.position.x - this.boid.velocity.x * 3, this.boid.position.y - this.boid.velocity.y * 3)
    ctx.lineTo(this.boid.position.x + this.boid.velocity.x * 3, this.boid.position.y + this.boid.velocity.y * 3);
    ctx.stroke();
    
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
  }
}