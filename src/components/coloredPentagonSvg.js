import React from 'react';

export default function ColoredPentagonSvg(props) {
  let colors = props.colors; 
  return (
    <svg viewBox="0 0 251.61 251.61" className={props.className}>
      <polygon style={{fill: colors[0]}} points="125.34 0 125.81 126.47 245.73 86.81 125.34 0"/>
      <polygon style={{fill: colors[1]}} points="199.82 227.19 245.73 86.81 125.81 126.47 199.82 227.19"/>
      <polygon style={{fill: colors[2]}} points="52.18 227.74 199.82 227.19 125.81 126.47 52.18 227.74"/>
      <polygon style={{fill: colors[3]}} points="5.59 87.7 52.18 227.74 125.81 126.47 5.59 87.7"/>
      <polygon style={{fill: colors[4]}} points="125.34 0 5.59 87.7 125.81 126.47 125.34 0"/>
    </svg> 
  )
}