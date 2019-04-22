import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import NavResolver from './navResolver'; 
import PageResolver from './pageResolver';
import BackgroundResolver from './backgroundResolver'; 

//////////////////////////////////////////////////
//
// Content Wrapper
//
//////////////////////////////////////////////////

class ContentWrapper extends Component{
  constructor(props) {
    super(props)

    // Checks if the url is a simulation, then initializes the store with that sim. 
    let simRegex = /\/(simulation|transition)\/([A-Za-z]+)/
    let matches = props.location.pathname.match(simRegex); 
    let simulationPath; 

    if(matches && matches.length > 0 && typeof(matches[2]) != 'undefined') {
      simulationPath = matches[2]; 
      // console.log('wrapper constructor', 'update');
      props.updateCurrentSystem(simulationPath);
    } 
    // Forces restart of experience
    // props.history.push('/');
  }

  componentWillReceiveProps(nextProps) {
    // HOOK INTO ROUTE UPDATES

    // Starts a transition timeout to block navigation until transitions resolve
    this.props.onTransitionStart(); 
    setTimeout(_ => {
      this.props.onTransitionEnd(); 
    }, (2200 * 2));

    // Tracking previous location and scroll position
    if(this.props.location && nextProps && nextProps.location && this.props.location !== nextProps.location) {
      this.props.updatePrevLocation(this.props.location.pathname); 
      this.props.setHasScrolled(false);
    }
  }

  render() {
    let {location} = this.props;

    return(
      <div className='app'>
        <NavResolver location={location}/>
        <PageResolver location={location}/>
        <BackgroundResolver location={location}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    prevLocation: state.prevLocation,  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCurrentSystem: path => {
      dispatch({type: 'SYSTEM_FROM_PATH', path: path}); 
    },
    updatePrevLocation: prevLocation => {
      dispatch({type: 'SET_PREV_LOCATION', prevLocation: prevLocation}); 
    },
    setHasScrolled: hasScrolled => {
      dispatch({type: 'SCROLL_CHANGE', pageHasScrolled: hasScrolled}); 
    },
    onTransitionStart: _ => {
      dispatch({type: 'START_TRANSITION'}); 
    },
    onTransitionEnd: _ => {
      dispatch({type: 'END_TRANSITION'}); 
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentWrapper))