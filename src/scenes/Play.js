class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load images/tile sprites
        this.load.image('doggo', './assets/doggo.png');
        this.load.image('evilCat', './assets/evilCat.png');
        this.load.image('bone', './assets/bone.png');
        this.load.image('beam', './assets/beam.png');
        this.load.image('epicBackground', './assets/epicBackground.png');
    }

    create() {
        console.log("Now Playing");

        // adding the background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'epicBackground').setOrigin(0, 0);

        // menu text configuration
        let menuConfig = {
        fontFamily: 'Papyrus',
        fontSize: '28px',
        backgroundColor: '#FFFFFF',
        color: '#0000FF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
        }

        // creating the score
        this.score = 0;
        this.scoreText = this.add.text(game.config.width/2, game.config.height/8, '0', menuConfig).setOrigin(0.5);

        // Adding doggo
        // this.playerSprite = new Player(this, game.config.width/4, game.config.height/2, 'doggo').setOrigin(0, 0);
        player = this.physics.add.sprite(game.config.width/4, game.config.height/2, 'doggo').setOrigin(0, 0);
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
            // Creates the projectile
            let bone = new Bone(this, player.x, player.y, 'bone').setOrigin(0, 0);
            this.boneGroup.add(bone);
            // this.bone.setVelocityX(1800); // Zoom!
        }

        // updating the boss
        boss.update();

        if (boss.dead) {
            this.scoreText.text = "dead";
        }
    }

}