import React, { Component } from 'react';
import PixiBoidPoolController from './pixi-boid-pool-controller.js'; 
import $ from 'jquery'; 
import * as PIXI from 'pixi.js'; 

export default class Pixi extends Component {
  constructor(props) {
    super(props)

    this.pixiRef = React.createRef();
    this.pixiContainer = null; 

    const pixiAppOptions = {  
      width: 256, 
      height: 600,  
      antialias: true,    
      transparent: true, 
      resolution: 1,   
    }

    // this.app = new PIXI.Application(pixiAppOptions);
    this.app = new PIXI.Application(pixiAppOptions); 
    this.app.renderer.autoResize = true;
    // this.app.renderer.backgroundColor = color

    this.mousePos = {x: -100, y: -100};
    this.drawBuffer = []; 
  }
  
  componentDidMount() {
    this.pixiContainer = this.pixiRef.current; 
    this.$pixiContainer = $(this.pixiContainer); 
    this.$pixiContainer.append(this.app.view);

    this.pixiBoidPoolController = new PixiBoidPoolController({
      boidCount: 50,
      containerWidth: this.pixiContainer.width, 
      containerHeight: this.pixiContainer.height, 
    })

    let boidSprite; 

    this.spritePool = this.pixiBoidPoolController.boidPool.map(_ => {
      boidSprite = new PIXI.Sprite.fromImage(pubUrl('circle.png'));
      boidSprite.width = 10;
      boidSprite.height = 10;
      this.app.stage.addChild(boidSprite);
      return boidSprite;
    });

    // Bind events to canvas. 
    const namespace = "canvas" + Math.random() * 200; 
    $(this.pixiContainer).on(`mousemove.${namespace}`, this.onMouseMove);
    $(this.pixiContainer).on(`click.${namespace}`, this.onMouseClick);
    $(window).on(`resize.${namespace}`, this.onResize); 

    this.onResize(); 
    this.cursorSprite = new PIXI.Sprite.fromImage(pubUrl('circle.png'));
    this.cursorSprite.width = 10;
    this.cursorSprite.height = 10;
    this.app.stage.addChild(this.cursorSprite); 
    window.app = this.app;

    // Start to listen for frame updates
    this.app.ticker.add((delta) => {
      this.update(delta); 
    });
  }

  componentWillUnmount() {
    this.app.stop();
  }

  loadCursor = () => {
    // create a new Sprite from an image path
    var bunny = PIXI.Sprite.from('../public/assets/circle.png')

    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = this.app.screen.width / 2;
    bunny.y = this.app.screen.height / 2;
    bunny.width = 10;
    bunny.height = 10;

    this.app.stage.addChild(bunny);

  }

  loadAssets = () => {
    // PIXI.loader
    //   .add('cursor', '../assets/cat.png')
    //   .load((loader, resources) => {
    //     this.cursor = new PIXI.Sprite(resources.cursor.texture);
    //     // this.cursor.width = 400;
    //     // this.cursor.height = 400;
        
    // }); 
  }

  onResize = () => {
    const width = this.$pixiContainer.width(),
      height = this.$pixiContainer.height(); 

    // Resize the renderer
    this.app.renderer.resize(width, height);
    // Resize the boids bounds to the container. 
    this.pixiBoidPoolController.setBounds(width, height);
  }

  onMouseMove = (e) => {
    // var rect = this.pixiContainer.getBoundingClientRect();
    // this.mousePos = {
    //   x: (e.clientX - rect.left),
    //   y: (e.clientY - rect.top)
    // };
    // this.cursorSprite.x = this.mousePos.x;
    // this.cursorSprite.y = this.mousePos.y;
    // this.boidPoolController.updateChaser(this.mousePos.x, this.mousePos.y)
  }

  onMouseClick = (e) => {
    // var rect = this.canvas.getBoundingClientRect();
    // this.mousePos = {
    //   x: (e.clientX - rect.left),
    //   y: (e.clientY - rect.top)
    // };
    // this.boidPoolController.setStateFlee(); 
    // this.drawBuffer.push(new Ripple({x: this.mousePos.x, y: this.mousePos.y, r: 20, ctx: this.ctx}))
  }

  update = (delta) => {
    // this.mousePos = this.app.renderer.plugins.interaction.mouse.global; 

    // if(this.cursor) {
    //   this.cursor.position = this.mousePos; 
    // }
    // pixiBoidPool.map(pixiBoid => pixiBoid.update(delta))
    // this.drawBuffer = this.drawBuffer.filter(item => {
    //   item && item.update(); 
    //   if(item.active) {
    //     item.draw();
    //     return item; 
    //   }
    // });
    this.pixiBoidPoolController.updatePool('flock'); 
    this.pixiBoidPoolController.boidPool.map((boid, i) => {
      this.spritePool[i].x = boid.position.x;
      this.spritePool[i].y = boid.position.y;
    });
  }

  render() {
    return (
      <div className='pixi-container' ref={this.pixiRef} />
    );
  }
}

