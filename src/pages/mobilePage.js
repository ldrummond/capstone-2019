import React, { Component } from 'react';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import { SimpleFade } from '../components/fadeWrapper';
import ButtonWrapper from '../components/buttonWrapper';
import { ReactComponent as Pentagon } from '../assets/pentagon.svg'; 
import classnames from 'classnames';
import data from '../data/data';

//////////////////////////////////////////////////
//
// Mobile Page
//
//////////////////////////////////////////////////

export default class MobilePage extends Component {
  constructor() {
    super()
    this.state = {
      mounted: false,
      openSystemId: false, 
    }
    this.fadeDuration = 333;
  }
  
  onSystemAboutClick = (e, i, systemAlreadyOpen) => {
    if(systemAlreadyOpen) {
      this.setState({openSystemId: false})
    } else {
      this.setState({openSystemId: i})
    }
  }

  render() {
    return (
      <div className={classnames('page-wrapper', 'mobile-page', {scrolled: this.state.hasScrolled})}>
        <section className='content' onScroll={this.handleScroll}>
          <div className='intro-block'>
            <h2 className='project-title'>{process.env.REACT_APP_PROJECT_TITLE}</h2>
            <p dangerouslySetInnerHTML={{__html: data.description}}></p>
          </div>
          <div className='systems-container'>
            {data.systems.map((system, i) => 
              {
                let isOpen = i === this.state.openSystemId; 
                return (
                  <div 
                    key={system.path} 
                    className={classnames('system-block', {open: isOpen})} 
                    style={{background: system.color}}
                  >
                    <h3 className='question'>{system.question}</h3>
                    <ButtonWrapper 
                      className='active-button' 
                      onClick={e => this.onSystemAboutClick(e, i, isOpen)}
                    >
                      <div className='slider'>
                        <div>ABOUT</div><div>CLOSE</div>
                      </div>
                    </ButtonWrapper>
                    <div className='answer-block'>
                      <h3 className='answer'>Answer</h3>
                      {system.interactions.map((interaction, v) => 
                        <h4 
                          key={`${system.path}-interaction-${v}`}
                          style={{transitionDelay: isOpen ? `${v * 222 + 666}ms` : '0ms'}}                        
                        >
                          {interaction}
                        </h4>
                      )}
                    </div>
                  </div>
                )
              }
            )}
          </div>
          <div className='outro-block'>
            <Pentagon/>
            <h4>To interact with each emergent system, visit the site on a desktop device.</h4>
          </div>
        </section>
      </div>
    );
  }
}
