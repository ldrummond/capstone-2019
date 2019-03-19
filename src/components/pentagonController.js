import { toRad, ranRGB, CanvasTransition, mergeObjects, drawLerpLine} from './helperFunctions'
import { Point,  } from './canvasShapes'

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

    // Opts 
    this.noise = opts.noise || false; 
    this.sides = opts.sides || 3;
    this.diameter = opts.diameter || 50;
    this.center = opts.center || new Point(0, 0);
    this.stroke = opts.stroke || false; 
    this.fill = opts.fill || true; 
    this.strokeStyle = opts.strokeStyle || 'white'; 
    this.colors = opts.colors || []; 
    this.rotation = opts.rotation || 0;

    if(this.fill) {
      while(this.colors.length < this.sides) {this.colors.push(ranRGB());}
    }

    // Defaults
    this.cursor = new Point(0, 0);
    this.transitions = []; 
    this.magnitude = 0;   
    this.hitIndex = -1; 
    this.hitBufferColors = this.generateHitBufferColors(); 
    this.triangles = this.getTrianglesPoints(); 

    // Methods for defining redraws, to save performance. 
    this.hasChanged = true; 
  }

  rotateTo(deg) {
    this.rotation = deg;
    this.triangles = this.getTrianglesPoints(); 
    this.hasChanged = true;
  }

  rotateToEase(deg, duration) {
    const rotateTransition = new CanvasTransition({
      startValue: this.rotation, 
      endValue: deg, 
      durationMs: duration, 
      fps: 60, 
      onStep: res => {
        this.rotation = res;
        this.triangles = this.getTrianglesPoints(); 
      }, 
    })

    this.transitions.push(rotateTransition);
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
  }

  generateHitBufferColors() {
    return [...Array(this.sides)].map(_ => ranRGB()); 
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
      
      curPoint = new Point(curX, curY);
      nextPoint = new Point(nextX, nextY);
      
      triangle = [this.center, curPoint, nextPoint]; 
      triangles.push(triangle); 
    }
    
    return triangles;
  }
  
  /**
   * 
   * @param {number} scale the scale factor to resize by
   * @returns {function} draw - the draw function
   */
  resize(scale) {
    this.center = new Point(this.center.x * scale.x, this.center.y * scale.y);
    this.diameter *= scale.x; 
    this.triangles = this.getTrianglesPoints();
    return (ctx, mousePos, time) => {
      // Maps over the triangles that compose the shape
      // and draws them all. 
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

  drawHidden(ctx, colors) {
    if(colors) {
      this.triangles.map((points, i) => {
        ctx.beginPath(); 
  
        // Draw triangle as three points
        ctx.lineTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y); 
  
        // Fill points. 
        ctx.fillStyle = colors[i]; 
        ctx.strokeStyle = colors[i];    
        ctx.lineWidth = 10;     
        ctx.fill();
        ctx.stroke();
        ctx.closePath(); 
      })
    }
  }
 
  update() {
    // Checks the transitions to clear inactive,
    // and update state of shape before drawing. 
    this.updateTransitions(); 
  }
  
  // Returns true if something has changed since the last draw call. 
  get shouldDraw() {
    return this.hasChanged
  }

  draw(ctx, mousePos, tick) {
   
    ctx.strokeStyle = this.strokeStyle
    if(this.noise) {
      if(mousePos) {
        const distanceFromMouse = Math.hypot(mousePos.x - this.center.x, mousePos.y - this.center.y)
        this.magnitude = Math.round(distanceFromMouse / 1 * 2 / 50);
      }
    }

    // Maps over the triangles that compose the shape
    // and draws them all. 
    this.triangles.map((points, i) => {
      this.hasChanged = false; 

      // Draws each triangle as an array of points with specified fill. 
      ctx.beginPath(); 

      // console.log(Math.sin(tick));
      let amp = 20;
      let freq = 1 / 40;

      if(this.magnitude) {
        // console.log(this.magnitude)
      }

      let t = 100; 
      for(let i = 0; i < t; i++) {
        // ctx.lineTo(this.center.x + i - (t / 2), this.center.y + slope(i, amp, freq + (tick / 1000)));
        ctx.lineTo(this.center.x + i - (t / 2), this.center.y + slope(i, tick / 10, 20, freq));
      }

      function slope(x, xOffset, amp, freq) {
        return amp * Math.sin(x * freq + xOffset) 
      }

      this.hasChanged = true; 

      if(this.noise) {
        drawLerpLine(ctx, points[0], points[1], 5, this.magnitude); 
        drawLerpLine(ctx, points[1], points[2], 5, this.magnitude); 
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
      // ctx.closePath();  // Whether or not to draw the final path line. 
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
