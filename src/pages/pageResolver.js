import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import LoaderPage from '../pages/loaderPage.js'; 
import AboutPage from '../pages/aboutPage.js'; 
import SelectorPage from '../pages/selectorPage.js'; 
import SimulationPage from '../pages/simulationPage.js'; 
import NoMatchPage from '../pages/noMatchPage'; 
import { TransitionGroup, CSSTransition } from "react-transition-group";

function PageResolver({location}) {
  return(
    <TransitionGroup className="app">
      <CSSTransition key={location.pathname} timeout={{enter: 300, exit: 300}} classNames='fade'>
        <Switch location={location}>
          <Route path="/home" component={LoaderPage} />
          <Route path="/selector" component={SelectorPage} />
          <Route path="/simulation/:type" component={SimulationPage} />
          <Redirect from="/simulation" to='/simulation/traffic' />
          <Route path="/about" component={AboutPage} />
          <Redirect from="/" to="selector" />
          <Route component={NoMatchPage} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default PageResolver;