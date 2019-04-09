import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
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

  return(
    <React.Fragment>
      <MobileRedirect></MobileRedirect>
      {routes.map(({path, Component}) => {
        console.log('route-change-' + path)
        return (
        <Route key={path} exact path={path}>
          {({match}) => (
            <CSSTransition 
              in={match != null} 
              // timeout={{enter: 9000, exit: 9000}} 
              timeout={{enter: 1800, exit: 999}} 
              classNames={`page-transition`} 
              // classNames={`transition-to-${match && match.path.split('/')[1] || location.pathname.split('/')[1]}`} 
              unmountOnExit
            >
              <Component />
            </CSSTransition>
          )}
        </Route>)
      })}
      <Switch>
        <Redirect exact from="/transition" to='/selector'/>
        <Redirect exact from="/simulation/" to='/simulation/traffic' />
      </Switch>
    </React.Fragment>
  )
}

export default PageResolver;