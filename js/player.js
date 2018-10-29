/*player class*/
class Player {
  // constructor
  constructor(sprite = "boy") {
    //allows me to save positioning for latter
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
    this.health = [];
    this.resetHealth();
    this.sprite = sprite;
    this.gemsCollected = [];
  }

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
    return this.gemsCollected === 4;
  }

  //reset position
  resetStartingPosition() {
    this.x = this.startingX;
    this.y = this.startingY;
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
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

//movement
  update(input, allEnemies, gem) {
    // reflect user input by changing player location
    this.applyUserInput(input);
    //gem collections
    if (this.canCollectGem(gem)) {
      //makes it so the gem will be placed in random locations
      this.collectGem(gem);
    }
  }

  //change player location
  applyUserInput(input) {
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

  canCollectGem(gem) {
    return this.x === gem.x && this.y === gem.y;
  }

  collectGem(gem) {
    const xCoordinates = [4, 102, 298, 200, 396];
    gem.x = xCoordinates[Math.floor(Math.random() * xCoordinates.length)];

    //change the location of the gem from on the river to on the grass
    gem.y = gem.y === 0 ? 320 : 0;

    //gem skins
    const red = 'images/Gem Red.png';
    const blue = 'images/Gem Blue.png';
    const orange = 'images/Gem Orange.png';
    const green = 'images/Gem Green.png';
    const purple = 'images/Gem Purple.png';
    let gemSpriteArray = [red, blue, orange, green, purple];
    //switches the color of the gem after collecting it
    let currentSpriteIndex = gemSpriteArray.findIndex(
        k => k === gem.sprite);
    let lastSprite = gem.sprite === gemSpriteArray[gemSpriteArray.length
    - 1];
    gem.sprite =
        lastSprite ? gemSpriteArray[0] : gemSpriteArray[currentSpriteIndex + 1];
  }
}

