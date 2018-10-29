/*player class*/
export class Player{
  /*constructor*/
  constructor(sprite = "boy") {
    //allows me to save positioning for latter
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
    this.health = 4;
    this.sprite = sprite;
  }

  //allows me to reset the position of the character
  takeDamage() {
    //reset position
    this.x = this.startingX;
    this.y = this.startingY;

    //lower health
    this.health -= 1;
    allHearts.pop();

    //on player death
    if (this.health <= 0) {
      headerText.textContent = 'You Died';
      modal.style.display = 'block';
      console.log('lose');
    }
  };

  resetHealth() {
    fillAllHearts();
    this.health = 4;
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // hint update method...update position methods
    // collision
    // did player x & y collide with Enemy?
    // WIN?
    // did player reach a winning tile?
    // postion player back to starting position - x,y must now = starting x,y
    // movement handleing
    // update postioning according to input x,y

    // This class requires an update(), render() and
    // a handleInput() method.
  }

//movement
  handleInput(input) {
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
      let stoneSpriteArray = [red, blue, orange, green, purple];
      //switches the color of the stone after collecting it
      let currentSpriteIndex = stoneSpriteArray.findIndex(
          k => k === stone.sprite);
      let lastSprite = stone.sprite === stoneSpriteArray[stoneSpriteArray.length
      - 1];
      stone.sprite =
          lastSprite ? stoneSpriteArray : stoneSpriteArray[currentSpriteIndex
          + 1];
    }
  }

//collision system for our bugs
  update() {
    for (let enemy of allEnemies) {

      if (currentRow(enemy) === currentRow(this) &&
          currentColumn(enemy) === currentColumn(this)) {
        this.takeDamage();
      }
    }
  }
}

