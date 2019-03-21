import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import LoaderPentagon from '../components/loaderPentagon'
import loaderTexture from '../assets/dark-texture.png'; 
import classnames from 'classnames'; 

export default class LoaderPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stateIndex: 0,
    }

    this.mousePos = {x: 0, y: 0}; 
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({loaded: true})
    //   setTimeout(() => {
    //     this.loaderPentagon.
    //   }, 500);

    // }, (4000));


    setInterval(
      _ => this.setState(prevState => {return {stateIndex: prevState.stateIndex + 1}}),
    4000);
  }

  onMouseMove = (e) => { 
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY; 
  }

  render() {
    let states = [];
    for(let i = 0; i < this.state.stateIndex; i++) {
      states.push(`state${i}`);  
    }

    if(this.state.shouldRedirect) {
      return (
        <Redirect to='/selector'/>
      )
    }
    return (
      <div 
        className={classnames('page-wrapper', 'loader-page', states)} 
        onMouseMove={this.onMouseMove}
      >
        <div className='content'>
          <img className='texture' src={loaderTexture}></img>
          <LoaderPentagon mousePos={this.mousePos} stateIndex={this.state.stateIndex}/>
          {/* <span className='texture'></span> */}
        </div>
      </div>       
    );
  }
}

