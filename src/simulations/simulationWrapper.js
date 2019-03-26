import React, { Component } from 'react';
import $ from 'jquery'
import CanvasBase from '../components/canvasBase'
import RafController from '../components/rafController'
import SimulationController from './simulationController'
import DrawablesController from './drawablesController'
import deepmerge from 'deepmerge'
import { defaultSettings, prettyDrawingSettings, trafficSettings, colonySettings, 
  schoolSettings, crowdsSettings, moldSettings } from './simulationSettings'
import classnames from 'classnames';

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

    this.simulationRef = React.createRef();
    this.cursorIconRef = React.createRef(); 
    
    this.hoistCanvas = (_canvas, _ctx) => {
      this.ctx = _ctx;
      this.canvas = _canvas; 
      this.canvasRect = this.canvas.getBoundingClientRect(); 
    }
    
    this.simulationType = props.path; 
    switch(this.simulationType) {
      case 'traffic':
        this.currentSettings = deepmerge(defaultSettings, trafficSettings);
        break;

      case 'colony':
        this.currentSettings = deepmerge(defaultSettings, colonySettings);
        break;

      case 'school':
        this.currentSettings = deepmerge(defaultSettings, schoolSettings);
        break;

      case 'crowd':
        this.currentSettings = deepmerge(defaultSettings, crowdsSettings);
        break;

      case 'mold':
        this.currentSettings = deepmerge(defaultSettings, moldSettings);
        break;

      default: 
        console.error('Simulation type does not match setting.');
        break;      
    }

    this.styles = {
      cursor: this.currentSettings.simulationSettings.cursorBoidSettings.cursorVisible ? 'pointer' : 'none',
    }
  }

  updateSimulationSettings(settings) {
    this.currentSettings = deepmerge(this.defaultSettings, settings); 
  }

  createRaf(settings) {
    return new RafController(settings);
  }

  createSimulation(settings) {
    return new SimulationController({
      width: this.width,
      height: this.height,
      boidCount: settings.boidCount,
      simulationType: settings.simulationType,
      cursorBoidSettings: settings.cursorBoidSettings, 
      boidSettings: settings.boidSettings,
    });
  }

  createDrawablesController() {
    return 
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
      this.rafController = new RafController(this.currentSettings.rafSettings);
      this.simulationController = this.createSimulation(this.currentSettings.simulationSettings);

   
     
      // Uses the rafController to execute the sim at a specified frame rate. 
      this.rafController.onStep = ticker => {
          // Creates a drawables controller, to draw things besides
        // the cursor or the boids.
        if(this.ctx && !this.drawablesController) {
          this.drawablesController = new DrawablesController(this.ctx);           
        } 
        if(this.ctx) {
          this.simulationController.step(this.ctx, this.mousePos);
          this.drawablesController.step(); 
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
    // this.simulationController.onClick(); 
    if(this.drawablesController) {
      this.drawablesController.addRipple(this.mousePos);
    }
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
        className={classnames('simulation-canvas', this.props.path)} 
        ref={this.simulationRef} 
        onMouseMove={this.onMouseMove}
        onClick={this.onMouseClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={this.styles}
      >
        {/* <div className='cursorIcon' ref={this.cursorIconRef} ></div> */}
        {this.state.width && this.state.height &&
          <CanvasBase hoistCanvas={this.hoistCanvas}/>
        }
      </div>    
    );
  }
}