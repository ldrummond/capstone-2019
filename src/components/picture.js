import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition'

export default function Picture(src) {
  return (
      <picture className="pictureComponent">
          <source srcSet={`${src} 1x, ${src}-2x 2x`} media="(max-width: 639px)"></source>
          <source srcSet={``} media="(min-width: 640px) and (max-width: 1023px)"></source>
          <source srcSet={``} media="(min-width: 1024px)"></source>
          <img src='src'></img>               
      </picture>
  )
}

// // https://swizec.com/blog/fade-in-lazy-loaded-images-react-css-quick-guide/swizec/8163
// // Great FadeIn Component
export class FadeIn extends Component {
  constructor(props) {
      super(props);

      this.state = { loaded: false, };

      this.defaultStyle = {
          transition: `opacity ${this.props.duration}ms ease-in-out`,
          opacity: 0,
          height: 0,
      }

      this.transitionStyles = {
          entering: { opacity: 0, height: 0, pointerEvents: "none" },
          entered: { opacity: 1, height: "auto", pointerEvents: "all" },
      };

      this.onLoad = this.onLoad.bind(this);
  }

  onLoad() { this.setState({ loaded: true }); };

  render() {
      const { height, children, duration } = this.props,
          { loaded } = this.state;

      return (
          <Transition in={loaded} timeout={duration}>
              {state => children(this.onLoad, mergeObjects(this.defaultStyle, this.transitionStyles[state]))}
          </Transition>
      );
  }
}

function mergeObjects(a = {}, b = {}) {
  let aCopy = Object.assign({}, a);
  let bCopy = Object.assign({}, b);
  return Object.assign(aCopy, bCopy)
}