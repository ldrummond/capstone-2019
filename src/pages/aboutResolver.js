import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'; 
import { connect } from 'react-redux'
let pubUrl = url => `${process.env.PUBLIC_URL}/assets/${url}`; 

class AboutResolver extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    return (
      <CSSTransition in={Boolean(this.props.aboutVisible)} timeout={300} classNames='toggle-about'>
        <div className='page-wrapper about-page'>
          <span className='content'>
            About Page
          </span>
        </div>
      </CSSTransition>
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

