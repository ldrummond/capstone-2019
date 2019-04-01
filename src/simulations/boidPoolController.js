import Boid from 'boid';
import { distance } from '../components/helperFunctions';
//////////////////////////////////////////////////
//
// Boid Pool Controller
// https://github.com/ianmcgregor/boid
//
//////////////////////////////////////////////////

export default class BoidPoolController {
  constructor(opts = {}) {
    const {
      simulationType = 'traffic', 
      count = 40,
      bounds, 
      maxSpeed,
      maxDistance,
      minDistance,
      avoidDistance = 80,
      arriveThreshold = 20,
      initFn,
      updateFn,
      clickFn, 
      edgeBehavior = 'bounce', 
    } = opts; 
    
    // Custom settings
    this.state = simulationType;
    this.bounds = bounds; 
    this.initFn = initFn;
    this.updateFn = updateFn; 
    this.clickFn = clickFn; 
    this.avoidDistance = avoidDistance; 
    
    // Default Settings
    this.target = Boid.vec2(0, 0);
    this.chaser = Boid.vec2(0, 0);
    this.center = Boid.vec2(bounds.width / 2, bounds.height / 2);
    this.boidPool = []; 
    this.otherBoidPool = []; 
    
    // Initialize boids to custom settings
    let boid; 
    for(let i = 0; i < count; i++) {
      boid = new Boid();
      boid.edgeBehavior = edgeBehavior;
      boid.position.x = bounds.width * Math.random();
      boid.position.y = bounds.height * Math.random(); 
      boid.velocity.x = Math.random() - 0.5;
      boid.velocity.y = Math.random() - 0.5;
      boid.maxSpeed = maxSpeed;
      boid.arriveThreshold = arriveThreshold; 
      boid.maxDistance = maxDistance;
      boid.minDistance = minDistance; 
      boid.setBounds(bounds.width, bounds.height, bounds.x, bounds.y);
      this.boidPool.push(boid);
    }

    // If the simulation has a specific init style, use that. 
    if(this.initFn) {
      this.initFn(this.boidPool, this.bounds, this.otherBoidPool); 
    }
  }

  onClick(mousePos) {
    if(this.clickFn) {
      this.clickFn(mousePos, this.boidPool, this.otherBoidPool, this.bounds); 
    }
  }

  getUpdateFn() {
    if(this.updateFn) {
      return boid => {
        this.updateFn({
          boid: boid,
          boidPool: this.boidPool,
          otherBoidPool: this.otherBoidPool,
          bounds: this.bounds,
          center: this.center,
          chaser: this.chaser, 
        })
      }
    } 
    else {
      return boid => boid.wander().update();
    }
  }

  updateOtherBoids(ctx) {
    this.otherBoidPool = this.otherBoidPool.filter(boid => {
      if(boid.step) {
        boid.step(ctx); 
      } else {
        boid.userData.step(ctx); 
      }
        
      if(!boid.isDone) {
        return boid; 
      }
      return false;
    })
  }

  // Updates target or chaser for the flee and seek states. 
  updateTarget(x, y) {
    this.target = Boid.vec2(x, y);
  }

  updateChaser(x, y) {
    this.chaser = Boid.vec2(x, y);
  }

  getPos(x, y) {
    return Boid.vec2(x, y);
  }

  // Updates for individual boids. 
  setBounds(width, height) {
    this.boidPool.map(boid => boid.setBounds(width, height))
  }
}