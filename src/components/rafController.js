
//////////////////////////////////////////////////
//
// Request Animation Frame (rAF) Controller
//
// A centralized place to execute functions relying on rAF timing. 
//
//////////////////////////////////////////////////

window.cout = (oneInNumber, ...messages) => {
  if(Math.round(Math.random() * oneInNumber) === oneInNumber) {
    console.log(...messages);
  }
}


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

  changeFps(fps) {
    this.fps = fps;
    this.stopLoop();
    this.startLoop();
  }

  loop = () => {
    // window.cout(10, this);
    this.rafId = requestAnimationFrame(this.loop);
    
    // Check the amount of time elapsed since previous animation frame. 
    // If it fits within the fps interval, call step function.  
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    this.ticker += this.increment; 

    if(this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      this.onStep(this.ticker); 
    }
  }
}
