// hoang code
import Phaser from '../lib/phaser.js'
import Weapon from '../game/Weapon.js';

const GRAVITY = 600
export default class Actor extends Phaser.Physics.Arcade.Sprite {
    velocityX = 0
    velocityY = 0
    isStanding = true
    weapon
    isShooted = false
    shootExact = false
    main = false
    health = 20
    isHurt = false
    isImmotal = false

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.setScale(0.4)
            .setOrigin(0.5)
            .setPipeline('Light2D');
        this.play('mossy-idle'); // Initial state
        this.lightPlayer = scene.lights.addLight(x, y, 900)
            .setColor(0x75d9a5)
            .setIntensity(2);

        // Adding weapon
        this.weapons = scene.physics.add.group({
            classType: Weapon

        })
        this.weapon = this.weapons.get(x, y, '')
        this.weapon.anims.play('anim-fireball-blue', true);
        this.weapon.body.setSize(20, 20).setOffset(60, 40);
        this.weapon.setVisible(false)

    }

    // active when type space
    makeShoot(scene, x, y) {

        // fix bug player loss its weapon
        if (Math.abs(x - this.weapon.x) > 700 || Math.abs(y - this.weapon.y) > 700) {
            this.weapon.x = x
            this.weapon.y = y
                // this.shootExact = false
            this.weapon.setStay()
            this.weapon.setVisible(false)
        }

        // shoot
        if (scene.cursors.space.isDown && this.weapon.stay == 1) {

            this.weapon.setVisible(true)
            if (this.flipX == false) {
                this.weapon.setFlipX(false)
                this.weapon.shoot(GRAVITY * 1.5, 0)
            } else {
                this.weapon.setFlipX(true)
                this.weapon.shoot(-GRAVITY * 1.5, 0)
            }
        }

        // shoot back if distance > 600
        if (Math.abs(x - this.weapon.x) > 600) {
            // this.weapon.shootBack()
            this.weapon.go = this.weapon.back = 0
            this.weapon.stay = 1
            this.shootExact = false
            this.weapon.setStay()
            this.weapon.setVisible(false)
        }
        if (this.weapon.back == 1) {
            this.goBack(x, y)
        }

        // Keep the weapon beside the player when dont type space
        if (this.weapon.stay == 1) {
            this.weapon.x = x
            this.weapon.y = y
                // this.shootExact = false
        }
    }

    // collect weapon immediately
    goBack(x, y) {
        // if (y == this.weapon.y) {
        //     this.weapon.setVelocityX(-this.weapon.velocityX)
        // } else {
        //     this.weapon
        //         .setVelocityX(-this.weapon.velocityX)
        //         .setVelocityY(-this.weapon.velocityX / (x - this.weapon.x) * (y - this.weapon.y))
        // }
        // if (Math.abs(x - this.weapon.x) < 50 && Math.abs(y - this.weapon.y) < 50) {
        //     this.weapon.go = this.weapon.back = 0
        //     this.weapon.stay = 1
        //     this.shootExact = false
        //     this.weapon.setStay()
        //     this.weapon.setVisible(false)
        // }
        this.weapon.go = this.weapon.back = 0
        this.weapon.stay = 1
        this.shootExact = false
        this.weapon.setStay()
        this.weapon.setVisible(false)
    }

    // set Light 
    setLight(x, y) {
        this.lightPlayer.x = x
        this.lightPlayer.y = y
    }

    _update(scene, x, y) {
        this.setLight(x, y)
        scene.healthBar.setScale((this.health >= 0 ? this.health : 0) / 20, 1)
    }

    hurt() {
        if (this.isHurt == true && this.isImmotal == false) {
            this.health -= 1
            this.isHurt = false
            this.isImmotal = true
            setTimeout(() => {
                this.isImmotal = false
            }, 2000);
        }
    }
}

// hoang code end