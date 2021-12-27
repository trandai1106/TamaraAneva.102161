import Phaser from '../lib/phaser.js';

export default class Pause extends Phaser.Scene {
    constructor() {
        super("game-summary");
    }

    init({ stars }) {
        this.stars = stars ? stars : 0;
        //console.log('summary: ' + this.stars + ' stars')
    }

    create() {
        this.starsPositionX = [296, 404, 512, 620, 728];

        // Background notification
        var graphic = this.add.graphics();
        graphic.fillStyle(0xFfffff, 1);    
        graphic.fillRoundedRect(222, 140, 580, 300, 32);

        // Text
        this.add.text(512, 190, 'ON ONE CONDITION', {
            fontFamily: 'sans-serif',
            fontSize: '28px',
            fontStyle: 'bolder',
            color: '#727272'
        }).setOrigin(0.5);

        // this.add.text(512, 300, 'Изберете ја фотографијата'
        // +'\nшто е соодветна за дадениот услов.'
        // +'\n\nРазгледувајки го секој услов еден по еден'
        // +'\nи потоа да се оцени како целина'
        // +'\nќе имаме полесно решение.', {
        //     fontFamily: 'sans-serif',
        //     fontSize: '24px',
        //     color: '#727272',
        //     align: 'center'
        // }).setOrigin(0.5);

        for (var i = 0; i < this.stars ; i++) {
            this.add.image(this.starsPositionX[i], 280, 'star').setScale(0.5);
        }
        for (var i = this.stars; i < 5 ; i++) {
            this.add.image(this.starsPositionX[i], 280, 'empty-star').setScale(0.5);
        }

        // Background buttons
        graphic.fillStyle(0xeea63f, 1.0);
        graphic.fillRoundedRect(477, 405, 70, 70, 16);

        // Border buttons
        graphic.lineStyle(4.0, 0xffffff, 1.0);
        graphic.strokeRoundedRect(477, 405, 70, 70, 16);

        // Background button

        this.restartButton = this.add.image(512, 440, 'refresh')
        .setInteractive({ cursor: 'pointer' });

        this.restartButton.on('pointerdown', this.refresh);
    }

    refresh = () => {
        //console.log('refresh');
        this.scene.start('level-01');
    }
}