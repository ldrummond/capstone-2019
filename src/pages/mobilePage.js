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
      mounted: false, 
      openSystemId: false, 
      scrollValue: 0, 
    }
    this.fadeDuration = 333;
    
    this.videoBlockRefs = [];
    this.setVideoBlockRef = (video, i) => {
      this.videoBlockRefs.push({ref: video, index: i});
    };
  }

  handleScroll = (e) => {
    // let prevScroll = this.state.scrollValue; 
    if(e.target.scrollTop <= 1) {
      this.props.setHasScrolled(false);
    } else {
      this.props.setHasScrolled(true);
    }
    let windowRect = e.target.getBoundingClientRect(),
      windowTop = windowRect.top,
      windowBottom = windowRect.bottom;

    this.videoBlockRefs.map(group => {
      if(group.ref) {
        const container = group.ref,
          vidRect =  container.getBoundingClientRect(),
          vidTop = vidRect.top,
          vidBottom = vidRect.bottom,
          video = container.childNodes[1].childNodes[0];

        // If vidTop or vidBottom is visible.  
        if((vidTop < windowBottom && vidTop > windowTop) || (vidBottom < windowBottom && vidBottom > windowTop)) {
          video.play(); 
        } else {
          video.pause(); 
        }
      }
    }); 
  }
  
  onSystemAboutClick = (e, i, systemAlreadyOpen) => {
    if(systemAlreadyOpen) {
      this.setState({openSystemId: false})
    } else {
      this.setState({openSystemId: i})
    }
  }

  componentDidMount() {
    this.setState({mounted: true}); 
  }

  render() {
    return (
      <div className={classnames('page-wrapper', 'mobile-page', {scrolled: this.props.pageHasScrolled})} 
        onScroll={this.handleScroll}>
        <section className='content'>
          <div className='intro-block'>
            <h2 className='project-title'>{process.env.REACT_APP_PROJECT_TITLE}</h2>
            <p dangerouslySetInnerHTML={{__html: data.description}}></p>
            {/* <h4>scroll to explore the questions</h4> */}
          </div>
          <div className='systems-container'>
            {data.systems.map((system, i) => 
              {
                let isOpen = i === this.state.openSystemId; 
                return (
                  <div key={system.path} className={classnames('system-block', {open: isOpen})} ref={e => this.setVideoBlockRef(e, i)}>
                    <h3 className='question'>{system.question}</h3>
                    <div className='preview-video-container' style={{background: system.color}}>
                      {this.state.mounted && 
                        <video className='video' width="680" height="520" loop muted playsInline>
                          <source src={system.previewVideo.src} type="video/mp4"></source>
                          Your browser does not support the video tag.
                        </video>}
                    </div>
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
    pageHasScrolled: state.pageHasScrolled, 
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
