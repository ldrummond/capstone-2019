import React, { Component } from 'react';
import { Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

class TransitionPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({mounted: true})
    }, (666));
  }
  
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    let {curSystem = {}, prevLocation} = this.props; 

    let {
      // index = 0, 
      // question = "question", 
      // description = "description", 
      // rules = ["test", "test"], 
      // type = "birds",
      path = 'path', 
      // instructions = 'Chase the fish to see how they follow their neighbors to avoid predators.',
      // coverImage = {src: 'test'},
    } = curSystem; 

    if(prevLocation) {
      console.log(prevLocation);
    }

    return (
      <div className={`page-wrapper transition-page ${path}`}>
        {this.state.mounted && 
          <Redirect to={`/simulation/${path}`} push/>
        }
        {/* <Link to={`/simulation/${path}`} className='next-button'>
          <span className='content'>
          </span>
        </Link> */}
      </div>    
    );
  }
}

const mapStateToProps = state => {
  return {
    nextSystem: state.nextSystem,
    curSystem: state.curSystem,
    prevSystem: state.prevSystem,
    prevLocation: state.prevLocation, 
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