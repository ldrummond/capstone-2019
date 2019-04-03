import Boid from 'boid';
import { CanvasTransition, strokeCircle, ActiveBounds, distance, squared } from '../../components/helperFunctions';

//////////////////////////////////////////////////
//
// Mold Simulation Settings
//
//////////////////////////////////////////////////

const settingsFps = 20;

export default {
  rafSettings: {
    fps: settingsFps,
  },
  simulationSettings: {
    simulationType: 'mold',
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: true,
      clearFrames: true, 
      color: 'black',
      width: 4,
      maxSpeed: 3,
      // initFn: cursorInitFn,
      clickFn: cursorClickFn,
    },
    boidSettings: {
      isVisible: true,
      clearFrames: false, 
      drawActiveBounds: true, 
      count: 100, 
      maxSpeed: 1,
      minDistance: 30, 
      maxDistance: 10, 
      strokeColor: 'white',
      strokeWidth: 1,
      // initFn: boidInitFn,
      updateFn: boidUpdateFn,
      drawFn: boidDrawFn, 
      clickFn: boidClickFn,
      otherBoidDrawFn: otherBoidDrawFn, 
      edgeBehavior: 'bounce',
    }
  }
}

/**
 * 
 * Cursor Click Function
 */
function cursorClickFn({mousePos, drawBuffer}) {
  const ripple = new CanvasTransition({
    startValue: 0, 
    endValue: 100, 
    durationMs: 666, 
    fps: settingsFps, 
    position: mousePos,
    onStep: (per, ctx) => {
      ctx.strokeStyle = `rgba(0, 0, 0, ${1 - per / 100})`;
      ctx.lineWidth = 1.5
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 25 * (per / 100), 0, 2 * Math.PI);
      ctx.stroke();
    }
  })
  drawBuffer.push(ripple);
}

/**
 * 
 * All Boids Click Function
 */
function boidClickFn(mousePos, boidPool, otherBoidPool, bounds) {
  let foodBoid = new Boid(); 
  foodBoid.position.x = mousePos.x;
  foodBoid.position.y = mousePos.y;
  foodBoid.velocity.x = 0;
  foodBoid.velocity.y = 0;
  foodBoid.userData.pheremoneDist = 30;
  foodBoid.userData.step = ctx => {
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.arc(mousePos.x, mousePos.y, 30, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // const food = {
  //   position: {...mousePos},
  //   pheremoneDist: 20,
  //   step: ctx => {
  //     ctx.strokeStyle = 'yellow';
  //     ctx.beginPath();
  //     ctx.arc(mousePos.x, mousePos.y, 4, 0, 2 * Math.PI);
  //     ctx.stroke();
  //     ctx.beginPath();
  //     ctx.strokeStyle = 'white';
  //     ctx.arc(mousePos.x, mousePos.y, 20, 0, 2 * Math.PI);
  //     ctx.stroke();
  //   },
  // }

  if(otherBoidPool.length >= 5) {
    otherBoidPool.shift();
  } 
  otherBoidPool.push(foodBoid);
}



// let boidInitFn = (boidPool, bounds) => {
  
// }

function boidUpdateFn({boid, otherBoidPool, boidPool, chaser, bounds, center}) {
  boid.flock(boidPool).update();
  // let pos, 
  //   dist, 
  //   shouldWander, 
  //   senseDist = 50, 
  //   maxDist = 100;

  // boid.userData.pheremoneDist = 0;
  // // window.cout(1000, otherBoidPool)
  // if(otherBoidPool.length > 0) {
  //   let i = Math.floor(Math.random() * otherBoidPool.length * 5); 
  //   if(i < otherBoidPool.length) {
  //     boid.arrive(Boid.vec2(otherBoidPool[i].position.x, otherBoidPool[i].position.y));
  //   }
  //   // otherBoidPool.map(foodBoid => {
  //     // boid.arrive(Boid.vec2(foodBoid.position.x, foodBoid.position.y));
  //     // boid.update();
  //   // })
  //   // boid.flock(boidPool);
  // } else {
  //   boid.wander();
  // }

  // let allPool = [...otherBoidPool, ...boidPool]; 
  // let near = false; 
  // allPool.map(otherBoid => {
  //   // If the other has pheremones
  //   if(otherBoid.userData.pheremoneDist) {
  //     // If this is within range of the other pheremones
  //     if(boid.position.distanceSq(otherBoid.position) < squared(otherBoid.userData.pheremoneDist)) {
  //       near = true; 
  //       // If this already is within range of another pheremone
  //       if(boid.userData.nearestPherDist) {
  //         // If this pheremone is stronger, set it as nearest. 
  //         if(otherBoid.userData.pheremoneDist > boid.userData.nearestPherDist) {
  //           boid.userData.nearestPherDist = otherBoid.userData.pheremoneDist; 
  //           boid.userData.nearestPherPos = otherBoid.position; 
  //         }
  //       }
  //       else {
  //         boid.userData.nearestPherDist = otherBoid.userData.pheremoneDist; 
  //         boid.userData.nearestPherPos = otherBoid.position; 
  //       }
  //       boid.userData.pheremoneDist = boid.userData.nearestPherDist * 1; 
  //     }
  //   }
  //   if(!near) {
  //     boid.userData.pheremoneDist = undefined; 
  //     boid.userData.nearestPherDist = undefined;
  //     boid.userData.nearestPherPos = undefined; 
  //   }
  // })

  // boid.update(); 

  //     let pos, 
  //       dist,
  //       target,
  //       shouldWander, 
  //       senseDist = 50, 
  //       maxDist = 50;

  //     // Reset boid pheremones. 
  //     boidPool.map(boid => {
  //       boid.userData.pheremoneDist = 0; 
  //     })
            
  //     // If boids are within a food src, set their pheremone value to half that pheremone dist. 
  //     boidPool.map(boid => {
  //       shouldWander = true;
  //       senseDist = 50; 
        
  //       this.clickBuffer.map(pos => {
  //         dist = this.distance(boid.position, pos);
  //         if(dist < senseDist) {
  //           // boid.velocity.x = 0;
  //           // boid.velocity.y = 0;
  //           boid.flee(this.boidPoolController.getPos(pos.x, pos.y)).update();
  //           boid.userData.pheremoneDist = maxDist * 1 / ((dist / 80) + 1);
  //           shouldWander = false;
  //         }
  //         else if(dist < 100) {
  //           boid.seek(this.boidPoolController.getPos(pos.x, pos.y)).update();
  //           shouldWander = false;
  //         }
  //       });
  //       boidPool.map(otherBoid => {
  //         if(boid !== otherBoid && otherBoid.userData.pheremoneDist) {
  //           let posA = boid.position,
  //             posB = otherBoid.position;
  //           dist = this.distance(posA, posB); 
  //           let pherDist = otherBoid.userData.pheremoneDist; 
            
  //           if(dist < pherDist) {
  //             boid.flee(this.boidPoolController.getPos(posB.x, posB.y)).update();
  //             boid.userData.pheremoneDist = pherDist * 1 / ((dist / 80) + 1);
  //           } 
  //           else if(dist < pherDist * 2) {
  //             boid.seek(this.boidPoolController.getPos(posB.x, posB.y)).update();
  //           }
  //         }  
  //       });
  //       if(shouldWander) {
  //         boid.wander().update();
  //       };
  //     });
  //   }

  //   // Draw boid pheremone outlines
  //   boidPool.map(boid => {
  //     if(boid.userData.pheremoneDist) {
  //       ctx.beginPath();
  //       ctx.arc(boid.position.x, boid.position.y, boid.userData.pheremoneDist, 0, 2 * Math.PI);
  //       ctx.stroke();
  //     }
  //   });
}

function otherBoidDrawFn(ctx, boid) {
  // ctx.strokeStyle = 'yellow';
  // ctx.beginPath();
  // ctx.arc(boid.position.x, boid.position.y, 4, 0, 2 * Math.PI);
  // ctx.stroke();
}

function boidDrawFn(ctx, boid) {
  ctx.strokeRect(boid.position.x - 2, boid.position.y - 2, 4, 4);
  // if(boid.userData.pheremoneDist) {
  //   ctx.beginPath();
  //   ctx.stroke();
  // }
  if(boid.userData.nearestPherPos) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255, 0.5)';
    ctx.arc(boid.position.x, boid.position.y, boid.userData.pheremoneDist * 0.5, 0, 2 * Math.PI);
    ctx.moveTo(boid.position.x, boid.position.y);
    ctx.lineTo(boid.userData.nearestPherPos.x, boid.userData.nearestPherPos.y);
    ctx.stroke();
  }
}

