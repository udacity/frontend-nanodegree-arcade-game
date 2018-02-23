// Enemies our player must avoid
var Enemy = function(position) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = parseInt(Math.random() * 10) - 100
    this.y = (position + 1) * 83 - 20
    this.speed = parseInt(Math.random() * 10) + 1
    this.position = position
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // console.log(allEnemies.indexOf(this))
    this.x += this.speed
    if (this.x > 500) {
        allEnemies.push(new Enemy(this.position))
        allEnemies.splice(allEnemies.indexOf(this), 1)
    }
    // 若玩家在敌人所在行 并且跟敌人发生碰撞则重置玩家的位置
    if ([73, 156, 239].indexOf(player.y) === this.position && Math.abs(player.x - this.x) < 90) {
        player.reset()
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var playImg = ['boy', 'cat-girl', 'horn-girl', 'pink-girl', 'princess-girl']
var Player = function() {
    this.col = 101; // 移动时横向的距离
    this.row = 83; // 移动时纵向的距离

    this.x = this.col * 2;
    this.y = this.row * 5 - 10;

    this.number = 0;
    this.sprite = 'images/char-'+playImg[this.number]+'.png';
}
Player.prototype.reset = function () {
    this.x = this.col * 2;
    this.y = this.row * 5 - 10;
}
Player.prototype.nextPlayer = function () {
    this.number++
    this.sprite = 'images/char-'+playImg[this.number%playImg.length]+'.png';
    this.reset()
}
Player.prototype.update = function () {
    this.render()
}
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left': 
            if (this.x < this.col) return
            this.x -= this.col;
            break;
        case 'right':
            if (this.x >= 4 * this.col) return
            this.x += this.col;
            break;
        case 'up':
            if (this.y + 10 < this.row) return
            this.y -= this.row;
            break;
        case 'down':
            if (this.y + 10 >= 5 * this.row) return
            this.y += this.row;
            break;
    }
    if (this.y === -10) this.nextPlayer()
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = []
for (let i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(i))
}
var player = new Player()



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
