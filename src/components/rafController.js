
//////////////////////////////////////////////////
//
// Request Animation Frame (rAF) Controller
//
// A centralized place to execute functions relying on rAF timing. 
//
//////////////////////////////////////////////////

export default class RafController {
  constructor(options) {
    let {fps} = options; 
    this.fps = fps;
    this.startLoop();  
    this.onStep = function() {}; 
  }

  startLoop() {
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
    this.startTime = this.then;
    this.ticker = 0; 
    this.increment = 1;  
    this.loop();
  }

  stopLoop() {
    cancelAnimationFrame(this.rafId);  
  }

  loop = () => {
    this.rafId = requestAnimationFrame(this.loop);
    
    // Check the amount of time elapsed since previous animation frame. 
    // If it fits within the fps interval, call step function.  
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    this.ticker += this.increment; 

    if(this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      this.onStep(); 
    }
  }

  /**
   * 
   * @callback onStep  
   */
  step() {
    this.onStep(this.ticker); 
  }
}
