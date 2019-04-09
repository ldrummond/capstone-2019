import Boid from 'boid';
import { CanvasTransition, squared, min, clamp } from '../../components/helperFunctions';

//////////////////////////////////////////////////
//
// Colony Simulation Settings
//
//////////////////////////////////////////////////

const settingsFps = 60;

export default {
  rafSettings: {fps: settingsFps},
  simulationSettings: {
    simulationType: 'colony',
    cursorBoidSettings: {
      isVisible: true,
      clearFrames: true, 
      drawActiveBounds: false,
      color: 'white',
      initFn: cursorBoidInitFn,
      updateFn: cursorUpdateFn,
      drawFn: cursorDrawFn,
      clickFn: cursorClickFn,
    },
    boidSettings: {
      isVisible: true,
      clearFrames: true, 
      drawActiveBounds: false, 
      count: 50, 
      maxSpeed: 5,
      minDistance: 50, 
      maxDistance: 300, 
      // stroke: true,
      strokeColor: 'black',
      strokeWidth: 1,
      initFn: boidInitFn,
      updateFn: boidUpdateFn,
      drawFn: boidDrawFn, 
      edgeBehavior: 'bounce',
    }
  }
}

/**
 * 
 *  Cursor Boid Initialization Function
 * 
 */
function cursorBoidInitFn(boid) {
  boid.position.y = 0;
  boid.maxSpeed = 8;
  boid.velocity.x = 0;
  boid.velocity.y = 0;
  boid.maxForce = 10;
  boid.arriveThreshold = 20; 
}

/**
 * 
 *  Cursor Boid OnClick Function
 * 
 */
function cursorClickFn({mousePos, boid, bounds, drawBuffer, caveContainer}) {
  const ripple1 = new CanvasTransition({
    startValue: 0, 
    endValue: 100, 
    durationMs: 666, 
    fps: settingsFps, 
    position: {...boid.position},
    onStep: (per, ctx) => {
      let pos = {...boid.position}
      ctx.strokeStyle = `rgba(0, 0, 0, ${1 - per / 100})`;
      ctx.lineWidth = 1.5
      ctx.beginPath();
      ctx.arc(pos.x + 2, bounds.height - pos.y + 2, 25 * (per / 100), 0, 2 * Math.PI);
      ctx.stroke();
    }
  })
  const ripple2 = new CanvasTransition({
    startValue: 0, 
    endValue: 100, 
    durationMs: 666, 
    fps: settingsFps, 
    position: {...boid.position},
    onStep: (per, ctx) => {
      let pos = {...boid.position}
      ctx.strokeStyle = `rgba(0, 0, 80, ${1 - per / 100})`;
      ctx.lineWidth = 1.5
      ctx.beginPath();
      ctx.arc(pos.x + 2, pos.y + 2, 25 * (per / 100), 0, 2 * Math.PI);
      ctx.stroke();
    }
  })
  drawBuffer.push(ripple1, ripple2);

  // Finds the scale factor by which to adjust the graphic to match the mousepos. 
  let yTranslate = (mousePos.y - bounds.height / 2);
  let minTranslate = min(Math.abs(yTranslate), 50);

  let yPos = clamp(mousePos.y, bounds.height / 2 - 50);
  let heightRange = bounds.height / 2 - 50; 
  let heightScale = yPos / heightRange;
  let adjustedScale = ((1 - Math.round(heightScale * 100)) + 100);
  if(caveContainer) {
    let caveTop = caveContainer.children[0]; 
    let caveBottom = caveContainer.children[1]; 
    if(caveTop) {caveTop.style.transform = `translateY(${-minTranslate}px)`};
    if(caveBottom) {caveBottom.style.transform = `translateY(${minTranslate}px)`};
    bounds.obstacleScale = adjustedScale * 0.8; // Stores scale in bounds so boids can read on update. 
  }
}

/**
 * 
 *  Cursor Boid Update Function
 * 
 */
function cursorUpdateFn({mousePos, bounds, boid}) {
  let center = bounds.width / 2; 
  let yPos = clamp(mousePos.y, bounds.height / 2 - 50);
  boid.position.x = center;
  boid.velocity.x = 0;
  boid.arrive(Boid.vec2(center, yPos)).update();
}

/**
 * 
 *  Cursor Boid Draw Function
 * 
 */
function cursorDrawFn(ctx, boid, bounds) {
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(boid.position.x - 20, boid.position.y);
  ctx.lineTo(boid.position.x + 20, boid.position.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(boid.position.x - 20, bounds.height - boid.position.y);
  ctx.lineTo(boid.position.x + 20, bounds.height - boid.position.y);
  ctx.stroke();
}

/**
 * 
 *  All Boids Initialization Function
 * 
 */
function boidInitFn(boidPool, bounds, otherBoidPool) {
  boidPool.map(boid => {
    boid.position.x = (Math.random() - 0.5) * 120 + (bounds.width / 4);
    boid.position.y = (bounds.height / 2) * Math.random() + bounds.height / 4;
  })

  let points = [
    {position: {x: bounds.width / 5 * 0, y: bounds.height / 2}, step: _ => {}, isDone: false},
    {position: {x: bounds.width / 2, y: bounds.height / 2}, step: _ => {}, isDone: false},
    {position: {x: bounds.width / 5 * 5, y: bounds.height / 2}, step: _ => {}, isDone: false},
    {position: {x: bounds.width / 2, y: bounds.height / 2}, step: _ => {}, isDone: false},
  ]
  otherBoidPool.push(...points);
}

/**
 * 
 *  All Boids Draw Function
 * 
 */
function boidDrawFn(ctx, boid) {
  let pos = boid.position,
  velocity = boid.velocity,
  magnitude = 3; 
  
  let p1 = {
    x: pos.x + velocity.y * magnitude / 3,
    y: pos.y + velocity.x * magnitude / 3
  }
  
  let p2 = {
    x: pos.x + velocity.x * magnitude,
    y: pos.y + velocity.y * magnitude
  }
  
  let p3 = {
    x: pos.x - velocity.y * magnitude / 3,
    y: pos.y - velocity.x * magnitude / 3
  }
  
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.stroke();
}


// /**
//  * 
//  *  All Boids Update Function
//  * 
//  */
// function boidUpdateFn({boidPool, otherBoidPool, bounds, activeBounds}) {
//   let radius = bounds.height / 2.1
//   if(bounds.obstacleScale) {
//     radius = bounds.height / 2 - (bounds.height / 2) * (bounds.obstacleScale / 100)
//   }
//   let obstacleA = {x: bounds.width / 2, y: 0}; 
//   let obstacleB = {x: bounds.width / 2, y: bounds.height}; 
//   let aDist, bDist; 

//   boidPool.map(boid => {
//     aDist = boid.position.distanceSq(obstacleA);
//     bDist = boid.position.distanceSq(obstacleB);

//     if(aDist < squared(radius)) {
//       boid.flee(Boid.vec2(obstacleA.x, obstacleA.y));
//     } else if(bDist < squared(radius)) {
//       boid.flee(Boid.vec2(obstacleB.x, obstacleB.y));
//     }
//     else if(Math.round(Math.random() * 3) === 3) {
//       boid.followPath(otherBoidPool.map(point => Boid.vec2(point.position.x, point.position.y)), false);
//     } else {
//       boid.flock(boidPool);
//     }
//     boid.update();
//     activeBounds.update(boid.position);
//   })
// }


/**
 * 
 *  All Boids Update Function
 * 
 */
function boidUpdateFn({boid, otherBoidPool, boidPool, chaser, bounds, center}) {
  let radius = bounds.height / 2.1
  if(bounds.obstacleScale) {
    radius = bounds.height / 2 - (bounds.height / 2) * (bounds.obstacleScale / 100)
  }
  let obstacleA = {x: bounds.width / 2, y: 0}; 
  let obstacleB = {x: bounds.width / 2, y: bounds.height}; 
  let aDist = boid.position.distanceSq(obstacleA);
  let bDist = boid.position.distanceSq(obstacleB);

  if(aDist < squared(radius)) {
    boid.flee(Boid.vec2(obstacleA.x, obstacleA.y));
  } else if(bDist < squared(radius)) {
    boid.flee(Boid.vec2(obstacleB.x, obstacleB.y));
  }
  else if(Math.round(Math.random() * 3) === 3) {
    boid.followPath(otherBoidPool.map(point => Boid.vec2(point.position.x, point.position.y)), false);
  } else {
    boid.flock(boidPool);
  }
  boid.update();
}

