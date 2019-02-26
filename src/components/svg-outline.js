

import React from 'react';


export function SvgOutline(props) {
  const SvgComponent = props.component; 
  const {color='red', onClick=_=>{}, style={}} = props; 
  
  return (
    <span className='svg-outline-container' onClick={onClick} style={style}>
      <SvgComponent className='svg-outline' style={{stroke: color}} />
      <span className='fill-container'>
        <SvgComponent className='svg-fill' style={{fill: color}} />
      </span>
    </span>
  );
}
