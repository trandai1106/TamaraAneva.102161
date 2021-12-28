import Phaser from '../lib/phaser.js';

export default class Pause extends Phaser.Scene {
    constructor() {
        super("pause");
    }

    create() {
        // Background notification
        var graphic = this.add.graphics();
        graphic.fillStyle(0xFfffff, 1);    
        graphic.fillRoundedRect(272, 140, 480, 300, 32);

        // Text
        this.add.text(512, 190, 'Под еден услов', {
            fontFamily: 'sans-serif',
            fontSize: '28px',
            fontStyle: 'bolder',
            color: '#727272'
        }).setOrigin(0.5);

        this.add.text(512, 300, 'Изберете ја фотографијата'
        +'\nшто е соодветна за дадениот услов.'
        +'\n\nРазгледувајки го секој услов еден по еден'
        +'\nи потоа да се оцени како целина'
        +'\nќе имаме полесно решение.', {
            fontFamily: 'sans-serif',
            fontSize: '24px',
            color: '#727272',
            align: 'center'
        }).setOrigin(0.5);

        // Background buttons

        graphic.fillStyle(0x6fbe44, 1.0);
        graphic.fillRoundedRect(405, 405, 70, 70, 16);
        
        graphic.fillStyle(0xeea63f, 1.0);
        graphic.fillRoundedRect(549, 405, 70, 70, 16);
        // Border buttons
        graphic.lineStyle(4.0, 0xffffff, 1.0);
        graphic.strokeRoundedRect(405, 405, 70, 70, 16);
        graphic.strokeRoundedRect(549, 405, 70, 70, 16);

        // Background button
        this.add.rectangle(0, 0, 70, 56, 0x5E3075).setOrigin(0); 
        this.resumeButton = this.add.image(40, 28, 'resume')
        .setInteractive({ cursor: 'pointer' });

        this.resumeButton2 = this.add.image(440, 440, 'resume')
        .setInteractive({ cursor: 'pointer' });

        this.restartButton = this.add.image(584, 440, 'refresh')
        .setInteractive({ cursor: 'pointer' });

        this.resumeButton.on('pointerdown', this.resume);

        this.resumeButton2.on('pointerdown', this.resume);

        this.restartButton.on('pointerdown', this.refresh);
    }

    resume = () => {
        //console.log('resume');
        this.scene.bringToTop('level-01');
        this.scene.resume('level-01');
        this.scene.sleep();
    }
    refresh = () => {
        //console.log('refresh');
        this.scene.start('level-01');
    }
}