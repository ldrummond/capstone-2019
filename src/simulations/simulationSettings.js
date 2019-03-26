
//////////////////////////////////////////////////
//
// Simulation Settings
//
//////////////////////////////////////////////////

// let rotation = boid.velocity.angle + Math.PI / 2
    // console.log(rotation)
    // ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3)
    // ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
    // ctx.strokeRect(boid.position.x, boid.position.y, 10, 10);

let trafficBoidDrawFn = (ctx, boid) => {
  ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3);
  ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
}

let colonyBoidDrawFn = (ctx, boid) => {
  ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3);
  ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
}

let schoolBoidDrawFn = (ctx, boid) => {
  ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3);
  ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
}

let crowdBoidDrawFn = (ctx, boid) => {
  ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3);
  ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
}

let moldBoidDrawFn = (ctx, boid) => {
  ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3);
  ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
}


// Simulation settings
export const defaultSettings = {
  simulationType: 'traffic',
  rafSettings: {
    fps: 60,
  },
  simulationSettings: {
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: true,
      clearFrames: true, 
      color: 'black',
      width: 4,
      onClick: _ => {

      },
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
      width: 2,
      drawFn: (ctx, boid) => {
        ctx.strokeRect(boid.position.x, boid.position.y, 5, 5);
      },
    }
  }
}

export const prettyDrawingSettings = {
  simulationType: 'school',
  rafSettings: {
    fps: 60,
  },
  simulationSettings: {
    cursorBoidSettings: {
      isVisible: false,
      cursorVisible: false,
      clearFrames: false, 
      color: 'black',
    },
    boidSettings: {
      isVisible: true,
      clearFrames: false, 
      drawActiveBounds: false, 
      count: 60, 
      shape: 'line',
      color: 'rgba(0, 0, 0, 0.1)',
      width: 2,
      poolSettings: {
        state: 'school',
        avoidDistance: 80, 
        minDistance: 30,
        mass: 1,
        maxSpeed: 3,
        maxForce: 1,
        maxDistance: 80,
      }
    }
  }
}

export const trafficSettings = {
  simulationType: 'traffic',
  rafSettings: {fps: 60},
  simulationSettings: {
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: false,
      clearFrames: true, 
      color: 'rgba(0, 0, 0, 1)',
      drawFn: (ctx, boid) => {
        ctx.strokeRect(boid.position.x, boid.position.y, 5, 5);
        ctx.arc(boid.position.x, boid.position.y, 10, 0, 2 * Math.PI);
      }
    },
    boidSettings: {
      // isVisible: undefined,
      // clearFrames: undefined, 
      // drawActiveBounds: undefined, 
      // count: undefined, 
      // minDistance: undefined,
      // maxSpeed: undefined,
      // maxDistance: undefined,
      // avoidDistance: undefined, 
      // shape: undefined,
      // color: undefined,
      // width: undefined,
      // drawFn: colonyBoidDrawFn, 
    }
  }
}

export const colonySettings = {
  simulationType: 'colony',
  rafSettings: {fps: 60},
  simulationSettings: {
    cursorBoidSettings: {
      isVisible: undefined,
      cursorVisible: undefined,
      clearFrames: undefined, 
      color: undefined,
      width: undefined,
      maxSpeed: undefined,
    },
    boidSettings: {
      isVisible: undefined,
      clearFrames: undefined, 
      drawActiveBounds: undefined, 
      count: undefined, 
      minDistance: undefined,
      maxSpeed: undefined,
      maxDistance: undefined,
      avoidDistance: undefined, 
      shape: undefined,
      color: undefined,
      width: undefined,
      drawFn: colonyBoidDrawFn, 
    }
  }
}

export const schoolSettings = {
  simulationType: 'school',
  rafSettings: {fps: 60},
  simulationSettings: {
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: true,
      clearFrames: true, 
      color: 'black',
      width: 4,
      maxSpeed: 3,
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
      color: 'white',
      width: 2,
      drawFn: schoolBoidDrawFn, 
    }
  }
}



export const crowdsSettings = {
  simulationType: 'crowd',
  rafSettings: {fps: 60},
  simulationSettings: {
    cursorBoidSettings: {
      isVisible: undefined,
      cursorVisible: undefined,
      clearFrames: undefined, 
      color: undefined,
      width: undefined,
      maxSpeed: undefined,
    },
    boidSettings: {
      isVisible: undefined,
      clearFrames: undefined, 
      drawActiveBounds: undefined, 
      count: undefined, 
      minDistance: undefined,
      maxSpeed: undefined,
      maxDistance: undefined,
      avoidDistance: undefined, 
      shape: undefined,
      color: undefined,
      width: undefined,
      drawFn: colonyBoidDrawFn, 
    }
  }
}

export const moldSettings = {
  simulationType: 'mold',
  rafSettings: {
    fps: 20,
  },
  simulationSettings: {
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: true,
      clearFrames: true, 
      color: 'black',
      width: 4,
      maxSpeed: 3,
    },
    boidSettings: {
      isVisible: true,
      clearFrames: true, 
      drawActiveBounds: false, 
      count: 50, 
      maxSpeed: 0.2,
      minDistance: 300, 
      maxDistance: 100, 
      shape: 'line',
      color: 'white',
      width: 2,
      drawFn: moldBoidDrawFn, 
    }
  }
}
