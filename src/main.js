// Collaborators: Solomon Bell, Esmerelda Rangel, Jackson Gerald
// Title: Benless Bunner
// Date Completed: ???
// Creative Tilt: Technically, Jackson created a system that perfectly fits our bullet hell experience. Particularly, the way he manages the bullets and bones is perfect.
// We also enjoy that we took something like a bullet hell, made it endless, and tried to flip it on its head by making it very calm.
// Aesthetically, Esme took our idea of having a calm, relaxing bullet hell and created the perfect art. The game is very calming to play, even when things start to feel chaotic.

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    backgroundColor: '#FFFFFF',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    }, 
    scene: [ Load, Menu, Play, GameOver ]
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
let score = 0;
const playerVelocity = 150;