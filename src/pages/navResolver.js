import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import data from '../data/data'

 function NavResolver(props) {
  let { history, prevLocation, location} = props; 
  let colors = data.systems.map(system => system.color);    
     
  let routeIsAbout = (location && location.pathname === '/about'); 
  let aboutDestination = '/about'; 

  if(routeIsAbout && typeof(prevLocation) !== 'undefined') {
    aboutDestination = prevLocation.pathname
  } 
  else if (routeIsAbout) {
    aboutDestination = '/selector';
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
      <NavLink className='back-link unbuttoned' to='/selector'>{process.env.REACT_APP_PROJECT_TITLE}</NavLink>
      <NavLink className='about-link unbuttoned' to={aboutDestination}>About</NavLink>
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

export default NavResolver