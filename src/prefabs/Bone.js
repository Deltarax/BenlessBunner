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
        this.setVelocityX(1800);
        
    }

    update() {

        // creating movement using sinusodal movement
        // this.numberOfTicks++
        // this.y = (150 * Math.sin(this.numberOfTicks * 0.5 * Math.PI/40)) + game.config.height/3
        // console.log("bone");
        this.scene.physics.add.collider(this, boss, this.boneCollision, null, this);
            // console.log("hit");
            // this.destroy(); 
    
        if (this.x > game.config.width){
            console.log("boom");
            this.destroy();
        }
    }

    boneCollision() {
        console.log("hit");
        this.scene.score++;
        this.scene.cameras.main.shake(250, 0.0075);
        this.scene.scoreText.text = this.scene.score;
        this.destroy(); 
    }


}