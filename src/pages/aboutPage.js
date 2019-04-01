import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import LoaderPentagon from '../components/loaderPentagon'
import loaderTexture from '../assets/backgroundTest.jpg'; 
import classnames from 'classnames'; 
import data from '../data/data';

//////////////////////////////////////////////////
//
// About Page
//
//////////////////////////////////////////////////

export default class AboutPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stateIndex: 0,
    }

    this.mousePos = {x: 0, y: 0}; 
  }

  componentDidMount() {
    // this.stateInterval = setInterval(
    //  _ => this.setState(prevState => {return {stateIndex: prevState.stateIndex + 1}}),
    // 4000);
  }

  onMouseMove = (e) => { 
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY; 
  }
  
  componentWillUnmount() {
    // clearInterval(this.stateInterval);
  }

  render() {
    let states = [];
    for(let i = 0; i < this.state.stateIndex; i++) {
      states.push(`state${i}`);  
    }
    if(this.state.stateIndex > 5) {
      clearInterval(this.stateInterval);
    }

    if(this.state.shouldRedirect) {
      return (
        <Redirect to='/selector'/>
      )
    }
    return (
      <div 
        className={classnames('page-wrapper', 'about-page', states)} 
        onMouseMove={this.onMouseMove}
      >
        <div className='content'>
          <h2 className='site-title'>{process.env.REACT_APP_PROJECT_TITLE}</h2>
          <LoaderPentagon mousePos={this.mousePos} stateIndex={this.state.stateIndex}/>
          <img className='texture' src={loaderTexture}></img>
          <div className='pattern'></div>
          <section className='text-container'>
            <h5>01</h5>
            <p>{data.description[0]}</p>
          </section>
        </div>
      </div>       
    );
  }
}

