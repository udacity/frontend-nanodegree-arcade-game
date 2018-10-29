// Enemies our player must avoid
class Enemy {

  constructor(speed, lane, sprite = 'images/enemy-bug.png') {
    //speed
    this.speed = speed;
    this.startingY = lane;
    //starting position of enemy to be saved for later
    this.startingX = -60;

    //exact position of enemy, can be manipulated per instance
    this.x = this.startingX;
    this.y = lane;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
  }

  //resets the position of the bugs
  resetPosition() {
    this.x = this.startingX;
  };

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  update(dt) {
    //is enemy outside of boundary in other words reached its destination?
    if (this.x < 500) {
      this.x += this.speed * dt;
      //Reset position to start
    } else {
      this.resetPosition();
    }
  }
}

