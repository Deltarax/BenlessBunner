class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        // Load images/tile sprites
        this.load.image('doggo', './assets/doggo_n.png');
        this.load.image('evilCat', './assets/cat2.png');
        this.load.image('bone', './assets/bone2.png');
        this.load.image('beam', './assets/beam.png');
        this.load.image('epicBackground', './assets/pagePlay.png');
        this.load.image('clouds1', './assets/clouds_1.png');
        this.load.image('clouds2', './assets/clouds_2.png');
        this.load.image('bigBeam', './assets/biggerBeam.png');
        this.load.image('portal', './assets/portal.png');
        
        // load audio
        this.load.audio('attack', './assets/dogFire.wav');
        this.load.audio('onHit', './assets/boneHit.wav');
        this.load.audio('beamSFX', './assets/ufoBeam.wav');
        this.load.audio('BGM', './assets/Bens_Dream.mp3');
    }

    update(){
        console.log('loading');
        this.scene.start('menuScene');
    }
}