import React, { Component } from 'react';
import {Link} from 'react-router-dom'
// import $ from 'jquery'; 
import { connect } from 'react-redux'
// import Pixi from '../components/pixi'; 
import { ReactComponent as Pentagon } from '../assets/pentagon.svg'; 
import SimulationWrapper from '../simulations/simulationWrapper';
// import RafController from '../components/rafController';
import instructionPng from '../assets/instructionPng.png';
import { SimpleFade } from '../components/fadeWrapper';
import { ReactComponent as Arrow } from '../assets/arrow.svg'; 
import { SvgOutline } from '../components/svgOutline'

class SimulationPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showOverlay: true,
    }

    // this.rafController = new RafController({fps: 60}); 
  }

  componentDidMount() {
    setTimeout(_ => {
      this.setState({showOverlay: false})
    }, 4000)
  }

  // onMouseMove = (e) => {
  //   if(this.rafController && this.rafController.ticker % 2 == 0) {
  //     this.setState({mouseX: e.clientX, mouseY: e.clientY});
  //   }
  // }

  render() {
    let {curSystem = {}, nextSystem = {}, aboutVisible, onNextClick} = this.props; 
    
    let {
      index = 0, 
      question = "question", 
      description = "description", 
      rules = ["test", "test"], 
      path = 'path', 
      instructions = 'Chase the fish to see how they follow their neighbors, and avoid predators.',
      color = 'red', 
    } = curSystem; 

    let {
      path : nextPath = 'test'
    } = nextSystem; 

    const styles = {
      background: color, 
    }

    const mouseX = this.state.mouseX,
      mouseY = this.state.mouseY; 

    return (
      <div className={`page-wrapper simulation-page ${path}`} onMouseMove={this.onMouseMove}>
        {/* <div className='pseudoCursor' style={{transform: `translate(${mouseX}px, ${mouseY}px)`}}></div> */}
        {/* <SimpleFade in={this.state.showOverlay} duration={333}> */}
          {this.state.showOverlay && <span className='overlay'>
            <span className='inner'>
              <h3 className='title'>{instructions}</h3>
              <span className='instruction-graphic'>
                <img src={instructionPng} />
              </span>
            </span>
          </span>}
        {/* </SimpleFade> */}
        <span className='content' >
          <section className='description-panel'>
            <span>
              <h3 className='index'>{index + 1}/5</h3>
              <h2 className='question'>{question}</h2>
            </span>
            <span>
              <span className='line'></span>
              <h2 className='title'>Emergent System</h2>
              <h2 className='description'>{description}</h2>
              <h2 className='title'>Rules</h2>
              <h2 className='rules'>{rules}</h2>
              <Link to={`/selector`}>
                <Pentagon style={{fill: 'none', stroke: 'black'}}/>
              </Link> 
            </span>
          </section>
          <span className='simulation-panel' style={styles}>
            <SimulationWrapper {...curSystem}/>
            <button className='next-sim unbuttoned' onClick={onNextClick}>
              <h4>next</h4>
              <h3>{nextPath}</h3>
              <SvgOutline component={Arrow} color='black' style={{transform: 'rotate(180deg)'}}/>
            </button>
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
    // prevSystem: state.prevSystem,
    aboutVisible: state.aboutVisible, 
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

SimulationPage = connect(mapStateToProps, mapDispatchToProps)(SimulationPage)

export default SimulationPage

