import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition'
import CanvasBase from './canvas-base'
import $ from 'jquery'
import { Pentagon, Point } from './canvas-shapes'
import data from '../data/data'


export class PentagonWheel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: undefined,
      height: undefined,
    }

    this.pentagonOptions = {}; 
    this.canvasOptions = {}; 

    this.pentagonRef = React.createRef();
    this.colors = data.systems.map(system => system.color);
  }

  componentDidMount() {
    if(this.pentagonRef) {
      this.pentagon = this.pentagonRef.current; 
      this.width = $(this.pentagon).width();
      this.height = $(this.pentagon).height();
      this.center = new Point(this.width / 2, this.height / 2);
      this.wheelIndex = 0;

      this.pentagonOptions = {
        center: this.center,
        size: this.width / 2,
        colors: this.colors,
      }
  
      this.pentagonController = new Pentagon(this.pentagonOptions)
      this.pentagonController.rotateTo(-(360 / 5 * this.wheelIndex) + 36);

      this.canvasOptions = {
        fps: 60,
        drawBuffer: [this.pentagonController]
      }

      this.setState({
        width: this.width,
        height: this.height,
      })

      $(window).resize(_ => {
        if(this.pentagon) {
          this.width = $(this.pentagon).width();
          this.height = $(this.pentagon).height();
          this.setState({width: this.width, height: this.height})
        }
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // If props do not change, but  
    // state does, that means the size
    // changed. This changed size is passed 
    // to canvas base through render.
    if(this.props == nextProps) {


      return true 
    }

    // If only props are changing and  
    // state is same, do not rerender.
    if(this.state == nextState) {
      console.log(nextProps.wheelIndex)
      this.wheelIndex = nextProps.wheelIndex;
      this.pentagonController.rotateToEase(-(360 / 5 * this.wheelIndex) + 36, 666);
      return false 
    }
    return false
  }

  render() {
    return (
      <span className='pentagon-container' ref={this.pentagonRef}>
        {
          this.state.width && this.state.height &&
            <CanvasBase {...this.canvasOptions} />
        }
      </span>
    );
  }
}
