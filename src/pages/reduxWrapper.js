import React, { Component } from 'react';
import {Provider} from 'react-redux';
import createStoreFromPath from '../redux/store'; 
import { withRouter } from 'react-router-dom';
import PageResolver from './pageResolver';
import background from '../assets/backgroundTest.jpg'; 

class ReduxWrapper extends Component{
  constructor(props) {
    super(props)

    // console.log(props, "reduxwrapper")

    // Checks if the url is a simulation, then initializes the store with that sim. 
    let simRegex = /\/simulation\/([A-Za-z]+)/
    let matches = props.location.pathname.match(simRegex); 

    if(matches && matches.length > 0 && typeof(matches[1]) != 'undefined') {
      let simulationType = matches[1]; 
      this.store = createStoreFromPath(simulationType);
    } else {
      this.store = createStoreFromPath(); 
    }
  }
  
  render() {
    let {location} = this.props; 
    return(
      <Provider store={this.store}>
        <PageResolver location={location}/>
        {/* <img className='background-texture' src={background}></img>         */}
      </Provider>
    )
  }
}

export default withRouter(ReduxWrapper)