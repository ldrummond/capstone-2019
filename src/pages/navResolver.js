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
  let titleLinkDestination = '/selector'; 
  
 
  if(pageIsAbout && prevLocation && prevLocation !== '/about') {
    aboutLinkDestination = prevLocation; 
  }
  else if(pageIsAbout) {
    aboutLinkDestination = '/selector';
  }

  if(pageIsSelector) {
    titleLinkDestination = '/selector';
  }
  else if(pageIsMobile) {
    titleLinkDestination = '/mobile'; 
  }

  let titleLink = (
    <NavLink className='title-link unbuttoned' to={titleLinkDestination}>
      {process.env.REACT_APP_PROJECT_TITLE}
    </NavLink>
  )

  if(pageIsMobile || pageIsSelector) {
    titleLink = (
      <a className='title-link unbuttoned' onClick={_ => window.scrollTo(0, 0)}>
        {process.env.REACT_APP_PROJECT_TITLE}
      </a>
    )
  }

  return (
    <nav className={
      classnames('navbar', 
      {active: location.pathname.split('/')[1]}, 
      `${location.pathname.split('/')[1]}-page`)}
    >
      {titleLink}
      <NavLink className='about-link unbuttoned' to={aboutLinkDestination}>
        <span className='slider' style={{transform: `translateY(${pageIsAbout ? 0 : -50}%)`}}>
          <span>Go Back</span><span>About</span>
        </span> 
      </NavLink>
    </nav>
  )
}

// function TitleLink(props) {
//   let {colors = []} = props;
//   while(colors.length < 5) {
//     colors.push(`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`);
//   }
//   return (
//     <Link className='title-link unbuttoned' to='/selector'>
//       {props.children}
//       <span className='color-underline' style={{display: 'flex'}}>
//         {colors.map(color => 
//           <div style={{background: color, width: `${1/colors.length*100}%`, height: '100%'}} key={color}></div>
//         )}
//       </span>
//     </Link>
//   )
// }

const mapStateToProps = state => {
  return {
    prevLocation: state.prevLocation,  
  }
}

export default connect(mapStateToProps)(NavResolver)
