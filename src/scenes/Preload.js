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
        this.title = this.add.text(512, 140, 'ON ONE CONDITION', { 
            color: '#5e3075', 
            fontSize: 90, 
            fontFamily: 'monospace' 
        }).setOrigin(0.5);
        this.progressText = this.add.text(512, 270, 'Loading 0%', { 
            color: '#5e3075', 
            fontSize: 50, 
            fontFamily: 'monospace' 
        }).setOrigin(0.5);

        // Loading bar
        this.progressBar = this.add.graphics({ x: 300, y: 340 });
        this.processBarBorder = this.add.graphics({ x: 300, y: 340 });
        this.processBarBorder.lineStyle(4, '0x30183C', 1);
        this.processBarBorder.strokeRect(0, 0, 424, 30);

        // Load GUI
        this.load.image('right', 'assets/GUI/right.png');
        this.load.image('wrong', 'assets/GUI/wrong.png');
        this.load.image('coin', 'assets/GUI/coin.png');
        this.load.image('empty-coin', 'assets/GUI/empty-coin.png');
        this.load.image('pause', 'assets/GUI/pause.png');
        this.load.image('resume', 'assets/GUI/play.png');
        this.load.image('refresh', 'assets/GUI/refresh.png');
        this.load.image('star', 'assets/GUI/star-new.png');
        this.load.image('empty-star', 'assets/GUI/empty-star-new.png');

        // Scene details

        this.load.atlas('animals', 'assets/Sprites/animals.png', 'assets/Sprites/animals.json');
        this.load.atlas('clothes', 'assets/Sprites/clothes.png', 'assets/Sprites/clothes.json');
        this.load.atlas('fruits', 'assets/Sprites/fruits.png', 'assets/Sprites/fruits.json');
        this.load.atlas('housewares', 'assets/Sprites/housewares.png', 'assets/Sprites/housewares.json');
        this.load.atlas('occupations', 'assets/Sprites/occupations.png', 'assets/Sprites/occupations.json');
        this.load.atlas('vegetables', 'assets/Sprites/vegetables.png', 'assets/Sprites/vegetables.json');

        // Sound effect
        this.load.audio('right', 'assets/SFX/correct1.mp3');
        this.load.audio('wrong', 'assets/SFX/wrong1.mp3');
        this.load.audio('start', 'assets/SFX/starting.mp3');
        this.load.audio('stop', 'assets/SFX/stopping.mp3');

        // Loading statement
        this.load.on('progress', (val) => {
            // Text
            this.progressText.text = 'Се вчитува ' + (Math.round(val * 100)) + '%';
            // Bar
            this.progressBar.clear();
            this.progressBar.fillStyle('0x5e3075', 1);
            this.progressBar.fillRect(0, 0, val * 424, 30);
        }, this);
    }

    create() {

        // Delay and change scene
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.scene.start('level-01');
            },
            callbackScope: this
        });
    }
}