import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AboutPage from '../pages/aboutPage';
import SelectorPage from '../pages/selectorPage'; 
import SimulationPage from '../pages/simulationPage'; 
import TransitionPage from '../pages/transitionPage'; 
import MobilePage from '../pages/mobilePage'; 
import MobileRedirect from '../components/mobileRedirect'

//////////////////////////////////////////////////
//
// Page Resolver
//
//////////////////////////////////////////////////

function PageResolver({location}) {
  const routes = [
    { path: '/about', name: 'About', Component: AboutPage },
    { path: '/selector', name: 'Home', Component: SelectorPage },
    { path: '/transition/:type', name: 'Transition', Component: TransitionPage },
    { path: '/simulation/:type', name: 'Simulation', Component: SimulationPage },
    { path: '/mobile', name: 'Mobile', Component: MobilePage },
    // { path: '/simulation/school', name: 'Simulation', Component: SimulationPage },
    // { path: '/simulation/colony', name: 'Simulation', Component: SimulationPage },
    // { path: '/simulation/crowds', name: 'Simulation', Component: SimulationPage },
    // { path: '/simulation/mold', name: 'Simulation', Component: SimulationPage },
    // { path: '/simulation/:type', name: 'Simulation', Component: SimulationPage },
  ]
  const mobileWidth = 500; 

  return(
    <React.Fragment>
      <MobileRedirect></MobileRedirect>
      {routes.map(({path, Component}) => (
        <Route key={path} exact path={path}>
          {({match}) => (
            <CSSTransition in={match != null} timeout={{enter: 666, exit: 333}} classNames="page" unmountOnExit>
              <Component />
            </CSSTransition>
          )}
        </Route>
      ))}
      <Switch>
        <Redirect exact from="/transition" to='/selector'/>
        <Redirect exact from="/simulation/" to='/simulation/traffic' />
      </Switch>
    </React.Fragment>
  )
}

export default PageResolver;