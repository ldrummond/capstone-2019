import Boid from 'boid';
import { CanvasTransition, clamp } from '../../components/helperFunctions';

//////////////////////////////////////////////////
//
// Traffic Settings
//
//////////////////////////////////////////////////

const settingsFps = 40; 

export default {
  rafSettings: {fps: settingsFps},
  simulationSettings: {
    simulationType: 'traffic',
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: true,
      clearFrames: true, 
      strokeWidth: 4,
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
      count: 72, 
      minDistance: 80,
      maxSpeed: 2,
      maxDistance: 200,
      arriveThreshold: 60,
      strokeWidth: 0.8, 
      strokeColor: 'white',
      edgeBehavior: 'wrap',
      clickFn: boidClickFn,
      initFn: boidInitFn,
      updateFn: boidUpdateFn, 
      drawFn: boidDrawFn, 
    }
  }
}

/**
 * 
 * Simulation Specific Data
 */
let lanes = 6;
let laneWidth = 60; 
let lanesTotal = lanes * laneWidth; 
function getClosestLane(pos, lanes, laneWidth, totalWidth) {
  let center = totalWidth / 2; 
  let closestLaneX = center - (lanesTotal / 2) + (lanes) * laneWidth; 
  let laneX; 
  for (let i = 1; i <= lanes; i++) {
    laneX = center - (lanesTotal / 2) + i * laneWidth;
    if(Math.abs(laneX - pos.x) < Math.abs(closestLaneX - pos.x)) {
      closestLaneX = laneX; 
    }
  }
  return closestLaneX;
}

/**
 * 
 * Cursor Click Function
 */
function cursorClickFn({boid, drawBuffer}) {
  const ripple = new CanvasTransition({
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
      ctx.arc(pos.x, pos.y, 25 * (per / 100), 0, 2 * Math.PI);
      ctx.stroke();
    }
  })
  drawBuffer.push(ripple);
}

/**
 * 
 * Cursor Boid Initializaion Function
 */
function cursorBoidInitFn(boid) {
  boid.velocity.x = 0;
  boid.velocity.y = 0;
  boid.maxForce = 10;
}

/**
 * 
 * Cursor Boid Update Function
 */
function cursorBoidUpdateFn({mousePos, boid, bounds}) {
  let closestLaneX = getClosestLane(mousePos, lanes, laneWidth, bounds.width);
  if(Math.abs(mousePos.x - closestLaneX) > (bounds.width / 5)) {
    boid.position.x = -20;
  }
  else {
    boid.position.x = closestLaneX + 2;
    boid.velocity.x = 0;
    boid.arrive(Boid.vec2(closestLaneX, mousePos.y)).update();
  }
}

/**
 * 
 * Cursor Boid Draw Function
 */
function cursorBoidDrawFn(ctx, boid, bounds) {
  // ctx.arc(boid.position.x, boid.position.y, 4, 0, 2 * Math.PI);
  // ctx.fill();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.arc(boid.position.x, boid.position.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}

/**
 * 
 * All Boids Initializaion Function
 */
function boidInitFn(boidPool, bounds) {
  let center = bounds.width / 2;
  let heightUnit = bounds.height / boidPool.length;
  // let heightUnit = bounds.height / (Math.floor(boidPool.length / lanes));

  boidPool.map((boid, i) => {
    let x = (i % lanes + 1); 
    // let y = (Math.floor(i / lanes)); 
    boid.position.x = center - (lanesTotal / 2) + x * laneWidth;
    // boid.position.y = (y) * heightUnit; 
    boid.position.y = i * heightUnit; // (y + 1) * (this.height / (lanes + 2)); 
    boid.velocity.x = 0; 
    boid.velocity.y = 2;
    boid.mass = 1;
    boid.maxForce = 0.1;
  })
}

/**
 * 
 * All Boids Update Function
 */
function boidUpdateFn({boid, boidPool, otherBoidPool, chaser, bounds, center}) {
  let allBoids = boidPool; 
  if(otherBoidPool.length > 0) {
    allBoids = [...boidPool, ...otherBoidPool];
  } 
  let pos = boid.position, 
    // otherPos,
    xDiff;
    // yDiff;

  let laneBoids = allBoids.filter(otherBoid => {
    if(otherBoid !== boid) {
      xDiff = otherBoid.position.x - pos.x;
      if(Math.abs(xDiff) < 10) {
        return boid; 
      } 
    }
  })

  let aheadBoids = laneBoids.filter(otherBoid => {
    if(otherBoid.position.y > pos.y) {
      return boid; 
    }
  })

  let closestBoid,
    closestDist = 100000;

  if(aheadBoids.length === 0) {
    laneBoids.map(otherBoid => {
      if(otherBoid.position.y < closestDist) {
        closestDist = otherBoid.position.y;
        closestBoid = otherBoid; 
      }
    })
    if(closestBoid) {
      closestBoid = {position: {x: closestBoid.position.x, y: closestBoid.position.y + bounds.height}}
    }
  } 
  else {
    aheadBoids.map(otherBoid => {
      if(Math.abs(otherBoid.position.y - pos.y) < closestDist) {
        closestDist = otherBoid.position.y - pos.y;
        closestBoid = otherBoid; 
      }
    })
  }

  // Sight distance
  if(closestBoid && (closestBoid.position.y - pos.y) < 120) {
    // boid.velocity.y = clamp(boid.velocity.y - 0.05, 0.05);
    // boid.velocity.y = clamp(boid.velocity.y /= 1.02, boid.maxSpeed);
    boid.arrive(Boid.vec2(closestBoid.position.x, closestBoid.position.y));
  } else {
    boid.velocity.y = clamp(boid.velocity.y *= 1.05, boid.maxSpeed);
  }
  boid.velocity.x = 0;
  // boid.velocity.y = clamp(boid.velocity.y *= 1.02, boid.maxSpeed);
  boid.update(); 
}

/**
 * 
 * All Boids Click Function
 */
function boidClickFn(mousePos, boidPool, otherBoidPool, bounds) {
  let closestLaneX = getClosestLane(mousePos, lanes, laneWidth, bounds.width);
  
  const obstacle = new CanvasTransition({
    startValue: 0, 
    endValue: 100, 
    durationMs: 4000, 
    fps: settingsFps, 
    position: {x: closestLaneX, y: mousePos.y},
    onStep: (per, ctx) => {
      let radius = 30; 

      ctx.fillStyle = `rgba(0, 0, 0, ${0.8 - per / 80})`;
      ctx.lineWidth = 1.5
      ctx.beginPath();
      ctx.arc(closestLaneX + 2, mousePos.y + 2, radius * (per / 60), 0, 2 * Math.PI);
      ctx.fill();
      if(per >= 20) {
        ctx.fillStyle = `rgba(0, 0, 0, ${0.8 - ((per - 20) / 80)})`;
        ctx.beginPath();
        ctx.arc(closestLaneX + 2, mousePos.y + 2, radius * ((per - 20) / 80), 0, 2 * Math.PI);
        ctx.fill();
      }
      if(per >= 40) {
        ctx.fillStyle = `rgba(0, 0, 0, ${0.8 - ((per - 40) / 80)})`;
        ctx.beginPath();
        ctx.arc(closestLaneX + 2, mousePos.y + 2, radius * ((per - 40) / 100), 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  })
  otherBoidPool.push(obstacle);
}

const carWidth = 6,
  carHeight = 12; 

/**
 * 
 * All Boids Draw Function
 */
function boidDrawFn(ctx, boid) {
  ctx.strokeRect(boid.position.x, boid.position.y, carWidth, carHeight);
}


