import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

 function NavResolver(props) {
  let { history, aboutVisible = false, prevLocation, location} = props; 

  let routeIsAbout = (location && location.pathname === '/about'); 
  let aboutDestination = '/about'; 

  if(routeIsAbout && typeof(prevLocation) !== 'undefined') {
    aboutDestination = prevLocation.pathname
  } 
  else if (routeIsAbout) {
    aboutDestination = '/selector';
  }

  return (
    <div 
      className={
        classnames(
          'navbar', 
          'active', 
          `${location.pathname.split('/')[1]}-page`, 
          {light: location.pathname === '/about'}
      )}
    >
      <Link className='back-link unbuttoned' to='/selector'>{process.env.REACT_APP_PROJECT_TITLE}</Link>
      <Link className='about-link unbuttoned' to={aboutDestination}>About</Link>
    </div>
  )
}

export default NavResolver




// const mapStateToProps = state => {
//   return {aboutVisible: state.aboutVisible}
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     // hideAbout: history => {
//     //   dispatch({type: 'HIDE_ABOUT'});
//     //   history.push({search: ''});
//     //   window.scrollTo(0, 0);
//     // },
//     // showAbout: history => {
//     //   dispatch({type: 'SHOW_ABOUT'});
//     //   history.push({search: '?about=true'});
//     // }
//   }
// }