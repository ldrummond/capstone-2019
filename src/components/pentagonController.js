import { toRad, ranRGB, CanvasTransition, mergeObjects} from './helperFunctions'

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

  easeSides({start: startSides, end: endSides, duration, onComplete, isSine}) {
    const growTransition = new CanvasTransition({
      startValue: startSides, 
      endValue: endSides, 
      durationMs: duration, 
      fps: 60, 
      sine: isSine,
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
      
      triangle = [this.center, curPoint, nextPoint, this.center]; 
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
      ctx.moveTo(points[0].x, points[0].y);
      ctx.fillStyle = this.colors[i]; 
      ctx.lineTo(points[1].x, points[1].y);
      ctx.lineTo(points[2].x, points[2].y);
      ctx.lineTo(points[3].x, points[3].y);

      if(this.stroke) {
        ctx.stroke(); 
      }
      if(this.fill) {
        ctx.fill(); 
      }
    })
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
