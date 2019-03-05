import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import LoaderPage from '../pages/loaderPage.js'; 
import SelectorPage from '../pages/selectorPage.js'; 
import SimulationPage from '../pages/simulationPage.js'; 
import TransitionPage from '../pages/transitionPage.js'; 
import NoMatchPage from '../pages/noMatchPage'; 
import { TransitionGroup, CSSTransition } from "react-transition-group";

function PageResolver({location, history}) {
  return(
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} timeout={{enter: 300, exit: 300}} classNames='fade'>
        <Switch location={location}>
          <Route path="/home" component={LoaderPage} />
          <Route path="/selector" component={SelectorPage} />
          <Route path="/transition/:type" component={TransitionPage} />
          <Route path="/simulation/:type" component={SimulationPage} />
          <Redirect from="/simulation" to='/simulation/traffic' />
          <Redirect from="/" to="selector" />
          <Route component={NoMatchPage} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default PageResolver;