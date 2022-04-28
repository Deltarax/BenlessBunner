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
        this.playerDead = false; // flag for checking if you die
        this.faster = false; // flag for if game has become more difficult
        this.hairballGroup = this.scene.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
    }


    update() {

        // creating movement using sinusodal movement
        this.numberOfTicks++;
        this.movementTicks++;
        if (this.faster){
            this.y = (150 * Math.sin(this.movementTicks * 0.5 * Math.PI/20)) + game.config.height/2
        } else {
            this.y = (150 * Math.sin(this.movementTicks * 0.5 * Math.PI/40)) + game.config.height/2
        }

        if (score > 20){
            if(!this.attacking){
                this.faster = true;
            }
        }

        // console.log(this.numberOfTicks);

        // Check if currently attacking, and if not start a random attack
        if (!this.attacking){
            if ((this.numberOfTicks % 200) == 0){
                this.attacking = true
                this.numberOfTicks = 0;

                // randomly pick a number between 1-3, and make that attack
                this.randomAttack = this.getRandomInt(0,4);
                if (this.randomAttack == 0){
                    this.beam1Attack();
                } else if (this.randomAttack == 1){
                    this.beam2Attack();
                } else if (this.randomAttack == 2){
                    this.beam3Attack();
                } else if (this.randomAttack == 3){
                    this.hairballAlternating();
                } else {
                    console.error("Trying to make a beam 4 attack?");
                }

            }
        }

        // Checks if the hairball tracker is still active, and if not, destroys it and ends the attack.
        if(this.attacking){
            if(this.hairballTracker){
                if(this.hairballTracker.x < 0){
                    this.hairballTracker.destroy();
                    this.attacking = false;
                }
            }
        }
    }

    // Beam 1 attack, top third of the screen
    beam1Attack(){
        console.log("beam 1 attack");

        // add in the portal attack indicator
        this.portal = this.scene.add.sprite(this.x-20, game.config.height/4 - 20, 'portal').setAlpha(0);
        this.scene.tweens.add({
            targets: [this.portal],
            alpha: 1,
            scale: {from: 0, to: 1},
            duration: 250, 
        })

        // secondary beam for when game more difficult
        if(this.faster){
            // beam 2
            this.portal2 = this.scene.add.sprite(this.x-20, game.config.height/2, 'portal').setAlpha(0);
            this.scene.tweens.add({
                targets: [this.portal2],
                alpha: 1,
                scale: {from: 0, to: 1},
                duration: 250, 
            })
        }

        // start the attack after 1 seconds
        this.clock = this.scene.time.delayedCall(1000, () => {

            //create the beam and check for collisions
            this.beam = this.scene.physics.add.sprite(0, game.config.height/4 - 20, 'bigBeam').setOrigin(0, 0.5).setAlpha(0);
            this.scene.tweens.add({
                targets: [this.beam],
                alpha: 1,
                duration: 50, 
            });
            this.scene.physics.add.collider(this.beam, player, this.attackCollision, null, this);

            if(this.faster){
                this.beam2 = this.scene.physics.add.sprite(0, game.config.height/2, 'bigBeam').setOrigin(0, 0.5).setAlpha(0);
                this.scene.tweens.add({
                    targets: [this.beam2],
                    alpha: 1,
                    duration: 50, 
                });
                this.scene.physics.add.collider(this.beam2, player, this.attackCollision, null, this);
            }

            // end the attack after a 1 second delay
            this.clock2 = this.scene.time.delayedCall(1000, () => {
                this.beam.destroy();
                this.portal.destroy();
                if(this.faster){
                    this.beam2.destroy();
                    this.portal2.destroy();
                }
                this.attacking = false;
            }, null, this);
        }, null, this);
    }

    // Beam 2 attack, middle of the screen
    beam2Attack(){
        console.log("beam 2 attack");

        // add in the portal attack indicator
        this.portal = this.scene.add.sprite(this.x-20, game.config.height/2, 'portal').setAlpha(0);
        this.scene.tweens.add({
            targets: [this.portal],
            alpha: 1,
            scale: {from: 0, to: 1},
            duration: 250, 
        })

        // secondary beam for when game more difficult
        if(this.faster){
            // beam 3
            this.portal2 = this.scene.add.sprite(this.x-20, game.config.height/4 + game.config.height/2 + 20, 'portal').setAlpha(0);
            this.scene.tweens.add({
                targets: [this.portal2],
                alpha: 1,
                scale: {from: 0, to: 1},
                duration: 250, 
            })
        }

        // start the attack after 1 seconds
        this.clock = this.scene.time.delayedCall(1000, () => {

            //create the beam and check for collisions
            this.beam = this.scene.physics.add.sprite(0, game.config.height/2, 'bigBeam').setOrigin(0, 0.5).setAlpha(0);
            this.scene.tweens.add({
                targets: [this.beam],
                alpha: 1,
                duration: 50, 
            });
            this.scene.physics.add.collider(this.beam, player, this.attackCollision, null, this);

            if(this.faster){
                this.beam2 = this.scene.physics.add.sprite(0, game.config.height/4 + game.config.height/2 + 20, 'bigBeam').setOrigin(0, 0.5).setAlpha(0);
                this.scene.tweens.add({
                    targets: [this.beam2],
                    alpha: 1,
                    duration: 50, 
                });
                this.scene.physics.add.collider(this.beam2, player, this.attackCollision, null, this);
            }

            // end the attack after a 1 second delay
            this.clock2 = this.scene.time.delayedCall(1000, () => {
                this.beam.destroy();
                this.portal.destroy();
                if(this.faster){
                    this.beam2.destroy();
                    this.portal2.destroy();
                }
                this.attacking = false;
            }, null, this);
        }, null, this);
    }

    // Beam 3 attack, lower third of the screen
    beam3Attack(){
        console.log("beam 3 attack");

        // add in the portal attack indicator
        this.portal = this.scene.add.sprite(this.x-20, game.config.height/4 + game.config.height/2 + 20, 'portal').setAlpha(0);
        this.scene.tweens.add({
            targets: [this.portal],
            alpha: 1,
            scale: {from: 0, to: 1},
            duration: 250, 
        })

        // secondary beam for when game more difficult
        if(this.faster){
            // beam 1
            this.portal2 = this.scene.add.sprite(this.x-20, game.config.height/4 - 20, 'portal').setAlpha(0);
            this.scene.tweens.add({
                targets: [this.portal2],
                alpha: 1,
                scale: {from: 0, to: 1},
                duration: 250, 
            })
        }

        // start the attack after 1 seconds
        this.clock = this.scene.time.delayedCall(1000, () => {

            //create the beam and check for collisions
            this.beam = this.scene.physics.add.sprite(0, game.config.height/4 + game.config.height/2 + 20, 'bigBeam').setOrigin(0, 0.5).setAlpha(0);
            this.scene.tweens.add({
                targets: [this.beam],
                alpha: 1,
                duration: 50, 
            });
            this.scene.physics.add.collider(this.beam, player, this.attackCollision, null, this);

            if(this.faster){
                this.beam2 = this.scene.physics.add.sprite(0, game.config.height/4 - 20, 'bigBeam').setOrigin(0, 0.5).setAlpha(0);
                this.scene.tweens.add({
                    targets: [this.beam2],
                    alpha: 1,
                    duration: 50, 
                });
                this.scene.physics.add.collider(this.beam2, player, this.attackCollision, null, this);
            }

            // end the attack after a 1 second delay
            this.clock2 = this.scene.time.delayedCall(1000, () => {
                this.beam.destroy();
                this.portal.destroy();
                if(this.faster){
                    this.beam2.destroy();
                    this.portal2.destroy();
                }
                this.attacking = false;
            }, null, this);
        }, null, this);
    }

    // Alternating hairball attack
    hairballAlternating(){
        this.attacking = true;

        // creates the hairballs, 5 in a column, with 4 rows
        for (let i = 1; i < 5; i++){
            for (let j = 1; j < 6; j++){
                if (i % 2 == 0){
                    let hairball = new Hairball(this.scene, game.config.width + 200*i, 108*j, 'hairball');
                    this.hairballGroup.add(hairball);
                } else {
                    let hairball = new Hairball(this.scene, game.config.width + 200*i, 108*j - 54, 'hairball');
                    this.hairballGroup.add(hairball);
                }
            }
        }

        // creates the hairball tracker, an extra hairball not scene that tells us when the attack finishes
        this.hairballTracker = this.scene.physics.add.sprite(game.config.width + 1100, -50, 'hairball').setVelocityX(-400);
        this.scene.physics.add.collider(this.hairballGroup, player, this.attackCollision, null, this);
    }

    // check if the player is dead and flag it
    attackCollision(){
        if(!this.playerDead){
            this.playerDead = true;
            if (this.beam){
                this.beam.body = false;
            }
            if (this.beam2){
                this.beam2.body = false;
            }
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