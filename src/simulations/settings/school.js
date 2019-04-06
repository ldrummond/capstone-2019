import Boid from 'boid';
import { squared } from '../../components/helperFunctions';

//////////////////////////////////////////////////
//
// School Simulation Settings
//
//////////////////////////////////////////////////

export default {
  rafSettings: {fps: 60},
  simulationSettings: {
    simulationType: 'school',
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: true,
      clearFrames: true, 
      color: 'black',
      strokeWidth: 4,
      maxSpeed: 3,
      initFn: cursorBoidInitFn,
      updateFn: cursorUpdateFn,
      drawFn: cursorDrawFn,
    },
    boidSettings: {
      isVisible: true,
      clearFrames: true, 
      drawActiveBounds: false, 
      count: 50, 
      minDistance: 30,
      maxSpeed: 3,
      maxDistance: 80,
      avoidDistance: 80, 
      shape: 'line',
      stroke: true, 
      strokeColor: 'white',
      strokeWidth: 2,
      initFn: boidInitFn,
      updateFn: boidUpdateFn,
      drawFn: boidDrawFn, 
    }
  }
}

/**
 * 
 * Boid Initialization Function
 * 
 */
function boidInitFn(boidPool, bounds) {
  boidPool.map(boid => {
    boid.position.x = (bounds.width / 2) * Math.random() + bounds.width / 4;
    boid.position.y = (bounds.height / 2) * Math.random() + bounds.height / 4;
  })
}

/**
 * 
 * Boid Update Function
 * 
 */
function boidUpdateFn({boid, boidPool, chaser, bounds, center}) {
  if(boid.position.distanceSq(chaser) < squared(50)) {
    boid.flee(chaser).update();
  } else if(boid.position.distanceSq(center) > squared(bounds.width * 0.3)) {
    boid.seek(center).update();
  } else {
    boid.flock(boidPool).update();
  }
}

/**
 * 
 * Boid Draw Function
 * 
 */
function boidDrawFn(ctx, boid) {
  ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3);
  ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
}

/**
 * 
 * Cursor Boid Initialization Function
 * 
 */
function cursorBoidInitFn(boid) {
  boid.arriveThreshold = 200; 
}

/**
 * 
 * Cursor Boid Update Function
 * 
 */
function cursorUpdateFn({mousePos, boid}) {
  if(boid.position.distanceSq(mousePos) < squared(20)) {
    boid.velocity.x *= 0.9;
    boid.velocity.y *= 0.9;
    boid.update();
  } else {
    boid.seek(Boid.vec2(mousePos.x, mousePos.y)).update();   
  }
}


/**
 * 
 * Cursor Boid Draw Function
 * 
 */
function cursorDrawFn(ctx, boid) {
  ctx.beginPath();
  ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3)
  ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
  ctx.stroke()
}
