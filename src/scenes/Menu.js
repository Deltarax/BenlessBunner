class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
      this.load.image('epicBackgroundMenu', './assets/pageLight2.png');
    }

    create() {

      // menu text configuration
      let titleConfig = {
        fontFamily: 'Archistico_Bold',
        fontSize: '85px',
        // backgroundColor: '#FFFFFF',
        color: '#0000FF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
      }

      let menuConfig = {
        fontFamily: 'ShortStack',
        fontSize: '32px',
        // backgroundColor: '#FFFFFF',
        color: '#5555FF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
      }

      // add background
      this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'epicBackgroundMenu').setOrigin(0, 0);
        
      // show menu text
      this.add.text(game.config.width/2, game.config.height/2 - 100,'Benless Bunner', titleConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + 41, 'Use arrowkeys to move', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + 105, 'Press (F) fire to begin!', menuConfig).setOrigin(0.5);

      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update() {
      // Press F to play!
      if (Phaser.Input.Keyboard.JustDown(keyF)) {
        this.scene.start("playScene");   
        console.log("Play!");
      }
    }
}