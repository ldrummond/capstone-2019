import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { ReactComponent as Arrow } from '../assets/arrow.svg'; 
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PentagonWheel from '../components/pentagonWheel'
import { SvgOutline } from '../components/svgOutline'

class SelectorPage extends Component {
  render() {
    // let {prevSystem, curSystem, nextSystem, onPrevClick, onNextClick, wheelIndex} = this.props
    let {curSystem, onPrevClick, onNextClick, wheelIndex} = this.props

    return (
      <div className='page-wrapper selector-page'>
        <span className='content'>
          <PentagonWheel {...this.props} wheelIndex={wheelIndex}/>
          <span className='arrows-container'>
            <SvgOutline component={Arrow} onClick={onPrevClick} color='black'/>
            <SvgOutline component={Arrow} onClick={onNextClick} color='black' style={{transform: 'rotate(180deg)'}}/>
          </span>
            <span className='option-container'>
              <TransitionGroup component={null}>
                <CSSTransition key={curSystem.path} timeout={{enter: 333, exit: 666}} classNames='rotate'>
                  <Link to={`/transition/${curSystem.path}`} className='option-inner'>
                      <h1 className='title'>{curSystem.question}</h1>
                    <span className='subtitle'>
                      <h4>system</h4>
                      <h3 className='index'>{curSystem.index + 1}/5</h3>
                    </span>
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
    prevSystem: state.prevSystem,
    wheelIndex: state.wheelIndex, 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPrevClick: id => {
      dispatch({type: 'WHEEL_UP'}); 
    },
    onNextClick: id => {
      dispatch({type: 'WHEEL_DOWN'}); 
    },
  }
}

SelectorPage = connect(mapStateToProps, mapDispatchToProps)(SelectorPage)

export default SelectorPage