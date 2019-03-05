import React, { Fragment } from 'react';
import {Route} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import background from '../assets/backgroundTest.jpg'; 
import { connect } from 'react-redux'
// import backgroundRepeat from '../assets/back-repeat.png'

function BackgroundResolver(props){
  const {location, curSystem = {}} = props;
  return(
    <TransitionGroup className={`background ${location.pathname.split('/')[1]}`}>
      <CSSTransition key={curSystem.coverImage.src} timeout={{enter: 666, exit: 333}} classNames='back'>
        <Route path="/(selector|transition|simulation)" render={_ => {
          let {coverImage = '', icon, color} = curSystem;
          let Icon = icon; 
          return(
            <Fragment>
              <div className='content'>
              {/* TODO: ALT */}
                <img className='system-image' alt='' src={coverImage.src}></img>
                <Icon className='system-icon' style={{fill: color}}/>
              </div>
              <img className='texture' alt='' src={background}></img>       
            </Fragment>
          )}
        }  
        />
      </CSSTransition>
    </TransitionGroup>
  )
}

const mapStateToProps = state => {
  return {curSystem: state.curSystem}
}

export default connect(mapStateToProps)(BackgroundResolver);

