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
        this.dead = false;
    }

    // preload() {
    //     // Load images/tile sprites
    //     // this.load.image('doggo', './assets/doggo.png');
    //     // this.load.image('evilCat', './assets/evilCat.png');
    //     // this.load.image('bone', './assets/bone.png');
    //     // this.load.image('beam', './assets/beam.png');
    // }

    update() {

        // creating movement using sinusodal movement
        this.numberOfTicks++;
        if (!this.attacking){
            this.movementTicks++;
            if (this.scene.score > 20){
                this.y = (150 * Math.sin(this.movementTicks * 0.5 * Math.PI/20)) + game.config.height/3
            } else {
                this.y = (150 * Math.sin(this.movementTicks * 0.5 * Math.PI/40)) + game.config.height/3
            }
        }

        // console.log(this.numberOfTicks);

        if ((this.numberOfTicks % 100) == 0){
            if (!this.attacking){
                this.attacking = true
                console.log("beam");
                this.beam = this.scene.physics.add.sprite(0, this.y, 'beam').setOrigin(0, 0);
                this.scene.physics.add.collider(this.beam, player, this.attackCollision, null, this);
                // this.scene.cameras.main.shake(1500, 0.025); // Oomph
            } else {
                this.attacking = false;
                this.beam.destroy();
                console.log("nobeam");
            }
        }

    }

    attackCollision(){
        if(!this.dead){
            console.log("dead");
            this.dead = true;
        }
        // console.log("dead");

    }


}