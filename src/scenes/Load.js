class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        // Load images/tile sprites
        this.load.image('doggo', './assets/doggo_n.png');
        this.load.atlas('doggoAnim', './assets/doggo_sheet.png', './assets/doggo_sprites.json')
        this.load.image('evilCat', './assets/cat2.png');
        this.load.image('bone', './assets/bone2.png');
        this.load.image('epicBackground', './assets/pagePlay.png');
        this.load.image('clouds1', './assets/clouds_1.png');
        this.load.image('clouds2', './assets/clouds_2.png');
        this.load.image('bigBeam', './assets/beam.png');
        this.load.image('portal', './assets/portalLight.png');
        this.load.image('hairball', './assets/hairball_n.png');
        this.load.image('catMenu', './assets/catHead2.png');
        this.load.image('dogMenu', './assets/dogHead.png')
        
        // load audio
        this.load.audio('attack', './assets/dogFire.wav');
        this.load.audio('onHit', './assets/boneHit.wav');
        this.load.audio('ufoBeam', './assets/ufoBeam.wav');
        this.load.audio('BGM', './assets/Bens_Dream.mp3');
        this.load.audio('hiss', './assets/hiss.wav');
        this.load.audio('meow', './assets/meow.wav');
    }

    update(){
        console.log('loading');
        this.scene.start('menuScene');
    }
}