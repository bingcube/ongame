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
let isDragging = false;

function preload() {
    this.load.image('player', 'https://raw.githubusercontent.com/bingcube/source/refs/heads/main/US_Thompson.png'); // Asset súng
    this.load.image('bullet', 'https://raw.githubusercontent.com/bingcube/source/refs/heads/main/bullet.png'); // Asset viên đạn
}

function create() {
    player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player').setOrigin(0.5, 0.5);
    this.input.on('pointerdown', () => { isDragging = true; });
    this.input.on('pointerup', () => { isDragging = false; });
}

function update() {
    if (isDragging) {
        player.x = this.input.x;
        player.y = this.input.y;
    }
    
    // Di chuyển bằng phím
    const speed = 5; // Tốc độ di chuyển
    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.UP)) {
        player.y -= speed;
    }
    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.DOWN)) {
        player.y += speed;
    }
    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
        player.x -= speed;
    }
    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
        player.x += speed;
    }
}

function shootBullet(pointer) {
    const bullet = this.physics.add.sprite(player.x, player.y, 'bullet').setScale(0.07);
    this.physics.moveTo(bullet, pointer.x, pointer.y, 600);
}
