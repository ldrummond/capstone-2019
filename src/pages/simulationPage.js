import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { ReactComponent as Squiggle } from '../assets/squiggle.svg'; 
import { ReactComponent as Arrow } from '../assets/arrow.svg'; 
import { ReactComponent as Pentagon } from '../assets/pentagon.svg'; 
import instructionPng from '../assets/instructionPng.png';
import { SimpleFade } from '../components/fadeWrapper';
import SimulationWrapper from '../simulations/simulationWrapper';
import SvgOutline from '../components/svgOutline';
import ButtonWrapper from '../components/buttonWrapper'
import { throttle } from '../components/helperFunctions'; 
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
      showOverlay: true,
      shouldRedirect: false, // allows Link throttling. 
    }

    this.fadeDuration = 333;
    // this.rafController = new RafController({fps: 60}); 
  }

  componentDidMount() {
    this.setState({mounted:true});
    // setTimeout(_ => {
    //   this.setState({showOverlay: false})
    // }, 0)
  }

  // onMouseMove = (e) => {
  //   if(this.rafController && this.rafController.ticker % 2 == 0) {
  //     this.setState({mouseX: e.clientX, mouseY: e.clientY});
  //   }
  // }

  render() {
    let {curSystem = {}, nextSystem = {}, onNextClick} = this.props; 
    // console.log('render', curSystem)
    
    let {
      index = 0, 
      question = "question", 
      description = "description", 
      rules = ["test", "test"], 
      path = 'path', 
      instructions = 'Chase the fish to see how they follow their neighbors, and avoid predators.',
    } = curSystem; 

    let {
      path: nextPath,
      nextButtonTitle = '',
    } = nextSystem; 

    return (
      <div className={classnames('page-wrapper', 'simulation-page', path)}>
      {/* <TransitionGroup component={null}> */}
      {/* <div className={classnames('page-wrapper', 'simulation-page', path)} onMouseMove={this.onMouseMove}> */}
        {/* <div className='pseudoCursor' style={{transform: `translate(${mouseX}px, ${mouseY}px)`}}></div> */}
        {/* <SimpleFade in={this.state.showOverlay} duration={333}> */}
        {/* {this.state.showOverlay && <span className='overlay'>
          <span className='inner'>
            <h3 className='title'>{instructions}</h3>
            <span className='instruction-graphic'>
              <img src={instructionPng} />
            </span>
          </span>
        </span>} */}
        <span className='content'>
          <section className='nav-placeholder'></section>
          <section className='description-panel'>
              <SimpleFade key={curSystem.question} shouldRender={this.state.mounted} duration={this.fadeDuration}>
                <h3 className='index'>{index + 1}/5</h3>
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
                {/* <h2 className='title'>Emergent System</h2>
                <h2 className='description'>{description}</h2>
                <h2 className='title'>Rules</h2>
                <h2 className='rules'>{rules}</h2> */}
                <Link to={`/selector`}>
                  <Pentagon style={{fill: 'none', stroke: 'black', strokeWidth: '2'}}/>
                </Link> 
              </SimpleFade>
          </section>
          <section className='simulation-panel'>
              <SimpleFade key={curSystem.path} shouldRender={this.state.mounted} duration={this.fadeDuration}>
                <SimulationWrapper curSystem={curSystem}/>
                <ButtonWrapper 
                  className='next-sim' 
                  onClick={
                    throttle(_ => {
                      onNextClick(); 
                      this.props.history.push(`/simulation/${nextPath}`);
                    }, this.props.lastChange, 999)} 
                  // onClick={throttle(_ => this.setState({shouldRedirect: true}), this.props.lastChange, 333)} 
                >
                  <h4>next</h4>
                  <h3>{nextButtonTitle}</h3>
                  <SvgOutline component={Arrow} color='black' style={{transform: 'rotate(180deg)'}}/>
                </ButtonWrapper>
              </SimpleFade>
              {/* {this.state.shouldRedirect &&
                <Redirect to={`/simulation/${nextPath}`} push/>
              } */}
          </section>
        </span>
          <CSSTransition key={curSystem.color} timeout={{enter: 999, exit: 999}} classNames='background'>
            <span className='sim-backgrounds'>
              <div className='color' style={{background: curSystem.color}}></div>
              <div className='texture'></div>
            </span>
          </CSSTransition>
      {/* </TransitionGroup> */}
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

