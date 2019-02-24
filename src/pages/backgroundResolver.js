import React, { Fragment } from 'react';
import {Route, Switch} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import background from '../assets/backgroundTest.jpg'; 
import { connect } from 'react-redux'

function BackgroundResolver({location}){
  return(
    // <TransitionGroup className={`background ${location.pathname.split('/')[1]}`}>
    //   <CSSTransition key={location.pathname} timeout={{enter: 300, exit: 300}} classNames='background-change'>
    <div className={`background ${location.pathname.split('/')[1]}`}>
      <Switch location={location}>
        <Route path="/(selector|transition|simulation)" component={BackgroundImage} />
        <Route render={_ => <img className='texture' src={background}></img>} />
      </Switch>
    </div>
    //   </CSSTransition>
    // </TransitionGroup>
  )
}

function BackgroundImage(props) {
  let {curSystem = {}} = props;
  let {coverImage = '', icon, color} = curSystem;
  let Icon = icon; 

  return (
    <Fragment>
      <img className='system-image' src={coverImage.src}></img>
      <Icon className='system-icon' style={{fill: color}}/>
      <img className='texture' src={background}></img>       
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {curSystem: state.curSystem}
}

BackgroundImage = connect(mapStateToProps)(BackgroundImage)



export default BackgroundResolver;

