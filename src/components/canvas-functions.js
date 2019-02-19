// Functions for programming a canvas. 

/*
* Pentagon
*/
class Pentagon extends Polygon {
  constructor(opts = {}) {
    let {center, size, colors} = opts; 

    let allOpts = {
      colors: colors,
      center: center,
      size: size, 
      sides: 5,
      rotation: 18, 
    }
    super(allOpts)
  }
}

/*
* Polygon
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

  getDistanceFromCursor() {
    return Math.hypot(this.cursor.x - this.center.x, this.cursor.y - this.center.y)
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

  draw(ctx) {
    let magnitude = Math.round(this.getDistanceFromCursor() / 1 * 2 / 50);

    this.triangles.map((points, i) => {
      ctx.beginPath(); 

      // Draw triangle as three points
      ctx.moveTo(points[0].x, points[0].y);
      ctx.fillStyle = this.colors[i]; 
      // ctx.fillStyle = 'red';
        
      if(i == this.hitIndex) {
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.fill(); 
        ctx.stroke();
      } 
      else {
        lerpLine(ctx, points[0], points[1], 5, magnitude); 
        lerpLine(ctx, points[1], points[2], 5, magnitude); 
        ctx.lineTo(points[0].x, points[0].y);
        // ctx.fill(); 
        ctx.stroke();
      }
      // ctx.closePath();  // Wether or not to draw the final path line. 
    })
  }
}

/*
* Lerp Line
*/
export function lerpLine(ctx, start, end, numPoints = 1, magnitude = 5) {
  if(!ctx || typeof ctx.moveTo == 'undefined') {throw new Error("Context is undefined")}
  ctx.moveTo(start.x, start.y);
  let xUnit = (end.x - start.x) / numPoints
  let yUnit = (end.y - start.y) / numPoints
  for(let i = 1; i <= numPoints; i++) {
    let x = start.x + (xUnit * i) + ((Math.random() - 0.5) * magnitude); 
    let y = start.y + (yUnit * i) + ((Math.random() - 0.5) * magnitude);
    ctx.strokeStyle = 'red'; 
    ctx.strokeRect(x, y, 1, 1);
    ctx.strokeStyle = 'white'; 
    ctx.lineTo(x, y); 
  }
}

/*
* Curve Line
*/
export function curveLine(ctx, start, end, numPoints = 1, magnitude = 5) {
  if(!ctx || typeof ctx.moveTo == 'undefined') {throw new Error("Context is undefined")}
  let points = [start]; 
  let xUnit = (end.x - start.x) / numPoints
  let yUnit = (end.y - start.y) / numPoints

  for(let i = 0; i < numPoints; i++) {
    let x = start.x + (xUnit * i) + ((Math.random() - 0.5) * magnitude); 
    let y = start.y + (yUnit * i) + ((Math.random() - 0.5) * magnitude);
    points.push(new Point(x, y)); 
  }

  ctx.moveTo(start.x, start.y);
  
  if(points.length >= 2) {
    for(let i = 1; i <= points.length - 2; i++) {
      var xc = (points[i].x + points[i + 1].x) / 2;
      var yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      ctx.strokeStyle = 'red'; 
      ctx.strokeRect(points[i].x, points[i].y, 1, 1);
      ctx.strokeStyle = 'white'; 
      ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y);
    }
  } else {
    ctx.lineTo(x, y)
  }
}

/*
* Simplex Line
*/
export function simplexLine(ctx, start, end, numPoints = 1, simplex, time, magnitude = 1) {
  if(!ctx || typeof ctx.moveTo == 'undefined') {throw new Error("Context is undefined")}
  ctx.moveTo(start.x, start.y);
  let xUnit = (end.x - start.x) / numPoints
  let yUnit = (end.y - start.y) / numPoints
  for(let i = 1; i <= numPoints; i++) {
    let x = start.x + (xUnit * i) + simplex.noise2D(i, time) * magnitude; 
    let y = start.y + (yUnit * i) + simplex.noise2D(i, time) * magnitude;
    ctx.strokeStyle = 'red'; 
    ctx.lineTo(x, y); 
  }
}

/*
* Point 
*/
export function Point(x, y) {
  this.x = x; 
  this.y = y; 
}

/*
* Ran RGB 
*/
export function ranRGB() {
  return `rgb(${255 * Math.random()|0}, ${255 * Math.random()|0}, ${255 * Math.random()|0})`;
}

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






// export function drawCirc(x, y, r, ctx) {
//   ctx.beginPath();
//   ctx.arc(x, y, r, 0, 2 * Math.PI);
//   ctx.stroke();
// }

// export function drawRect(x, y, ctx) {

// }

// export class Circle {
//   constructor(options = {}) {
//     const {x = 0, y = 0, r = 20, ctx} = options; 
//     this.x = x;
//     this.y = y;
//     this.r = Math.max(r, 10);  
//     this.ctx = ctx; 
//     this.active = true; 

//     if(typeof(ctx) === 'undefined') {
//       throw undefined;
//     }
//   }

//   draw = () => {
//     if(this.active && this.ctx) {
//       drawCirc(this.x, this.y, this.r, this.ctx); 
//     }
//   }
// }

// export class Ripple extends Circle {
//   constructor(options) {
//     super(options)
//   }

//   update() {
//     this.r--;
//     if(this.r <= 0) {
//       this.active = false; 
//     }
//   }

//   draw = () => {
//     if(this.active && this.ctx) {
//       drawCirc(this.x, this.y, this.r, this.ctx); 
//     }
//   }
// }



