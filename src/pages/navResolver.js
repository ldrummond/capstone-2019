import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

 function NavResolver(props) {
  let { history, aboutVisible = false, hideAbout, showAbout} = props; 
  let classes = 'navbar'; 
  
  let onAboutClick = _ => props.showAbout(history)

  if(aboutVisible) {
    classes += ' light'; 
    onAboutClick = _ => props.hideAbout(history)
  }

  const thinArrow = 
    (<svg className='thin-arrow' viewBox="0 0 35 13">
      <line className="line" x1="25" y1="6.8" x2="0.76" y2="6.8"/>
      <polyline className="point" points="8.19 0.38 0.76 6.8 8.19 13.23"/>
    </svg>)

  return (
    <div className={classes}>
      <Link className='back-link' to='/selector'>{thinArrow}Back</Link>
      <a className='about-link' onClick={onAboutClick}>About</a>
    </div>
  )
}

const mapStateToProps = state => {
  return {aboutVisible: state.aboutVisible}
}

const mapDispatchToProps = dispatch => {
  return {
    hideAbout: history => {
      dispatch({type: 'HIDE_ABOUT'});
      history.push({search: ''});
      window.scrollTo(0, 0);
    },
    showAbout: history => {
      dispatch({type: 'SHOW_ABOUT'});
      history.push({search: '?about=true'});
    }
  }
}

NavResolver = connect(mapStateToProps, mapDispatchToProps)(NavResolver)

export default NavResolver