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

    }

    create() {
        // Title
        this.add.rectangle(0, 0, 1024, 56, 0x5E3075).setOrigin(0); // title background
        this.add.text(50, 12, 'ON ONE CONDITION', {
            fontFamily: 'sans-serif',
            fontSize: '34px',
            color: '#ffffff'
        }).setOrigin(0);

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
                console.log('You chose: ' + choice);
                this.checkAnswer(choice);
            });
        };

        this.questionBackground = this.add.rectangle(512, 110, 1024, 80, 0xf3e7d6);
        this.question = this.add.text(512, 110, 'If the' +
        ' is in the box number '+ 
        ' select the '+',\notherwise select the '+'.', {
            fontFamily: 'sans-serif',
            fontSize: '28px',
            color: '#5e3075',
            align: 'center'
        }).setOrigin(0.5);

        this.result = this.add.image(512, 320).setScale(0.5).setVisible(false);

        this.generateQuestion();

        this.cameras.main.roundPixels = true;

        this.input.keyboard.on('keydown-A', (event) => {
            this.generateQuestion();
        });
    }

    update() {
    }

    generateQuestion() {
        this.flagWaiting = false;

        const theme = this.themes[Math.floor(Math.random() * this.themes.length)];
        const params = this.random4unique(this[theme].length - 1);
        // console.log(params);
        for (var i = 0; i < 4; i++) {
            this.images[i].setTexture(theme, this[theme][params[i]] + '.png');
        }
        console.log(this[theme][params[0]], this[theme][params[1]], this[theme][params[2]], this[theme][params[3]]);

        const { first, second, third, fourth } = this.random4param();
        this.param1 = this.images[first].frame.name.split('.')[0];
        this.param2 = second;
        this.param3 = this.images[third].frame.name.split('.')[0];
        this.param4 = this.images[fourth].frame.name.split('.')[0];

        this.question.text = 'Ако ' + this.param1 +
        ' се наоѓа во кутија број ' + this.param2 +
        ' изберете го/ја ' + this.param3 + ',\nако не изберете го/ја ' + this.param4 + '.';

        this.answer = first + 1 == second ? this.param3 : this.param4;

        console.log(first, second, third, fourth);
        console.log('Answer: ' + this.answer);
    }

    checkAnswer(choice) {
        if (choice == this.answer) {
            console.log("right");
            this.result.setTexture('right').setVisible(true);
        }
        else {
            console.log("wrong");
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
}