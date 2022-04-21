class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this); // add's to physics system
        // this.setImmovable();
        this.moveSpeed = 1;
        this.numberOfTicks = 0;
    }

    update() {

        // creating movement using sinusodal movement
        this.numberOfTicks++
        this.y = (150 * Math.sin(this.numberOfTicks * 0.5 * Math.PI/40)) + game.config.height/3

    }


}