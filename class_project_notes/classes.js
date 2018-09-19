// ES5 "Class"
function Plane(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = true;
}

// methods "inherited" by all instances
Plane.prototype.startEngines = function () {
    console.log('starting engines...');
    this.enginesActive = true;
}


// ES6 Class
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}


//
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPosition = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is not past boundary, then keep moving
    if(this.x < this.boundary) { // places bug just off screen
        // Move forward
        // Increment x by speed * dt
        this.x += this.speed * dt;
    }
    else {
        // Reset position to start
        this.x = this.resetPosition;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
