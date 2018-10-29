/*player class*/
class Player {
  // constructor
  constructor(sprite) {
    //allows me to save positioning for latter
    this.startingX = COLUMN_X_COORDINATES[2];
    this.startingY = 410;
    this._x = this.startingX;
    this._y = this.startingY;
    this.health = [
      new Heart(-25, 455),
      new Heart(25, 455),
      new Heart(75, 455),
      new Heart(125, 455)
    ];
    this.gemsCollected = [];
    this._sprite = sprite;
  }

  get x() {
    return this._x;
  }


  get y() {
    return this._y;
  }

  static createPlayer() {
    let playerInput = prompt("which character do you want to play as? , \n boy\n girl\n cat girl\n horn girl\n pink girl\n princess", "boy");
    let selectedSprite;
    if (playerInput === 'girl') {
      selectedSprite = girl;
    } else if (playerInput === 'horn girl') {
      selectedSprite = girlHorns;
    } else if (playerInput === 'pink girl') {
      selectedSprite = girlPink;
    } else if (playerInput === 'princess') {
      selectedSprite = girlPrincess;
    } else if (playerInput === 'cat girl') {
      selectedSprite = girlCat;
    } else {
      selectedSprite = boy;
    }
    return new Player(selectedSprite);
  };

//allows me to reset the position of the character
  takeDamage() {
    //lower health
    this.health.pop();

    //on player death
    this.resetStartingPosition();
    if (this.lost()) {
      headerText.textContent = 'You Died';
      modal.style.display = 'block';
      console.log('lose');
    }
  };

  lost() {
    return this.health.length === 0;
  }

  won() {
    return this.gemsCollected.length === 5;
  }

  //reset position
  resetStartingPosition() {
    this._x = this.startingX;
    this._y = this.startingY;
  }

  resetHealth() {
    this.health =
        [
          new Heart(-25, 455),
          new Heart(25, 455),
          new Heart(75, 455),
          new Heart(125, 455)
        ];
  };

  render() {
    ctx.drawImage(Resources.get(this._sprite), this._x, this._y);
  }

//movement
  update(input) {
    // reflect user input by changing player location
    this.applyUserInput(input);
    //gem collections
    if (this.canCollectGem()) {
      //makes it so the gem will be placed in random locations
      this.collectGem();
      if (this.won()) {
        headerText.textContent = 'You Won!!!';
        modal.style.display = 'block';
        console.log('won');
      }
    }
  }

  //change player location
  applyUserInput(input) {
    if (input === 'left' && this.x > COLUMN_X_COORDINATES[0]) {
      this._x -= 100;
    } else if (input === 'right' && this.x < COLUMN_X_COORDINATES[COLUMN_X_COORDINATES.length - 1]) {
      this._x += 100;
    } else if (input === 'up' && this.y > ROW_Y_COORDINATES[0]) {
      this._y =
          ROW_Y_COORDINATES[getIndexFromValue(ROW_Y_COORDINATES, this.y) - 1];
    } else if (input === 'down' && this.y < ROW_Y_COORDINATES[ROW_Y_COORDINATES.length - 1]) {
      this._y =
          ROW_Y_COORDINATES[getIndexFromValue(ROW_Y_COORDINATES, this.y) + 1];
    }
    console.log("x " + player.x);
    console.log("y " + player.y);
  }

  canCollectGem() {
    return this._x === gem.x && this._y === gem.y;
  }

  collectGem() {
    // remove current gem from gems array and add to gemsCollected
    this.gemsCollected.push(gems.shift());
    if (!this.won()) {
      // get random coordinate from xCoordinates and set it as current new gems x
      gems[0].x = COLUMN_X_COORDINATES[Math.floor(Math.random() * COLUMN_X_COORDINATES.length)];
      //change the location of the gem from on the river to on the grass
      gems[0].y = gem.y === ROW_Y_COORDINATES[0] ? ROW_Y_COORDINATES[4] : 0;
      // switch to next gem sprite
      gem = gems[0];
    }
  }
}

