import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import LoaderPentagon from '../components/loaderPentagon'
import loaderTexture from '../assets/dark-texture.png'; 

export default class LoaderPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shouldRedirect: false, 
    }

    this.mousePos = {x: 0, y: 0}; 
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({shouldRedirect: true})
    // }, (2000));
  }

  onMouseMove = (e) => { 
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY; 
  }

  render() {
    if(this.state.shouldRedirect) {
      return (
        <Redirect to='/selector'/>
      )
    }
    return (
      <div className='page-wrapper loader-page' onMouseMove={this.onMouseMove}>
        <div className='content'>
          <img className='texture' src={loaderTexture}></img>
          <LoaderPentagon mousePos={this.mousePos}/>
          {/* <span className='texture'></span> */}
        </div>
      </div>       
    );
  }
}

