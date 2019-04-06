import React, { Component } from 'react';
import CanvasBase from '../components/canvasBase';
import RafController from '../components/rafController';
import SimulationController from './simulationController';
import deepmerge from 'deepmerge'
// import { CSSTransition } from "react-transition-group";
// import { SimpleFade } from '../components/fadeWrapper';
import classnames from 'classnames';
import defaultSettings from './settings/default';
import trafficSettings from './settings/traffic';
import colonySettings from './settings/colony';
import schoolSettings from './settings/school';
import crowdsSettings from './settings/crowds';
import moldSettings from './settings/mold'; 
import { ReactComponent as CaveTop }  from '../assets/cave-top.svg';
import { ReactComponent as CaveBottom }  from '../assets/cave-bottom.svg';
import throttle from 'lodash/throttle';


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
    this.caveRef = React.createRef(); 
    
    this.hoistCanvas = (_canvas, _ctx) => {
      this.ctx = _ctx;
      this.canvas = _canvas; 
      this.canvasRect = this.canvas.getBoundingClientRect(); 
    }

    this.throttleResize = throttle(this.handleWindowSizeChange, 333);
  }

  onMouseMove = (e) => {
    if(this.canvasRect && this.rafController && this.rafController.ticker % 4 === 0) {
      this.mousePos.x = e.clientX - this.canvasRect.left;
      this.mousePos.y = e.clientY - this.canvasRect.top;
    }
  }

  onMouseClick = (e) => {
    if(this.canvasRect) {
      this.mousePos.x = e.clientX - this.canvasRect.left;
      this.mousePos.y = e.clientY - this.canvasRect.top;
    }
    if(this.simulationController) {
      this.simulationController.onClick({...this.mousePos}); 
    }
  }

  onMouseEnter = () => {
    this.simulationController.onMouseEnter(); 
  }

  onMouseLeave = () => {
    this.simulationController.onMouseLeave(); 
  }

  handleWindowSizeChange = () => {
    let simRect = this.simulation.getBoundingClientRect(); 
    // let prevWidth = this.width; 
    // let prevHeight = this.height; 
    this.width = simRect.width;
    this.height = simRect.height;
    let newBounds = {x: this.width, y: this.height}; 

    // Simulation controller update
    this.simulationController.resize(newBounds);

    // // Sets the state to force a rerender of the canvas. 
    this.setState({
      width: this.width,
      height: this.height,
    });
  }

  componentDidMount() {
    // Resize listener
    window.addEventListener('resize', this.throttleResize);

    if(this.caveRef) {
      this.caveContainer = this.caveRef.current; 
    }
    if(this.simulationRef) {
      this.simulation = this.simulationRef.current; 
      let simRect = this.simulation.getBoundingClientRect(); 
      
      // Defines bounds based on the simulation size. 
      this.width = simRect.width;
      this.height = simRect.height;
      this.mousePos = {x: this.width / 2, y: this.height / 2};
      this.center = {x: this.width / 2, y: this.height / 2};

      this.rafController = new RafController({fps: 60});
      this.buildSimulation(); 

      // Sets the state to force a rerender of the canvas. 
      this.setState({
        width: this.width,
        height: this.height,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttleResize);
  }

  buildSimulation() {
    // if(this.state.width && this.state.height) {
    switch(this.props.curSystem.path) {
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

    this.styles = { cursor: this.currentSettings && this.currentSettings.simulationSettings && this.currentSettings.simulationSettings.cursorBoidSettings && this.currentSettings.simulationSettings.cursorBoidSettings.cursorVisible ? 'pointer' : 'none',}
    this.rafController.changeFps(this.currentSettings.rafSettings.fps)
    
    // Creates the simulation controller for the simulation. 
    this.simulationController = new SimulationController({
      width: this.width,
      height: this.height,
      caveContainer: this.caveContainer,
      ...this.currentSettings.simulationSettings
    });

    // Uses the rafController to execute the sim at a specified frame rate. 
    this.rafController.onStep = ticker => {
      if(this.ctx) {
        this.simulationController.step(this.ctx, this.mousePos);
      }
    }
    // }
  }

  componentDidUpdate(prevProps) {
    // If the simulation path changed, update hte simulation controller.
    if(prevProps.curSystem.path !== this.props.curSystem.path) {
      // console.log('update')
      this.buildSimulation();
    }
  }

  render() {
    // let shouldRender = Boolean(typeof (this.state.width) !== 'undefined' && typeof(this.state.height !== 'undefined'))
    
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
        <CanvasBase hoistCanvas={this.hoistCanvas}/>
        {this.props.curSystem.path === 'colony' && 
          (
            <div className='cave-graphics' ref={this.caveRef}>
              <CaveTop/>
              <CaveBottom/>
            </div>
          )
        }
      </div>
    );
  }
}