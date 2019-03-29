import BoidPoolController from './boidPoolController'; 
import CursorBoidController from './cursorBoidController'; 
import {ActiveBounds} from '../components/helperFunctions';

//////////////////////////////////////////////////
//
// Simulation Controller
//
//////////////////////////////////////////////////

export default class SimulationController {
  constructor(options = {}) {
    let {
      x = 0,
      y = 0,
      width,
      height,
      boidSettings,
      cursorBoidSettings, 
      simulationType, 
    } = options; 

    this.simulationType = simulationType;

    // Creates the simulation bounds, with active bounds for drawing. 
    this.bounds = {
      x: x, 
      y: y, 
      width: width,
      height: height,
    }

    this.activeBounds = new ActiveBounds(); 

    // Creates the pool controller.
    if(boidSettings.isVisible) {
      this.createBoidPoolController(boidSettings);
      this.boidSettings = boidSettings; 
      this.clearBoidFrames = boidSettings.clearFrames; 
      this.boidDrawFn = boidSettings.drawFn; 
      this.clickbufferDrawFn = boidSettings.clickbufferDrawFn; 
      this.drawBounds = boidSettings.drawActiveBounds;
    }

    // Creates the cursor controller. 
    if(cursorBoidSettings.isVisible) {
      this.createCursorBoid(cursorBoidSettings);
      this.clearCursorFrames = cursorBoidSettings.clearFrames; 
      this.cursorVisible = cursorBoidSettings.cursorVisible;
    }

    // Buffer of targets for mold simulation
    this.clickBuffer = []; 
  }

  createBoidPoolController(boidSettings) {
    this.boidPoolController = new BoidPoolController({
      simulationType: this.simulationType,
      ...this.bounds,
      ...boidSettings,
    })
  }

  createCursorBoid(cursorBoidSettings) {
    this.cursorController = new CursorBoidController({
      ...{x: this.bounds.width / 2, y: this.bounds.height / 2},
      ...cursorBoidSettings, 
    }); 
  }

  distance(pointA, pointB) {
    return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y)
  }

  step(ctx, mousePos) {
    // Clear cursor 
    if(this.cursorController && this.clearCursorFrames) {
      let pos = this.cursorController.boid.position; 
      ctx.clearRect(pos.x - 20, pos.y - 20, 40, 40);
    }

    // Clear boid position and reset boid bounds
    if(this.boidPoolController && this.clearBoidFrames) {
      this.activeBounds.clear(ctx, 20);
      this.activeBounds.reset(); 
    }

    // Draw cursor if active
    if(this.cursorController) {
      this.cursorController.update();
      let pos = this.cursorController.boid.position; 
      this.boidPoolController.updateChaser(pos.x, pos.y);
      this.cursorController.mousePos = mousePos; 
      this.cursorController.draw(ctx);
    }

    // Draw boids if active
    if(this.boidPoolController) {
      this.updateFn = this.boidPoolController.getUpdateFn(); 
      ctx.lineWidth = this.boidSettings.strokeWidth; 
      ctx.strokeStyle = this.boidSettings.strokeColor;
      ctx.fillStyle = this.boidSettings.fillColor;
      ctx.beginPath(); 
      if(this.simulationType !== 'mold') {
        if(this.updateFn) {
          this.boidPoolController.boidPool.map(boid => {
            this.updateFn(boid)
            this.activeBounds.update(boid.position, 20); 
            this.boidDrawFn(ctx, boid); 
          });
        }
        ctx.stroke(); 
      }
    }

    // Draw the clickbuffer objects 
    if(this.clickBuffer.length > 0 && this.clickbufferDrawFn) {
      this.clickBuffer.map(clickPos => {
        this.activeBounds.update(clickPos, 20); 
        this.clickbufferDrawFn(ctx, clickPos);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(clickPos.x, clickPos.y, 50, 0, 2 * Math.PI);
        ctx.stroke();
      })
    }

    if(this.boidPoolController) {
      let boidPool = this.boidPoolController.boidPool;

      if(this.simulationType == 'mold') {
        let pos, 
          dist,
          target,
          shouldWander, 
          senseDist = 50, 
          maxDist = 50;

        // Reset boid pheremones. 
        boidPool.map(boid => {
          boid.userData.pheremoneDist = 0; 
        })
              
        // If boids are within a food src, set their pheremone value to half that pheremone dist. 
        boidPool.map(boid => {
          shouldWander = true;
          senseDist = 50; 
          
          this.clickBuffer.map(pos => {
            dist = this.distance(boid.position, pos);
            if(dist < senseDist) {
              // boid.velocity.x = 0;
              // boid.velocity.y = 0;
              boid.flee(this.boidPoolController.getPos(pos.x, pos.y)).update();
              boid.userData.pheremoneDist = maxDist * 1 / ((dist / 80) + 1);
              shouldWander = false;
            }
            else if(dist < 100) {
              boid.seek(this.boidPoolController.getPos(pos.x, pos.y)).update();
              shouldWander = false;
            }
          });
          boidPool.map(otherBoid => {
            if(boid !== otherBoid && otherBoid.userData.pheremoneDist) {
              let posA = boid.position,
                posB = otherBoid.position;
              dist = this.distance(posA, posB); 
              let pherDist = otherBoid.userData.pheremoneDist; 
              
              if(dist < pherDist) {
                boid.flee(this.boidPoolController.getPos(posB.x, posB.y)).update();
                boid.userData.pheremoneDist = pherDist * 1 / ((dist / 80) + 1);
              } 
              else if(dist < pherDist * 2) {
                boid.seek(this.boidPoolController.getPos(posB.x, posB.y)).update();
              }
            }  
          });
          if(shouldWander) {
            boid.wander().update();
          };
        });
      }

      // Draw boid pheremone outlines
      boidPool.map(boid => {
        if(boid.userData.pheremoneDist) {
          ctx.beginPath();
          ctx.arc(boid.position.x, boid.position.y, boid.userData.pheremoneDist, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });

      boidPool.map(boid => {
        this.activeBounds.update(boid.position, 20); 
        this.boidDrawFn(ctx, boid); 
      });
      ctx.stroke(); 
    }

    // If viewing bounds, draw them. 
    if(this.drawBounds) {
      this.activeBounds.draw(ctx)
    }
  }

  onClick(mousePos) {
    this.clickBuffer.push(mousePos);
    if(this.clickBuffer.length > 5) {
      this.clickBuffer.shift();
    }
  }

  onMouseLeave() {
    if(this.cursorController) {
      // this.cursorController.pause(); 
    }
  }
  
  onMouseEnter() {
    if(this.cursorController) {
      // this.cursorController.play(); 
    }
  }

  // resize(scale) {
  //   this.center = {x: this.center.x * scale.x, y: this.center.y * scale.y};
  //   this.width *= scale.x; 
  //   this.height *= scale.y; 
  //   // this.boidPoolController.setBounds(
  //   //   this.bounds.width, 
  //   //   this.bounds.height,
  //   //   this.bounds.x,
  //   //   this.bounds.y,
  //   // ) 
  // }
}