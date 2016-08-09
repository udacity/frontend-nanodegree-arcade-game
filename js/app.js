
class Enemy {
    constructor (x, y, dt) {
        this.sprite = "images/enemy-bug.png";
        this.dt = dt;
        this.x = x;
        this.y = y;
    }
    update() {
        if (this.x >= 500) {
            this.x = -100;
            this.dt = Math.floor((Math.random() * 10) + 1);
        }
        this.x += this.dt;
        player.restart(this.x, this.y);
        player.render();
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor (x, y){
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update() {
    }
    restart(posX, posY) {
        if ((this.x >= posX - 50 && this.x <= posX + 50) && (this.y >= posY - 50 && this.y <= posY + 50)) {
            this.x = 200;
            this.y = 400;
            console.log(score);
            score = 0;
        }
    }
    handleInput(key) {
        switch (key) {
            case 'left': {
                if (this.x > 0) {
                    this.x -= 100;
                }
                break;
            }
            case 'up': {
                if (this.y > 0) {
                    this.y -= 100;
                    player.update_score();
                }
                break;
            }
            case 'right': {
                if (this.x < 400) {
                    this.x += 100;
                }
                break;
            }
            case 'down': {
                if (this.y < 400) {
                    this.y += 100;
                    player.update_score();
                }
                break;
            }
        }
        player.render();
    }
    update_score(){
        if ((this.y >= 0 && this.y <= 200)) {
            score += 1;
        }
    }
}

const player = new Player(200, 400);
let allEnemies = [];
const numEnemies = 3;
for (let i = 0; i < numEnemies; i++) {
    const vel = Math.floor((Math.random() * 10) + 1);
    const enemy = new Enemy(-100, 100 * i, vel);
    allEnemies.push(enemy);
}

let score = 0;

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
