import { drawCircle } from './helperFunctions'

//////////////////////////////////////////////////
//
// Canvas Shapes
//
//////////////////////////////////////////////////


/** 
* Class representing a point.
* @typedef {Object} Point
* @property {number} x - The x coordinate
* @property {number} y - The y coordinate
*/
export function Point(x, y) {
  this.x = x; 
  this.y = y; 
}

/* 
* Circle
*/
export class Circle {
  constructor(options = {}) {
    const {x = 0, y = 0, r = 20, ctx} = options; 
    this.x = x;
    this.y = y;
    this.r = Math.max(r, 10);  
    this.ctx = ctx; 
    this.active = true; 

    if(typeof(ctx) === 'undefined') {
      throw new Error(undefined);
    }
  }

  draw = () => {
    if(this.active && this.ctx) {
      drawCircle(this.x, this.y, this.r, this.ctx); 
    }
  }
}

/* 
* Ripple Visual 
*/
export class Ripple extends Circle {
  // constructor(options) {
  //   super(options)
  // }

  update() {
    this.r--;
    if(this.r <= 0) {
      this.active = false; 
    }
  }

  draw = () => {
    if(this.active && this.ctx) {
      drawCircle(this.x, this.y, this.r, this.ctx); 
    }
  }
}
