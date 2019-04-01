//////////////////////////////////////////////////
//
// Default Simulation Settings
//
//////////////////////////////////////////////////

export default {
  rafSettings: {
    fps: 60,
  },
  simulationSettings: {
    simulationType: 'traffic',
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: true,
      clearFrames: true, 
      color: 'black',
      width: 4,
      onClick: _ => {

      },
      ripple: false, 
    },
    boidSettings: {
      isVisible: true,
      clearFrames: true, 
      drawActiveBounds: false, 
      count: 50, 
      minSpeed: 2, 
      maxSpeed: 5,
      shape: 'line',
      color: 'white',
      strokeWidth: 2,
      drawFn: (ctx, boid) => {
        ctx.strokeRect(boid.position.x, boid.position.y, 5, 5);
      },
    }
  }
}
