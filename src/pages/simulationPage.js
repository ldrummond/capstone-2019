import React, { Component } from 'react';
import {Link} from 'react-router-dom'
// import $ from 'jquery'; 
import { connect } from 'react-redux'
import Pixi from '../components/pixi'; 
import { ReactComponent as Pentagon } from '../assets/pentagon.svg'; 

class SimulationPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showOverlay: true,
    }
  }

  componentDidMount() {
    const timeout = setTimeout(_ => {
      this.setState({showOverlay: false})
    }, 4000)
  }

  render() {
    let {prevSystem = {}, curSystem = {}, nextSystem = {}} = this.props; 
    
    let {
      index = 0, 
      question = "question", 
      description = "description", 
      rules = ["test", "test"], 
      type = "birds",
      path = 'path', 
      instructions = 'Chase the fish to see how they follow their neighbors to avoid predators.',
      coverImage = {src: 'test'},
      color = 'red', 
    } = curSystem; 

    const styles = {
      background: color, 
    }

    return (
      <div className={`page-wrapper simulation-page ${path}`}>
        {this.state.showOverlay &&
          <span className='overlay'>
            <span className='inner'>
              <h3 className='title'>{instructions}</h3>
              <span className='instruction-graphic'></span>
            </span>
          </span>
        }
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
                <Pentagon/>
              </Link> 
            </span>
          </section>
          <span className='simulation-panel' style={styles}>
            <Pixi/> 
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
    },
    onPath: path => {
      dispatch({type: 'SYSTEM_FROM_PATH', path: path})
    }
  }
}

SimulationPage = connect(mapStateToProps, mapDispatchToProps)(SimulationPage)

export default SimulationPage

