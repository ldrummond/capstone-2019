import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import data from '../data/data'

//////////////////////////////////////////////////
//
// Nav Resolver
//
//////////////////////////////////////////////////

function NavResolver(props) {
  let { history, location, prevLocation} = props; 
  let pageIsAbout = (location && location.pathname === '/about'); 
  let pageIsSelector = (location && location.pathname === '/selector'); 
  let pageIsMobile = (location && location.pathname === '/mobile'); 

  let aboutLinkDestination = '/about';
  let backLinkDestination = '/selector'; 

  if(pageIsAbout && prevLocation) {
    aboutLinkDestination = prevLocation; 
  }
  else if (pageIsAbout) {
    aboutLinkDestination = '/selector';
  }

  if(pageIsSelector) {
    backLinkDestination = '/selector';
  }
  else if(pageIsMobile) {
    backLinkDestination = '/mobile'; 
  }

  // console.log('transition from:' + prevLocation + ', about link to : ' + aboutLinkDestination);
  // let colors = data.systems.map(system => system.color);    
  const scrollTop = function() {
    window.scrollTo(0, 0);
  }

  return (
    <nav 
      className={
        classnames(
          'navbar', 
          'active', 
          `${location.pathname.split('/')[1]}-page`, 
          {light: location.pathname === '/about'}
      )}
    >
      {/* <TitleLink colors={colors}>{process.env.REACT_APP_PROJECT_TITLE}</TitleLink> */}
      <NavLink className='back-link unbuttoned' to={backLinkDestination}>
        {process.env.REACT_APP_PROJECT_TITLE}
      </NavLink>
      <NavLink className='about-link unbuttoned' to={aboutLinkDestination}>About</NavLink>
    </nav>
  )
}

function TitleLink(props) {
  let {colors = []} = props;
  while(colors.length < 5) {
    colors.push(`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`);
  }
  return (
    <Link className='title-link unbuttoned' to='/selector'>
      {props.children}
      <span className='color-underline' style={{display: 'flex'}}>
        {colors.map(color => 
          <div style={{background: color, width: `${1/colors.length*100}%`, height: '100%'}} key={color}></div>
        )}
      </span>
    </Link>
  )
}

const mapStateToProps = state => {
  return {
    prevLocation: state.prevLocation,  
  }
}

export default connect(mapStateToProps)(NavResolver)