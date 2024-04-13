import React, { Component } from 'react';
import background from '../assets/background-texture-white.jpg'; 
import throttle from 'lodash/throttle';
import { connect } from 'react-redux';


//////////////////////////////////////////////////
//
// About Page
//
//////////////////////////////////////////////////

const qaText = [
  {
    header: 'What is an Emergent System?',
    copy: `
      An emergent system is one in which a number of simple parts interact, 
      creating a resulting pattern that is more complex than the individual elements.
      When a snowflake forms from ice crystals, no one crystal has a plan for the entire structure.
      But the simple molecular interactions between crystals results in a unique, complex form. 
    `,
  },
  {
    header: 'Why emergence?',
    copy: `
      Emergence exists throughout our world, yet often goes unrecognized. Human society typically 
      tries to solve problems with a top-down approach, but emergence looks at ways problems can be 
      understood and solved through bottom-up organization.
    `,
  },
  {
    header: 'What is bottom-up organization?',
    copy: `
      Bottom-up organization is another way of describing Emergent Systems. It refers to the fact that there
      is no leader in an Emergent System telling the other parts how to behave. This is opposed to the top-down
      organization that human society takes as standard. With bottom up organization, the whole system responds 
      intelligently even when the individuals act according to simple rules. For example, in ant colonies, there
      is no leader ant. The Queen ant is completely separate from the rest of the colony, and the actions of each
      individual ant is only defined by their biological response to their neighbors .
    `,
  },
  {
    header: 'What are other examples of Emergence?',
    copy: `
      Examples include the layout of cities, the workings of the stock market, bee hives and ant nests, 
      the structure of galaxies, flocks of birds, plant leaves and the shapes of flowers.  
    `,
  },
]

class AboutPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mounted: false,
    }
    // this.throttledHandleScroll = throttle(this.handleScroll, 100); 
  }

  handleScroll = (e) => {
    if(e.target.scrollTop <= 1) {
      this.props.setHasScrolled(false);
    } else {
      this.props.setHasScrolled(true);
    }
  }

  render() {
    return (
      <div className={'page-wrapper about-page'} onScroll={this.handleScroll}>
        <div className='content'>
          <div className='page-header'>
            <h2 className='site-title'>About</h2>
            {/* <h4 className='site-subtitle'>
              exploring emergent systems through 5 interactive simulations
              </h4> */}
          </div>
          <section className='page-body'>
            <div className='description-text'>
              <h2 className='project-description'>
                Part to Whole, the name of this project, refers to a phenomenon called Emergence. 
                <div className='break'></div>
                Emergence is when a complex pattern (whole) arises from simple interactions between components (part).
                The 5 systems in this project are all examples of emergent systems, which exist in 
                everything from nature, science, art and philosophy.
                <div className='break'></div>
                The hope of this project is that, by understanding some of the beauty, elegance and problem-solving 
                power of emergent systems, we might learn to see problems of our world in a whole new way. 
              </h2>
            </div>
            <div className='project-text'>
              <h4 className='section-header'>The Project</h4>
              <div className='copy-block project'>
                <h2 className='header'>
                  Designed and developed by 
                  <a href='http://lucas-builds.netlify.app' target='_blank'> Lucas Drummond {'\u2192'}</a>
                </h2>
                
                // <p className='copy'>
                //   Created for a Senior Capstone Project, for the Communication Design Program at 
                //   Washington University in St. Louis (2019).
                // </p>
                // <br></br>
                // <p className='copy'>
                //   Special thanks to Jonathan Hanahan, Craig Reynolds and Ian McGregor.
                // </p>
              </div>
            </div>
            <div className='question-text'>
              <h4 className='section-header'>Some Questions</h4>
              <div className='questions'>
                {qaText.map((text, i) => 
                  <CopyBlock {...text} index={i} key={`copy-${i}`}/>
                  // <CopyBlock {...text} index={i} style={{transitionDelay: `${i * 200 + 1800}ms`}} key={`copy-${i}`}/>
                )}
              </div>
            </div>
          </section>
          <span className='bg-color'/>
          <img className='bg-texture' src={background} alt='background_texture'/>
          <span className='bg-solid'/>
        </div>
      </div>       
    );
  }
}

function CopyBlock(props) {
  let {header, copy, style, index} = props; 
  return (
    <div className='copy-block' style={style}>
      <h4 className='index'>Q{index}</h4>
      {header && <h2 className='header'>* {header}</h2>}
      <p className='copy'>{copy}</p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    nextSystem: state.nextSystem,
    curSystem: state.curSystem,
    prevSystem: state.prevSystem,
    wheelIndex: state.wheelIndex,
    prevWheelIndex: state.prevWheelIndex,  
    lastChange: state.lastChange, 
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setHasScrolled: hasScrolled => {
      dispatch({type: 'SCROLL_CHANGE', pageHasScrolled: hasScrolled}); 
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);

