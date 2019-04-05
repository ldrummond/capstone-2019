import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import LoaderPentagon from '../components/loaderPentagon'
import background from '../assets/background-texture-white.jpg'; 
import classnames from 'classnames'; 
import data from '../data/data';


//////////////////////////////////////////////////
//
// About Page
//
//////////////////////////////////////////////////

const textData = [
  {
    header: 'What is an Emergent System?',
    // subheader: 'Part to Whole',
    copy: `
      An emergent system is one in which a number of simple parts interact, 
      creating a resulting pattern that is more complex than the individual pieces.
      When a snowflake forms from ice crystals, no one crystal has a plan for the entire structure.
      But the simple molecular interactions between crystals results in a unique, complex form. 
    `,
    position: 'left',
  },
  {
    header: 'Other examples of Emergence?',
    // subheader: 'Part to Whole',
    copy: `
      Emergence exists in nature, science, art and philosophy. 
      Examples include the layout of cities, the workings of the stock market, bee hives and ant nests, 
      the structure of galaxies, flocks of birds, plant leaves and the shapes of flowers.  
    `,
    position: 'left',
  },
  {
    header: 'What is bottom-up organization?',
    // subheader: 'Part to Whole',
    copy: `
      Bottom-up organization is another way of describing Emergent Systems. It refers to the fact that there
      is no leader in an Emergent System telling the other parts how to behave. This is opposed to the top-down
      organization that human society takes as standard. With bottom up organization, the whole system responds 
      intelligently even when the individuals act according to simple rules. For example, in ant colonies, there
      is no leader ant. The Queen ant is completely separate from the rest of the colony, and the actions of each
      individual ant is only defined by their biological response to their neighbors .
    `,
    position: 'left',
  },
]

export default class AboutPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mounted: false,
    }
  }

  componentDidMount() {
    // this.mounting = setTimeout(_ => {
    //   this.setState({mounted: false})
    // }, 0)
  }

  componentWillUnmount() {
    clearInterval(this.mounting);
  }

  render() {
    return (
      <div 
        className={'page-wrapper about-page'} 
      >
        <div className='content'>
          <div className='page-header'>
            <h2 className='site-title'>{process.env.REACT_APP_PROJECT_TITLE}</h2>
          </div>
          {textData.map((text, i) => 
            <CopyBlock {...text} index={i} style={{transitionDelay: `${i * 333 + 1600}ms`}} key={`copy-${i}`}/>
          )}
        </div>
        <span className='bg-color'/>
        <img className='bg-texture' src={background} alt='background_texture'/>
        <span className='bg-solid'/>
      </div>       
    );
  }
}

function CopyBlock(props) {
  let {header, subheader, copy, position, style, index} = props; 
  let classes = classnames('copy-block', position === 'left' ? 'left' : 'right'); 
  return (
    <div className={classes} style={style}>
      <h4 className='index'>Q{index}</h4>
      {header && <h2 className='header'>{header}</h2>}
      {subheader && <h4 className='subheader'>{subheader}</h4>}
      <p className='copy'>{copy}</p>
    </div>
  )
}
