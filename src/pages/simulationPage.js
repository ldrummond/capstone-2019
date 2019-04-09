import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { ReactComponent as Squiggle } from '../assets/squiggle.svg'; 
import { ReactComponent as Arrow } from '../assets/arrow.svg'; 
import { ReactComponent as Pentagon } from '../assets/pentagon.svg'; 
import { SimpleFade } from '../components/fadeWrapper';
import SimulationWrapper from '../simulations/simulationWrapper';
import SvgOutline from '../components/svgOutline';
import ButtonWrapper from '../components/buttonWrapper'
import throttle from 'lodash/throttle';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classnames from 'classnames'; 

//////////////////////////////////////////////////
//
// Simulation Page
//
//////////////////////////////////////////////////

class SimulationPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mounted: false, 
      hideOverlay: false,
    }

    this.fadeDuration = 333;
    this.throttledNextClick = throttle(_ => {
      // console.log(props.nextSystem.path);
      props.history.push(`/simulation/${props.nextSystem.path}`);
      props.onNextClick(); 
    }, 999); 
  }

  componentDidMount() {
    this.setState({mounted:true});
  }

  handleOverlayClick = () => {
    clearTimeout(this.overlayTimeout);
    this.setState({hideOverlay: true});
  }

  handleQuestionClick = () => {
    clearTimeout(this.overlayTimeout);
    this.setState(prevState => {return {hideOverlay: !prevState.hideOverlay}})
  }

  componentDidUpdate(prevProps) {
    // If the simulation path changed, update hte simulation controller.
    if(prevProps.curSystem.path !== this.props.curSystem.path) {
      this.setState({hideOverlay: false})
    }
  }
  
  render() {
    let {curSystem = {}, nextSystem = {}, onNextClick} = this.props; 
    
    let {
      index = 0, 
      question = "question", 
      path = 'path', 
      instructions = 'Chase the fish to see how they follow their neighbors, and avoid predators.',
      instructionPng, 
    } = curSystem; 

    let {// path: nextPath,
      nextButtonTitle = '',
    } = nextSystem; 

    return (
      <div className={classnames('page-wrapper', 'simulation-page', path)}>
        <span className='content'>
          <section className='nav-placeholder'></section>
          <section className='description-panel'>
              <SimpleFade key={curSystem.question} shouldRender={this.state.mounted} duration={this.fadeDuration}>
                <h2 className='question'>{question}</h2>
                <Squiggle className='squiggle'/>
              </SimpleFade>
              <SimpleFade key={curSystem.description} shouldRender={this.state.mounted} duration={this.fadeDuration}>
                <h3 className='answer'>Answer</h3>
                {curSystem.interactions.map((interaction, v) => 
                  <h4 
                    key={`${curSystem.path}-interaction-${v}`} 
                    style={{transitionDelay: `${v * 333 + 999}ms`}}
                  >
                    {interaction}
                  </h4>
                )}
                <Link to={`/selector`}>
                  <Pentagon style={{fill: 'none', stroke: 'black', strokeWidth: '2'}}/>
                </Link> 
              </SimpleFade>
          </section>
          <section className={classnames('simulation-panel', {'overlay-hidden': this.state.hideOverlay})}>
              <SimpleFade key={curSystem.path} shouldRender={this.state.mounted} duration={this.fadeDuration}>
                <SimulationWrapper curSystem={curSystem}/>
                <div className='instructions-overlay' onClick={this.handleOverlayClick}>
                  <div className='overlay-inner'>
                    <span className='content'>
                      {/* <h3 className='index'>{index + 1}/5</h3> */}
                      {instructions}
                      <span className='instruction-graphic'>
                        <img src={instructionPng} alt='simulation_instruction_graphic'/>
                      </span>
                      <button className='close-button'><span>X</span></button>
                    </span>
                  </div>
                </div>
                <ButtonWrapper className='show-instructions-button' onClick={this.handleQuestionClick}>
                  ?
                </ButtonWrapper>
                <ButtonWrapper 
                  className='next-sim' 
                  onClick={ _ => {
                    this.props.history.push(`/simulation/${this.props.nextSystem.path}`);
                    this.props.onNextClick(); 
                  }}>
                  <h4>next</h4>
                  <h3>{nextButtonTitle}</h3>
                  <SvgOutline component={Arrow} color='black' style={{transform: 'rotate(180deg)'}}/>
                </ButtonWrapper>
              </SimpleFade>
          </section>
        </span>
        {/* <CSSTransition classNames='background' in={curSystem.color} timeout={{enter: 999, exit: 999}} > */}
          {/* <React.Fragment> */}
        <div className='color-front' style={{background: curSystem.color}}></div>
        <div className='texture'></div>
        <div className='color-back' style={{background: curSystem.color}}></div>
          {/* </React.Fragment> */}
        {/* </CSSTransition> */}
      </div>    
    );
  }
}

const mapStateToProps = state => {
  return {
    nextSystem: state.nextSystem,
    curSystem: state.curSystem,
    lastChange: state.lastChange,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNextClick: id => {
      dispatch({type: 'NEXT_SYSTEM'}); 
    },
    onPrevClick: id => {
      dispatch({type: 'PREV_SYSTEM'}); 
    },
    onPath: path => {
      dispatch({type: 'SYSTEM_FROM_PATH', path: path})
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SimulationPage))

