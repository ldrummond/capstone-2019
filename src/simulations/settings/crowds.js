
//////////////////////////////////////////////////
//
// Crowd Simulation Settings
//
//////////////////////////////////////////////////

let boidDrawFn = (ctx, boid) => {
  ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3);
  ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
}

export default {
  rafSettings: {fps: 60},
  simulationSettings: {
    simulationType: 'crowd',
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: true,
      clearFrames: false, 
      color: 'white',
      width: 1,
      maxSpeed: 1,
    },
    boidSettings: {
      isVisible: true,
      clearFrames: false, 
      drawActiveBounds: false, 
      count: 30, 
      minDistance: 50,
      maxSpeed: 3,
      maxDistance: 100,
      avoidDistance: undefined, 
      strokeColor: 'white',
      width: undefined,
      drawFn: boidDrawFn, 
    }
  }
}    