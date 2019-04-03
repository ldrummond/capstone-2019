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
    header: '5 Emergent Systems',
    subheader: 'Part to Whole',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra, justo et sollicitudin ultricies, nisl ex consectetur diam, non euismod mi nulla id tortor.`,
    position: 'left',
  },
  {
    header: '5 Emergent Systems',
    subheader: 'Part to Whole',
    copy: `Lorem ipsum dolor`,
    position: 'right',
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
          <h2 className='site-title'>{process.env.REACT_APP_PROJECT_TITLE}</h2>
          {textData.map((text, i) => 
            <CopyBlock {...text} style={{transitionDelay: `${i * 333 + 999}ms`}} key={`copy-${i}`}/>
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
  let {header, subheader, copy, position, style} = props; 
  let classes = classnames('copy-block', position === 'left' ? 'left' : 'right'); 
  return (
    <div className={classes} style={style}>
      {header && <h2 className='header'>{header}</h2>}
      {subheader && <h4 className='subheader'>{subheader}</h4>}
      <p className='copy'>{copy}</p>
    </div>
  )
}
