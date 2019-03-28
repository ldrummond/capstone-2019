
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
  // ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3);
  // ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
  // ctx.fillRect(boid.position.x, boid.position.y, 5, 10);
  ctx.strokeRect(boid.position.x, boid.position.y, 5, 10);
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
  ctx.strokeRect(boid.position.x - 2, boid.position.y - 2, 4, 4);
}


// Simulation settings
export const defaultSettings = {
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
      width: 2,
      drawFn: (ctx, boid) => {
        ctx.strokeRect(boid.position.x, boid.position.y, 5, 5);
      },
    }
  }
}

export const prettyDrawingSettings = {
  rafSettings: {
    fps: 60,
  },
  simulationSettings: {
    simulationType: 'school',
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
      strokeColor: 'rgba(0, 0, 0, 0.1)',
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
  rafSettings: {fps: 60},
  simulationSettings: {
    simulationType: 'traffic',
    cursorBoidSettings: {
      isVisible: false,
      cursorVisible: true,
      clearFrames: true, 
      ripple: true, 
      color: 'rgba(0, 0, 0, 1)',
      drawFn: (ctx, boid) => {
        ctx.strokeRect(boid.position.x, boid.position.y, 5, 5);
        ctx.arc(boid.position.x, boid.position.y, 10, 0, 2 * Math.PI);
      }
    },
    boidSettings: {
      isVisible: true,
      // clearFrames: false, 
      // drawActiveBounds: true, 
      count: 60, 
      minDistance: 50,
      maxSpeed: 1,
      maxDistance: 200,
      strokeWidth: 0.8, 
      strokeColor: 'white',
      edgeBehavior: 'wrap',
      drawFn: trafficBoidDrawFn, 
    }
  }
}

export const colonySettings = {
  rafSettings: {fps: 60},
  simulationSettings: {
    simulationType: 'colony',
    cursorBoidSettings: {
      // isVisible: undefined,
      // cursorVisible: true,
      // clearFrames: undefined, 
      // color: undefined,
      // width: undefined,
      // maxSpeed: undefined,
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
      // color: 'white',
      // drawFn: colonyBoidDrawFn, 
    }
  }
}

export const schoolSettings = {
  rafSettings: {fps: 60},
  simulationSettings: {
    simulationType: 'school',
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: true,
      clearFrames: true, 
      color: 'black',
      width: 4,
      maxSpeed: 3,
      drawFn: (ctx, boid) => {
        ctx.beginPath();
        ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3)
        ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
        ctx.stroke()
      }
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
      strokeColor: 'white',
      strokeWidth: 2,
      drawFn: schoolBoidDrawFn, 
    }
  }
}



export const crowdsSettings = {
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
      drawFn: colonyBoidDrawFn, 
    }
  }
}

export const moldSettings = {
  rafSettings: {
    fps: 20,
  },
  simulationSettings: {
    simulationType: 'mold',
    cursorBoidSettings: {
      isVisible: true,
      cursorVisible: true,
      clearFrames: true, 
      color: 'black',
      width: 4,
      maxSpeed: 3,
      ripple: true, 
    },
    boidSettings: {
      isVisible: true,
      clearFrames: true, 
      drawActiveBounds: false, 
      count: 100, 
      maxSpeed: 1,
      minDistance: 300, 
      maxDistance: 100, 
      shape: 'line',
      strokeColor: 'white',
      fill: false,
      strokeWidth: 1,
      drawFn: moldBoidDrawFn, 
      clickbufferDrawFn: (ctx, pos) => {
        ctx.strokeStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4, 0, 2 * Math.PI);
        ctx.stroke();
      },
      edgeBehavior: 'bounce',
    }
  }
}
