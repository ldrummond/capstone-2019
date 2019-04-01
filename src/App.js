import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import ContentWrapper from './pages/contentWrapper';
// import ContentWrapper from './pages/contentWrapper';
import './styles/index.sass';

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <ContentWrapper/>
      </Provider>
    </HashRouter>
  );
}

export default App;
