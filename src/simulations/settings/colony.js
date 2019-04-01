import Boid from 'boid';
import { clamp, strokeTriangle, CanvasTransition, squared } from '../../components/helperFunctions';

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
      cursorVisible: true,
      clearFrames: true, 
      color: 'white',
      // width: 4,
      // maxSpeed: 3,
      initFn: cursorBoidInitFn,
      updateFn: cursorUpdateFn,
      drawFn: cursorDrawFn,
      // initFn: cursorInitFn,
      clickFn: cursorClickFn,
    },
    boidSettings: {
      isVisible: true,
      clearFrames: false, 
      drawActiveBounds: true, 
      count: 50, 
      maxSpeed: 6,
      minDistance: 50, 
      maxDistance: 300, 
      strokeColor: 'black',
      strokeWidth: 2,
      initFn: boidInitFn,
      updateFn: boidUpdateFn,
      drawFn: boidDrawFn, 
      otherDrawFn: otherDrawFn, 
      // clickFn: boidClickFn,
      // otherBoidDrawFn: otherBoidDrawFn, 
      edgeBehavior: 'bounce',
    }
  }
}

function cursorBoidInitFn(boid) {
  boid.position.y = 0;
  boid.maxSpeed = 8;
  boid.velocity.x = 0;
  boid.velocity.y = 0;
  boid.maxForce = 10;
  boid.arriveThreshold = 20; 
}

function cursorClickFn({boid, bounds, drawBuffer}) {
  const ripple1 = new CanvasTransition({
    startValue: 0, 
    endValue: 100, 
    durationMs: 666, 
    fps: settingsFps, 
    position: {...boid.position},
    onStep: (per, ctx) => {
      let pos = {...boid.position}
      ctx.strokeStyle = `rgba(50, 50, 80, ${1 - per / 100})`;
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
      ctx.strokeStyle = `rgba(50, 50, 80, ${1 - per / 100})`;
      ctx.lineWidth = 1.5
      ctx.beginPath();
      ctx.arc(pos.x + 2, pos.y + 2, 25 * (per / 100), 0, 2 * Math.PI);
      ctx.stroke();
    }
  })
  drawBuffer.push(ripple1, ripple2);
}

function cursorUpdateFn({mousePos, bounds, boid}) {
  let center = bounds.width / 2; 
  let yPos = clamp(mousePos.y, bounds.height / 2 - 50);
  boid.position.x = center;
  boid.velocity.x = 0;
  boid.arrive(Boid.vec2(center, yPos)).update();
}

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

function boidInitFn(boidPool, bounds, otherBoidPool) {
  boidPool.map(boid => {
    boid.position.x = (Math.random() - 0.5) * 120 + (bounds.width / 4);
    boid.position.y = (bounds.height / 2) * Math.random() + bounds.height / 4;
  //   boid.velocity.x = 0.5;
  //   boid.velocity.y = 0.5;
  })
  
  let pointsDrawFn = function(ctx){
    // ctx.strokeStyle = 'white';
    // ctx.strokeRect(this.position.x, this.position.y, 1, 1);
    // ctx.beginPath();
    // ctx.arc(this.position.x, this.position.y, 300, 0, 2 * Math.PI);
    // ctx.stroke();
  }

  let points = [
    {position: {x: bounds.width / 5 * 0, y: bounds.height / 2}, step: pointsDrawFn, isDone: false},
    {position: {x: bounds.width / 2, y: bounds.height / 2}, step: pointsDrawFn, isDone: false},
    {position: {x: bounds.width / 5 * 5, y: bounds.height / 2}, step: pointsDrawFn, isDone: false},
    {position: {x: bounds.width / 2, y: bounds.height / 2}, step: pointsDrawFn, isDone: false},
  ]

  otherBoidPool.push(...points);
}

function boidDrawFn(ctx, boid) {
  strokeTriangle(ctx, boid.position, boid.velocity);
  // ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3);
  // ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
  // ctx.stroke();
}

// function otherBoidDrawFn(ctx, boid) {
//   ctx.strokeStyle = 'white';
//   ctx.beginPath();
//   ctx.arc(boid.position.x, boid.position.y, 200, 0, 2 * Math.PI);
//   ctx.stroke();
// }

function otherDrawFn(ctx, bounds) {
  // let obstacleA = Boid.obstacle(bounds.height / 2, bounds.width / 2, 0); 
  // let obstacleB = Boid.obstacle(bounds.height / 2, bounds.width / 2, bounds.height); 
  ctx.beginPath();
  ctx.arc(bounds.width / 2, 0, bounds.height / 3, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(bounds.width / 2, bounds.height, bounds.height / 3, 0, 2 * Math.PI);
  ctx.stroke();
}

function boidUpdateFn({boid, otherBoidPool, boidPool, chaser, bounds, center}) {
  let radius = bounds.height / 2.2;
  let obstacleA = {x: bounds.width / 2, y: 0}; 
  let obstacleB = {x: bounds.width / 2, y: bounds.height}; 
  let aDist = boid.position.distanceSq(obstacleA);
  let bDist = boid.position.distanceSq(obstacleB);

  let notInMiddle = Boolean(boid.position.x < (bounds.width / 8 * 3) || boid.position.x > (bounds.width / 8 * 5))
  
  // if(aDist < squared(radius)) {
  //   boid.seek(center);
  // }
  if(Math.round(Math.random() * 3) == 3) {
    boid.followPath(otherBoidPool.map(point => Boid.vec2(point.position.x, point.position.y)), false);
  } else {
  // } else if(notInMiddle || Math.round(Math.random() * 2) == 2) {
    boid.flock(boidPool);
  }
  if(aDist < squared(radius) || bDist < squared(radius)) {
    boid.seek(center);
  }
  boid.update();
}

