import React, { Fragment } from 'react';
import {Route, Switch} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import background from '../assets/backgroundTest.jpg'; 
import { connect } from 'react-redux'
import { ReactComponent as Pentagon } from '../assets/pentagon.svg'; 

function BackgroundResolver({location}){
  return(
    <TransitionGroup className={`background ${location.pathname.split('/')[1]}`}>
      <CSSTransition key={location.pathname} timeout={{enter: 300, exit: 300}} classNames='background-change'>
        <Switch location={location}>
          <Route path="/selector" component={BackgroundImage} />
          <Route path="/transition/:type" component={BackgroundImage} />
          <Route path="/simulation/:type" component={BackgroundImage}/>
          <Route render={_ => <img className='texture' src={background}></img>} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

function BackgroundImage(props) {
  let {curSystem = {}} = props;
  let {coverImage = ''} = curSystem; 

  return (
    <Fragment>
      <img className='system-image' src={coverImage.src}></img>
      <Pentagon className='system-icon'/>
      <img className='texture' src={background}></img>       
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    // nextSystem: state.nextSystem,
    curSystem: state.curSystem,
    // prevSystem: state.prevSystem
  }
}

BackgroundImage = connect(mapStateToProps)(BackgroundImage)



export default BackgroundResolver;

