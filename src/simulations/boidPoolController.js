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
      simulationType = 'traffic', 
      count = 40,
      width = 100, 
      height = 100, 
      x = 0, 
      y = 0,
      maxSpeed,
      maxDistance,
      minDistance,
      avoidDistance,
      edgeBehavior = 'bounce', 
    } = opts; 
    
    
    // Custom settings
    this.state = simulationType;
    this.boidCount = count;
    this.width = width;
    this.height = height; 
    this.maxSpeed = maxSpeed; 
    this.maxDistance = maxDistance;
    this.minDistance = minDistance; 
    this.avoidDistance = avoidDistance; 
    this.edgeBehavior = edgeBehavior; 
    
    // Default Settings
    this.target = Boid.vec2(0, 0);
    this.chaser = Boid.vec2(0, 0);
    this.avoidDistance = 80; 
    this.center = Boid.vec2(width / 2,height / 2);
    this.boidPool = []; 
    this.x = x;
    this.y = y;
    
    this.initializeBoids(); 
  }

  initializeBoids() {
    let boid; 
    for(let i = 0; i < this.boidCount; i++) {
      boid = new Boid();
      boid.edgeBehavior = this.edgeBehavior;
      boid.position.x = this.width * Math.random();
      boid.position.y = this.height * Math.random(); 
      // boid.position.x = (this.width / 2) * Math.random() + this.width / 4;
      // boid.position.y = (this.height / 2) * Math.random() + this.height / 4;
      boid.velocity.x = Math.random() - 0.5;
      boid.velocity.y = Math.random() - 0.5;
      boid.maxSpeed = this.maxSpeed;
      boid.maxDistance = this.maxDistance;
      boid.minDistance = this.minDistance; 
      boid.setBounds(this.width, this.height, this.x, this.y);
      this.boidPool.push(boid);
    }

    // Initial Positions and Speeds
    switch(this.state) {
      case 'traffic':
        let lanes = 6;
        let laneWidth = 60; 
        let lanesTotal = lanes * laneWidth; 
        let heightUnit = this.height / this.boidPool.length;
        let center = this.width / 2; 

        this.boidPool.map((boid, i) => {
          let x = (i % lanes + 1); 
          let y = (Math.floor(i / lanes)); 
          boid.position.x = center - (lanesTotal / 2) + x * laneWidth;
          boid.position.y = i * heightUnit; // (y + 1) * (this.height / (lanes + 2)); 
          // boid.maxSpeed = 0.5;
          boid.velocity.x = 0; 
          boid.velocity.y = 2; //Math.random() * 2 + 0.1; 
          boid.mass = 1;
          boid.arriveThreshold = 50;
          boid.maxForce = 0.1;
        })
        break;

      case 'colony':
        break;

      case 'school':
        this.boidPool.map(boid => {
          boid.position.x = (this.width / 2) * Math.random() + this.width / 4;
          boid.position.y = (this.height / 2) * Math.random() + this.height / 4;
        })
        break;

      case 'crowds':
        break;

      case 'mold':
        break;
    }
  }

  distance(pointA, pointB) {
    return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y)
  }

  getUpdateFn() {
    switch(this.state) {
      case 'traffic':
        return boid => {
          let pos = boid.position, 
            otherPos,
            xDiff,
            yDiff,
            target,
            minYDiff = 10000;

          this.boidPool.map(otherBoid => {
            if(otherBoid !== boid) {
              otherPos = otherBoid.position; 
              xDiff = otherPos.x - pos.x;
              yDiff = otherPos.y - pos.y; 
              if(Math.abs(xDiff) < 10) {
                if(pos.y < otherPos.y) {
                  if(yDiff < minYDiff) {
                    minYDiff = yDiff;
                    if(yDiff < boid.arriveThreshold) {
                      boid.velocity.y = 0; 
                    } else if(yDiff < boid.arriveThreshold * 2) {
                      target = otherBoid;
                    } else {
                      boid.velocity.y += 0.2;
                    }
                  }
                }
              }
            }
          })
          
          if(target) {
            boid.arrive(Boid.vec2(target.position.x, target.position.y));
          }
          boid.velocity.x = 0; 
          boid.update(); 
        }
        break;

      case 'colony':
        return boid => boid.wander().update();
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

      case 'crowds':
        return boid => boid.wander().update();
        break;

      case 'mold':
        let pos, dist, shouldWander, 
          senseDist = 50, 
          maxDist = 100;

        return boid => {

          boid.wander().update();
        }
        break;
        

      default: 
        return boid => boid.wander().update();
        break;      
    }
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