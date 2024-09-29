const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
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
    game.scale.resize(window.innerWidth, window.innerHeight);
});

let player;

function preload() {
    this.load.image('player', 'https://raw.githubusercontent.com/bingcube/source/refs/heads/main/US_Thompson.png'); // Asset súng
    this.load.image('bullet', 'https://raw.githubusercontent.com/bingcube/source/refs/heads/main/bullet.png'); // Asset viên đạn
}

function create() {
    player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player').setOrigin(0.5, 0.5);
    this.input.on('pointerdown', shootBullet, this);
}

function update() {
    // Logic to move player if needed
}

function shootBullet(pointer) {
    const bullet = this.physics.add.sprite(player.x, player.y, 'bullet').setScale(0.2); // Điều chỉnh kích thước viên đạn
    this.physics.moveTo(bullet, pointer.x, pointer.y, 600);
}
