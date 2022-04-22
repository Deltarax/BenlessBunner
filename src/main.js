
let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    backgroundColor: '#FFFFFF',
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes (adjusted to make the border smaller, NEEDS TO BE TWEAKED)
let borderUISize = game.config.height / 25;
let borderPadding = borderUISize / 5;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;

// define globals
let player = null;
let boss = null;
const playerVelocity = 150;