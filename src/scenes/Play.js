class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        console.log("Now Playing");

        // adding the bgm
        this.BGM = this.sound.add('BGM', {volume: 0.15});
        this.BGM.setLoop(true);
        this.BGM.play();
        this.onHit = this.sound.add('onHit', {volume: 0.2});
        this.attackSFX = this.sound.add('attack', {volume: 0.4});


        // adding the background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'epicBackground').setOrigin(0, 0);
        this.cloud2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'clouds2').setOrigin(0, 0);
        this.cloud1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'clouds1').setOrigin(0, 0);

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Archistico_Bold',
            fontSize: '64px',
            // backgroundColor: '#FFFFFF',
            color: '#0000FF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
          }

        // creating the score
        score = 0;
        this.scoreText = this.add.text(game.config.width/16, game.config.height/12, 'Score: ' + score, menuConfig).setOrigin(0, 0);

        // Adding doggo
        // this.playerSprite = new Player(this, game.config.width/4, game.config.height/2, 'doggo').setOrigin(0, 0);
        player = this.physics.add.sprite(game.config.width/4, game.config.height/2, 'doggo').setOrigin(0.5, 0.5);
        player.setMaxVelocity(0, 600);
        player.setCollideWorldBounds(true);

        //Adding boss
        boss = new Boss(this, game.config.width - game.config.width/4, game.config.height/2, 'evilCat').setOrigin(0, 0.5);
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

        // bone group
        this.boneGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
    }

    update() {
        // console.log("Now Updating");
        // player.update();

        this.background.tilePositionX += 8;
        this.cloud2.tilePositionX += 4;
        this.cloud1.tilePositionX += 8;

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
            // play Attack audio
            this.attackSFX.play();
            // Creates the projectile
            let bone = new Bone(this, player.x, player.y, 'bone').setOrigin(0.5, 0.5);
            this.boneGroup.add(bone);
            // this.bone.setVelocityX(1800); // Zoom!
        }

        // updating the boss
        boss.update();
        if (boss.playerDead) {
            this.scoreText.text = "dead";
            // this.cameras.main.fadeOut(6000, 0, 0, 0);    // trying to get a fadeout to work but doesnt
            this.cameras.main.shake(2000, 0.0075);
            player.setCollideWorldBounds(false);
            player.body.position.y += 5;  //falls out of the sky
            player.body.position.x -= 3;  //falls out of the sky
            this.clock = this.time.delayedCall(2000, () => {
                this.scene.start("gameOverScene");
                this.BGM.stop();
            }, null, this);
            // this.scene.start("gameOverScene");
        }
    }

}