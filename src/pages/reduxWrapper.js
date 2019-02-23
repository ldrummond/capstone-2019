import React, { Component } from 'react';
import {Provider} from 'react-redux';
import createStoreFromPath from '../redux/store'; 
import { Route, withRouter } from 'react-router-dom';
import NavResolver from './navResolver'; 
import PageResolver from './pageResolver';
import AboutResolver from './aboutResolver'; 
import BackgroundResolver from './backgroundResolver'; 
import { getQueryParamsFromLocation } from '../components/helper-functions.js';


class ReduxWrapper extends Component{
  constructor(props) {
    super(props)


    // Checks if the url is a simulation, then initializes the store with that sim. 
    let simRegex = /\/simulation\/([A-Za-z]+)/
    let matches = props.location.pathname.match(simRegex); 
    let simulationPath; 

    if(matches && matches.length > 0 && typeof(matches[1]) != 'undefined') {
      simulationPath = matches[1]; 
    } 

    // Checks if the about query param is active, and initializes the store with that param. 
    let params = getQueryParamsFromLocation(props.location)

    // Creates the store.
    // This is then provided to the rest of the app. 
    this.store = createStoreFromPath(simulationPath, params.about); 
  }
  
  render() {
    let {location} = this.props; 
    return(
      <Provider store={this.store}>
        <div className='app'>
          <Route path='/(selector|simulation|about)' component={NavResolver}></Route>
          <AboutResolver location={location}/>
          <PageResolver location={location}/>
          <BackgroundResolver location={location}/>
        </div>
      </Provider>
    )
  }
}

export default withRouter(ReduxWrapper)