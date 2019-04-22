import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import IntroPentagon from '../components/introPentagon';
import { ReactComponent as Pentagon } from '../assets/pentagon.svg';
import background from '../assets/background-texture-white.jpg'; 
import { SimpleFade } from '../components/fadeWrapper';
// import loaderTexture from '../assets/backgroundTest.jpg'; 
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
  }

  handleClick = () => {
    this.props.history.push('/selector');
    clearInterval(this.stateInterval); 
  }

  componentDidMount() {
    this.stateInterval = setInterval(
      _ => this.setState(prevState => {return {stateIndex: prevState.stateIndex + 1}}),
      999);
    this.setState({mounted: true})
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
    const textEnterStateIndex = 2;

    return (
      <div 
        className={classnames('page-wrapper', 'intro-page', states)} 
        onMouseMove={this.onMouseMove}
        onClick={this.handleClick}
      >
        <div className='content'>
          <span className='text-container'>
            <h2 className='project-title'>
            {['Part', 'to', 'Whole'].map((text, i) => (
              <SimpleFade 
                shouldRender={stateIndex >= textEnterStateIndex} 
                duration={this.fadeDuration}
                delay={333 * i}
                key={i + 'title'}
              >
                <span>{text}</span>
              </SimpleFade>
            ))}
            </h2>
            <SimpleFade 
              className='text-container' 
              shouldRender={stateIndex >= textEnterStateIndex} 
              duration={this.fadeDuration + 333}
              delay={1000}
            >
              {/* <h4>
                Exploring relationships between part and whole–and the 
                emergent systems that guide our world.
              </h4> */}
              <h4>
                Exploring the complex patterns and emergent systems that guide our world, through 5 interactive simulations.
              </h4>
            </SimpleFade>
            <SimpleFade 
              className='static-pentagon-wrapper' 
              shouldRender={stateIndex >= textEnterStateIndex} 
              duration={this.fadeDuration + 333}
              delay={1000}
            >
              <Pentagon className='static-pentagon' />
            </SimpleFade>
          </span>
          <Pentagon className='spinner-pentagon' />
          <SimpleFade 
            className='start-button-container' 
            shouldRender={stateIndex >= textEnterStateIndex} 
            duration={this.fadeDuration + 666}
            delay={1500}
          >
            <button className='start-button unbuttoned' onClick={_ => this.props.history.push('/selector')}>
              Choose a system
            </button>
          </SimpleFade>
        </div>
        <span className='bg-color'/>
        <img className='bg-texture' src={background} alt='background_texture'/>
        <span className='bg-solid'/>
      </div>       
    );
  }
}

export default withRouter(IntroPage)
