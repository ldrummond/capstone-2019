import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

//////////////////////////////////////////////////
//
// Transition Page
//
//////////////////////////////////////////////////

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
    }, (1300));
  }
  
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    let {curSystem = {}, prevLocation, history} = this.props; 
    let {path = 'traffic'} = curSystem; 

    return (
      <div className={`page-wrapper transition-page ${path}`}>
        {this.state.mounted && history.action !== 'REPLACE' &&
          <Redirect to={`/simulation/${path}`}/>
        }
      </div>    
    );
  }
}

const mapStateToProps = state => {
  return {
    curSystem: state.curSystem,
    prevLocation: state.prevLocation, 
  }
}


TransitionPage = withRouter(connect(mapStateToProps)(TransitionPage))

export default TransitionPage