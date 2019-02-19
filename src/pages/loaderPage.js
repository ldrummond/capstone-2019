import React, { Component } from 'react';
import $ from 'jquery'; 

let pubUrl = url => `${process.env.PUBLIC_URL}/assets/${url}`; 

export default class LoaderPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='page-wrapper'>
        Loader Page
      </div>       
    );
  }
}

