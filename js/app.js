
class Enemy {
    constructor (x, y, dt) {
        this.sprite = "images/enemy-bug.png";
        this.dt = dt;
        this.x = x;
        this.y = y;
    }
    update() {
        if (this.x >= LIMIT_ENEMY) {
            this.x = POSINIT_ENEMY_X;
            this.dt = Math.floor((Math.random() * 10) + 1);
        }
        if (gameStatus === START_STATUS) {
            this.x += this.dt;
            player.restart(this.x, this.y);
            player.render();
        }
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
        if (posX === parseInt(posX) && posY === parseInt(posY)) {
            if ((this.x >= posX - RANGE_COLLISION && this.x <= posX + RANGE_COLLISION) && (this.y >= posY - RANGE_COLLISION && this.y <= posY + RANGE_COLLISION)) {
                document.getElementById('score').textContent = score;
                if (document.getElementById('game-over').className.match('invisible')) {
                    document.getElementById('game-over').classList.remove('invisible');
                }
                document.getElementById('game-over').classList.add('visible');
                gameStatus = PAUSE_STATUS;
                score = 0;
            }
        }
        else {
            this.x = POSINIT_PLAYER_X;
            this.y = POSINIT_PLAYER_Y;
        }
    }
    handleInput(key) {
        switch (key) {
            case 'left': {
                if (this.x > LIMIT_PLAYER_RIGHT && gameStatus === START_STATUS) {
                    this.x -= STEP_PLAYER;
                }
                break;
            }
            case 'up': {
                if (this.y > LIMIT_PLAYER_TOP && gameStatus === START_STATUS) {
                    this.y -= STEP_PLAYER;
                    player.update_score();
                }
                break;
            }
            case 'right': {
                if (this.x < LIMIT_PLAYER_LEFT && gameStatus === START_STATUS) {
                    this.x += STEP_PLAYER;
                }
                break;
            }
            case 'down': {
                if (this.y < LIMIT_PLAYER_BOTTON && gameStatus === START_STATUS) {
                    this.y += STEP_PLAYER;
                    player.update_score();
                }
                break;
            }
            case 'space-bar': {
                gameStatus = START_STATUS;
                this.x = POSINIT_PLAYER_X;
                this.y = POSINIT_PLAYER_Y;
                if (document.getElementById('game-over').className.match('visible')) {
                    document.getElementById('game-over').classList.remove('visible');
                }
                document.getElementById('game-over').classList.add('invisible');
            }
        }
        player.render();
    }
    update_score(){
        if ((this.y >= LIMIT_TOP_SPACE_DAMAGE && this.y <= LIMIT_BOTTON_SPACE_DAMAGE)) {
            score += 1;
        }
    }
}

const player = new Player(POSINIT_PLAYER_X, POSINIT_PLAYER_Y);
let allEnemies = [];
const numEnemies = 3;
for (let i = 0; i < numEnemies; i++) {
    const vel = Math.floor((Math.random() * 10) + 1);
    const enemy = new Enemy(POSINIT_ENEMY_X, 100 * i, vel);
    allEnemies.push(enemy);
}

let score = 0;
let gameStatus = START_STATUS;

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space-bar'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
