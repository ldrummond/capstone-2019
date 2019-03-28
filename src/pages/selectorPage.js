import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { ReactComponent as Arrow } from '../assets/arrow.svg'; 
import { ReactComponent as Squiggle } from '../assets/squiggle.svg'; 
import Pentagon from '../components/pentagonSvg';
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SelectorPentagon from '../components/selectorPentagon';
import SvgOutline  from '../components/svgOutline';
import ButtonWrapper from '../components/buttonWrapper';
import { throttle } from '../components/helperFunctions'; 
import data from '../data/data';

class SelectorPage extends Component {
  constructor() {
    super()
    this.state = {
      mounted: false, 
    }
  }

  componentDidMount() {
    this.setState({mounted: true});
  }

  render() {
    // let {prevSystem, curSystem, nextSystem, onPrevClick, onNextClick, wheelIndex} = this.props
    let {curSystem, onPrevClick, onNextClick, wheelIndex, prevWheelIndex, lastChange} = this.props
    const rotateUp = wheelIndex > prevWheelIndex;

    return (
      <div className='page-wrapper selector-page'>
        <span className='content'>
          <Pentagon 
            wheelIndex={wheelIndex} 
            curIndex={curSystem.index}
            colors={data.systems.map(system => system.color)} 
            onPrevClick={throttle(onPrevClick, lastChange, 500)}
            onNextClick={throttle(onNextClick, lastChange, 500)}  
            in={this.state.mounted}
          />
          <span className='arrows-container'>
            <ButtonWrapper onClick={throttle(onPrevClick, lastChange, 500)} >
              <SvgOutline component={Arrow}  color='black'/>
            </ButtonWrapper>
            <ButtonWrapper onClick={throttle(onNextClick, lastChange, 500)}>
              <SvgOutline component={Arrow}  color='black' style={{transform: 'rotate(180deg)'}}/>
            </ButtonWrapper>
          </span>
            <span className='option-container'>
              <TransitionGroup component={null}>
                <CSSTransition 
                  key={curSystem.path} 
                  timeout={{enter: 450, exit: 300}} 
                  classNames='rotate'
                >
                  <Link to={`/transition/${curSystem.path}`} className='option-inner'>
                    <span className='squiggle-container'>
                      <Squiggle />
                    </span>
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
    prevWheelIndex: state.prevWheelIndex,  
    lastChange: state.lastChange, 
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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