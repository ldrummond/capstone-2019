
//////////////////////////////////////////////////
//
// Easing Functions
// https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
// https://hackernoon.com/writing-an-easing-function-a-slightly-interesting-story-70ce667c212a
//
//////////////////////////////////////////////////

/**
 * 
 * @function CanvasTransition
 * @param {Object} Options
 * @property {number} startValue 
 * @property {number} endValue
 * @property {number} durationMs
 * @property {number} fps
 * @callback {function} onStep
 * @callback {function} onComplete  
 * 
 */
export function CanvasTransition({startValue = 0, endValue = 1, durationMs = 200, fps = 60, onStep, onComplete = _ => {}}) {
  this.isDone = false; 
  
  this.stepCount = Math.floor(durationMs / (1000 / fps));
  this.valueIncrement = (endValue - startValue) / this.stepCount;
  this.sinValueIncrement = Math.PI / this.stepCount;
  
  this.currentValue = startValue;
  this.currentSinValue = 0;
  
  this.step = () => {
    this.currentSinValue += this.sinValueIncrement;
    this.currentValue += this.valueIncrement * (Math.sin(this.currentSinValue) ** 2) * 2;
    
    if (this.currentSinValue < Math.PI) {
      onStep(this.currentValue);
    } else {
      onStep(endValue);
      onComplete();
      this.isDone = true; 
    }
  }
}

//////////////////////////////////////////////////
//
// Url Functions
//
//////////////////////////////////////////////////

/*
* Get url params.
*/
export function getQueryParamsFromLocation(location = {search: ""}) {
  let search = decodeURIComponent(location.search); 
  return search.slice(1).split('&').reduce((acc, query) => {
    let q = query.split('=');
    acc[q[0]] = q[1]
    return acc;
  }, {})
}

//////////////////////////////////////////////////
//
// Array Functions
//
//////////////////////////////////////////////////

/**
* @param {Array} array
* @param {any} value
* @returns {boolean} True if array contains value
*/
export function contains(arr, val) {
  return !(arr.indexOf(val) === -1)
}

/*
* Array Next
*/
export function next(arr, i) {
  if(i < 0 || i >= arr.length) {throw new RangeError("Array index is out of range.")}
  let nexti = (i < arr.length - 1) ? i + 1 : 0; 
  return arr[nexti]; 
}

/*
* Array Prev
*/
export function prev(arr, i) {
  if(i < 0 || i >= arr.length) {throw new RangeError("Array index is out of range.")}
  let previ = (i > 0) ? i - 1 : arr.length - 1; 
  return arr[previ]; 
}

//////////////////////////////////////////////////
//
// Object Functions
//
//////////////////////////////////////////////////

/*
* Merge objects
*/
export function mergeObjects(a = {}, b = {}) {
  let aCopy = Object.assign({}, a);
  let bCopy = Object.assign({}, b);
  return Object.assign(aCopy, bCopy)
}

//////////////////////////////////////////////////
//
// Color Functions
//
//////////////////////////////////////////////////

/*
* Ran RGB 
*/
export function ranRGB() {
  return `rgb(${255 * Math.random()|0}, ${255 * Math.random()|0}, ${255 * Math.random()|0})`;
}


//////////////////////////////////////////////////
//
// Math Functions
//
//////////////////////////////////////////////////

/*
* To Deg 
*/
export function toDeg(angle) {
  return angle * (180 / Math.PI);
}

/*
* To Rad 
*/
export function toRad(angle) {
  return angle * (Math.PI / 180);
}

/**
* Clamp
*/
export function clamp(size, limit) {
  if(size > limit) {
    return limit; 
  }
  return size; 
}

//////////////////////////////////////////////////
//
// Canvas Functions
//
//////////////////////////////////////////////////

/* 
* Converts mouse pos from world to canvas space 
*/
export function posToCanvas(pos, canvasRect) {
  return {
    x: pos.x - canvasRect.left,
    y: pos.y - canvasRect.top,
  }
}

/* 
* Simple Circle draw method. 
*/
export function fillCircle(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  if(color) {ctx.fillColor = color}
  ctx.fill(); 
}

/* 
* Simple Circle draw method. 
*/
export function strokeCircle(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  if(color) {ctx.strokeColor = color}
  ctx.stroke();
}

/*
* Lerp Line
*/
export function drawLerpLine(ctx, start, end, numPoints = 1, magnitude = 5) {
  if(!ctx || typeof ctx.moveTo == 'undefined') {throw new Error("Context is undefined")}
  ctx.moveTo(start.x, start.y);
  let xUnit = (end.x - start.x) / numPoints
  let yUnit = (end.y - start.y) / numPoints
  for(let i = 1; i <= numPoints; i++) {
    let x = start.x + (xUnit * i) + ((Math.random() - 0.5) * magnitude); 
    let y = start.y + (yUnit * i) + ((Math.random() - 0.5) * magnitude);
    ctx.lineTo(x, y); 
  }
}

/*
* Curve Line
*/
// export function drawCurveLine(ctx, start, end, numPoints = 1, magnitude = 5) {
//   if(!ctx || typeof ctx.moveTo == 'undefined') {throw new Error("Context is undefined")}
//   let points = [start]; 
//   let xUnit = (end.x - start.x) / numPoints
//   let yUnit = (end.y - start.y) / numPoints

//   for(let i = 0; i < numPoints; i++) {
//     let x = start.x + (xUnit * i) + ((Math.random() - 0.5) * magnitude); 
//     let y = start.y + (yUnit * i) + ((Math.random() - 0.5) * magnitude);
//     points.push(new Point(x, y)); 
//   }

//   ctx.moveTo(start.x, start.y);
  
//   if(points.length >= 2) {
//     for(let i = 1; i <= points.length - 2; i++) {
//       var xc = (points[i].x + points[i + 1].x) / 2;
//       var yc = (points[i].y + points[i + 1].y) / 2;
//       ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
//       ctx.strokeStyle = 'red'; 
//       ctx.strokeRect(points[i].x, points[i].y, 1, 1);
//       ctx.strokeStyle = 'white'; 
//       ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y);
//     }
//   } else {
//     ctx.lineTo(start.x, start.y)
//   }
// }

/*
* Simplex Line
*/
export function drawSimplexLine(ctx, start, end, numPoints = 1, simplex, time, magnitude = 1) {
  if(!ctx || typeof ctx.moveTo == 'undefined') {throw new Error("Context is undefined")}
  ctx.moveTo(start.x, start.y);
  let xUnit = (end.x - start.x) / numPoints
  let yUnit = (end.y - start.y) / numPoints
  for(let i = 1; i <= numPoints; i++) {
    let x = start.x + (xUnit * i) + simplex.noise2D(i, time) * magnitude; 
    let y = start.y + (yUnit * i) + simplex.noise2D(i, time) * magnitude;
    ctx.lineTo(x, y); 
  }
}

