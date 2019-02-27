import BoidPoolController from '../components/boidPoolController.js'; 

//////////////////////////////////////////////////
//
// Simulation Controller
//
//////////////////////////////////////////////////

export default class SimulationController {
  constructor(options = {}) {
   
    let {
      simulationType = 'colony', 
      boidCount = '50',
      containerWidth,
      containerHeight,
    } = options; 
    
    this.boidPoolController = new BoidPoolController({
      boidCount: boidCount,
      containerWidth: containerWidth, 
      containerHeight: containerHeight, 
    })

    // this.boidPoolController.setStateBeach();

    // SYSTEMS ASSOCIATED WITH DRAWING THE COMPONENTS
    this.drawBuffer = []; 
    this.hasChanged = false; 
  }

  step = (ctx, mousePos, time) => {
    this.boidPoolController.stepPool(); 
    // ctx.beginPath(); 
    this.boidPoolController.boidPool.map(boid => {
      // let rotation = boid.velocity.angle + Math.PI / 2
      // console.log(rotation)
      
      // ctx.lineWidth = 2
      // ctx.moveTo(boid.position.x, boid.position.y)
      // ctx.lineTo(boid.position.x + boid.velocity.x * 8, boid.position.y + boid.velocity.y * 8);
      ctx.strokeRect(boid.position.x, boid.position.y, 5, 5);
    })
    // ctx.stroke(); 
  }

  generateDrawBuffer() {
    
  }

  /**
   * 
   * @param {number} size the new size
   * @returns {function} draw - the draw function
   */
  resize(scale) {
    this.center = {x: this.center.x * scale.x, y: this.center.y * scale.y};
    this.width *= scale.x; 
    this.height *= scale.y; 
    this.drawBuffer = this.generateDrawBuffer();

    return (ctx, mousePos, time) => {
      // Maps over the triangles that compose the shape
      // and draws them all. 
      // this.drawBuffer.map((drawable, i) => {
      //   drawable.draw(ctx); 
      // })

      this.boidPoolController.boidPool.map(boid => {
        ctx.strokeRect(boid.x, boid.y, 5, 5);
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
    // this.updateTransitions(); 

    // If something has changed in the object to trigger
    // a redraw, the draw function will be defined 
    // for the canvas to redraw. 
    if(this.hasChanged || forceRedraw) {
      draw = (ctx, mousePos, time) => {
        // this.drawBuffer.map((drawable, i) => {
        //   // drawable.shouldDraw()
        // })

        this.boidPoolController.boidPool.map(boid => {
          ctx.fillRect(boid.x, boid.y, 5, 5);
        })
      }
      this.hasChanged = false; 
    }
    return draw;
  }
}