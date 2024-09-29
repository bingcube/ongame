const config = {
    type: Phaser.AUTO,
    width: window.innerWidth, // Chiều rộng bằng chiều rộng cửa sổ
    height: window.innerHeight, // Chiều cao bằng chiều cao cửa sổ
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

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight); // Cập nhật kích thước khi thay đổi kích thước cửa sổ
});

let player;

function preload() {
    this.load.image('player', 'url_to_player_asset');
    this.load.image('bullet', 'url_to_bullet_asset');
}

function create() {
    player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player');
    this.input.on('pointerdown', shootBullet, this);
}

function update() {
    // Logic to move player if needed
}

function shootBullet(pointer) {
    const bullet = this.physics.add.sprite(player.x, player.y, 'bullet');
    this.physics.moveTo(bullet, pointer.x, pointer.y, 600);
}
