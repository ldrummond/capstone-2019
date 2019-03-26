import { toRad, ranRGB, CanvasTransition, mergeObjects, drawLerpLine} from './helperFunctions'

//////////////////////////////////////////////////
//
// Canvas shape that controls drawing. 
//
//////////////////////////////////////////////////

/**
* Polygon
* 
*/
class Polygon {
  constructor(opts = {}) {
    let {
      sides = 3,
      center = {x: 0, y: 0},
      diameter = 50,
      rotation = 0,
      stroke = false,
      strokeStyle,
      strokeWidth = 1,
      fill = true,
      fillStyle,
      hasNoise = false,
      colors = [],
      amp = 20, 
      freq = 1 / 40,
      smoothness = 50, 
    } = opts;

    // Opts 
    this.hasNoise = hasNoise;
    this.sides = sides;
    this.diameter = diameter;
    this.center = center;
    this.stroke = stroke;
    this.lineWidth = strokeWidth;
    this.fill = fill;
    this.strokeStyle = strokeStyle;
    this.colors = colors;
    this.rotation = rotation;
    this.amp = amp;
    this.freq = freq; 
    this.smoothness = smoothness; 

    if(this.fill) {
      while(this.colors.length < this.sides) {this.colors.push(ranRGB());}
    }

    // Defaults
    this.cursor = {x: 0, y: 0};
    this.transitions = []; 
    this.magnitude = 0;   
    this.hitIndex = -1; 
    this.hitBufferColors = this.generateHitBufferColors(); 
    this.triangles = this.getTrianglesPoints(); 

    // Methods for defining redraws, to save performance. 
    this.hasChanged = true; 
  }

  get shouldDraw() {
    return this.hasChanged
  }

  generateHitBufferColors() {
    return [...Array(this.sides)].map(_ => ranRGB()); 
  }

  rotateBy(deg) {
    this.rotation += deg;
    this.triangles = this.getTrianglesPoints(); 
    this.hasChanged = true;
  }

  rotateTo(deg) {
    this.rotation = deg;
    this.triangles = this.getTrianglesPoints(); 
    this.hasChanged = true;
  }

  rotateToEase(deg, duration, onComplete) {
    const rotateTransition = new CanvasTransition({
      startValue: this.rotation, 
      endValue: deg, 
      durationMs: duration, 
      fps: 60, 
      onStep: res => {this.rotation = res}, 
      onComplete: onComplete,
    })
    this.transitions.push(rotateTransition);
  }

  easeDiameter(startDiameter, endDiameter, duration, onComplete) {
    const growTransition = new CanvasTransition({
      startValue: startDiameter, 
      endValue: endDiameter, 
      durationMs: duration, 
      fps: 60, 
      onStep: res => {this.diameter = res}, 
      onComplete: onComplete,
    })
    this.transitions.push(growTransition);
  }

  easeAngle(startAngle, endAngle, duration, onComplete) {
    const growTransition = new CanvasTransition({
      startValue: startAngle, 
      endValue: endAngle, 
      durationMs: duration, 
      fps: 60, 
      onStep: res => {this.rotation = res}, 
      onComplete: onComplete,
    })
    this.transitions.push(growTransition);
  }

  easeAngleTo(endAngle, duration, onComplete) {
    const growTransition = new CanvasTransition({
      startValue: this.rotation, 
      endValue: endAngle, 
      durationMs: duration, 
      fps: 60, 
      onStep: res => {this.rotation = res}, 
      onComplete: onComplete,
    })
    this.transitions.push(growTransition);
  }

  easeSides(startSides, endSides, duration, onComplete) {
    const growTransition = new CanvasTransition({
      startValue: startSides, 
      endValue: endSides, 
      durationMs: duration, 
      fps: 60, 
      onStep: res => {this.sides = res}, 
      onComplete: onComplete,
    })
    this.transitions.push(growTransition);
  }

  easeOpacity(startAlpha, endAlpha, duration, onComplete) {
    const fadeTransition = new CanvasTransition({
      startValue: startAlpha, 
      endValue: endAlpha, 
      durationMs: duration, 
      fps: 60, 
      onStep: res => {this.globalAlpha = res}, 
      onComplete: onComplete,
    })
    this.transitions.push(fadeTransition);
  }

  easeStrokeBrightness(startBrightness, endBrightness, duration, onComplete) {
    const fadeTransition = new CanvasTransition({
      startValue: startBrightness, 
      endValue: endBrightness, 
      durationMs: duration, 
      fps: 60, 
      onStep: res => {this.strokeStyle = `rgb(${res}, ${res}, ${res})`}, 
      onComplete: onComplete,
    })
    this.transitions.push(fadeTransition);
  }
 
  updateTransitions = () => {
    if(this.transitions.length > 0) {
      this.transitions = this.transitions.filter(transition => {
        transition.step(); 
        
        // Remove the transition is still active, 
        // return it to the transitions array. 
        if(!transition.isDone) {
          return transition; 
        }
        return false;
      })
      this.hasChanged = true; 
    }
    this.triangles = this.getTrianglesPoints(); 
  }

  getTrianglesPoints() {
    let curPoint, curAngle, curX, curY, nextX, nextY, nextPoint, nextAngle, triangle; 
    let triangles = []; 

    // Draw each triangle 
    for (let i = 0; i < this.sides; i += 1) {
      curAngle = (i + 1) * 2 * Math.PI / this.sides - toRad(this.rotation); 
      nextAngle = (i + 2) * 2 * Math.PI / this.sides - toRad(this.rotation); 
      
      curX = this.center.x + this.diameter * Math.cos(curAngle);
      curY = this.center.y + this.diameter * Math.sin(curAngle);
      nextX = this.center.x + this.diameter * Math.cos(nextAngle);
      nextY = this.center.y + this.diameter * Math.sin(nextAngle);
      
      curPoint = {x: curX, y: curY};
      nextPoint = {x: nextX, y: nextY};
      
      triangle = [this.center, curPoint, nextPoint]; 
      triangles.push(triangle); 
    }
    
    return triangles;
  }
  
  resize(scale) {
    this.center = {x: this.center.x * scale.x, y: this.center.y * scale.y};
    this.diameter *= scale.x; 
    this.triangles = this.getTrianglesPoints();

    return (ctx, mousePos, time) => {
      this.triangles.map((points, i) => {
        ctx.beginPath(); 
        ctx.moveTo(points[0].x, points[0].y);
        ctx.fillStyle = this.colors[i]; 
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.fill();
      })
    }
  }

  // drawHidden(ctx, colors) {
  //   if(colors) {
  //     this.triangles.map((points, i) => {
  //       ctx.beginPath(); 
  
  //       // Draw triangle as three points
  //       ctx.lineTo(points[0].x, points[0].y);
  //       ctx.lineTo(points[1].x, points[1].y);
  //       ctx.lineTo(points[2].x, points[2].y); 
  
  //       // Fill points. 
  //       ctx.fillStyle = colors[i]; 
  //       ctx.strokeStyle = colors[i];    
  //       ctx.lineWidth = 10;     
  //       ctx.fill();
  //       ctx.stroke();
  //       ctx.closePath(); 
  //     })
  //   }
  // }
 
  update() {
    this.updateTransitions(); 
  }

  draw(ctx, mousePos, tick) {
   
    if(this.strokeStyle) {
      ctx.strokeStyle = this.strokeStyle;
    }
    if(this.lineWidth) {
      ctx.lineWidth = this.lineWidth;
    }
    if(this.globalAlpha) {
      ctx.globalAlpha = this.globalAlpha;
    }

    if(this.hasNoise) {
      if(mousePos) {
        const distanceFromMouse = Math.hypot(mousePos.x - this.center.x, mousePos.y - this.center.y)
        this.magnitude = Math.round(distanceFromMouse / 1 * 2 / 50);
      }
    }

    this.triangles.map((points, i) => {
      this.hasChanged = false; 

      ctx.beginPath(); 

      if(this.magnitude) {
        // console.log(this.magnitude)
      }

      // let t = 100; 
      // for(let i = 0; i < t; i++) {
      //   ctx.lineTo(this.center.x + i - (t / 2), this.center.y - 10 + slope(i, tick / 10, this.amp, this.freq));
      // }

      // ctx.stroke();
      // ctx.beginPath();

      // for(let i = 0; i < t; i++) {
      //   ctx.lineTo(this.center.x + i - (t / 2), this.center.y + 10 + slope(i, tick / 10, this.amp, this.freq));
      // }
      
      
      // function sinLine(ctx, start, end, numPoints, amp, freq, xOff) {
      //   if(!ctx || typeof ctx.moveTo == 'undefined') {throw new Error("Context is undefined")}
      //   // const lineEq = x => amp * Math.sin(x * freq + xOff);

      //   ctx.moveTo(start.x, start.y);
      //   let xUnit = (end.x - start.x) / numPoints
      //   let yUnit = (end.y - start.y) / numPoints

      //   for(let i = 1; i <= numPoints; i++) {
      //     let x = start.x + (xUnit * i) + (Math.sin(i) * amp / 50); 
      //     let y = start.y + (yUnit * i) + (Math.sin(i) * amp / 50);
      //     ctx.lineTo(x, y); 
      //   }
      // }

      // function slope(x, xOffset, amp, freq) {
      //   return amp * Math.sin(x * freq + xOffset) 
      // }
      

      // export function drawLerpLine(ctx, start, end, numPoints = 1, magnitude = 5) {
      //   if(!ctx || typeof ctx.moveTo == 'undefined') {throw new Error("Context is undefined")}
      //   ctx.moveTo(start.x, start.y);
      //   let xUnit = (end.x - start.x) / numPoints
      //   let yUnit = (end.y - start.y) / numPoints
      //   for(let i = 1; i <= numPoints; i++) {
      //     let x = start.x + (xUnit * i) + ((Math.random() - 0.5) * magnitude); 
      //     let y = start.y + (yUnit * i) + ((Math.random() - 0.5) * magnitude);
      //     ctx.lineTo(x, y); 
      //   }
      // }

      
      // this.hasChanged = true; 

      if(this.hasNoise) {
        // sinLine(ctx, points[0], points[1], 20, this.magnitude * this.amp, this.freq); 
        // sinLine(ctx, points[1], points[2], 20, this.magnitude * this.amp, this.freq); 
        drawLerpLine(ctx, points[0], points[1], 5, this.magnitude * this.amp); 
        drawLerpLine(ctx, points[1], points[2], 5, this.magnitude * this.amp); 
        ctx.lineTo(points[0].x, points[0].y);
        this.hasChanged = true; 
      }
      else {
        ctx.moveTo(points[0].x, points[0].y);
        ctx.fillStyle = this.colors[i]; 
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
      }
      
      if(i == this.hitIndex) {
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
      }

      if(this.stroke) {
        ctx.stroke(); 
      }
      if(this.fill) {
        ctx.fill(); 
      }
    })
    // ctx.closePath();  // Whether or not to draw the final path line. 
  }
}

/**
* Pentagon
* @extends Polygon
*/
export default class PolygonController extends Polygon {
  /**
  * Create a Pentagon
  * @param {Object} options - center, diameter and colors of the Pentagon
  * @param {Point} options.center - The center point of the Pentagon
  * @param {number} options.diameter - The diameter of the Pentagon
  * @param {Array.<string>} options.colors - The five colors that make up the Pentagon
  * @param {number} options.rotation - The initial rotation 
  * @param {number} options.sides - The number of polygon sides 
  */
  constructor(options) {
    super(mergeObjects(options))
  }
}
