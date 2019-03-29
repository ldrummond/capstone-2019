import classnames from 'classnames';
import BoidPoolController from './boidPoolController'; 
import CursorBoidController from './cursorBoidController'; 
import {ActiveBounds} from '../components/helperFunctions';

//////////////////////////////////////////////////
//
// Traffic Simulation
//
//////////////////////////////////////////////////

const simulationSettings = {
  simulationType: 'traffic',
  rafSettings: {fps: 60},
  drawActiveBounds: false, 
  cursorSettings: {
    isVisible: true,
    rippleOnClick: true, 
  },
  cursorBoidSettings: {
    isVisible: false,
    clearFrames: true, 
    stroke: true, 
    strokeColor: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1, 
    fill: false, 
    fillColor: false,
    drawFn: (ctx, boid) => {
      ctx.strokeRect(boid.position.x, boid.position.y, 5, 5);
      ctx.arc(boid.position.x, boid.position.y, 10, 0, 2 * Math.PI);
    }
  },
  boidSettings: {
    isVisible: true,
    clearFrames: false, 
    count: 60, 
    minDistance: 50,
    maxSpeed: 1,
    maxDistance: 200,
    strokeWidth: 0.8, 
    stroke: true,
    strokeColor: 'white',
    strokeWidth: 1,
    fill: false,
    fillColor: false,
    edgeBehavior: 'wrap',
    drawFn: (ctx, boid) => {
      // ctx.moveTo(boid.position.x - boid.velocity.x * 3, boid.position.y - boid.velocity.y * 3);
      // ctx.lineTo(boid.position.x + boid.velocity.x * 3, boid.position.y + boid.velocity.y * 3);
      // ctx.fillRect(boid.position.x, boid.position.y, 5, 10);
      ctx.strokeRect(boid.position.x, boid.position.y, 5, 10);, 
    }
  }
}

export default class TrafficSimulation {
  constructor() {
    
  }

  initialize() {

  }
  
  update() {
    
  }
  
  clear(ctx) {
    
  }

  draw(ctx) {

  }
}