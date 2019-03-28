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
    
    switch(props.path) {
      case 'traffic':
        this.currentSettings = deepmerge(defaultSettings, trafficSettings);
        break;

      case 'colony':
        this.currentSettings = deepmerge(defaultSettings, colonySettings);
        break;

      case 'school':
        this.currentSettings = deepmerge(defaultSettings, schoolSettings);
        break;

      case 'crowds':
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
      cursor: 
        this.currentSettings && 
        this.currentSettings.simulationSettings && 
        this.currentSettings.simulationSettings.cursorBoidSettings && 
        this.currentSettings.simulationSettings.cursorBoidSettings.cursorVisible ? 'pointer' : 'none',
    }
  }

  onMouseMove = (e) => {
    if(this.canvasRect && this.rafController && this.rafController.ticker % 4 == 0) {
      this.mousePos.x = e.clientX - this.canvasRect.left;
      this.mousePos.y = e.clientY - this.canvasRect.top;
    }
  }

  onMouseClick = (e) => {
    if(this.simulationController) {
      this.simulationController.onClick({...this.mousePos}); 
    }
    if(this.drawablesController && this.currentSettings.simulationSettings.cursorBoidSettings.ripple) {
      this.drawablesController.addRipple({...this.mousePos}, this.rafController.fps);
    }
  }

  onMouseEnter = () => {
    this.simulationController.onMouseEnter(); 
  }

  onMouseLeave = () => {
    this.simulationController.onMouseLeave(); 
  }

  onResize = () => {
    let simRect = this.simulation.getBoundingClientRect(); 
    this.width = simRect.width;
    this.height = simRect.height;

    // Sets the state to force a rerender of the canvas. 
    this.setState({
      width: this.width,
      height: this.height,
    });
  }

  componentDidMount() {
    if(this.simulationRef) {
      this.simulation = this.simulationRef.current; 
      let simRect = this.simulation.getBoundingClientRect(); 
      
      // Defines bounds based on the simulation size. 
      this.width = simRect.width;
      this.height = simRect.height;
      this.mousePos = {x: this.width / 2, y: this.height / 2};
      this.center = {x: this.width / 2, y: this.height / 2};

      // Creates the Raf Controller to controller frame rate. 
      this.rafController = new RafController(this.currentSettings.rafSettings);
      // Creates the simulation controller for the simulation. 
      this.simulationController = new SimulationController({
        width: this.width,
        height: this.height,
        boidCount: this.currentSettings.simulationSettings.boidCount,
        simulationType: this.currentSettings.simulationSettings.simulationType,
        cursorBoidSettings: this.currentSettings.simulationSettings.cursorBoidSettings, 
        boidSettings: this.currentSettings.simulationSettings.boidSettings,
      });
      // Creates the drawables controller to draw other shapes. 
      this.drawablesController = new DrawablesController();  

      // Uses the rafController to execute the sim at a specified frame rate. 
      this.rafController.onStep = ticker => {
        if(this.ctx) {
          this.simulationController.step(this.ctx, this.mousePos);
          this.drawablesController.step(this.ctx); 
          this.drawablesController.clear(this.ctx);
        }
      }

      // Sets the state to force a rerender of the canvas. 
      this.setState({
        width: this.width,
        height: this.height,
      });
    }
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