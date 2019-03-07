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