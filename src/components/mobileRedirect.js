import React, { Component } from 'react';
import { Switch, Redirect, withRouter } from 'react-router-dom';
import throttle from 'lodash/throttle';

//////////////////////////////////////////////////
//
// Mobile Redirect
//
//////////////////////////////////////////////////

class MobileRedirect extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };

    this.throttleResize = throttle(this.handleWindowSizeChange, 333);
  }
  
  componentWillMount() {
    window.addEventListener('resize', this.throttleResize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.throttleResize);
  }
  
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth, resize: true });
  };
  
  render() {
    const { location: curLocation } = this.props;
    const { width } = this.state;

    let locationIsMobile = curLocation.pathname === '/mobile'; 
    let locationIsAbout = curLocation.pathname === '/about';
    let locationShouldBeMobile = width < 480;

    if(locationIsAbout) {
      return null
    }

    // If not already mobile, but should be, redirect to mobile. 
    if(!locationIsMobile && locationShouldBeMobile) {
      return (
        <Switch>
          <Redirect from='/' to='/mobile' />
          <Redirect from='/transition' to='/mobile' />
          <Redirect from='/selector' to='/mobile' />
          <Redirect from='/simulation' to='/mobile' />
        </Switch> 
      )
    }

    // If location is mobile, but page is larger, redirect to desktop.
    if(locationIsMobile && !locationShouldBeMobile) {
      return (
        <Redirect from='/mobile' to='/selector' />
      )
    }

    // If should be and is mobile, return null. 
    if(locationIsMobile && locationShouldBeMobile) {
      return null; 
    }

    // If not mobile, and shouldnt be, stay not mobile. 
    if(!locationIsMobile && !locationShouldBeMobile) {
      return null 
    } 
  } 
}


export default withRouter(MobileRedirect)