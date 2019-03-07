
//////////////////////////////////////////////////
//
// Simulation Settings
//
//////////////////////////////////////////////////

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
      width: 2
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

}

export const colonySettings = {

}

export const schoolSettings = {

}

export const crowdsSettings = {

}

export const slimeSettings = {

}
