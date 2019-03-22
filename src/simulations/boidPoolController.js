import Boid from 'boid'; // import $ from 'jquery'; 

//////////////////////////////////////////////////
//
// Boid Pool Controller
// https://github.com/ianmcgregor/boid
//
//////////////////////////////////////////////////

export default class BoidPoolController {
  constructor(opts = {}) {
    const {
      boidCount = 40,
      width = 100, 
      height = 100, 
      x = 0, 
      y = 0,
      maxSpeed,
      maxDistance,
      minDistance,
      avoidDistance,
    } = opts; 

    this.center = Boid.vec2(width / 2,height / 2);
    this.boidPool = []; 
    this.x = x;
    this.y = y;

    // Custom settings
    this.boidCount = boidCount;
    this.width = width;
    this.height = height; 
    this.maxSpeed = maxSpeed; 
    this.maxDistance = maxDistance;
    this.minDistance = minDistance; 
    this.avoidDistance = avoidDistance; 

    this.state = "school"; 
    this.target = Boid.vec2(0, 0);
    this.chaser = Boid.vec2(0, 0);
    this.avoidDistance = 80;

    this.initializeBoids(); 
  }

  initializeBoids() {
    let boid; 
    for(let i = 0; i < this.boidCount; i++) {
      boid = new Boid();
      boid.edgeBehavior = "bounce";
      boid.setBounds(this.width, this.height, this.x, this.y);
      boid.position.x = (this.width / 2) * Math.random() + this.width / 4;
      boid.position.y = (this.height / 2) * Math.random() + this.height / 4;
      boid.velocity.x = 20 * Math.random() - 10;
      boid.velocity.y = 20 * Math.random() - 10;

      boid.maxSpeed = this.maxSpeed;
      boid.maxDistance = this.maxDistance;
      boid.minDistance = this.minDistance; 

      this.boidPool.push(boid);
    }
  }

  distance(pointA, pointB) {
    return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y)
  }

  getUpdateFn() {
    switch(this.state) {
      case "flock":
        return boid => boid.flock(this.boidPool).update();
        break; 

      case 'school': 
        return boid => {
          if(this.distance(boid.position, this.chaser) < 50) {
            boid.flee(this.chaser).update();
          } else if(this.distance(boid.position, this.center) > (this.width * 0.3)) {
            boid.seek(this.center).update();
          } else {
            boid.flock(this.boidPool).update();
          }
        }
        break;
          
      case "wander":
      default: 
        return boid => boid.wander().update();
    }
  }

  stepPool() {
    let updateBoid = boid => boid.wander().update(); 

    switch(this.state) {
      case "flock":
        updateBoid = boid => boid.flock(this.boidPool).update();
        break; 

      case 'school': 
        // updateBoid = boid => boid.flock(this.boidPool).flee(this.chaser).update();
        updateBoid = boid => {
          if(this.distance(boid.position, this.chaser) < 50) {
            boid.flee(this.chaser).update();
          // } else if(this.distance(boid.position, this.center) > (this.width * 0.3)) {
            // boid.seek(this.center).update();
            // boid.velocity *= 0;
            // boid.update();
          } else {
            boid.flock(this.boidPool).update();
          }
        }
        break;
          
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

  setStateBeach() {
    this.state = 'flock';
    this.boidPool.map(boid => {
      boid.minDistance = 100;
      boid.maxSpeed = 1;
    })
  }

  setStateSchool() {
    this.state = 'school';
    this.avoidDistance = 80; 
    this.boidPool.map(boid => {
      boid.minDistance = 30;
      boid.maxSpeed = 3;
      boid.maxDistance = 80;
    })
  }

  // Updates for individual boids. 
  setBounds(width, height) {
    this.boidPool.map(boid => boid.setBounds(width, height))
  }
}