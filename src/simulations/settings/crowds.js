import Boid from 'boid';
import { CanvasTransition, squared } from '../../components/helperFunctions';

//////////////////////////////////////////////////
//
// Crowd Simulation Settings
//
//////////////////////////////////////////////////

let settingsFps = 40;

export default {
  rafSettings: {fps: settingsFps},
  simulationSettings: {
    simulationType: 'crowds',
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: true,
      clearFrames: true, 
      width: 6,
      maxSpeed: 3,
      // clickFn: cursorClickFn,
      // initFn: cursorBoidInitFn,
      // updateFn: cursorBoidUpdateFn, 
      // drawFn: cursorBoidDrawFn,
    },
    boidSettings: {
      isVisible: true,
      clearFrames: true, 
      drawActiveBounds: false, 
      count: 20, 
      maxSpeed: 1.5,
      stroke: false,
      // strokeColor: 'white',
      strokeWidth: 1,
      mass: 2,
      maxForce: 50,
      minDistance: 25,
      maxDistance: 25,
      avoidDistance: 80, 
      arriveThreshold: 80,
      initFn: boidInitFn,
      updateFn: boidUpdateFn,
      drawFn: boidDrawFn, 
    }
  }
}  

/**
 * 
 *  All Boids Initialization Function
 * 
 */
function boidInitFn(boidPool, bounds, otherBoidPool) {
  let points = [
    {position: {x: bounds.width / 3 * 1, y: bounds.height / 3 * 1}, step: _ => {}, isDone: false},
    {position: {x: bounds.width / 3 * 2, y: bounds.height / 3 * 1}, step: _ => {}, isDone: false},
    {position: {x: bounds.width / 3 * 2, y: bounds.height / 3 * 2}, step: _ => {}, isDone: false},
    {position: {x: bounds.width / 3 * 1, y: bounds.height / 3 * 2}, step: _ => {}, isDone: false},
  ]

  boidPool.map((boid, i) => {
    // boid.position.x = (Math.random() - 0.5) * 120 + (bounds.width / 4);
    // boid.position.y = (bounds.height / 2) * Math.random() + bounds.height / 4;
    if(i % 2 === 0) {
      boid.position.x = points[0].position.x + (Math.random() - 0.5) * 30; 
      boid.position.y = points[0].position.y + (Math.random() - 0.5) * 30;
      boid.followPath(points.map(point => Boid.vec2(point.position.x, point.position.y)), true); 
      boid.userData.movingClockwise = true;
    } else {
      boid.position.x = points[3].position.x + (Math.random() - 0.5) * 30;
      boid.position.y = points[3].position.y + (Math.random() - 0.5) * 30;
      boid.followPath(points.map(point => Boid.vec2(point.position.x, point.position.y)).reverse(), true);
      boid.userData.movingClockwise = false;
    }
  })

  otherBoidPool.push(...points);
}

/**
 * 
 * Boid Update Function
 * 
 */
function boidUpdateFn({boid, boidPool, otherBoidPool, chaser, bounds, center}) {
  let aBoids = boidPool.filter(boid => boid.userData.movingClockwise),
      bBoids = boidPool.filter(boid => !boid.userData.movingClockwise);


  // Keep boids in the crosswalks
  let 
    xLeft = otherBoidPool[0].position.x,
    xRight = otherBoidPool[1].position.x,
    yTop = otherBoidPool[0].position.y,
    yBottom = otherBoidPool[3].position.y,
    laneWidth = 10,
    pos = boid.position; 

  // // Inside center rect
  // if(
  //   pos.x < (xRight - laneWidth) && 
  //   pos.x > (xLeft + laneWidth) &&
  //   pos.y < (yBottom - laneWidth) &&
  //   pos.y > (yTop + laneWidth)
  // ) {
  //   boid.velocity.x = 0;
  //   boid.velocity.y = 0;
  //   boid.flee(Boid.vec2(center.x, center.y));
  // }

  // if(
  //   pos.x > (xRight + laneWidth) || 
  //   pos.x < (xLeft - laneWidth) ||
  //   pos.y > (yBottom + laneWidth) ||
  //   pos.y < (yTop - laneWidth) 
  // ) {
  //   boid.velocity.x = 0;
  //   boid.velocity.y = 0;
  //   boid.seek(Boid.vec2(center.x, center.y));
  // }
   
  boidPool.map(otherBoid => {
    if(otherBoid !== boid) {
      if(otherBoid.position.distanceSq(boid.position) < squared(14)) {
        boid.flee(otherBoid.position); 
      }
    }
  })

  if(boid.userData.movingClockwise) {
    // boid.followPath([otherBoidPool[0], otherBoidPool[2]].map(point => Boid.vec2(point.position.x, point.position.y)), true);
    boid.followPath(otherBoidPool.map(point => Boid.vec2(point.position.x, point.position.y)), true);
  } else {
    // boid.followPath([otherBoidPool[1], otherBoidPool[3]].map(point => Boid.vec2(point.position.x, point.position.y)), true);
    // boid.followPath(otherBoidPool.map(point => Boid.vec2(point.position.x, point.position.y)).reverse(), true);
    boid.followPath(otherBoidPool.map(point => Boid.vec2(point.position.x, point.position.y)).reverse(), true);
  }
  boid.update();
}

/**
 * 
 * Boids Draw Function
 */
function boidDrawFn(ctx, boid) {

  ctx.beginPath();
  if(boid.userData.movingClockwise) {
    ctx.strokeStyle = 'black';
  }
  else {
    ctx.strokeStyle = 'white';
  }
  // // ctx.strokeRect(boid.position.x, boid.position.y, 5, 5);
  // ctx.moveTo(boid.position.x - boid.velocity.x * 4, boid.position.y - boid.velocity.y * 4);
  // ctx.lineTo(boid.position.x + boid.velocity.x * 4, boid.position.y + boid.velocity.y * 4);
  ctx.ellipse(
    boid.position.x, 
    boid.position.y, 
    4, 
    4, 
    boid.velocity.angle + Math.PI / 2, 
    0, 
    2 * Math.PI);
  ctx.stroke();
  // ctx.stroke();
}