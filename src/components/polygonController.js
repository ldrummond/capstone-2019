import { toRad, ranRGB, drawLerpLine, drawCircle, Transition } from './helperFunctions'
import { Point } from './canvasShapes'

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
    let {center = new Point(0, 0), sides = 3, size = 50, rotation = 0, colors = []} = opts;

    while(colors.length < sides) {
      colors.push(ranRGB());
    }

    this.sides = sides;
    this.size = size;
    this.center = center;
    this.colors = colors; 
    this.rotation = rotation;
    this.hitBufferColors = this.generateHitBufferColors(); 
    this.hitIndex = -1; 
    this.triangles = this.getTrianglesPoints(); 
    this.cursor = new Point(0, 0);
    this.transitions = []; 

    // Methods for defining redraws, to save performance. 
    this.hasChanged = true; 
  }

  // rotate(deg) {
  //   this.rotation = this.rotation + deg;
  //   this.triangles = this.getTrianglesPoints(); 
  //   this.hasChanged = true;
  // }

  rotateTo(deg) {
    this.rotation = deg;
    this.triangles = this.getTrianglesPoints(); 
    this.hasChanged = true;
  }

  rotateToEase(deg, duration) {
    const rotateTransition = new Transition({
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
    let curPoint, curAngle, nextPoint, nextAngle, triangle; 
    let triangles = []; 

    // Draw each triangle 
    for (let i = 0; i < this.sides; i += 1) {
      curAngle = (i + 1) * 2 * Math.PI / this.sides - toRad(this.rotation); 
      nextAngle = (i + 2) * 2 * Math.PI / this.sides - toRad(this.rotation); 
      curPoint = new Point(this.center.x + this.size * Math.cos(curAngle), this.center.y + this.size * Math.sin(curAngle));;
      nextPoint = new Point(this.center.x + this.size * Math.cos(nextAngle), this.center.y + this.size * Math.sin(nextAngle));
      
      triangle = [this.center, curPoint, nextPoint]; 
      triangles.push(triangle); 
    }
    return triangles;
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
  
  /**
   * 
   * @param {number} size the new size
   * @returns {function} draw - the draw function
   */
  resize(scale) {
    this.center = new Point(this.center.x * scale.x, this.center.y * scale.y);
    this.size *= scale.x; 
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

  /**
   * Generates a draw function. 
   * Returned function defaults to false if the object
   * has not changed, to prevent unnecessary draw calls. 
   * @returns {getDrawFn~draw} - Function to draw the object. False is drawing is unnecessary. 
   */
  getDrawFn(forceRedraw = false) {
    let draw = false; 
    // Checks the transitions to clear inactive,
    // and update state of shape before drawing. 
    this.updateTransitions(); 

    // If something has changed in the object to trigger
    // a redraw, the draw function will be defined 
    // for the canvas to redraw. 
    if(this.hasChanged || forceRedraw) {
      /**
       * @function draw
       * Function to draw the object. If no drawing required
       * function is false. 
       * @param {CanvasRenderingContext2D} ctx
       * @param {Point} mousepos
       * @param {number} current_time
       */
      draw = (ctx, mousePos, time) => {
        // const distanceFromMouse = Math.hypot(mousePos.x - this.center.x, mousePos.y - this.center.y)
        // const magnitude = Math.round(distanceFromMouse / 1 * 2 / 50);

        // Maps over the triangles that compose the shape
        // and draws them all. 
        this.triangles.map((points, i) => {

          // Draws each triangle as an array of points with specified fill. 
          ctx.beginPath(); 
          ctx.moveTo(points[0].x, points[0].y);
          ctx.fillStyle = this.colors[i]; 
          ctx.lineTo(points[1].x, points[1].y);
          ctx.lineTo(points[2].x, points[2].y);
          ctx.fill();

          // if(i == this.hitIndex) {
            // ctx.lineTo(points[1].x, points[1].y);
            // ctx.lineTo(points[2].x, points[2].y);
            // ctx.fill(); 
            // ctx.stroke();
          // } 
          // else {
          //   drawLerpLine(ctx, points[0], points[1], 5, magnitude); 
          //   drawLerpLine(ctx, points[1], points[2], 5, magnitude); 
          //   ctx.lineTo(points[0].x, points[0].y);
          //   // ctx.fill(); 
          //   ctx.stroke();
          // }
          // ctx.closePath();  // Wether or not to draw the final path line. 
        })
      }
      this.hasChanged = false; 
    }
    return draw;
  }
}


/**
* Pentagon
* @extends Polygon
*/
export class PentagonController extends Polygon {
  /**
  * Create a Pentagon
  * @param {Object} options - center, size and colors of the Pentagon
  * @param {Point} options.center - The center point of the Pentagon
  * @param {number} options.size - The size of the Pentagon
  * @param {Array.<string>} options.colors - The five colors that make up the Pentagon
  */
  constructor(options) {
    let {center, size, colors, rotation = 18} = options

    let allOpts = {
      colors: colors,
      center: center,
      size: size, 
      sides: 5,
      rotation: rotation, 
    }

    super(allOpts)
  }
}
