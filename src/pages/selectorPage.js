import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { ReactComponent as Arrow } from '../assets/arrow.svg'; 
import { ReactComponent as Pentagon } from '../assets/pentagon.svg'; 
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from "react-transition-group";

class SelectorPage extends Component {
  constructor(props) {
    super(props)
  
  }

  render() {
    let {prevSystem, curSystem, nextSystem, onPrevClick, onNextClick} = this.props
    let rotation = 360 / 5 * curSystem.index - 18;
    return (
      <div className='page-wrapper selector-page'>
        <span className='content'>
          <span className='pentagon-container'>
            <Pentagon style={{transform: `rotate(${rotation}deg)`}}/>
          </span>
          <span className='arrows-container'>
            <Arrow onClick={onPrevClick}/>
            <Arrow onClick={onNextClick}/>
          </span>
            <span className='option-container'>
              <TransitionGroup component={null}>
                <CSSTransition key={curSystem.index} timeout={{enter: 150, exit: 100}} classNames='fade'>
                  <Link to={`/transition/${curSystem.path}`} className='option-inner'>
                      <h1 className='title'>{curSystem.question}</h1>
                    <span className='subtitle'>
                      <h4>system</h4>
                      <h3 className='index'>{curSystem.index + 1}/5</h3>
                    </span>
                    <img className='cover-image' src={curSystem.coverImage.src}></img>
                  </Link>
                </CSSTransition>
              </TransitionGroup>
            </span>
        </span>
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