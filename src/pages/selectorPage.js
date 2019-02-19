import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import NavBar from '../components/nav.js'; 
import Picture from '../components/picture.js'; 
import data from '../data/data.js'; 
import circle from '../assets/circle.png'; 
import arrow from '../assets/arrow.svg'; 
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from "react-transition-group";


class SelectorPage extends Component {
  constructor(props) {
    super(props)
  
    // console.log(this.props);
  }

  render() {
    let {prevSystem, curSystem, nextSystem, onPrevClick, onNextClick} = this.props
    return (
      <div className='page-wrapper selector-page'>
        <button onClick={onPrevClick}>PREV SYSTEM</button>
        <button onClick={onNextClick}>NEXT SYSTEM</button>
        <NavBar/>
        {/* <TransitionGroup> */}
          {/* <CSSTransition key={curSystem.path} timeout='300' classNames='fade'> */}
            <span className='option-container'>
              <Link to={`/simulation/${curSystem.path}`} className='option-inner'>
                <h1 className='title'>{curSystem.question}</h1>
                <span className='subtitle'>
                  <h4>system</h4>
                  <h3 className='index'>{curSystem.index + 1}/5</h3>
                </span>
                <img className='cover-image' src={curSystem.coverImage.src}></img>
              </Link>
            </span>
          {/* </CSSTransition> */}
          {/* <Wheel/>  */}
          <span className='arrows'>
            {arrow}
            {arrow}
          </span>
          <span className='pentagon-container'>
            {pentagon}
          </span>
      {/* </TransitionGroup> */}
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nextSystem: state.nextSystem,
    curSystem: state.curSystem,
    prevSystem: state.prevSystem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNextClick: id => {
      dispatch({type: 'NEXT_SYSTEM'}); 
    },
    onPrevClick: id => {
      dispatch({type: 'PREV_SYSTEM'}); 
    }
  }
}

SelectorPage = connect(mapStateToProps, mapDispatchToProps)(SelectorPage)

export default SelectorPage





class NextButton extends Component {

}

class Wheel extends Component {
  render() {
    return (
      <div className="wheel-selector">

      </div>
    )
  }
}

const pentagon = (
  <svg className='pentagonIcon' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    viewBox="0 0 240.6 227.9">
    <polygon className='p1' points="46.3,227.5 194,227.5 120.3,126.5 "/>
    <polygon className='p2' points="0.2,87.3 45.9,227.9 120.3,126.5 "/>
    <polygon className='p3' points="194.3,227.5 240.4,87.3 120.3,126.5 "/>
    <polygon className='p4' points="120.3,0 120.3,126.5 240.6,87.4 "/>
    <polygon className='p5' points="120.3,0 0,87.4 120.3,126.5 "/>
  </svg>)