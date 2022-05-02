// Collaborators: Solomon Bell, Esmerelda Rangel, Jackson Gerald
// Title: Benless Bunner
// Date Completed: 5/2/2022
// Creative Tilt: Technically, Jackson created a system that perfectly fits our bullet hell experience. Particularly, the way he manages the bullets and bones is perfect.
// In particular, one technical idea we're proud of is we needed a way to find out when the hairball attacks finish.
// An out of the box solution we came up with is using an extra, unseen hairball as a tracker.
// By checking when that last hairball leaves the bounds of the screen, we can ensure that the attack is finished before starting a new one.
// We also enjoy that we took something like a bullet hell, made it endless, and tried to flip it on its head by making it very calm and cute!
// Aesthetically, Esme took our idea of having a calm, relaxing bullet hell and created the perfect art. The game feels calming to play, even when things start to get chaotic.
// Finally Solomon created a fantastic soundtrack from scratch that mixed the themes of a calm cute game + a frantic bullethell perfectly!

// NOTE: We have one game breaking bug that we cannot find a solution for. If you score 19 points, and score another point during a beam
// attack, the game will break. If that happens, refresh the page and make sure you don't make the 20th hit untill the screen is clear!

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