import React, { Component } from 'react';

export default class SizeWrapper extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight, 
    };
  }
  
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  
  render() {
    const { width, height } = this.state;
    // const isMobile = width <= 500;
    // the rest is the same...
    console.log(width)
    return this.props.children(width, height);
    // if (isMobile) {
    //   return {...props.children}
    // }
  }
}


