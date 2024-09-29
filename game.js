const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;

function preload() {
    this.load.image('player', 'url_to_player_asset');
    this.load.image('bullet', 'url_to_bullet_asset');
}

function create() {
    player = this.physics.add.sprite(400, 300, 'player');
    this.input.on('pointerdown', shootBullet, this);
}

function update() {
    // Logic to move player if needed
}

function shootBullet(pointer) {
    const bullet = this.physics.add.sprite(player.x, player.y, 'bullet');
    this.physics.moveTo(bullet, pointer.x, pointer.y, 600);
}
