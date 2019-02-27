import React, { Component } from 'react';
import { Transition } from 'react-transition-group'; 
import { connect } from 'react-redux'

const duration = 300; 

const defaultStyle = {
  display: 'block',
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entered:  { opacity: 1, },
  exited: { display: 'none'}
};

class AboutResolver extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Transition in={Boolean(this.props.aboutVisible)} timeout={{enter: 0, exit: duration}} classNames='toggle-about'>
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

