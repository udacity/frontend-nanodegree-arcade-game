//lane choices for bug postioning
const FIRSTLANESPAWN = 240;
const SECONDLANESPAWN = 160;
const THIRDLANESPAWN = 80;

const offScreen = -60;

// Enemies our player must avoid
class Enemy {

  constructor(speed, lane, sprite = 'images/enemy-bug.png') {
    //speed
    this.speed = speed;
    this.offScreen = offScreen;
    this.currentlane = lane;

    //starting postion of enemy to be saved for later
    this.startingX = this.offScreen;

    //exact position of enemy, can be manipulated per instance
    this.x = this.offScreen;
    this.y = lane;

    //resets the postion of the bugs
    this.resetPosition = function() {
      this.x = offScreen;
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
  }

  currentColumn() {


    //column choices
    const FIRSTCOLUMN = this.x >= 4 && this.x <= 101;
    const SECONDCOLUMN = this.x >= 102 && this.x <= 200;
    const THIRDCOLUMN = this.x >= 201 && this.x <= 298;
    const FOURTHCOLUMN = this.x >= 300 && this.x <= 398;

    let result = "";
    if (FIRSTCOLUMN) {
      result = 'firstColumn'
    } else if (SECONDCOLUMN) {
      result = 'secondColumn'
    } else if (THIRDCOLUMN) {
      result = 'thirdColumn'
    } else if (FOURTHCOLUMN) {
      result = 'fourthColumn'
    } else {
      result = 'fifthColumn'
    }
    return result;
  }

  currentLane() {
    //row choices
    const FIRSTLANE = this.y >= 80 && this.y <= 100;
    const SECONDLANE = this.y >= 101 && this.y <= 180;
    const THIRDLANE = this.y >= 181 && this.y <= 240;

    let result = "";
    if (FIRSTLANE) {
      result = 'firstLane'
    } else if (SECONDLANE) {
      result = 'secondLane'
    } else if (THIRDLANE) {
      result = 'thirdLane'
    }
    return result;
  }
}


// Update the enemy's position
Enemy.prototype.update = function(dt) {

  //is enemey outside of boundary in other words reached its destination?
  if (this.x < 500) {
    this.x += this.speed * dt;
    //Reset position to start
  } else {
    this.resetPosition();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*player class*/
class Character {
  // Init allEnemies array
  // For each enemy create and push new Enemy object into above array

  /*constructor*/
  constructor(sprite = boy) {
    //allows me to save postioning for latter
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;

    //charts how many hearts the player has
    this.health = 4;
    this.stonesCollected = 0;

    // sprite
    this.sprite = sprite;
    /*methods*/
    //create character onscreen
  }

  takeDamage() {
    this.respawn();

    //lower health
    this.health -= 1;
    allHearts.pop();

    //on player death
    if (this.health <= 0) {
      headerText.textContent = "You Died";
      modal.style.display = "block";
    }
  }

  //reset position
  respawn() {
    this.x = this.startingX;
    this.y = this.startingY;
  }

  currentColumn() {
    //column choices
    const FIRSTCOLUMN = this.x >= 4 && this.x <= 101
    const SECONDCOLUMN = this.x >= 102 && this.x <= 200
    const THIRDCOLUMN = this.x >= 201 && this.x <= 298
    const FOURTHCOLUMN = this.x >= 300 && this.x <= 398

    let result = "";
    if (FIRSTCOLUMN) {
      result = 'firstColumn'
    } else if (SECONDCOLUMN) {
      result = 'secondColumn'
    } else if (THIRDCOLUMN) {
      result = 'thirdColumn'
    } else if (FOURTHCOLUMN) {
      result = 'fourthColumn'
    } else {
      result = 'fifthColumn'
    }
    return result;
  }

  currentLane() {

    //row choices
    const FIRSTLANE = this.y >= 80 && this.y <= 100;
    const SECONDLANE = this.y >= 101 && this.y <= 180;
    const THIRDLANE = this.y >= 181 && this.y <= 240;


    let result = "";
    if (FIRSTLANE) {
      result = 'firstLane'
    } else if (SECONDLANE) {
      result = 'secondLane'
    } else if (THIRDLANE) {
      result = 'thirdLane'
    }
    return result;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //movement
  handleInput(input) {
    //dead people dont move
    if (this.health > 0 && this.stonesCollected < 5) {
      let horizontalMovement = 98;
      let lateralMovement = 80;

      if (input === 'left') {
        if (this.x > 5) {
          this.x -= horizontalMovement;
        }
      } else if (input === 'up') {
        if (this.y > 5) {
          this.y -= lateralMovement;
        }
      } else if (input === 'right') {
        if (this.x < 350) {
          this.x += horizontalMovement;
        }
      } else if (input === 'down') {
        if (this.y < 400) {
          this.y += lateralMovement;
        }
      }
    }


    //stone collections
    if (this.x === stone.x && this.y === stone.y) {
      //makes it so the stone will be placed in random locations
      const xCoordinates = [4, 102, 298, 200, 396];
      stone.x = xCoordinates[Math.floor(Math.random() * xCoordinates.length)];

      //change the location of the stone from on the river to on the grass
      stone.y = stone.y === 0 ? 320 : 0;

      //stone skins
      const red = 'images/Gem Red.png';
      const blue = 'images/Gem Blue.png';
      const orange = 'images/Gem Orange.png';
      const green = 'images/Gem Green.png';
      const purple = 'images/Gem Purple.png';

      //this needs to cyle through infintely
      //switches the color of the stone after collecting it
      switch (stone.sprite) {
        case blue:
          stone.sprite = red;
          this.stonesCollected += 1;
          break;
        case red:
          stone.sprite = orange;
          this.stonesCollected += 1;
          break;
        case orange:
          stone.sprite = green;
          this.stonesCollected += 1;
          break;
        case green:
          stone.sprite = purple;
          this.stonesCollected += 1;
          break;
        case purple:
          //on win
          this.stonesCollected += 1;
          stone.sprite = blue;
          stone.y = 0;
          //display modal
          modal.style.display = "block";
          headerText.textContent = "Congratulations You Win";
          //puts player back to start
          this.respawn();
      }
    }
  }

  //collision system for our bugs
  update() {
    for (let enemy of allEnemies) {

      if (enemy.currentLane() === this.currentLane() && enemy.currentColumn() === this.currentColumn()) {
        this.takeDamage();
      }
    }
  }
}

//symbols that represent if a character takes takeDamage
class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
  }
}

Heart.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Stone {
  constructor(x, y, sprite = blue) {
    this.x = x,
      this.y = y,
      this.sprite = sprite
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


//player skins
const boy = 'images/char-boy.png';
const girl = 'images/char-cat-girl.png';
const girlHorns = 'images/char-horn-girl.png';
const pinkGirl = 'images/char-pink-girl.png';
const girlPrincess = 'images/char-princess-girl.png';

//the goal is for the charicter to gather all of the stones in the river
// Now instantiate your objects.

// Place the player object in a variable called player
const playerInput = prompt("which character do you want to play as? , \n boy\n girl\n horn girl\n pink girl\n princess", "boy");
characterSelect = '';
if (playerInput === 'boy') {
  characterSelect = boy;
} else if (playerInput === 'girl') {
  characterSelect = girl;
} else if (playerInput === 'horn girl') {
  characterSelect = girlHorns;
} else if (playerInput === 'pink girl') {
  characterSelect = pinkGirl;
} else if (playerInput === 'princess') {
  characterSelect = girlPrincess;
} else {
  characterSelect = boy;
}
const player = new Character(characterSelect);

const allEnemies = [];
//red
const blinky = new Enemy(200, FIRSTLANESPAWN, 'images/enemy-bug-blinky.png');
allEnemies.push(blinky);
//orange
const clyde = new Enemy(300, SECONDLANESPAWN, 'images/enemy-bug.png');
allEnemies.push(clyde);
//blue
const inky = new Enemy(200, THIRDLANESPAWN, 'images/enemy-bug-inky.png');
allEnemies.push(inky);
//pink
const pinky = new Enemy(90, THIRDLANESPAWN, 'images/enemy-bug-pinky.png');
allEnemies.push(pinky);

const stone = new Stone(4, 0, 'images/Gem Blue.png');

let stones = [];
stones.push(stone);

const heart1 = new Heart(-27, 455);
const heart2 = new Heart(25, 455);
const heart3 = new Heart(75, 455);
const heart4 = new Heart(127, 455);

let allHearts = [];

allHearts.push(heart1, heart2, heart3, heart4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

  var allowedKeys = {
    //qwerty
    87: 'up',
    65: 'left',
    68: 'right',
    83: 'down',
    //arrows
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',

  };

  player.handleInput(allowedKeys[e.keyCode]);
});
