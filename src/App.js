import React from 'react';
import {HashRouter} from 'react-router-dom';
import ReduxWrapper from './pages/reduxWrapper.js';
import './styles/index.sass';

function App() {
  return (
    <HashRouter>
      <ReduxWrapper/>
    </HashRouter>
  );
}

export default App;
