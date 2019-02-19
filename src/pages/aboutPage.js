import React, { Component } from 'react';
// import $ from 'jquery'; 
import { connect } from 'react-redux'

import NavBar from '../components/nav.js'; 

let pubUrl = url => `${process.env.PUBLIC_URL}/assets/${url}`; 

class AboutPage extends Component {
  constructor(props) {
    super(props)
    // console.log(props)
  }

  render() {
    return (
      <div className='page-wrapper about-page'>
        <NavBar />
        About Page
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nextSystem: state.nextSystem,
    curSystem: state.curSystem,
    prevSystem: state.prevSystem
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

AboutPage = connect(mapStateToProps, mapDispatchToProps)(AboutPage)

export default AboutPage

