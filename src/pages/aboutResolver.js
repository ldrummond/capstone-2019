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
  entered:  { opacity: 1, zIndex: 10},
  exited: { pointerEvents: 'none', zIndex: -5}
};

class AboutResolver extends Component {
  constructor(props) {
    super(props)

    // The about Resolver hooks into page changes and the state of the resolver.
    // If the forward or back button is pressed with the 
    props.history.listen((location, action) => {
      if(action === 'POP' && props.aboutVisible) {
        props.hideSelf();
        console.log(location)
      }
    });
  }

  render() {
    return (
      <Transition in={Boolean(this.props.aboutVisible)} timeout={{enter: 0, exit: duration}} classNames='toggle-about'>
        {(state) => (
          <div className='about-overlay' style={{...defaultStyle, ...transitionStyles[state]}}>
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
    },
    hideSelf: id => {
      dispatch({type: 'HIDE_ABOUT'});
    }
  }
}

AboutResolver = connect(mapStateToProps, mapDispatchToProps)(AboutResolver)
export default AboutResolver

