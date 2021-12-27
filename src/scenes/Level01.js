import Phaser from '../lib/phaser.js';

export default class Level01 extends Phaser.Scene {
    themes = ['animals', 'clothes', 'fruits', 'housewares', 'occupations', 'vegetables'];
    animals = [
        'алигаторот', 'камилата', 'мачката', 'кравата', 'кучето',
        'патката', 'слонот', 'рибата', 'жирафата',
        'коњот', 'кенгурот', 'лавот', 'мајмунот',
        'зајакот', 'змијата', 'желката', 'зебрата'
    ];
    clothes = [
        'чантата', 'каишот', 'фустанот', 'апостолките', 'шеширот',
        'панталоните', 'марамата', 'чевлите', 'кратките панталони', 'сукњата',
        'очилата', 'чадорот'
    ];
    fruits = [
        'јаболкото', 'бананата', 'црешата', 'грозјето',
        'лимонот', 'портокалот', 'крушата', 'калинката',
        'јагодата', 'лубеницата'
    ];
    housewares = [
        'пеглата', 'чајникот', 'ламбата', 'електричниот шпорет', 'телефонот',
        'фрижидерот', 'звучникот', 'телевизорот',
        'тостерот', 'правосмукалката', 'машината за перење'
    ];
    occupations = [
        'уметникот', 'куварот', 'докторот', 'фармерот',
        'пожарникарот', 'магионичарот', 'музичарот',
        'полицаецот', 'поштарот', 'мајсторот', 'келнерот'
    ];
    vegetables = [
        'брокулата', 'морковот', 'пченката', 'краставицата',
        'пиперката', 'модриот патлиџан', 'лукот', 'кромидот', 
        'грашокот', 'компирот', 'доматот'
    ];

    constructor() {
        super("level-01");
    }

    init() {
        this.MAX_TIME = 60;
        this.POINT_PER_QUESTION = 100/6;
        this.timer = this.MAX_TIME;
        this.timerStart = 3;
        this.point = 0;
        this.started = false;
    }

    create() {
        setTimeout(() => {
            this.sound.play('start');
            this.timerStartText = this.add.text(512, 280, this.timerStart, {
                fontFamily: 'sans-serif',
                fontSize: '150px',
                color: '#5e3075'
            }).setOrigin(0.5);
            this.time.addEvent({ 
                delay: 1000, 
                callback: this.countDownStart, 
                callbackScope: this, 
                repeat: this.timerStart - 1
            });
        }, 4500);

        // Background Title
        this.add.rectangle(0, 0, 1024, 56, 0x5E3075).setOrigin(0); // title background
        
        // GUI
        this.pauseButton = this.add.image(40, 28, 'pause');
        this.pauseButton.setInteractive({ cursor: 'pointer' });
        this.pauseButton.on('pointerdown', ()=>{
            if (!this.started) return;
            //console.log('pause');

            this.scene.launch('pause');
            this.scene.bringToTop('pause');
            this.scene.pause();
        });

        // Title
        this.add.text(80, 28, 'ON ONE CONDITION', {
            fontFamily: 'sans-serif',
            fontSize: '34px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);

        // Point 
        this.pointText = this.add.text(820, 28, this.point, {
            fontFamily: 'sans-serif',
            fontSize: '30px',
            color: '#ffffff'
        }).setOrigin(1, 0.5);
        this.emptyCoinImage = this.add.image(850, 28, 'empty-coin');
        this.coinImage = this.add.image(850, 28, 'coin');
        this.coinImage.setCrop(0, this.coinImage.height * (1 - this.point/this.POINT_PER_QUESTION/6), 
            this.coinImage.width, this.coinImage.height * this.point/this.POINT_PER_QUESTION/6);

        // Clock
        this.clockText = this.add.text(934, 28, this.timer, {
            fontFamily: 'sans-serif',
            fontSize: '30px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.clockBackground = this.add.graphics();
        this.clockBackground.clear();
        this.clockBackground.beginPath();
        this.clockBackground.fillStyle(0x767676, 1);
        this.clockBackground.slice(980, 28, 20, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(-90 + (this.MAX_TIME-this.timer)*6), true);
        this.clockBackground.fillPath();
        this.clockBackground.closePath();
        this.clock = this.add.graphics();
        this.clock.clear();
        this.clock.beginPath();
        this.clock.fillStyle(0x3cb549, 1);
        this.clock.slice(980, 28, 20, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(-90 + (this.MAX_TIME-this.timer)*6), true);
        this.clock.fillPath();
        this.clock.closePath();

        this.guideText = this.add.text(512, 320, 'Изберете ја фотографијата што е соодветна за дадениот услов.', {
            fontFamily: 'sans-serif',
            fontSize: '28px',
            color: '#5e3075',
            align: 'center'
        }).setOrigin(0.5);
        setTimeout(() => {
            this.guideState = 1;
            setTimeout(() => {
                this.guideState = 0;
            }, 1980);
        }, 3000);

        setTimeout(() => {
            // Answers frame
            const size = 182;
            const frameStyle = { tl: 1, tr: 36, bl: 36, br: 36 };
            const textAnswerStyle = { 
                fontFamily: 'sans-serif', 
                fontSize: '30px', 
                color: '#5E3075'
            };

            this.frames = [];
            var _frame = this.add.graphics();
            _frame.lineStyle(3, 0xF36F21, 1);    
            this.frames.push(_frame.strokeRoundedRect(320, 170, size, size, frameStyle));
            this.add.text(334, 180, '1', textAnswerStyle);
            this.frames.push(_frame.strokeRoundedRect(524, 170, size, size, frameStyle));
            this.add.text(548, 180, '2', textAnswerStyle);
            this.frames.push(_frame.strokeRoundedRect(320, 374, size, size, frameStyle));
            this.add.text(334, 384, '3', textAnswerStyle);
            this.frames.push(_frame.strokeRoundedRect(524, 374, size, size, frameStyle));
            this.add.text(548, 384, '4', textAnswerStyle);
            
            // Answers
            this.images = [
                this.add.image(412, 260, 'animals'),
                this.add.image(616, 260, 'animals'),
                this.add.image(412, 464, 'animals'),
                this.add.image(616, 464, 'animals')
            ];
            for (var i = 0; i < 4; i++) {
                const image = this.images[i];
                image.setScale(0.425).setInteractive({ cursor: 'pointer' });
                image.on('pointerdown', (event) => {
                    if (this.flagWaiting) return;
                    const choice = image.frame.name.split('.')[0];
                    //console.log('You chose: ' + choice);
                    this.checkAnswer(choice);
                });
            };

            this.questionBackground = this.add.rectangle(512, 110, 1024, 80, 0xf3e7d6);
            this.question = this.add.text(512, 110, '', {
                fontFamily: 'sans-serif',
                fontSize: '28px',
                color: '#5e3075',
                align: 'center'
            }).setOrigin(0.5);

            this.result = this.add.image(512, 320).setScale(0.5).setVisible(false);
            this.timerStartText.setVisible(false);
            this.guideText.setVisible(false);

            this.generateQuestion();
        
            this.time.addEvent({ 
                delay: 1000, 
                callback: this.countDown, 
                callbackScope: this, 
                repeat: 59 
            });

            this.started = true;

        }, 9000);

        this.cameras.main.roundPixels = true;

        // this.input.keyboard.on('keydown-A', (event) => {
        //     this.generateQuestion();
        // });
        // this.input.keyboard.on('keydown-Z', (event) => {
        //     this.countDown();
        // });
    }

    update() {
        if (!this.started) {
            if  (this.guideState == 1) {
                this.guideText.y -= 2; 
            }
        }
    }

    generateQuestion() {
        this.flagWaiting = false;

        const theme = this.themes[Math.floor(Math.random() * this.themes.length)];
        const params = this.random4unique(this[theme].length - 1);
        // //console.log(params);
        for (var i = 0; i < 4; i++) {
            this.images[i].setTexture(theme, this[theme][params[i]] + '.png');
        }
        //console.log(this[theme][params[0]], this[theme][params[1]], this[theme][params[2]], this[theme][params[3]]);

        const { first, second, third, fourth } = this.random4param();
        this.param1 = this.images[first].frame.name.split('.')[0];
        this.param2 = second;
        this.param3 = this.images[third].frame.name.split('.')[0];
        this.param4 = this.images[fourth].frame.name.split('.')[0];

        this.question.text = 'Ако ' + this.param1 +
        ' се наоѓа во кутија број ' + this.param2 +
        ' изберете го/ја ' + this.param3 + ',\nако не изберете го/ја ' + this.param4 + '.';

        this.answer = first + 1 == second ? this.param3 : this.param4;

        //console.log(first, second, third, fourth);
        //console.log('Answer: ' + this.answer);
    }

    checkAnswer(choice) {
        if (choice == this.answer) {
            // //console.log("right");
            this.sound.play('right');
            this.point += this.POINT_PER_QUESTION;
            this.coinImage.setCrop(0, this.coinImage.height * (1 - this.point/this.POINT_PER_QUESTION/6), 
                this.coinImage.width, this.coinImage.height * this.point/this.POINT_PER_QUESTION/6);
            this.pointText.text = Math.round(this.point);
            this.result.setTexture('right').setVisible(true);
        }
        else {
            // //console.log("wrong");
            this.sound.play('wrong');
            this.result.setTexture('wrong').setVisible(true);
        }

        this.flagWaiting = true;

        setTimeout(() => {
            this.result.setTexture('right').setVisible(false);
            this.generateQuestion();
        }, 2000);
    }

    random4param() {
        // return 4 numbers, 
        // first, third and fourth in [0, 3], different
        // second in [1, 4]
        var first, second, third, fourth;
        first = Math.floor(Math.random() * 4);
        second = Math.floor(Math.random() * 4) + 1;
        do {
            third = Math.floor(Math.random() * 4)
        } while (third == first);
        do {
            fourth = Math.floor(Math.random() * 4)
        } while (fourth == third || fourth == first);
        return { first, second, third, fourth };
    }

    random4unique(maxIncluded) {
        // return 4 numbers, in [0, maxIncluded], and different
        maxIncluded++;
        var first, second, third, fourth;
        var params = [];
        first = Math.floor(Math.random() * maxIncluded);
        do {
            second = Math.floor(Math.random() * maxIncluded);
        } while (second == first);
        do {
            third = Math.floor(Math.random() * maxIncluded)
        } while (third == first || third == second);
        do {
            fourth = Math.floor(Math.random() * maxIncluded)
        } while (fourth == first || fourth == second || fourth == third);
        params = [first, second, third, fourth];
        return params;
    }

    clamp(min, max, value) {
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }

    countDown() {
        this.timer--;
        this.timer = this.clamp(0, this.MAX_TIME, this.timer);

        if (this.timer == 0) {
            this.gameOver();
        }
        else if (this.timer == 7) {
            this.sound.play('stop');
        }

        this.clockText.text = this.timer;

        this.clock.clear();
        this.clock.beginPath();
        this.clock.fillStyle(this.timer > this.MAX_TIME/6 ? 0x3cb549 : 0xb53c49, 1);
        this.clock.slice(980, 28, 20, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(-90 + (this.MAX_TIME - this.timer)*6), true);
        this.clock.fillPath();
        this.clock.closePath();
    }

    countDownStart() {
        this.timerStart--;
        this.timerStartText.text = this.timerStart;
    }

    gameOver() {
        //console.log('Game Over');
        const stars = this.clamp(0, 5 , Math.round(this.point/20));
        this.scene.launch('game-summary', { stars: stars });
        this.scene.bringToTop('game-summary');
        this.scene.pause();
    }
}