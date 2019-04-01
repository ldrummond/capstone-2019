import React, { Component } from 'react';
import { ReactComponent as Squiggle } from '../assets/squiggle.svg'; 
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { SimpleFade } from '../components/fadeWrapper';
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
      hasScrolled: false,  
    }
    this.fadeDuration = 333;
  }
  
  handleScroll = (e) => {
    if(e.target.scrollTop <= 1) {
      this.setState((prevState, props) => {
        if(prevState.hasScrolled) {
          return {hasScrolled: false}
      }})
    } else {
      this.setState((prevState, props) => {
        if(!prevState.hasScrolled) {
          return {hasScrolled: true}
      }})
    }
  }

  render() {
    return (
      <div className={classnames('page-wrapper', 'mobile-page', {scrolled: this.state.hasScrolled})}>
        <section className='content' onScroll={this.handleScroll}>
          <div className='intro-block'>
            <p>{data.description}</p>
          </div>
          {/* <SimpleFade className='squiggle-container' duration={this.fadeDuration} shouldRender={this.state.mounted}>
              <Squiggle />
          </SimpleFade> */}
          <div className='systems-container'>
            {data.systems.map(system => 
              <div key={system.path} className='system-block' style={{background: system.color}}>
                <h3>{system.question}</h3>
                <button>ABOUT</button>
              </div>
            )}
          </div>
          <div className='outro-block'>
            <h4>To interact with each emergent system, visit the site on Desktop.</h4>
          </div>
            {/* <TransitionGroup component={null}>
              <CSSTransition 
                key={curSystem.path} 
                timeout={{enter: 450, exit: 300}} 
                classNames='rotate'
              >
                <Link to={`/transition/${curSystem.path}`} className='option-inner'>
                  <h1 className='title'>{curSystem.question}</h1>
                  <span className='subtitle'>
                    <h4>system</h4>
                    <h3 className='index'>{curSystem.index + 1}/5</h3>
                  </span>
                </Link>
              </CSSTransition> 
            </TransitionGroup> */}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    prevLocation: state.prevLocation,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPrevClick: id => {
      dispatch({type: 'WHEEL_UP'}); 
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobilePage)