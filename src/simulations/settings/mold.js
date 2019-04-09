import Boid from 'boid';
import { CanvasTransition, squared } from '../../components/helperFunctions';

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
      width: 4,
      maxSpeed: 30,
      clickFn: cursorClickFn,
      initFn: cursorBoidInitFn,
      updateFn: cursorBoidUpdateFn, 
      drawFn: cursorBoidDrawFn,
    },
    boidSettings: {
      isVisible: true,
      clearFrames: true, 
      drawActiveBounds: false, 
      count: 100, 
      maxSpeed: 1,
      minDistance: 50, 
      maxDistance: 200, 
      strokeColor: 'white',
      strokeWidth: 1,
      arriveThreshold: 80,
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
 * Cursor Boid Initializaion Function
 */
function cursorBoidInitFn(boid) {
  boid.maxSpeed = 30;
  boid.velocity.x = 0;
  boid.velocity.y = 0;
  boid.maxForce = 10;
}

/**
 * 
 * Cursor Boid Update Function
 */
function cursorBoidUpdateFn({mousePos, boid, bounds}) {
  boid.position.x = boid.position.x + ((mousePos.x - boid.position.x) / 1.5);
  boid.position.y = boid.position.y + ((mousePos.y - boid.position.y) / 1.5);
}

/**
 * 
 * Cursor Boid Draw Function
 */
function cursorBoidDrawFn(ctx, boid, bounds) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.arc(boid.position.x, boid.position.y, 6, 0, 2 * Math.PI);
  ctx.fill();
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
      ctx.lineWidth = 1
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
  foodBoid.userData.pheremoneDist = 45;
  foodBoid.userData.step = ctx => {
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.arc(mousePos.x, mousePos.y, 30, 0, 2 * Math.PI);
    ctx.stroke();
  }

  if(otherBoidPool.length >= 5) {
    otherBoidPool.shift();
  } 
  otherBoidPool.push(foodBoid);
}

/**
 * 
 *  Boid Update Function
 * 
 */
function boidUpdateFn({boid, otherBoidPool, boidPool, chaser, bounds, center}) {
  let close = false; 

  // if(Math.round(Math.random() * 200) === 1) {
  //   boid.position.x = Math.round(Math.random() * bounds.width); 
  //   boid.position.y = Math.round(Math.random() * bounds.height); 
  // }
  if(otherBoidPool.length > 0) {
    boid.userData.neighborPos = []; 
    // Seek food within 100px range
    otherBoidPool
      .filter(foodBoid => boid.position.distanceSq(foodBoid.position) < squared(foodBoid.userData.pheremoneDist * 1.2))
      .map(foodBoid => {
        if(boid.position.distanceSq(foodBoid.position) < squared(foodBoid.userData.pheremoneDist)) {
          boid.flee(Boid.vec2(foodBoid.position.x, foodBoid.position.y));
          boid.userData.pheremoneDist = foodBoid.userData.pheremoneDist * .9;
          boid.userData.neighborPos.push(foodBoid.position);
          close = true; 
        } else {
          boid.seek(Boid.vec2(foodBoid.position.x, foodBoid.position.y));  
        }
      });

    boidPool
      .filter(otherBoid => otherBoid.userData.pheremoneDist > 0)
      .filter(otherBoid => boid.position.distanceSq(otherBoid.position) < squared(otherBoid.userData.pheremoneDist * 1.2))
      .map(otherBoid => {
        if(otherBoid !== boid) {
          if(boid.position.distanceSq(otherBoid.position) < squared(otherBoid.userData.pheremoneDist)) {
            boid.flee(Boid.vec2(otherBoid.position.x, otherBoid.position.y)); 
            boid.userData.pheremoneDist = otherBoid.userData.pheremoneDist * .9;
            boid.userData.neighborPos.push(otherBoid.position);
            close = true; 
          } else {
            boid.seek(Boid.vec2(otherBoid.position.x, otherBoid.position.y));
          }
        }
      });

    if(!close) {
      boid.userData.pheremoneDist = 0; 
    }
  } else {
    boid.wander();
  }

  boid.update();
}

function otherBoidDrawFn(ctx, boid) {
  // ctx.strokeStyle = 'yellow';
  // ctx.beginPath();
  // ctx.arc(boid.position.x, boid.position.y, 4, 0, 2 * Math.PI);
  // ctx.stroke();
}

function boidDrawFn(ctx, boid) {
  ctx.strokeRect(boid.position.x - 2, boid.position.y - 2, 4, 4);
  // window.cout(300, boid.userData)
  if(boid.userData.pheremoneDist > 0) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255, 0.05)';
    ctx.arc(boid.position.x, boid.position.y, boid.userData.pheremoneDist * 0.5, 0, 2 * Math.PI);
    ctx.fill();
  }
  // boid.userData.neighborPos && boid.userData.neighborPos.map(pos => {
  //   ctx.beginPath();
  //   ctx.strokeStyle = 'rgba(255,255,255, 0.5)';
  //   ctx.moveTo(boid.position.x, boid.position.y);
  //   ctx.lineTo(pos.x, pos.y);
  //   ctx.stroke();
  // })
  // if(boid.userData.neighborPos) {
  //   bo
  //   // ctx.beginPath();
  //   // ctx.strokeStyle = 'rgba(255,255,255, 0.5)';
  //   // ctx.arc(boid.position.x, boid.position.y, boid.userData.pheremoneDist * 0.5, 0, 2 * Math.PI);
  //   // ctx.moveTo(boid.position.x, boid.position.y);
  //   // ctx.lineTo(boid.userData.nearestPherPos.x, boid.userData.nearestPherPos.y);
  //   // ctx.stroke();
  // }
}

