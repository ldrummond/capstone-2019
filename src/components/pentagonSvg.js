import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';

export default class Pentagon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      offset: 0
    }

    this.offset = 0;
    this.duration = 666; 
    
    this.onHoverUp = _ => this.setState({offset: -1});
    this.onHoverDown = _ => this.setState({offset: 1});
    this.onHoverOff = _ => this.setState({offset: 0});

  }

  render() {
    let props = this.props; 
    this.triAttributes = function(i) {
      let style = {fill: props.colors[i], cursor: 'pointer'};
      let onClick = _ => {}; 
      let onEnter = _ => {}; 
      let plusI = (props.curIndex + 1 < 5) ? props.curIndex + 1 : 0;
      let minusI = (props.curIndex - 1 >= 0) ? props.curIndex - 1 : 4;
      if(i == minusI) {onClick = props.onPrevClick; onEnter = this.onHoverDown}
      if(i == plusI) {onClick = props.onNextClick; onEnter = this.onHoverUp}
      return {
        style: style,
        onClick: onClick,
        onMouseEnter: onEnter,
        onMouseLeave: this.onHoverOff,
      }
    }

    this.pentStyles = {
      transform: `rotate(${(360 / 5 * props.wheelIndex) + 54 + this.state.offset}deg)`,
      fill: 'transparent',
      cursor: 'pointer',
      transition: `transform ${this.duration}ms ease-in-out`,
    }
    return (
      <CSSTransition
        in={props.in}
        timeout={this.duration}
        className='pentagon-icon'
        classNames="pentagon-icon"
        style={this.pentStyles}
      >
      <span>
       <svg viewBox="0 0 251.61 251.61" style={{transition: this.pentStyles.transition}}>
          <polygon {...this.triAttributes(0)} points="125.34 0 125.81 126.47 245.73 86.81 125.34 0"/>
          <polygon {...this.triAttributes(1)} points="199.82 227.19 245.73 86.81 125.81 126.47 199.82 227.19"/>
          <polygon {...this.triAttributes(2)} points="52.18 227.74 199.82 227.19 125.81 126.47 52.18 227.74"/>
          <polygon {...this.triAttributes(3)} points="5.59 87.7 52.18 227.74 125.81 126.47 5.59 87.7"/>
          <polygon {...this.triAttributes(4)} points="125.34 0 5.59 87.7 125.81 126.47 125.34 0"/>
        </svg> 
      </span>
      </CSSTransition>
    )
  }
}

