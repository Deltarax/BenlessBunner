class Bone extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this); // add's to physics system
        // this.setImmovable();
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.setVelocityX(800);
        
    }

    update() {

        // check if it hits the boss
        this.scene.physics.add.collider(this, boss, this.boneCollision, null, this);

        // if it goes off screen destroy it
        if (this.x > game.config.width){
            this.destroy();
        }
    }

    // What happens when you get a hit!
    boneCollision() {
        score++;
        this.scene.cameras.main.shake(250, 0.0075); // Pizass
        this.scene.sound.play('onHit');
        this.scene.scoreText.text = score;

        // rotates the cat on a hit
        this.scene.tweens.add({
            targets: [boss],
            angle: {from: -20, to: 0},
            duration: 250,
        })
        this.destroy(); 
    }


}