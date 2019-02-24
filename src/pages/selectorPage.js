import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { ReactComponent as Arrow } from '../assets/arrow.svg'; 
import { ReactComponent as Pentagon } from '../assets/pentagon.svg'; 
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PentagonWheel } from '../components/pentagon-wheel'

class SelectorPage extends Component {
  constructor(props) {
    super(props)
    console.log(props.wheelIndex)
  }

  render() {
    let {prevSystem, curSystem, nextSystem, onPrevClick, onNextClick, wheelIndex} = this.props
    let rotation = 360 / 5 * wheelIndex - 18;
    return (
      <div className='page-wrapper selector-page'>
        <span className='content'>
          {/* <span className='pentagon-container'>
            <Pentagon style={{transform: `rotate(${rotation}deg)`}}/>
          </span> */}
          <PentagonWheel/>
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