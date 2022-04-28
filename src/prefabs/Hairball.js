class Hairball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this); // add's to physics system
        // this.setImmovable();
        this.checkWorldBounds = true;
        // this.outOfBoundsKill = true;
        this.setVelocityX(-400);
        this.body.setCircle(15);
        
    }

    update() {


        // if it goes off screen destroy it
        if (this.x < 0){
            console.log("ouch");
            this.destroy();
        }
    }
}