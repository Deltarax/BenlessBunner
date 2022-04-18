class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

    }

    create() {

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
        
      // show menu text
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Benless Bunner', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'Use arrowkeys to move & (F) to fire', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press fire to begin!', menuConfig).setOrigin(0.5);

      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keyF)) {
        this.scene.start("playScene");   
        console.log("Play!");
      }
    }
}