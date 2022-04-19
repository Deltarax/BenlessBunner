
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: '#FFFFFF',
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes (adjusted to make the border smaller, NEEDS TO BE TWEAKED)
let borderUISize = game.config.height / 25;
let borderPadding = borderUISize / 5;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;