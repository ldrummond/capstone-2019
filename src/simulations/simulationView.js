import React, { Component } from 'react';
import $ from 'jquery'
import SimulationController from './simulationController'
import CanvasBase from '../components/canvasBase'

export default class SimulationBase extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: false,
      height: false,
    }

    this.simulationType = props.path; 
    this.simulationRef = React.createRef();
  }

  componentDidMount() {
    if(this.simulationRef) {
      this.simulation = this.simulationRef.current; 
      this.$simulation = $(this.simulation); 
      
      this.width = this.$simulation.width();
      this.height = this.$simulation.height();
      this.center = {x: this.width / 2, y: this.height / 2};

      this.simulationController = new SimulationController({
        boidCount: 50,
        containerWidth: this.width,
        containerHeight: this.height,
        simulationType: this.simulationType,
      })

      this.canvasOptions = {
        fps: 1,
        // drawBuffer: [this.simulationController]
        onStep: this.simulationController.step
      }

      this.setState({
        width: this.width,
        height: this.height,
      })
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className={`simulation-canvas ${this.props.path}`} ref={this.simulationRef}>
        {this.state.width && this.state.height &&
          <CanvasBase {...this.canvasOptions} />
        }
      </div>    
    );
  }
}

