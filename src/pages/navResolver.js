import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

 function NavResolver(props) {
  let { history, aboutVisible = false, showAbout, hideAbout, match = {params: ['']}} = props; 

  // const thinArrow = 
  //   (<svg className='thin-arrow' viewBox="0 0 35 13">
  //     <line className="line" x1="25" y1="6.8" x2="0.76" y2="6.8"/>
  //     <polyline className="point" points="8.19 0.38 0.76 6.8 8.19 13.23"/>
  //   </svg>)

  // let pageType = match.params[0]; 
 
  let classes = 'navbar'; 

  let onAboutClick = _ => showAbout(history)
  if(aboutVisible) {
    classes += ' light'; 
    onAboutClick = _ => hideAbout(history)
  }

 
  return (
    <div className={classes}>
      <Link className='back-link' to='/selector'>{process.env.REACT_APP_PROJECT_TITLE}</Link>
      <button className='about-link unbuttoned' onClick={onAboutClick}>About</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavResolver)