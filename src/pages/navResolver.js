import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReactComponent as ArrowSmall } from '../assets/arrow-small.svg'; 
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
    this.props.setHasScrolled(false);
    window.removeEventListener('scroll', this.throttledHandleScroll);
  }

  handleScroll = (e) => {
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
    let pageIsAbout,
      pageIsMobile;

    if(location) {
      pageIsAbout = (location.pathname === '/about'); 
      pageIsMobile = (location.pathname === '/mobile'); 
      this.pageIsSimulation = (location.pathname.split('/')[1] === 'simulation'); 
      this.pageIsTransition = (location.pathname.split('/')[1] === 'transition'); 
      this.pageIsSelector = (location.pathname === '/selector'); 
    }
    this.titleLinkDestination = '/selector'; 
    this.aboutLinkDestination = '/about';
    
    if(pageIsAbout && prevLocation && prevLocation !== '/about') {
      this.aboutLinkDestination = prevLocation; 
    }
    else if(pageIsAbout) {
      this.aboutLinkDestination = '/selector';
    }
    if(this.pageIsSelector) {
      this.titleLinkDestination = '/selector';
    }
    else if(pageIsMobile) {
      this.titleLinkDestination = '/mobile'; 
    }
  }

  render() {
    this.defineRoutes(); 

    return (
      <nav className={
        classnames('navbar', 
          `${this.props.location.pathname.split('/')[1] || 'intro'}-page`,
          { scrolled: this.state.hasScrolled || this.props.pageHasScrolled,
            inactive: this.pageIsTransition},
        )}
      >
        {/* Top Left Link */}
        <NavLink className='title-link unbuttoned' 
          to={this.titleLinkDestination} 
          onClick={_ => window.scrollTo(0, 0)}
          replace={this.pageIsSelector}
          style={{pointerEvents: this.props.isTransitioning ? 'none' : 'auto'}}
        >
          <div className={classnames('link-inner', {active: this.pageIsSimulation})}>
            <div></div>
            {/* <div>{'\u2190'}</div> */}
            <div>{process.env.REACT_APP_PROJECT_TITLE}</div>
          </div>
        </NavLink>
        {/* Top Right Link */}
        <NavLink 
          className='about-link unbuttoned' 
          to={this.aboutLinkDestination}
          style={{pointerEvents: this.props.isTransitioning ? 'none' : 'auto'}}

        >
          <div className='link-inner'>
            <div>Go Back</div><div>About</div>
          </div>
        </NavLink>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    pageHasScrolled: state.pageHasScrolled, 
    prevLocation: state.prevLocation, 
    isTransitioning: state.isTransitioning,  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setHasScrolled: hasScrolled => {
      dispatch({type: 'SCROLL_CHANGE', pageHasScrolled: hasScrolled}); 
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavResolver)
