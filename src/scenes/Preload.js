import Phaser from '../lib/phaser.js';

export default class Preload extends Phaser.Scene {
    title
    progressBar
    processBarBorder
    progressText

    constructor() {
        super("preload");
    }

    preload() {
        // Title
        const style = { color: '#000000', fontSize: 50, fontFamily: 'monospace' };
        this.title = this.add.text(600, 140, 'On One Condition', style)
            .setOrigin(0.5);
        this.progressText = this.add.text(600, 240, 'Loading 0%', style)
            .setOrigin(0.5);

        // Loading bar
        this.progressBar = this.add.graphics({ x: 300, y: 340 });
        this.processBarBorder = this.add.graphics({ x: 300, y: 340 });
        this.processBarBorder.lineStyle(4, '0x000000', 1);
        this.processBarBorder.strokeRect(0, 0, 600, 30);

        // Load GUI
        this.load.image('right', 'assets/GUI/right.png');
        this.load.image('wrong', 'assets/GUI/wrong.png');

        // Scene details

        this.load.atlas('animals', 'assets/Sprites/animals.png', 'assets/Sprites/animals.json');
        this.load.atlas('clothes', 'assets/Sprites/clothes.png', 'assets/Sprites/clothes.json');
        this.load.atlas('fruits', 'assets/Sprites/fruits.png', 'assets/Sprites/fruits.json');
        this.load.atlas('housewares', 'assets/Sprites/housewares.png', 'assets/Sprites/housewares.json');
        this.load.atlas('occupations', 'assets/Sprites/occupations.png', 'assets/Sprites/occupations.json');
        this.load.atlas('vegetables', 'assets/Sprites/vegetables.png', 'assets/Sprites/vegetables.json');

        // Load Mossy
        // this.load.spritesheet('mossy-idle', 'assets/sprites/BlueWizard/mossy-idle.png', {
        //     frameWidth: 512,
        //     frameHeight: 512
        // });

        // Music  and sound effect
        // this.load.audio('bg-music-01', 'assets/sounds/bg-music-01.ogg');

        // Loading statement
        this.load.on('progress', (val) => {
            // Text
            this.progressText.text = 'Loading ' + (Math.round(val * 100)) + '%';
            // Bar
            this.progressBar.clear();
            this.progressBar.fillStyle('0x55a455', 1);
            this.progressBar.fillRect(0, 0, val * 600, 30);
        }, this);
    }

    create() {
        // this.anims.create({
        //     key: "anim-thunder",
        //     frameRate: 18,
        //     frames: this.anims.generateFrameNumbers("thunder", { start: 0, end: 7 }),
        //     repeat: -1
        // });

        // Delay and change scene
        // this.time.addEvent({
        //     delay: 1000,
        //     callback: () => {
        //         this.scene.start('level-01');
        //     },
        //     callbackScope: this
        // });
        this.scene.start('level-01');
    }
}