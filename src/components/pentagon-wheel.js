import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition'
import CanvasBase from './canvas-base'

// // https://swizec.com/blog/fade-in-lazy-loaded-images-react-css-quick-guide/swizec/8163
// // Great FadeIn Component
export class PentagonWheel extends Component {
  constructor(props) {
      super(props);

      this.state = { loaded: false, };

      this.defaultStyle = {
          transition: `opacity ${this.props.duration}ms ease-in-out`,
          opacity: 0,
          height: 0,
      }

      this.transitionStyles = {
          entering: { opacity: 0, height: 0, pointerEvents: "none" },
          entered: { opacity: 1, height: "auto", pointerEvents: "all" },
      };

      this.canvasOptions = {
        fps: 1,
        onUpdate: _ => console.log('test'),
      }
  }

  updateMousePos = (e) => {

  }

  render() {
      const { height, children, duration } = this.props,
          { loaded } = this.state;

      return (
        <span className='pentagon-container' onMouseMove={this.updateMousePos}>
          <CanvasBase {...this.canvasOptions}/>
          {/* <Pentagon style={{transform: `rotate(${rotation}deg)`}}/> */}
        </span>
      );
  }
}
