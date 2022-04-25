class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this); // add's to physics system
        this.scene = scene;
        this.setImmovable();
        this.moveSpeed = 1;
        this.numberOfTicks = 0;
        this.movementTicks = 0;
        this.attacking = false;
        this.playerDead = false;
    }


    update() {

        // creating movement using sinusodal movement
        this.numberOfTicks++;
        if (!this.attacking){
            this.movementTicks++;
            if (this.scene.score > 20){
                this.y = (150 * Math.sin(this.movementTicks * 0.5 * Math.PI/20)) + game.config.height/2
            } else {
                this.y = (150 * Math.sin(this.movementTicks * 0.5 * Math.PI/40)) + game.config.height/2
            }
        }

        // console.log(this.numberOfTicks);

        if (!this.attacking){
            if ((this.numberOfTicks % 400) == 0){
                this.attacking = true
                console.log("beam");
                this.scene.sound.play('beamSFX');
                this.beam = this.scene.physics.add.sprite(0, this.y, 'beam').setOrigin(0, 0);
                this.scene.physics.add.collider(this.beam, player, this.attackCollision, null, this);
                // this.scene.cameras.main.shake(1500, 0.025); // Oomph
            }
        } else {
            if ((this.numberOfTicks % 200) == 0){
                this.attacking = false;
                this.beam.destroy();
                console.log("nobeam");
            }
        }

    }

    attackCollision(){
        if(!this.playerDead){
            console.log("dead");
            this.playerDead = true;
        }
        // console.log("dead");

    }


}