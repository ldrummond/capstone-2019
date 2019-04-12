import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import LoaderPentagon from '../components/loaderPentagon'
import background from '../assets/background-texture-white.jpg'; 
import { SimpleFade } from '../components/fadeWrapper';
// import loaderTexture from '../assets/backgroundTest.jpg'; 
import { ReactComponent as Pentagon } from '../assets/pentagon.svg'; 
import classnames from 'classnames'; 
import data from '../data/data';

//////////////////////////////////////////////////
//
// About Page
//
//////////////////////////////////////////////////

class IntroPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mounted: false,
      stateIndex: 0,
    }
    this.fadeDuration = 666;
    this.mousePos = {x: 0, y: 0}; 
  }
  
  onMouseMove = (e) => { 
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY; 
  }

  componentDidMount() {
    this.stateInterval = setInterval(
      _ => this.setState(prevState => {return {stateIndex: prevState.stateIndex + 1}}),
      999);
    this.setState({mounted: true})
  }

  handleClick = () => {
    if(this.state.stateInterval >= 5) {
      this.props.history.push('/selector');
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.stateInterval);
  }

  render() {
    let stateIndex = this.state.stateIndex
    let states = [];
    for(let i = 0; i < stateIndex; i++) {
      states.push(`state${i}`);  
    }
    if(stateIndex > 8) {
      clearInterval(this.stateInterval);
    }

    return (
      <div 
        className={classnames('page-wrapper', 'intro-page', states)} 
        onMouseMove={this.onMouseMove}
        // onClick={this.handleClick}
      >
        <div className='content'>
          <SimpleFade 
            className='text-container' 
            shouldRender={stateIndex >= 6} 
            duration={this.fadeDuration}
          >
            <h2 className='project-title'>{process.env.REACT_APP_PROJECT_TITLE}</h2>
            {/* <h4>Exploring <em>emergent systems</em> in our world – through 5 interactive simulations.</h4> */}
            {/* <h4>Exploring <em>emergent systems</em> – where simple components interact to form complex patterns – through 5 interactive simulations.</h4> */}
            <h4>Exploring relationships between part and whole – and the emergent systems 
            that form in our world – through 5 interactive questions.</h4>
          </SimpleFade>
          <span className='pentagon-wrapper'>
          {/* <SimpleFade className='pentagon-wrapper' shouldRender={this.state.mounted}> */}
          <LoaderPentagon mousePos={this.mousePos}  stateIndex={stateIndex}/>
          {/* </SimpleFade> */}
          </span>
          <SimpleFade className='start-button-container' shouldRender={stateIndex >= 6} duration={this.fadeDuration + 666}>
            <button className='start-button unbuttoned' onClick={_ => this.props.history.push('/selector')}>
              Choose a question
            </button>
          </SimpleFade>
          {/* <Pentagon /> */}
        </div>
        <span className='bg-color'/>
        <img className='bg-texture' src={background} alt='background_texture'/>
        <span className='bg-solid'/>
      </div>       
    );
  }
}

export default withRouter(IntroPage)
