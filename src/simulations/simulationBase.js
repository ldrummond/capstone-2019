import React, { Component } from 'react';
import $ from 'jquery'
import CanvasBase from '../components/canvasBase'
import RafController from '../components/rafController'
import SimulationController from './simulationController.js'


export default class SimulationBase extends Component {
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
    this.mousePos = {
      x: -10, 
      y: -10
    }
  }

  onMouseMove = (e) => {
    if(this.rafController.ticker % 2 == 0) {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
    }
  }

  getCanvasMousePos(clientX, clientY) {
    return {
      x: (clientX - this.simRect.left),
      y: (clientY - this.simRect.top)
    };
  }

  componentDidMount() {
    if(this.simulationRef) {
      this.simulation = this.simulationRef.current; 
      this.$simulation = $(this.simulation); 
      
      this.width = this.$simulation.width();
      this.height = this.$simulation.height();
      this.center = {x: this.width / 2, y: this.height / 2};
      this.simRect = this.simulation.getBoundingClientRect(); 

      this.simulationController = new SimulationController({
        boidCount: 80,
        width: this.width,
        height: this.height,
        simulationType: this.simulationType,
        padding: {width: 50, height: 50}
      })

      // Executing the step function for the given framerate. 
      this.rafController = new RafController({fps: 60}); 
      let canvasMousePos; 
      let cursorBoid;

      this.rafController.onStep = ticker => {
        if(this.ctx) {
          canvasMousePos = this.getCanvasMousePos(this.mousePos.x, this.mousePos.y);
          
          this.simBounds = this.simulationController.activeBounds; 
          this.ctx.clearRect(this.simBounds.x, this.simBounds.y, this.simBounds.width, this.simBounds.height);
          // this.ctx.strokeRect(this.simBounds.x, this.simBounds.y, this.simBounds.width, this.simBounds.height);
          this.simulationController.updateAndDraw(this.ctx, canvasMousePos);

          this.simulationController.updateAndDrawCursor(this.ctx, this.mousePos);
        }
      }

      this.setState({
        width: this.width,
        height: this.height,
      })
    }
    console.log('mount')
  }

  componentWillUnmount() {
    console.log('unmount')
  }

  render() {
    return (
      <div className={`simulation-canvas ${this.props.path}`} ref={this.simulationRef} onMouseMove={this.onMouseMove}>
        {this.state.width && this.state.height &&
          <CanvasBase hoistContext={this.hoistContext}/>
        }
      </div>    
    );
  }
}

