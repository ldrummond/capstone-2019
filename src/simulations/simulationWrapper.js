import React, { Component } from 'react';
import $ from 'jquery'
import CanvasBase from '../components/canvasBase'
import RafController from '../components/rafController'
import SimulationController from './simulationController.js'
import { mergeObjects } from '../components/helperFunctions'

//////////////////////////////////////////////////
//
// Simulation Base
//
//////////////////////////////////////////////////

export default class SimulationWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: false,
      height: false,
    }

    this.simulationType = props.path; 
    this.simulationRef = React.createRef();
    this.hoistContext = _ctx => {
      this.ctx = _ctx;
    }
    this.hoistGetCanvasMousePos = _fn => {
      this.getCanvasMousePos = _fn; 
    }

    this.currentSettings = {
      simulationType: props.path,
      cursorVisible: true,
      rafSettings: {
        fps: 60,
      },
      simulationSettings: {
        cursorBoidSettings: {
          isVisible: true,
          clearFrames: false, 
          color: 'black',
        },
        boidSettings: {
          isVisible: true,
          clearFrames: false, 
          drawActiveBounds: false, 
          count: 50, 
          minSpeed: 2, 
          maxSpeed: 5,
          shape: 'line',
          color: 'rgba(0, 0, 0, 0.05)',
        }
      }
    }

    this.mousePos = {
      x: -10, 
      y: -10
    }
  }

  updateSimulationSettings(settings) {
    this.currentSettings = mergeObjects(this.currentSettings, settings); 
  }

  createRaf(settings) {
    return new RafController({fps: settings.fps});
  }

  createSimulation(settings) {
    return new SimulationController({
      boidCount: settings.boidCount,
      width: this.width,
      height: this.height,
      simulationType: settings.simulationType,
      cursorBoidSettings: settings.cursorBoidSettings, 
      boidSettings: settings.boidSettings,
    });
  }

  onRafStep = ticker => {
    let settings = this.currentSettings; 
    let cursorSettings = settings.simulationSettings.cursorBoidSettings;
    let boidsSettings = settings.simulationSettings.boidSettings; 
    let canvasMousePos = this.mousePos;
    let cursorBoidPos = this.mousePos; 

    if(this.ctx) {
      // Gets the position of the mouse on the cursor, transformed to the canvas 
      // from the stored position of the cursor from throttled mousemove handler. 
      if(cursorSettings.isVisible && cursorSettings.clearFrames) {
        canvasMousePos = this.getCanvasMousePos(this.mousePos.x, this.mousePos.y);
        cursorBoidPos = this.simulationController.cursorBoid.position; 
        this.ctx.clearRect(cursorBoidPos.x - 20, cursorBoidPos.y - 20, 40, 40);
      }

      // Gets the active bounds of the simulation, and uses those to define 
      // the area to clear on the canvas, to reduce cpu use. 
      if(boidsSettings.isVisible && boidsSettings.clearFrames) {
        let simBounds = this.simulationController.activeBounds; 
        if(boidsSettings.drawActiveBounds) {
          this.ctx.strokeRect(simBounds.x, simBounds.y, simBounds.width, simBounds.height);
        }
        this.ctx.clearRect(simBounds.x, simBounds.y, simBounds.width, simBounds.height);
      }

      if(cursorSettings.isVisible) {
        this.simulationController.updateAndDrawCursor(this.ctx, canvasMousePos);
      }

      if(boidsSettings.isVisible) {
        this.simulationController.updateAndDraw(this.ctx, canvasMousePos);
      }
    }
  }

  componentDidMount() {
    if(this.simulationRef) {
      this.simulation = this.simulationRef.current; 
      this.$simulation = $(this.simulation); 
      
      // Defines bounds based on the simulation size. 
      this.width = this.$simulation.width();
      this.height = this.$simulation.height();
      this.center = {x: this.width / 2, y: this.height / 2};
      this.simRect = this.simulation.getBoundingClientRect(); 

      // Creates the simulation and defines this.rafController. 
      this.rafController = this.createRaf(this.currentSettings.rafSettings);
      this.simulationController = this.createSimulation(this.currentSettings.simulationSettings);

      // Uses the rafController to execute the sim at a specified frame rate. 
      this.rafController.onStep = this.onRafStep; 

      // Sets the state to force a rerender of the canvas. 
      this.setState({
        width: this.width,
        height: this.height,
      })
    }
  }

  onMouseMove = (e) => {
    if(this.rafController.ticker % 2 == 0) {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
    }
  }

  onMouseClick = (e) => {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
  }

  render() {
    return (
      <div className={`simulation-canvas ${this.props.path}`} ref={this.simulationRef} onMouseMove={this.onMouseMove}>
        {this.state.width && this.state.height &&
          <CanvasBase hoistContext={this.hoistContext} hoistGetCanvasMousePos={this.hoistGetCanvasMousePos}/>
        }
      </div>    
    );
  }
}

const prettyDrawingSettings = {
  fps: 60,
  simulationType: '',
  cursor: {
    isVisible: false,
    clearFrames: false, 
    color: 'black',
    trackingBoid: false, 
  },
  boids: {
    isVisible: false,
    clearFrames: false, 
    count: 50, 
    minSpeed: 2, 
    maxSpeed: 5,
    shape: 'line',
    color: 'rgba(0, 0, 0, 0.05)',
  }
}

