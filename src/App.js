import React, { Component } from 'react';
import {HashRouter} from 'react-router-dom';
import ReduxWrapper from './pages/reduxWrapper.js';
import { withRouter } from 'react-router-dom';
import './styles/index.sass';
import PageResolver from './pages/pageResolver.js';


function App() {
  return (
    <HashRouter>
      <ReduxWrapper/>
    </HashRouter>
  );
}


export default App;

// Root.propTypes = {
//   store: PropTypes.object.isRequired
// }
