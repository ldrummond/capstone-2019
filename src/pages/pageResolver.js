import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';
import MobileRedirect from '../components/mobileRedirect';
// const IntroPage = lazy(() => import('../pages/introPage'));
// const AboutPage = lazy(() => import('../pages/aboutPage'));
// const SelectorPage = lazy(() => import('../pages/selectorPage'));
// const SimulationPage = lazy(() => import('../pages/simulationPage'));
// const MobilePage = lazy(() => import('../pages/mobilePage'));
import IntroPage from '../pages/introPage';
import AboutPage from '../pages/aboutPage';
import SelectorPage from '../pages/selectorPage'; 
import TransitionPage from '../pages/transitionPage'; 
import SimulationPage from '../pages/simulationPage'; 
import MobilePage from '../pages/mobilePage'; 

//////////////////////////////////////////////////
//
// Page Resolver
//
//////////////////////////////////////////////////

function PageResolver({prevLocation, location}) {
  const routes = [
    { path: '/', name: 'Intro', Component: IntroPage },
    { path: '/about', name: 'About', Component: AboutPage },
    { path: '/selector', name: 'Home', Component: SelectorPage },
    { path: '/transition/:type', name: 'Transition', Component: TransitionPage },
    { path: '/simulation/:type', name: 'Simulation', Component: SimulationPage },
    { path: '/mobile', name: 'Mobile', Component: MobilePage },
  ]

  const transitionTime = 2200; 
  let prevPath = prevLocation.split('/')[1] !== location.pathname.split('/')[1] ? prevLocation.split('/')[1] : 'undef';
  return(
    <React.Fragment>
      <MobileRedirect></MobileRedirect>
      {routes.map(({path, Component}) => {
        return (
        <Route key={path} exact path={path}>
          {({match}) => (
            <CSSTransition 
              in={match != null} 
              // timeout={{enter: 10000, exit: 10000}} 
              timeout={{enter: transitionTime, exit: transitionTime}} 
              classNames={`${prevPath}-prev page-transition`}
              // classNames={`transition-to-${match && match.path.split('/')[1] || location.pathname.split('/')[1]}`} 
              unmountOnExit
            >
              <Component />
            </CSSTransition>
          )}
        </Route>)
      })}
      <Switch>
        <Redirect exact from="/transition/" to='/selector' />
        <Redirect exact from="/simulation/" to='/simulation/traffic' />
      </Switch>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    prevLocation: state.prevLocation,  
  }
}

export default connect(mapStateToProps)(PageResolver);