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
            if ((this.numberOfTicks % 100) == 0){
                this.attacking = true

                // randomly pick a number between 1-3, and make that attack
                this.randomAttack = this.getRandomInt(0,3);
                if (this.randomAttack == 0){
                    this.beam1Attack();
                } else if (this.randomAttack == 1){
                    this.beam2Attack();
                } else if (this.randomAttack == 2){
                    this.beam3Attack();
                } else {
                    console.error("Trying to make a beam 4 attack?");
                }
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

    // Beam 2 attack, middle of the screen
    beam2Attack(){
        console.log("beam 2 attack");

        // add in the portal attack indicator
        this.portal = this.scene.add.sprite(this.x-20, game.config.height/2, 'portal');

        // start the attack after 1 seconds
        this.clock = this.scene.time.delayedCall(1000, () => {

            //create the beam and check for collisions
            this.beam = this.scene.physics.add.sprite(0, game.config.height/2, 'bigBeam').setOrigin(0, 0.5);
            this.scene.physics.add.collider(this.beam, player, this.attackCollision, null, this);

            // end the attack after a 1 second delay
            this.clock2 = this.scene.time.delayedCall(1000, () => {
                this.beam.destroy();
                this.portal.destroy();
            }, null, this);
        }, null, this);
    }

    // Beam 3 attack, lower third of the screen
    beam3Attack(){
        console.log("beam 3 attack");

        // add in the portal attack indicator
        this.portal = this.scene.add.sprite(this.x-20, game.config.height/4 + game.config.height/2, 'portal');

        // start the attack after 1 seconds
        this.clock = this.scene.time.delayedCall(1000, () => {

            //create the beam and check for collisions
            this.beam = this.scene.physics.add.sprite(0, game.config.height/4 + game.config.height/2, 'bigBeam').setOrigin(0, 0.5);
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

    // random number generator
    // credit to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }


}