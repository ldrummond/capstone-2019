import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

 function NavResolver(props) {
  let { history, aboutVisible = false, hideAbout, showAbout} = props; 
  let classes = 'navbar'; 
  let aboutLink = (<a className='about-link' onClick={_ => props.showAbout(history)}>About</a>)

  if(aboutVisible) {
    classes += ' light'; 
    aboutLink = (<a className='about-link' onClick={_ => props.hideAbout(history)}>About</a>)
  }

  return (
    <div className={classes}>
      <Link to='/home'>Selector</Link>
      {aboutLink}
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