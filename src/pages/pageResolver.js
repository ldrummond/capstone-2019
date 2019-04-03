import React, { Suspense, lazy } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import MobileRedirect from '../components/mobileRedirect';
// const IntroPage = lazy(() => import('../pages/introPage'));
// const AboutPage = lazy(() => import('../pages/aboutPage'));
// const SelectorPage = lazy(() => import('../pages/selectorPage'));
// const SimulationPage = lazy(() => import('../pages/simulationPage'));
// const TransitionPage = lazy(() => import('../pages/transitionPage'));
// const MobilePage = lazy(() => import('../pages/mobilePage'));
import IntroPage from '../pages/introPage';
import AboutPage from '../pages/aboutPage';
import SelectorPage from '../pages/selectorPage'; 
import SimulationPage from '../pages/simulationPage'; 
import TransitionPage from '../pages/transitionPage'; 
import MobilePage from '../pages/mobilePage'; 

//////////////////////////////////////////////////
//
// Page Resolver
//
//////////////////////////////////////////////////

function PageResolver({location}) {
  const routes = [
    { path: '/', name: 'Intro', Component: IntroPage },
    { path: '/about', name: 'About', Component: AboutPage },
    { path: '/selector', name: 'Home', Component: SelectorPage },
    { path: '/transition/:type', name: 'Transition', Component: TransitionPage },
    { path: '/simulation/:type', name: 'Simulation', Component: SimulationPage },
    { path: '/mobile', name: 'Mobile', Component: MobilePage },
  ]
  const mobileWidth = 500; 

  return(
    <React.Fragment>
      <MobileRedirect></MobileRedirect>
      {routes.map(({path, Component}) => (
        <Route key={path} exact path={path}>
          {({match}) => (
            <CSSTransition 
              in={match != null} 
              timeout={{enter: 999, exit: 999}} 
              classNames={`page-transition`} 
              unmountOnExit
            >
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