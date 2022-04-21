class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load images/tile sprites
        this.load.image('doggo', './assets/doggo.png');
        this.load.image('evilCat', './assets/evilCat.png');
        this.load.image('bone', './assets/bone.png');
    }

    create() {
        console.log("Now Playing");

        // Adding doggo
        // this.playerSprite = new Player(this, game.config.width/4, game.config.height/2, 'doggo').setOrigin(0, 0);
        player = this.physics.add.sprite(game.config.width/4, game.config.height/2, 'doggo').setOrigin(0, 0);
        player.setMaxVelocity(0, 600);
        player.setCollideWorldBounds(true);

        //Adding boss
        this.boss = new Boss(this, game.config.width - game.config.width/4, game.config.height/2, 'evilCat').setOrigin(0, 0);
        // this.boss.setCollideWorldBounds(true);

        // white borders
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.score = 0;
    }

    update() {
        // console.log("Now Updating");
        // player.update();

        // Player Movement
        if(keyLEFT.isDown) {
            player.body.position.x -= 5;
        }
        if (keyRIGHT.isDown && (player.body.position.x <= game.config.width/2)) {
            player.body.position.x += 5;
        }
        if (keyUP.isDown) {
            player.body.position.y -= 5;
        }
        if (keyDOWN.isDown) {
            player.body.position.y += 5;
        }
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            console.log("Fire!");
            // Creates the projectile
            this.bone = this.physics.add.sprite(player.x, player.y, 'bone').setOrigin(0, 0);
            this.bone.setVelocityX(1800); // Zoom!
        }

        this.boss.update();

        this.physics.world.collide(this.boss, this.bone, this.bossCollision, null, this);
    }

    bossCollision(){
        this.score++;
        console.log(this.score);
    }


}