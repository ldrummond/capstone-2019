import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import AboutPage from '../pages/aboutPage.js';
import SelectorPage from '../pages/selectorPage.js'; 
import SimulationPage from '../pages/simulationPage.js'; 
import TransitionPage from '../pages/transitionPage.js'; 
import { TransitionGroup, CSSTransition } from "react-transition-group";

function PageResolver({location}) {
  console.log('resolver')
  const routes = [
    { path: '/about', name: 'About', Component: AboutPage },
    { path: '/selector', name: 'Home', Component: SelectorPage },
    { path: '/transition/:type', name: 'Transition', Component: TransitionPage },
    { path: '/simulation/:type', name: 'Simulation', Component: SimulationPage },
    // { path: '/simulation/traffic', name: 'Simulation', Component: SimulationPage },
    // { path: '/simulation/school', name: 'Simulation', Component: SimulationPage },
    // { path: '/simulation/colony', name: 'Simulation', Component: SimulationPage },
    // { path: '/simulation/crowds', name: 'Simulation', Component: SimulationPage },
    // { path: '/simulation/mold', name: 'Simulation', Component: SimulationPage },
    // { path: '/simulation/:type', name: 'Simulation', Component: SimulationPage },
  ]

  return(
    <React.Fragment>
      {/* <Redirect from="/" to='/about'/> */}
      {/* <Redirect from="/simulation" to='/simulation/traffic' /> */}
      {routes.map(({path, Component}) => (
        <Route key={path} exact path={path}>
          {({match}) => (
            <CSSTransition in={match != null} timeout={{enter: 666, exit: 333}} classNames="page" unmountOnExit>
              <Component />
            </CSSTransition>
          )}
        </Route>
      ))}
    </React.Fragment>
  )
}

export default PageResolver;