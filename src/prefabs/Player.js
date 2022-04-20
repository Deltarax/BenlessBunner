class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        scene.add.existing(this);
        this.moveSpeed = 5;
    }

    update() {

        // movement (I'm not sure exactly how big borderbadding is)
        if(keyLEFT.isDown && this.x >= borderPadding) {
            this.x -= this.moveSpeed;
        }
        if (keyRIGHT.isDown && this.x <= game.config.width/2 - this.width) {
            this.x += this.moveSpeed;
        }
        if (keyUP.isDown && this.y >= borderPadding) {
            this.y -= this.moveSpeed;
        }
        if (keyDOWN.isDown && this.y <= game.config.height -
        borderPadding - this.height) {
            this.y += this.moveSpeed;
        }
        if (keyF.isDown) {
            console.log("Fire!");
        }
    }


}
