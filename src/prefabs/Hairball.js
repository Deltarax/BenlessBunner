class Hairball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, number) {
        super(scene, x, y, texture);
    
        // add object to existing scene
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this); // add's to physics system
        // this.setImmovable();
        this.checkWorldBounds = true;
        // this.outOfBoundsKill = true;
        this.setVelocityX(-400);
        this.body.setCircle(15);
        this.number = number;
        this.adjusted = false;
        
    }

    update() {

        // If it's a shotgun attack hairball, adjust the Y velocity to create spread
        if (this.x < game.config.width) {
            if (this.number == 1){
                // this one is the one that just goes horizontally
            } else if (this.number == 2){
                this.setVelocityY(50);
            } else if (this.number == 3){
                this.setVelocityY(-50);
            } else if (this.number == 4){
                this.setVelocityY(100);
            } else if (this.number == 5){
                this.setVelocityY(-100);
            } else if (this.number == 6){
                this.setVelocityY(175);
            } else if (this.number == 7){
                this.setVelocityY(-175);
            }
        }

        // if it goes off screen destroy it
        if (this.x < 0){
            console.log("ouch");
            this.destroy();
        }
    }
}