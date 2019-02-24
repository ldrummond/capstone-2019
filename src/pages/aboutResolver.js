import React, { Component } from 'react';
import { Transition } from 'react-transition-group'; 
import { connect } from 'react-redux'
let pubUrl = url => `${process.env.PUBLIC_URL}/assets/${url}`; 

const duration = 300; 

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0, display: 'block' },
  entered:  { opacity: 1, display: 'block' },
  exited: {opacity: 0, display: 'none' }
};

class AboutResolver extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Transition in={Boolean(this.props.aboutVisible)} timeout={duration} classNames='toggle-about'>
        {(state) => (
          <div className='page-wrapper about-page' style={{...defaultStyle, ...transitionStyles[state]}}>
            <span className='content'>
              About Page
            </span>
          </div>
        )}
      </Transition>
    );
  }
}

const mapStateToProps = state => {
  return {
    nextSystem: state.nextSystem,
    curSystem: state.curSystem,
    prevSystem: state.prevSystem,
    aboutVisible: state.aboutVisible,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNextClick: id => {
      dispatch({type: 'NEXT_SYSTEM'}); 
    },
    onPrevClick: id => {
      dispatch({type: 'PREV_SYSTEM'}); 
    }
  }
}

AboutResolver = connect(mapStateToProps, mapDispatchToProps)(AboutResolver)
export default AboutResolver

