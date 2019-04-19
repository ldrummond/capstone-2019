import React, { Component, Fragment } from 'react';
import {Route} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import background from '../assets/background-texture-white.jpg'; 
import { connect } from 'react-redux'
import { SimpleFade } from '../components/fadeWrapper';

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
    const {location, curSystem = {}} = this.props;
    return(
      <TransitionGroup className={`background ${location.pathname.split('/')[1]}`}>
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
        <img className='texture' alt='background_texture' src={background}></img>  
      </TransitionGroup>
    )
  }
}

const mapStateToProps = state => {
  return {curSystem: state.curSystem}
}

export default connect(mapStateToProps)(BackgroundResolver);

