import BoidBase from 'boid'; 
import * as PIXI from 'pixi.js';

export default class PixiBoid {
    constructor(options) {
        const {width = 1080, height = 620, boidPool, texture, controlled = false} = options
        
        this.controlled = controlled; 

        // Pass a reference to the whole flock.
        this.boidPool = boidPool

        // Create the boid. 
        this.boid = new BoidBase();

        // // Set the boid bounds to the pixi renderer bounds. 
        this.boid.setBounds(width, height);

        // // Place Boid randomly
        this.boid.position.x = width * Math.random();
        this.boid.position.y = height * Math.random();
        this.boid.velocity.x = 20 * Math.random() - 10;
        this.boid.velocity.y = 20 * Math.random() - 10;

        // Create pixi sprite
        this.sprite = new PIXI.Sprite(texture);

        // // Center the sprite. 
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.width = 30,
        this.sprite.height = 30; 
        
    }

    moveTo(x, y) { 
        this.boid.position.x = x;
        this.boid.position.y = y; 
        this.sprite.x = x;
        this.sprite.y = y;
    }

    setBounds(width, height) {
        this.boid.setBounds(width, height); 
    }

    update(delta) {
        if(!this.controlled) {
            this.boidPool && this.boid.flock(this.boidPool.map(pixiBoid => pixiBoid.boid));
            this.boid.update();
            this.updateSpriteToBoid(delta); 
        }
    }

    updateSpriteToBoid(delta) {
        // Setup the position of the sprite
        this.sprite.rotation = (this.boid.velocity.angle + Math.PI / 2) * delta;
        this.sprite.x = this.boid.position.x * delta; 
        this.sprite.y = this.boid.position.y * delta; 
    }
}