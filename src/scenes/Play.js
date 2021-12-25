import Phaser from '../lib/phaser.js';
// import Cactus from '../game/Cactus.js';
import Actor from '../game/Actor.js'
import Enemy from '../game/Enemy.js'

const RUN_SPEED = 200;
const JUMP_SPEED = 450;
const GRAVITY = 600;

export default class Play extends Phaser.Scene {


    constructor() {
        super("play");
    }

    init() {

    }

    create() {
        // Light effect
        this.lights.enable().setAmbientColor(0x30b3ac);

        // Background
        this.bg = this.add.tileSprite(0, 0, 0, 0, 'background')
            .setDisplaySize(1200, 580)
            .setOrigin(0)
            .setScrollFactor(0, 0)
            .setPipeline('Light2D');

        // BG Layers
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tileset', 'tileset');

        // Hanging layer
        const layerHanging = map.createFromObjects('Hanging', [
            { gid: 788, key: 'scene-decoration', frame: 'Fern_1.png' },
            { gid: 789, key: 'scene-decoration', frame: 'Fern_2.png' },
            { gid: 800, key: 'scene-decoration', frame: 'Leaf_1.png' },
            { gid: 801, key: 'scene-decoration', frame: 'Leaf_2.png' },
            { gid: 802, key: 'scene-decoration', frame: 'Leaf_3.png' },
            { gid: 803, key: 'scene-decoration', frame: 'Leaf_Half.png' },
            { gid: 804, key: 'scene-decoration', frame: 'Leaf_Small.png' }

        ]);
        for (var i = 0; i < layerHanging.length; i++) {
            layerHanging[i].setPipeline('Light2D');
        }

        // hoang code
        // Player
        this.actors = this.physics.add.group({
            classType: Actor

        })
        this.player = this.actors.get(200, 180, '')
        this.player
            .setFrictionX(0)
            .setGravityY(600)
        this.player.body.setSize(112, 280).setOffset(200, 150);

        // enemy
        this.enemies = this.physics.add.group({
            classType: Enemy

        })
        for (let i = 0; i < 2; ++i) {

            const x = 1200 + 300 * i
            const y = 180

            const enemy = this.enemies.create(x, y, '')
            enemy.setFrictionX(0)
                .setGravityY(600)
            enemy.body.setSize(112, 280).setOffset(200, 150);
            enemy.setRangeMove(1100, 1500, 1, 0, 50 * Math.pow(-1, i + 1), 0)
        }
        const enemy = this.enemies.create(3100, 180, '')
            .setFrictionX(0)
            .setGravityY(600)
        enemy.setRangeMove(3060, 3250, 1, 0, 50, 0)
        enemy.body.setSize(112, 280).setOffset(200, 150);

        const enemy1 = this.enemies.create(3900, 180, '')
        enemy1.setFrictionX(0)
            .setGravityY(600)
        enemy1.body.setSize(112, 280).setOffset(200, 150);
        enemy1.setRangeMove(3860, 4040, 1, 0, 50, 0)

        const enemy2 = this.enemies.create(7000, 0, '')
        enemy2.setFrictionX(0)
            .setGravityY(600)
        enemy2.body.setSize(112, 280).setOffset(200, 150);
        enemy2.setRangeMove(6920, 7290, 1, 0, 50, 0)

        const enemy3 = this.enemies.create(8554, 260, '')
        enemy3.setFrictionX(0)
            .setGravityY(600)
        enemy3.body.setSize(112, 280).setOffset(200, 150);
        enemy3.setRangeMove(8450, 8640, 1, 0, 50, 0)

        const enemy4 = this.enemies.create(10540, 400, '')
        enemy4.setFrictionX(0)
            .setGravityY(600)
        enemy4.body.setSize(112, 280).setOffset(200, 150);
        enemy4.setRangeMove(10450, 10900, 1, 0, 50, 0)

        const enemy5 = this.enemies.create(12600, 300, '')
        enemy5.setFrictionX(0)
            .setGravityY(600)
        enemy5.setScale(1)
        enemy5.body.setSize(300, 300).setOffset(100, 50);
        enemy5.setRangeMove(12440, 12650, 1, 0, 50, 0)
            // hoang code end

        // Plants
        this.blueFlower = this.physics.add.sprite(340, 420, '')
            .setScale(0.2)
            .setOrigin(0.5)
            .setFlipX(1)
            .setAngle(-20)
            .setPipeline('Light2D');
        this.blueFlower.body.setSize(300, 560).setOffset(280, 120);
        this.blueFlower.anims.play('anim-blue-flower-1', true);
        this.lightFlower = this.lights.addLight(360, 390, 500)
            .setColor(0x75d9a5)
            .setIntensity(1);
        this.physics.add.overlap(this.player, this.blueFlower, () => {
            console.log("healing...");
            this.blueFlower.body.destroy();
            setTimeout(() => {
                this.lights.removeLight(this.lightFlower);
            }, 1000);
        });

        // this.slimeOrange = this.add.sprite(70, 340, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.slimeOrange.anims.play('anim-slime-orange', true);
        // this.lightSlimeOrange = this.lights.addLight(70, 340, 500)
        // .setColor(0xe6a630)
        // .setIntensity(1);

        // this.slimeGreen = this.add.sprite(70, 340, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.slimeGreen.anims.play('anim-slime-green', true);
        // this.lightSlimeGreen = this.lights.addLight(70, 350, 50)
        // .setColor(0x57e69c)
        // .setIntensity(1.5);

        this.plant1 = this.add.sprite(50, 290, '')
            .setOrigin(0.5)
            .setScale(0.3)
            .setFlipX(1)
            .setPipeline('Light2D');
        this.plant1.anims.play('anim-plant-3', true);

        // this.plant4 = this.add.sprite(120, 340, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.plant4.anims.play('anim-plant-6', true);

        // this.plant7 = this.add.sprite(660, 340, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.plant7.anims.play('anim-plant-7', true);

        // this.plantWind = this.add.sprite(750, 282, '')
        //     .setOrigin(0.5)
        //     .setScale(0.3)
        //     .setFlipX(1)
        //     .setPipeline('Light2D');
        // this.plantWind.anims.play('anim-plant-wind', true);

        // this.plantJumpIdle = this.add.sprite(160, 350, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.plantJumpIdle.anims.play('anim-plant-jump-idle', true);

        // this.plantJumpElastic = this.add.sprite(360, 350, '')
        // .setOrigin(0.5)
        // .setScale(0.3)
        // .setFlipX(1)
        // .setPipeline('Light2D');
        // this.plantJumpElastic.anims.play('anim-plant-jump-elastic', true);

        // Thorn layer
        const layerThorn = map.createFromObjects('Thorn', [
            { gid: 818, key: 'scene-decoration', frame: 'Thorn_1.png' },
            { gid: 819, key: 'scene-decoration', frame: 'Thorn_2.png' },
            { gid: 820, key: 'scene-decoration', frame: 'Thorn_3.png' },
            { gid: 821, key: 'scene-decoration', frame: 'Thorn_4.png' },
            { gid: 822, key: 'scene-decoration', frame: 'Thorn_5.png' },
            { gid: 823, key: 'scene-decoration', frame: 'Thorn_6.png' },
        ]);
        for (var i = 0; i < layerThorn.length; i++) {
            layerThorn[i].setPipeline('Light2D');
        }

        // Branch layer
        const layerBranch = map.createFromObjects('Branch', [
            { gid: 824, key: 'scene-decoration', frame: 'Branch_1.png' },
            { gid: 825, key: 'scene-decoration', frame: 'Branch_2.png' },
            { gid: 826, key: 'scene-decoration', frame: 'Branch_3.png' },
            { gid: 827, key: 'scene-decoration', frame: 'Branch_4.png' }
        ]);
        for (var i = 0; i < layerBranch.length; i++) {
            layerBranch[i].setPipeline('Light2D');
        }

        // Plant layer
        const layerPlant = map.createFromObjects('Plant', [
            { gid: 790, key: 'scene-decoration', frame: 'Grass_1.png' },
            { gid: 791, key: 'scene-decoration', frame: 'Grass_2.png' },
            { gid: 792, key: 'scene-decoration', frame: 'Grass_3.png' },
            { gid: 793, key: 'scene-decoration', frame: 'Grass_4.png' },
            { gid: 794, key: 'scene-decoration', frame: 'Grass_5.png' },
            { gid: 795, key: 'scene-decoration', frame: 'Grass_6.png' },
            { gid: 796, key: 'scene-decoration', frame: 'Grass_7.png' },
            { gid: 785, key: 'scene-decoration', frame: 'Branch_Leaf_1.png' },
            { gid: 786, key: 'scene-decoration', frame: 'Branch_Leaf_2.png' },
            { gid: 805, key: 'scene-decoration', frame: 'Moss_1.png' },
            { gid: 806, key: 'scene-decoration', frame: 'Moss_2.png' },
            { gid: 807, key: 'scene-decoration', frame: 'Moss_3.png' },
            { gid: 808, key: 'scene-decoration', frame: 'Moss_4.png' },
            { gid: 809, key: 'scene-decoration', frame: 'Moss_5.png' },
            { gid: 810, key: 'scene-decoration', frame: 'Moss_6.png' }
        ]);
        for (var i = 0; i < layerPlant.length; i++) {
            layerPlant[i].setPipeline('Light2D');
        }

        // Ground layer
        const layerGround = map.createLayer('Ground', tileset, 0, 0)
            .setOrigin(0)
            .setPipeline('Light2D');

        // Platform layer
        const layerPlatform = map.createLayer('Platform', tileset, 0, 0)
            .setOrigin(0)
            .setPipeline('Light2D');

        // Rock layer
        const layerRock = map.createFromObjects('Rock', [
            { gid: 811, key: 'scene-decoration', frame: 'Rock_1.png' },
            { gid: 812, key: 'scene-decoration', frame: 'Rock_2.png' },
            { gid: 813, key: 'scene-decoration', frame: 'Rock_3.png' }
        ]);
        for (var i = 0; i < layerRock.length; i++) {
            layerRock[i].setPipeline('Light2D');
        }

        // Hill layer
        const layerHill = map.createFromObjects('Hill', [
            { gid: 797, key: 'scene-decoration', frame: 'Large_Hill_1.png' },
            { gid: 798, key: 'scene-decoration', frame: 'Large_Hill_2.png' },
            { gid: 799, key: 'scene-decoration', frame: 'Large_Hill_3.png' },
            { gid: 814, key: 'scene-decoration', frame: 'Small_Hill_1.png' },
            { gid: 815, key: 'scene-decoration', frame: 'Small_Hill_2.png' },
            { gid: 816, key: 'scene-decoration', frame: 'Small_Hill_3.png' },
            { gid: 817, key: 'scene-decoration', frame: 'Small_Hill_4.png' }
        ]);
        for (var i = 0; i < layerHill.length; i++) {
            layerHill[i].setPipeline('Light2D');
        }


        // Collider of platforms
        layerGround.forEachTile(tile => {
            if (tile.index == -1) return;
            else if (30 < tile.index && tile.index < 282 && tile.index % 28 == 2) {
                tile.setCollision(1, 0, 0, 0);
            } else if (39 < tile.index && tile.index < 282 && tile.index % 28 == 11) {
                tile.setCollision(0, 1, 0, 0);
            } else if (30 < tile.index && tile.index < 39) {
                tile.setCollision(0, 0, 1, 0);
            } else if (282 < tile.index && tile.index < 291) {
                tile.setCollision(0, 0, 0, 1);
            } else if (tile.index == 30) {
                tile.setCollision(1, 0, 1, 0);
            } else if (tile.index == 39) {
                tile.setCollision(0, 1, 1, 0);
            } else if (tile.index == 282) {
                tile.setCollision(1, 0, 0, 1);
            } else if (tile.index == 291) {
                tile.setCollision(0, 1, 0, 1);
            } else if (tile.index == 103 || tile.index == 131) {
                tile.setCollision(0, 1, 0, 0);
            } else if (tile.index == 106 || tile.index == 134) {
                tile.setCollision(1, 0, 0, 0);
            } else if (tile.index == 76 || tile.index == 77) {
                tile.setCollision(0, 0, 1, 0);
            } else if (tile.index == 160 || tile.index == 161) {
                tile.setCollision(0, 0, 0, 1);
            }
        });
        layerPlatform.forEachTile(tile => {
            if (tile.index == -1) return;
            else if (368 < tile.index && tile.index < 373) {
                tile.setCollision(0, 0, 1, 0);
            } else if (396 < tile.index && tile.index < 401) {
                tile.setCollision(0, 0, 0, 1);
            } else if (tile.index == 368) {
                tile.setCollision(1, 0, 1, 0);
            } else if (tile.index == 396) {
                tile.setCollision(1, 0, 0, 1);
            } else if (tile.index == 373) {
                tile.setCollision(0, 1, 1, 0);
            } else if (tile.index == 401) {
                tile.setCollision(0, 1, 0, 1);
            }
        });

        // Debug mode
        // const debugGraphics1 = this.add.graphics().setAlpha(0.7);
        // layerGround.renderDebug(debugGraphics1, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(104, 103, 18, 200),
        //     faceColor: new Phaser.Display.Color(239, 240, 37, 255)
        // });
        // const debugGraphics3 = this.add.graphics().setAlpha(0.7);
        // layerPlatform.renderDebug(debugGraphics3, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(104, 103, 18, 200),
        //     faceColor: new Phaser.Display.Color(239, 240, 37, 255)
        // });
        // End debug mode


        // hoang code

        // add overlap

        this.physics.add.overlap(
            this.player.weapon,
            this.enemies,
            this.killEnemy, // called on overlap
            undefined,
            this
        )

        this.enemies.children.iterate(child => {
            /** @type {Phaser.Physics.Arcade.Sprite} */

            this.physics.add.overlap(
                child.weapon,
                this.player,
                () => {
                    if (child.weapon.stay == 1 || child.weapon.back == 1) return
                    child.weapon.shootBack()
                    child.goBack(child.x, child.y)
                    this.player.health -= 1
                }, // called on overlap
                undefined,
                child
            )

        })

        // Physical collision detection

        this.actors.children.iterate(child => {
            /** @type {Phaser.Physics.Arcade.Sprite} */

            this.physics.add.collider(child, this.plant8, () => {
                if (child.body.onFloor()) child.isStanding = true;
            });
            this.physics.add.collider(child, layerGround, () => {
                if (child.body.onFloor()) child.isStanding = true;
            });
            this.physics.add.collider(child, layerPlatform, () => {
                if (child.body.onFloor()) child.isStanding = true;
            });
            this.physics.add.collider(child, layerPlatform, () => {
                if (child.body.onFloor()) child.isStanding = true;
            });

        })

        this.enemies.children.iterate(child => {
            /** @type {Phaser.Physics.Arcade.Sprite} */

            this.physics.add.collider(child, layerGround, () => {
                if (child.body.onFloor()) child.isStanding = true;
            });
            this.physics.add.collider(child, layerPlatform, () => {
                if (child.body.onFloor()) child.isStanding = true;
            });
            this.physics.add.collider(child, layerPlatform, () => {
                if (child.body.onFloor()) child.isStanding = true;
            });

        })

        // plant for player jump

        this.plant88 = this.physics.add.sprite(5270, 800, '')
            .setOrigin(0.5)
            .setScale(0.3)
            .setPipeline('Light2D');
        this.plant88.anims.play('anim-plant-8', true)
        this.plant88.body.setSize(300, 560).setOffset(280, 120)
        this.physics.add.overlap(this.player, this.plant88, () => {
            this.player.isStanding = false;
            this.player.anims.play('anim-mossy-jump', true);
            if (this.player.body.velocity.y >= 0) this.player.setVelocityY(-JUMP_SPEED * 1.8);
        });

        this.plant8 = this.physics.add.sprite(7290, 550, '')
            .setOrigin(0.5)
            .setScale(0.3)
            .setPipeline('Light2D');
        this.plant8.anims.play('anim-plant-8', true)
        this.plant8.body.setSize(300, 560).setOffset(280, 120)
        this.physics.add.overlap(this.player, this.plant8, () => {
            this.player.isStanding = false;
            this.player.anims.play('anim-mossy-jump', true);
            if (this.player.body.velocity.y >= 0) this.player.setVelocityY(-JUMP_SPEED * 1.5);
        });

        // hoang code end

        // Bound the camera
        this.cameras.main.setBounds(0, 0, 500000, 3 * 580)
            .startFollow(this.player)
            .setDeadzone(this.scale.width * 0.2, this.scale.height * 0.44);
        // Fix bug line between tiles of tilemap
        this.cameras.main.roundPixels = true;

        // Debug map mode
        // this.cameras.main.setZoom(0.5);

        // Moving handle
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Background scrolling
        this.bg.tilePositionX = this.cameras.main.scrollX;
        // console.log(this.player.x + " " + this.player.y)

        // hoang code

        // Player collect weapon when enemy is shooted exactly
        if (this.player.shootExact == true) {
            this.player.goBack(this.player.x, this.player.y)
        }

        // Player make shooting
        this.player.makeShoot(this, this.player.x, this.player.y)

        //set player light and health bar
        this.player.weapon.setLight(this.player.weapon.x, this.player.weapon.y)
        this.player.setLight(this.player.x, this.player.y)

        this.player.stayHealthBar(this.player.x, this.player.y)

        // set enemies activities
        this.enemies.children.iterate(child => {
            /** @type {Phaser.Physics.Arcade.Sprite} */

            if (Math.abs(child.x - this.player.x) < 1200 && Math.abs(child.y - this.player.y) < 1200) {

                // set enemy light and health bar
                child.setLight(child.x, child.y)
                child.weapon.setLight(child.weapon.x, child.weapon.y)

                child.stayHealthBar(child.x, child.y)

                // set the enemy looks player
                child.setFace(child.x, this.player.x)

                // set enemy auto running
                child.setMove(child.x, child.y)

                // enemy make shooting
                child.makeShoot(this, child.x, child.y, this.player.x, this.player.y)

                // enemy collect weapon when the player is shooted exactly
                if (child.shootExact == true) {
                    child.goBack(child.x, child.y)
                }
            } else {
                child.setVelocityX(0)
                child.first = 0
            }
        })

        // hoang code end

        // Control        
        // if (this.cursors.space.isDown && this.player.isStanding) {
        //     this.player.isStanding = false;
        //     this.player.anims.play('anim-mossy-jump', true);
        //     if (this.player.body.velocity.y >= 0) this.player.setVelocityY(-JUMP_SPEED * 2);
        // }

        // Dash
        if (this.cursors.down.isDown) {
            this.player.anims.play('anim-mossy-dash', true);
            const direct = this.player.flipX ? -1 : 1;
            this.player.setVelocityX(RUN_SPEED * 3 * direct);

            return;
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
            if (this.player.isStanding) this.player.anims.play('anim-mossy-idle', true);
            else this.player.anims.play('anim-mossy-jump', true);
            this.player.setVelocityX(0);
        }
        if (this.cursors.up.isDown && this.player.isStanding) {
            this.player.isStanding = false;
            this.player.anims.play('anim-mossy-jump', true);
            if (this.player.body.velocity.y >= 0) this.player.setVelocityY(-JUMP_SPEED);
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-RUN_SPEED);
            if (this.player.isStanding) this.player.anims.play('anim-mossy-walk', true);
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(RUN_SPEED);
            if (this.player.isStanding) this.player.anims.play('anim-mossy-walk', true);
            this.player.flipX = false;
        }


    }

    // hoang code

    // code call back overlap function

    killEnemy(player, enemy) {
        if (this.player.weapon.stay == 1) return
        enemy.health -= 1
        if (enemy.health == 0) {
            this.enemies.killAndHide(enemy)
            this.physics.world.disableBody(enemy.body)
            enemy.setDestroy()
        }
        this.player.shootExact = true;
        this.player.goBack(this.player.x, this.player.y)
    }

    // hoang code end
}