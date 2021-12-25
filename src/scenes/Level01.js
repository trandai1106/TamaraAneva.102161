import Phaser from '../lib/phaser.js';

export default class Level01 extends Phaser.Scene {
    themes = ['animals', 'clothes', 'fruits', 'housewares', 'occupations', 'vegetables'];
    animals = [
        'alligator', 'camel', 'cat', 'cow', 'dog',
        'duck', 'elephant', 'fish', 'giraffe',
        'horse', 'kangaroo', 'lion', 'monkey',
        'rabbit', 'snake', 'turtle', 'zebra'
    ];
    clothes = [
        'bag', 'belt', 'dress', 'flip flop', 'hat',
        'pants', 'scarf', 'shoes', 'shorts', 'skirt',
        'sunglasses', 'umbrella'
    ];
    fruits = [
        'apple', 'banana', 'cherry', 'grape',
        'lemon', 'orange', 'pear', 'pomegranate',
        'strawberry', 'watermelon'
    ];
    housewares = [
        'iron', 'kettle', 'lamp', 'oven', 'phone',
        'refrigerator', 'speaker', 'television',
        'toaster', 'vacuum cleaner', 'washing machine'
    ];
    occupations = [
        'artist', 'chef', 'doctor', 'farmer',
        'firefighter', 'magician', 'musician',
        'police', 'postman', 'repairman', 'waiter'
    ];
    vegetables = [
        'broccoli', 'carrot', 'corn', 'cucumber',
        'chili', 'eggplant', 'garlic', 'onion', 
        'peas', 'potato', 'tomato'
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
        this.frames.push(_frame.strokeRoundedRect(340, 170, size, size, frameStyle));
        this.add.text(354, 180, '1', textAnswerStyle);
        this.frames.push(_frame.strokeRoundedRect(544, 170, size, size, frameStyle));
        this.add.text(568, 180, '2', textAnswerStyle);
        this.frames.push(_frame.strokeRoundedRect(340, 374, size, size, frameStyle));
        this.add.text(354, 384, '3', textAnswerStyle);
        this.frames.push(_frame.strokeRoundedRect(544, 374, size, size, frameStyle));
        this.add.text(568, 384, '4', textAnswerStyle);
        
        // Answers
        this.images = [
            this.add.image(432, 260, 'animals'),
            this.add.image(636, 260, 'animals'),
            this.add.image(432, 464, 'animals'),
            this.add.image(636, 464, 'animals')
        ];
        for (var i = 0; i < 4; i++) {
            const image = this.images[i];
            image.setScale(0.425).setInteractive({ cursor: 'pointer' });
            image.on('pointerdown', (event) => {
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

        this.question.text = 'If the ' + this.param1 +
        ' is in the box number ' + this.param2 +
        ' select the ' + this.param3 + ',\notherwise select the ' + this.param4 + '.';

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

        setTimeout(() => {
            this.generateQuestion();
            this.result.setVisible(false);
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