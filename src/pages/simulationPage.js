import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { ReactComponent as Squiggle } from '../assets/squiggle.svg';
import { ReactComponent as Arrow } from '../assets/arrow.svg';
import { ReactComponent as Pentagon } from '../assets/pentagon.svg';
import { SimpleFade } from '../components/fadeWrapper';
import ColoredPentagonSvg from '../components/coloredPentagonSvg';
import SimulationWrapper from '../simulations/simulationWrapper';
import SvgOutline from '../components/svgOutline';
import ButtonWrapper from '../components/buttonWrapper'
import throttle from 'lodash/throttle';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import data from '../data/data';

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
    // setTimeout(_ => {
      this.setState({ mounted: true });
    // }, (0));
    this.overlayTimeout = setTimeout(_ => {
      this.setState({ hideOverlay: true });
    }, 9000)
  }

  handleOverlayClick = () => {
    clearTimeout(this.overlayTimeout);
    this.setState({ hideOverlay: true });
  }

  handleQuestionClick = () => {
    clearTimeout(this.overlayTimeout);
    this.setState(prevState => { return { hideOverlay: !prevState.hideOverlay } })
  }

  componentDidUpdate(prevProps) {
    // If the simulation path changed, update the simulation controller.
    if (prevProps.curSystem.path !== this.props.curSystem.path) {
      clearTimeout(this.overlayTimeout);
      this.setState({ hideOverlay: false })
      this.overlayTimeout = setTimeout(_ => {
        this.setState({ hideOverlay: true });
      }, 8000)
    }
  }

  render() {
    let { curSystem = {}, nextSystem = {}, onNextClick } = this.props;

    let {
      index = 0,
      question = "question",
      path = 'path',
      instructions = 'Chase the fish to see how they follow their neighbors, and avoid predators.',
      instructionPng,
      coverImage,
    } = curSystem;

    let {// path: nextPath,
      nextButtonTitle = '',
    } = nextSystem;
    console.log(curSystem.color)
    return (
      <div className={classnames('page-wrapper', 'simulation-page', path)}>
        {this.state.mounted &&
          <TransitionGroup className='page-inner'>
            <CSSTransition classNames='simulation-transition' key={curSystem.path} timeout={3000} >
            <span>
            <span className='content'>
              <section className='nav-placeholder' />
              <section className='description-panel'>
                <SimpleFade shouldUpdate={curSystem.question} shouldRender={this.state.mounted} duration={this.fadeDuration}>
                  <h2 className='question'>{question}</h2>
                  <Squiggle className='squiggle' />
                </SimpleFade>
                <SimpleFade shouldUpdate={curSystem.interactions} shouldRender={this.state.mounted} duration={this.fadeDuration}>
                  <h3 className='answer'>Answer</h3>
                  {curSystem.interactions.map((interaction, v) =>
                    <h4 key={`${curSystem.path}-interaction-${v}`} >
                      {interaction}
                    </h4>
                  )}
                  <Link to={`/selector`}>
                    <Pentagon style={{ fill: 'none', stroke: 'black', strokeWidth: '2' }} />
                    <ColoredPentagonSvg className='colored-pentagon' colors={data.systems.map(system => system.color)} />
                  </Link>
                </SimpleFade>
              </section>
              <section className={classnames('simulation-panel', { 'overlay-hidden': this.state.hideOverlay })}>
                <SimpleFade shouldUpdate={curSystem.path} shouldRender={this.state.mounted} duration={this.fadeDuration}>
                  <SimulationWrapper curSystem={curSystem} />
                  <div className='instructions-overlay' onClick={this.handleOverlayClick}>
                    <div className='overlay-inner'>
                      <span className='content'>
                        {/* <h3 className='index'>{index + 1}/5</h3> */}
                        {instructions}
                        <span className='instruction-graphic'>
                          <img src={instructionPng} alt='simulation_instruction_graphic' />
                        </span>
                        <button className='close-button'><span>X</span></button>
                      </span>
                    </div>
                  </div>
                  <ButtonWrapper className='show-instructions-button' onClick={this.handleQuestionClick}>?</ButtonWrapper>
                  <ButtonWrapper
                    className='next-sim'
                    onClick={_ => {
                      this.props.history.push(`/simulation/${this.props.nextSystem.path}`);
                      this.props.onNextClick();
                    }}>
                    <h4>next</h4>
                    <h3>{nextButtonTitle}</h3>
                    <SvgOutline component={Arrow} color='black' style={{ transform: 'rotate(180deg)' }} />
                  </ButtonWrapper>
                </SimpleFade>
              </section>
            </span>
              <span className='simulation-backgrounds'>
                <div className='color-front' style={{ background: curSystem.color }}></div>
                <div className='texture'></div>
                <img className='system-image' alt={coverImage.alt || 'TODO'} src={coverImage.src}></img>
                <div className='color-back' style={{ background: curSystem.color }}></div>
              </span>
              </span>
            </CSSTransition>
          </TransitionGroup>}
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
      dispatch({ type: 'NEXT_SYSTEM' });
    },
    onPrevClick: id => {
      dispatch({ type: 'PREV_SYSTEM' });
    },
    onPath: path => {
      dispatch({ type: 'SYSTEM_FROM_PATH', path: path })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SimulationPage))

