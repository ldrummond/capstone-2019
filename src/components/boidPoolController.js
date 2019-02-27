import Boid from 'boid'; // import $ from 'jquery'; 

//////////////////////////////////////////////////
//
// Boid Pool Controller
// https://github.com/ianmcgregor/boid
//
//////////////////////////////////////////////////

export default class BoidPoolController {
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
    this.boidPool.map(boid => {
      switch(this.state) {
        case "flock":
          boid.flock(this.boidPool).update();
          break; 

        case "flee": 
          boid.flock(this.boidPool).flee(this.chaser).update();

        case "wander":
        default: 
          boid.wander().update();
          break;

      }
    })
  }

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

  updateTarget(x, y) {
    this.target = Boid.vec2(x, y);
  }

  updateChaser(x, y) {
    this.chaser = Boid.vec2(x, y);
  }
}