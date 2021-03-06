import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import data from '../data/data';
import throttle from 'lodash/throttle';
import classnames from 'classnames';
// Asset and components
import { ReactComponent as Arrow } from '../assets/arrow.svg'; 
import { ReactComponent as Squiggle } from '../assets/squiggle.svg'; 
import PentagonSvg from '../components/pentagonSvg';
import SvgOutline  from '../components/svgOutline';
import ButtonWrapper from '../components/buttonWrapper';
import { SimpleFade } from '../components/fadeWrapper';

//////////////////////////////////////////////////
//
// Selector Page
//
//////////////////////////////////////////////////

class SelectorPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false, 
    }
    this.fadeDuration = 333;
    this.throttledPrevClick = throttle(props.onPrevClick, 500);
    this.throttledNextClick = throttle(props.onNextClick, 500);
  }

  componentDidMount() {
    this.setState({mounted: true});
  }

  render() {
    let {curSystem, wheelIndex, isHoveringSelector = false, onSelectionEnter, onSelectionExit} = this.props
    let destinationPath = `/transition/${curSystem.path}`;

    return (
      <div className={'page-wrapper selector-page'}>
        <section className={classnames('content', {'hovering-selector': isHoveringSelector})}>
          <PentagonSvg 
            wheelIndex={wheelIndex} 
            curIndex={curSystem.index}
            colors={data.systems.map(system => system.color)} 
            onPrevClick={this.throttledPrevClick}
            onCenterClick={_ => this.props.history.push(destinationPath)}
            onCenterHover={onSelectionEnter}
            onCenterLeave={onSelectionExit}
            onNextClick={this.throttledNextClick}  
            in={this.state.mounted}
          />
          <SimpleFade className='arrows-container' duration={this.fadeDuration} shouldRender={this.state.mounted}>
              <ButtonWrapper onClick={this.throttledPrevClick} >
                <SvgOutline component={Arrow}  color='black'/>
              </ButtonWrapper>
              <ButtonWrapper onClick={this.throttledNextClick}>
                <SvgOutline component={Arrow}  color='black' style={{transform: 'rotate(180deg)'}}/>
              </ButtonWrapper>
          </SimpleFade>
          <SimpleFade className='squiggle-container' duration={this.fadeDuration} shouldRender={this.state.mounted}>
            <Squiggle />
          </SimpleFade>
          <SimpleFade className='option-container' duration={this.fadeDuration} shouldRender={this.state.mounted}>
            <TransitionGroup component={null}>
              <CSSTransition 
                key={curSystem.path} 
                timeout={{enter: 450, exit: 300}} 
                classNames='rotate'
              >
                <Link to={destinationPath} className='option-inner' onMouseEnter={onSelectionEnter} onMouseLeave={onSelectionExit}>
                  <h1 className='title'>{curSystem.question}</h1>
                  <span className='subtitle'>
                    <h4>system</h4>
                    <h3 className='index'>{curSystem.index + 1}/5</h3>
                  </span>
                </Link>
              </CSSTransition> 
            </TransitionGroup>
          </SimpleFade>
          <div className='indicator' style={{backgroundColor: curSystem.color}}></div>
        </section>
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
    isHoveringSelector: state.isHoveringSelector
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPrevClick: _ => {
      dispatch({type: 'WHEEL_UP'}); 
    },
    onNextClick: _ => {
      dispatch({type: 'WHEEL_DOWN'}); 
    },
    onSelectionEnter: _ => {
      dispatch({type: 'SELECTION_ENTER'});
    },
    onSelectionExit: _ => {
      dispatch({type: 'SELECTION_EXIT'});
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SelectorPage))