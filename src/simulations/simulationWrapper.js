import React, { Component } from 'react';
import $ from 'jquery'
import CanvasBase from '../components/canvasBase'
import RafController from '../components/rafController'
import SimulationController from './simulationController'
import { mergeObjects } from '../components/helperFunctions'
import { defaultSettings, prettyDrawingSettings, trafficSettings, colonySettings, 
  schoolSettings, crowdsSettings, slimeSettings } from './simulationSettings'

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
    this.cursorIconRef = React.createRef(); 
    this.hoistContext = _ctx => {
      this.ctx = _ctx;
    }
    this.hoistCanvas = _canvas => {
      this.canvas = _canvas; 
      this.canvasRect = this.canvas.getBoundingClientRect(); 
    }

    switch(this.simulationType) {
      case 'traffic':
        this.currentSettings = mergeObjects(defaultSettings, trafficSettings);

      case 'colony':
        this.currentSettings = mergeObjects(defaultSettings, colonySettings);

      case 'school':
        this.currentSettings = mergeObjects(defaultSettings, schoolSettings);

      case 'crowds':
        this.currentSettings = mergeObjects(defaultSettings, crowdsSettings);

      case 'slime':
        this.currentSettings = mergeObjects(defaultSettings, slimeSettings);
    }

    // this.currentSettings = mergeObjects(defaultSettings, prettyDrawingSettings);

    this.styles = {
      cursor: this.currentSettings.simulationSettings.cursorBoidSettings.cursorVisible ? 'pointer' : 'none',
    }
  }

  updateSimulationSettings(settings) {
    this.currentSettings = mergeObjects(this.defaultSettings, settings); 
  }

  createRaf(settings) {
    return new RafController(settings);
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

  componentDidMount() {
    if(this.simulationRef) {
      this.simulation = this.simulationRef.current; 
      this.$simulation = $(this.simulation); 
      
      // Defines bounds based on the simulation size. 
      this.width = this.$simulation.width();
      this.height = this.$simulation.height();
      this.mousePos = {x: this.width / 2, y: this.height / 2};
      this.center = {x: this.width / 2, y: this.height / 2};
      this.simRect = this.simulation.getBoundingClientRect(); 

      // Creates the simulation and defines this.rafController. 
      this.rafController = this.createRaf(this.currentSettings.rafSettings);
      this.simulationController = this.createSimulation(this.currentSettings.simulationSettings);

      // Uses the rafController to execute the sim at a specified frame rate. 
      this.rafController.onStep = ticker => {
        if(this.ctx) {
          this.simulationController.step(this.ctx, this.mousePos);
        }
      }

      // Sets the state to force a rerender of the canvas. 
      this.setState({
        width: this.width,
        height: this.height,
      });
    }
  }

  onMouseMove = (e) => {
    // if(this.cursorIconRef.current) {
    //   console.log(this.cursorIconRef.current);
    //   this.cursorIconRef.current.style.left = e.clientX;
    //   this.cursorIconRef.current.style.top = e.clientY;      
    // }
    if(this.canvasRect && this.rafController && this.rafController.ticker % 4 == 0) {
      this.mousePos.x = e.clientX - this.canvasRect.left;
      this.mousePos.y = e.clientY - this.canvasRect.top;
    }
  }

  onMouseClick = (e) => {
    this.simulationController.onClick(); 
  }

  onMouseEnter = () => {
    this.simulationController.onMouseEnter(); 
  }

  onMouseLeave = () => {
    this.simulationController.onMouseLeave(); 
  }

  render() {
    return (
      <div 
        className={`simulation-canvas ${this.props.path}`} 
        ref={this.simulationRef} 
        onMouseMove={this.onMouseMove}
        onClick={this.onMouseClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={this.styles}
      >
        {/* <div className='cursorIcon' ref={this.cursorIconRef} ></div> */}
        {this.state.width && this.state.height &&
          <CanvasBase hoistContext={this.hoistContext} hoistCanvas={this.hoistCanvas}/>
        }
      </div>    
    );
  }
}