class Enemy {
    // Enemies our player must avoid
    constructor(x, y, speed) {
        // Variables applied to each of our instances
        this.x = x;
        this.y = y + 55;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
        this.step = 101;
        this.boundary = this.step * 5;
        this.resetPosition = -this.step;
    }

    update(dt) {
        // If enemy is not past boundary, then keep moving
        if(this.x < this.boundary) { // places bug just off screen
            // Move forward, increment x by speed * dt
            this.x += this.speed * dt;
        }
        else {
            // Reset position to start
            this.x = this.resetPosition;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// TODO: Class has not been tested yet!
