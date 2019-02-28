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
    // this.isPaused = false; 
  }

  componentDidMount() {
    if(this.simulationRef) {
      this.simulation = this.simulationRef.current; 
      this.$simulation = $(this.simulation); 
      
      this.width = this.$simulation.width();
      this.height = this.$simulation.height();
      this.center = {x: this.width / 2, y: this.height / 2};

      this.simulationController = new SimulationController({
        boidCount: 80,
        width: this.width,
        height: this.height,
        simulationType: this.simulationType,
        padding: {width: 50, height: 50}
      })

      this.canvasOptions = {
        fps: 50,
        // drawBuffer: [this.simulationController]
        onStep: this.simulationController.step
      }

      this.setState({
        width: this.width,
        height: this.height,
      })
    }
  }

  // componentWillUpdate(props) {
  //   this.isPaused = this.props.aboutVisible; 
  //   if(this.isPaused && this.simulationController) {
  //     this.simulationController.pause(); 
  //   } else {
  //     this.simulationController.play();
  //   }
  // }

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

