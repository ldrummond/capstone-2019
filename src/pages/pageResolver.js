import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import AboutPage from '../pages/aboutPage.js';
// import LoaderPage from '../pages/loaderPage.js'; 
import SelectorPage from '../pages/selectorPage.js'; 
import SimulationPage from '../pages/simulationPage.js'; 
import TransitionPage from '../pages/transitionPage.js'; 
import { TransitionGroup, CSSTransition } from "react-transition-group";

function PageResolver({location}) {
  return(
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} timeout={{enter: 666, exit: 333}} classNames='fade'>
        <Switch location={location}>
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/selector" component={SelectorPage} />
          <Route path="/transition/:type" component={TransitionPage} />
          <Route path="/simulation/:type" component={SimulationPage} />
          <Redirect from="/simulation" to='/simulation/traffic' />
          <Redirect from="/" to='/about'/>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default PageResolver;