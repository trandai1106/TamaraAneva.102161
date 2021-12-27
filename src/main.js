import Phaser from './lib/phaser.js';

import Preload from './scenes/Preload.js';
import Pause from './scenes/Pause.js';
import Level01 from './scenes/Level01.js';
import GameSummary from './scenes/GameSummary.js';

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1024,
    height: 580,
    backgroundColor: '#FFF2E2',
    resolution: window.devicePixelRatio,
    scene: [
        Preload,
        Level01,
        Pause,
        GameSummary
    ]
});