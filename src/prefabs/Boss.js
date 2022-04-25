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
        this.attacking = false; // flag for checking attacks
        this.playerDead = false;
    }


    update() {

        // creating movement using sinusodal movement
        this.numberOfTicks++;
        this.movementTicks++;
        if (this.scene.score > 20){
            this.y = (150 * Math.sin(this.movementTicks * 0.5 * Math.PI/20)) + game.config.height/2
        } else {
            this.y = (150 * Math.sin(this.movementTicks * 0.5 * Math.PI/40)) + game.config.height/2
        }


        // console.log(this.numberOfTicks);

        // Check if currently attacking, and if not start a random attack
        if (!this.attacking){
            if ((this.numberOfTicks % 200) == 0){
                this.attacking = true
                this.beam1Attack();
            }
        } else {
            this.attacking = false;
        }

    }

    // Beam 1 attack, top third of the screen
    beam1Attack(){
        console.log("beam 1 attack");

        // add in the portal attack indicator
        this.portal = this.scene.add.sprite(this.x-20, game.config.height/4, 'portal');

        // start the attack after 1 seconds
        this.clock = this.scene.time.delayedCall(1000, () => {

            //create the beam and check for collisions
            this.beam = this.scene.physics.add.sprite(0, game.config.height/4, 'bigBeam').setOrigin(0, 0.5);
            this.scene.physics.add.collider(this.beam, player, this.attackCollision, null, this);

            // end the attack after a 1 second delay
            this.clock2 = this.scene.time.delayedCall(1000, () => {
                this.beam.destroy();
                this.portal.destroy();
            }, null, this);
        }, null, this);
    }

    // check if the player is dead and flag it
    attackCollision(){
        if(!this.playerDead){
            this.playerDead = true;
        }

    }


}