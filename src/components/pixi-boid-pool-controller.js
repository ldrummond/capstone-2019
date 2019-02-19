import Boid from 'boid'; // import $ from 'jquery'; 
import * as PIXI from 'pixi.js'; 

export default class PixiBoidPoolController {
  constructor(options = {}) {
    const {boidCount = 40, containerWidth = 100, containerHeight = 100, ctx} = options; 

    this.boidPool = []; 
    this.boidCount = boidCount;
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight; 

    this.state = "flock"; 

    this.target = Boid.vec2(0, 0);
    this.chaser = Boid.vec2(0, 0);

    this.initializeBoids(); 
  }

  initializeBoids() {
    let boid; 
    for(let i = 0; i < this.boidCount; i++) {
      boid = new Boid();
      boid.edgeBehavior = "bounce";
      boid.setBounds(this.containerWidth, this.containerHeight);
      boid.position.x = this.containerWidth * Math.random();
      boid.position.y = this.containerHeight * Math.random();
      boid.velocity.x = 20 * Math.random() - 10;
      boid.velocity.y = 20 * Math.random() - 10;
      this.boidPool.push(boid);
    }
  }

  updatePool() {
    let updateBoid = boid => boid.wander().update(); 

    switch(this.state) {
      case "flock":
        updateBoid = boid => boid.flock(this.boidPool).update();
        break; 

      case "flee": 
        updateBoid = boid => boid.flock(this.boidPool).flee(this.chaser).update();

      case "wander":
      default: 
        updateBoid = boid => boid.wander().update();
        break;
    }

    this.boidPool.map(updateBoid)
  }

  // Updates target or chaser for the flee and seek states. 
  updateTarget(x, y) {
    this.target = Boid.vec2(x, y);
  }

  updateChaser(x, y) {
    this.chaser = Boid.vec2(x, y);
  }

  // States for  the collection to use. 
  setStateFlee() {
    this.state = "flee";
    this.boidPool.map(boid => boid.maxSpeed = 2);
  }

  setStateSeek() {
    this.state = "seek";
  }

  setStateWander() {
    this.state = "wander";
  }

  setStateFlock() {
    this.state = "flock";
  }

  // Updates for individual boids. 
  setBounds(width, height) {
    this.boidPool.map(boid => boid.setBounds(width, height))
  }
}