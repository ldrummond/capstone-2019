import React, { Component } from 'react';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import { SimpleFade } from '../components/fadeWrapper';
import ButtonWrapper from '../components/buttonWrapper';
import { ReactComponent as Pentagon } from '../assets/pentagon.svg'; 
import { connect } from 'react-redux';
import classnames from 'classnames';
import data from '../data/data';

//////////////////////////////////////////////////
//
// Mobile Page
//
//////////////////////////////////////////////////

class MobilePage extends Component {
  constructor() {
    super()
    this.state = {
      openSystemId: false, 
    }
    this.fadeDuration = 333;
  }

  handleScroll = (e) => {
    if(e.target.scrollTop <= 1) {
      this.props.setHasScrolled(false);
    } else {
      this.props.setHasScrolled(true);
    }
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
      <div className={'page-wrapper mobile-page'} onScroll={this.handleScroll}>
        <section className='content'>
          <div className='intro-block'>
            <h2 className='project-title'>{process.env.REACT_APP_PROJECT_TITLE}</h2>
            <p dangerouslySetInnerHTML={{__html: data.description}}></p>
          </div>
          <div className='systems-container'>
            {data.systems.map((system, i) => 
              {
                let isOpen = i === this.state.openSystemId; 
                return (
                  <div key={system.path} className={classnames('system-block', {open: isOpen})} >
                    <h3 className='question'>{system.question}</h3>
                    <div className='preview-video-container' style={{background: system.color}}>
                      <video className='video' width="680" height="520" autoPlay loop muted playsinline>
                        <source src={system.previewVideo.src} type="video/mp4"></source>
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    {/* <img className='preview' src={system.previewImage.src} alt={system.previewImage.alt} /> */}
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

const mapStateToProps = state => {
  return {
    nextSystem: state.nextSystem,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setHasScrolled: hasScrolled => {
      dispatch({type: 'SCROLL_CHANGE', pageHasScrolled: hasScrolled}); 
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobilePage);
