import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class TransitionPage extends Component {
  constructor(props) {
    super(props)

    
  }

  render() {
    let {curSystem = {}} = this.props; 

    let {
      index = 0, 
      question = "question", 
      description = "description", 
      rules = ["test", "test"], 
      type = "birds",
      path = 'path', 
      instructions = 'Chase the fish to see how they follow their neighbors to avoid predators.',
      coverImage = {src: 'test'},
    } = curSystem; 

    return (
      <div className={`page-wrapper transition-page ${path}`}>
        <span className='content'>
          <Link to={`/simulation/${path}`} className='next-button'>NEXT</Link>
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

TransitionPage = connect(mapStateToProps, mapDispatchToProps)(TransitionPage)

export default TransitionPage