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
    boidSettings: {
      isVisible: true,
      clearFrames: true, 
      drawActiveBounds: false, 
      count: 50, 
      maxSpeed: 1.5,
      // stroke: false,
      // strokeColor: 'white',
      strokeWidth: 6,
      mass: 2,
      maxForce: 50,
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
    {position: {x: bounds.width / 4 * 1, y: bounds.height / 3 * 1}, step: _ => {}, isDone: false},
    {position: {x: bounds.width / 4 * 3, y: bounds.height / 3 * 1}, step: _ => {}, isDone: false},
    {position: {x: bounds.width / 4 * 3, y: bounds.height / 3 * 2}, step: _ => {}, isDone: false},
    {position: {x: bounds.width / 4 * 1, y: bounds.height / 3 * 2}, step: _ => {}, isDone: false},
  ]

  boidPool.map((boid, i) => {
    // boid.position.x = (Math.random() - 0.5) * 120 + (bounds.width / 4);
    // boid.position.y = (bounds.height / 2) * Math.random() + bounds.height / 4;
    if(i % 2 === 0) {
      boid.position.x = points[0].position.x + (Math.random() - 0.6) * 100; 
      boid.position.y = points[0].position.y + (Math.random() - 0.5) * 30;
      boid.followPath(points.map(point => Boid.vec2(point.position.x, point.position.y)), true); 
      boid.userData.movingClockwise = true;
    } else {
      boid.position.x = points[3].position.x + (Math.random() - 0.6) * 100;
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
  boidPool.map(otherBoid => {
    if(otherBoid !== boid) {
      if(otherBoid.position.distanceSq(boid.position) < squared(17)) {
        boid.flee(otherBoid.position); 
      }
    }
  })

  if(boid.userData.movingClockwise) {
    boid.followPath(otherBoidPool.map(point => Boid.vec2(point.position.x, point.position.y)), true);
  } else {
    boid.followPath(otherBoidPool.map(point => Boid.vec2(point.position.x, point.position.y)).reverse(), true);
  }
  boid.update();
}

let magnitude = 3;

/**
 * 
 * Boids Draw Function
 */
function boidDrawFn(ctx, boid) {

  ctx.beginPath();
  // if(boid.userData.movingClockwise) {
  //   ctx.fillStyle = '#555';
  // }
  // else {
  //   ctx.fillStyle = '#eee';
  // }
  if(boid.userData.movingClockwise) {
    ctx.strokeStyle = '#eee';
  }
  else {
    ctx.strokeStyle = '#555';
  }
  // // ctx.strokeRect(boid.position.x, boid.position.y, 5, 5);
  ctx.moveTo(boid.position.x - boid.velocity.x * magnitude, boid.position.y - boid.velocity.y * magnitude);
  ctx.lineTo(boid.position.x + boid.velocity.x * magnitude, boid.position.y + boid.velocity.y * magnitude);
  // ctx.ellipse(
  //   boid.position.x, 
  //   boid.position.y, 
  //   4, 
  //   4, 
  //   boid.velocity.angle + Math.PI / 2, 
  //   0, 
  //   2 * Math.PI);
  ctx.stroke();
  // ctx.fill();
}