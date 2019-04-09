import Boid from 'boid';
import { squared, min } from '../../components/helperFunctions';

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
      drawActiveBounds: false,
      color: 'black',
      fillColor: 'black',
      strokeWidth: 6,
      maxSpeed: 3,
      initFn: cursorBoidInitFn,
      updateFn: cursorUpdateFn,
      drawFn: cursorDrawFn,
      // cursorPos: bounds => {return {x: bounds.width / 2, y: bounds.height / 2}}
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
      stroke: false, 
      fillColor: 'white',
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
  // ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3);
  // ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
  ctx.beginPath();
  ctx.ellipse(
    boid.position.x, 
    boid.position.y, 
    2, 
    1 + Math.abs(2 * boid.velocity.y), 
    boid.velocity.angle + Math.PI / 2, 
    0, 
    2 * Math.PI);
  ctx.fill();
}

/**
 * 
 * Cursor Boid Initialization Function
 * 
 */
function cursorBoidInitFn(boid, bounds) {
  boid.arriveThreshold = 200; 
  boid.position.x = bounds.width / 2;
  boid.position.y = bounds.height / 2;
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
  let vX = boid.velocity.x * 3;
  let vY = boid.velocity.y * 3;
  ctx.moveTo(boid.position.x - vX, boid.position.y - vY)
  ctx.lineTo(boid.position.x + vX, boid.position.y + vY);
  ctx.stroke()
  // ctx.fillStyle = 'black';
  // ctx.beginPath();
  // ctx.ellipse(
  //   boid.position.x, 
  //   boid.position.y, 
  //   5, 
  //   2 + Math.abs(3 * boid.velocity.length), 
  //   boid.velocity.angle + Math.PI / 2, 
  //   0, 
  //   2 * Math.PI);
  // ctx.fill();
}
