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
let cursors;

function preload() {
    this.load.image('player', 'https://raw.githubusercontent.com/bingcube/source/refs/heads/main/US_Thompson.png'); 
    this.load.image('bullet', 'https://raw.githubusercontent.com/bingcube/source/refs/heads/main/bullet.png'); 
}

function create() {
    player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player').setOrigin(0.5, 0.5);
    this.input.on('pointerdown', shootBullet, this); 
    this.input.on('pointermove', (pointer) => {
        if (isDragging) {
            player.x = pointer.x;
            player.y = pointer.y;
        }
    });
    this.input.on('pointerdown', () => { isDragging = true; });
    this.input.on('pointerup', () => { isDragging = false; });

    cursors = this.input.keyboard.createCursorKeys(); 
}

function update() {

    const speed = 2; 
    if (cursors.up.isDown) {
        player.y -= speed;
    }
    if (cursors.down.isDown) {
        player.y += speed;
    }
    if (cursors.left.isDown) {
        player.x -= speed;
    }
    if (cursors.right.isDown) {
        player.x += speed;
    }
}

function shootBullet(pointer) {
    const bullet = this.physics.add.sprite(player.x, player.y, 'bullet').setScale(0.07);
    this.physics.moveTo(bullet, pointer.x, pointer.y, 600);
}
