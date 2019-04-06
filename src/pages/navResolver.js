import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import classnames from 'classnames';

//////////////////////////////////////////////////
//
// Nav Resolver
//
//////////////////////////////////////////////////

export class NavResolver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasScrolled: false
    }
    this.throttledHandleScroll = throttle(this.handleScroll, 100); 
  }

  componentDidMount() {
    window.addEventListener('scroll', this.throttledHandleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledHandleScroll);
  }

  handleScroll = (e) => {
    console.log('scroll', window.scrollY);
    if(window.scrollY <= 1) {
      this.setState((prevState, props) => {
        if(prevState.hasScrolled) {
          return {hasScrolled: false}
      }})
    } else {
      this.setState((prevState, props) => {
        if(!prevState.hasScrolled) {
          return {hasScrolled: true}
      }})
    }
  }

  defineRoutes = () => {
    let { location, prevLocation} = this.props; 
    let pageIsAbout = (location && location.pathname === '/about'); 
    let pageIsSelector = (location && location.pathname === '/selector'); 
    let pageIsMobile = (location && location.pathname === '/mobile'); 
    let titleLinkDestination = '/selector'; 
    this.aboutLinkDestination = '/about';
    
    if(pageIsAbout && prevLocation && prevLocation !== '/about') {
      this.aboutLinkDestination = prevLocation; 
    }
    else if(pageIsAbout) {
      this.aboutLinkDestination = '/selector';
    }
    if(pageIsSelector) {
      titleLinkDestination = '/selector';
    }
    else if(pageIsMobile) {
      titleLinkDestination = '/mobile'; 
    }
  
    this.titleLink = (
      <NavLink className='title-link unbuttoned' to={titleLinkDestination}>
        {process.env.REACT_APP_PROJECT_TITLE}
      </NavLink>
    )
  
    if(pageIsMobile || pageIsSelector) {
      this.titleLink = (
        <button className='title-link unbuttoned' onClick={_ => window.scrollTo(0, 0)}>
          {process.env.REACT_APP_PROJECT_TITLE}
        </button>
      )
    }
  }

  render() {
    this.defineRoutes(); 

    return (
      <nav className={
        classnames(
          'navbar', 
          `${this.props.location.pathname.split('/')[1]}-page`,
          { scrolled: this.state.hasScrolled },
        )}
      >
        {this.titleLink}
        <NavLink className='about-link unbuttoned' to={this.aboutLinkDestination}>
          _ {/* Underscore is white, acts as sizer */}
          <span className='slider'>
            <span>Go Back</span><span>About</span>
          </span> 
        </NavLink>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    prevLocation: state.prevLocation,  
  }
}

export default connect(mapStateToProps)(NavResolver)
