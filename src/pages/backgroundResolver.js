import React, { Component, Fragment } from 'react';
import {Route} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import background from '../assets/background-texture-white.jpg'; 
import { connect } from 'react-redux'
import { SimpleFade } from '../components/fadeWrapper';
import classnames from 'classnames'; 

//////////////////////////////////////////////////
//
// Background Resolver
//
//////////////////////////////////////////////////

class BackgroundResolver extends Component{
  constructor(props) {
    super(props)
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    this.setState({mounted: true})
  }
  
  render() {
    const {location, curSystem = {}, isHoveringSelector = false} = this.props;
    return(
      <TransitionGroup className={
        classnames('background', location.pathname.split('/')[1], {'hovering-selector':isHoveringSelector})}
      >
        <CSSTransition key={curSystem.coverImage.src} timeout={{enter: 666, exit: 333}} classNames='back'>
          <Route path="/(selector|transition|simulation|mobile|about)" render={_ => {
            let {coverImage = '', icon, color} = curSystem;
            let Icon = icon; 
            return(
              <div className='content'>
                <SimpleFade shouldRender={this.state.mounted} duration={333}>
                  <img className='system-image' alt={coverImage.alt} src={coverImage.src}></img>
                  <Icon className='system-icon' style={{fill: color}}/>
                </SimpleFade>
              </div>
            )}
          }  
          />
        </CSSTransition>
        <CSSTransition key={'true'} timeout={0}>
          <img className='texture' alt='background_texture' src={background}></img>  
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

const mapStateToProps = state => {
  return {
    curSystem: state.curSystem,
    isHoveringSelector: state.isHoveringSelector
  }
}

export default connect(mapStateToProps)(BackgroundResolver);

