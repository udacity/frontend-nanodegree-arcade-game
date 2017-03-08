/* 
 * Enemy definition
 * 
 */
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random() * 200 + 50;
    this.x = -101;
    this.setRow();
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter to ensure the game runs
    // at the same speed for all computers.
    if (this.x < ctx.canvas.width) {
        this.x += this.speed * dt * (game.points + 1) / 3;
    } else {
        // If it goes off the right side, start back on the left
        this.x = -101;
        this.setRow();
    }

    // Check to see if the enemy gets near the player
    if (Math.abs(this.x - player.x) < 60 && Math.abs(this.y - player.y) < 60) {
        // Decrement the lives and send the player back to the beginning
        game.die();
        player.startLoc();
    }
};

// Set the initial y value (row) of the enemy
Enemy.prototype.setRow = function() {
    this.y = Math.floor(Math.random() * 3) * 83 + 60;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* 
 * Player definition
 * 
 */
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.width = 101;
    this.height = 171;
};

Player.prototype.update = function(dir) {
    /* Check to see if the location has been set yet.
     * Then put it in the middle, if not.
     */
    if (!this.y) {
        this.startLoc();
    }

    // Move the player, keeping them within the game board
    if (dir === 'up' && this.y >= 71) {
        this.y -= 83;
    } else if (dir === 'down' && this.y <= (ctx.canvas.height - this.height - 83)) {
        this.y += 83;
    } else if (dir === 'left' && this.x >= 101) {
        this.x -= 101;
    } else if (dir === 'right' && this.x <= (ctx.canvas.width  - this.width - 101)) {
        this.x += 101;
    } else if (dir === 'up' && this.y < 71) {
        game.score();
        this.startLoc();
    }
};

// Set the starting location of the player
Player.prototype.startLoc = function() {
    this.x = ctx.canvas.width / 2 - this.width / 2;
    this.y = ctx.canvas.height - this.height - 50;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle the keyboard input to move the player
Player.prototype.handleInput = function(dir) {
    this.update(dir);
};


/* 
 * Game definition
 * This holds the points and lives state of the game
 * Considered putting this information in the player, but this seems to work okay
 */
var Game = function() {
    this.points = 0;
    this.lives = 3;
    this.over = false;
    this.sprite = 'images/Heart.png';
};

// Called when the player reaches the top of the board
Game.prototype.score = function(val) {
    this.points += val || 1;
    this.render();
};

// Called when a collision occurs with the enemy and player
Game.prototype.die = function(val) {
    this.lives -= val || 1;
    this.render();
};

// Draws the current points and lives, and the Game Over alert
Game.prototype.render = function() {
    // Draw the current score
    ctx.font = '18px Impact';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    ctx.fillText('Score: ' + this.points, 10, ctx.canvas.height - 28);
    ctx.strokeText('Score: ' + this.points, 10, ctx.canvas.height - 28);

    // Draws hearts in the bottom right corner representing remaining lives
    for (var i = 0; i < this.lives; i++) {
        var x = ctx.canvas.width - (25 * (i + 1));
        ctx.drawImage(Resources.get(this.sprite), x, ctx.canvas.height - 50, 
            20, 30);        
    }

    // Checks to see if there are still lives, otherwise prints Game Over
    // and stops the main() loop
    if (this.lives === 0) {
        this.over = true;
        ctx.font = '48px Impact';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.fillText('GAME OVER', ctx.canvas.width / 2, ctx.canvas.height / 3);
        ctx.strokeText('GAME OVER', ctx.canvas.width / 2, ctx.canvas.height / 3);
        ctx.font = '36px Impact';
        ctx.fillText('Refresh to replay', ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.strokeText('Refresh to replay', ctx.canvas.width / 2, ctx.canvas.height / 2);
    }

};

// Instantiate Objects
var game = new Game(),
    player = new Player(),
    allEnemies = [];

// Add enemies to allEnemies array
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}

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
