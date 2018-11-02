// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    const  Enemy = function Enemey(x,y,speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        //Properties
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.height = 45;
        this.width = 75;
        this.speed = speed;   
        this.hStep = 101;
        this.startPos= -(hStep);     
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

Enemy.prototype.update = function(dt){ //Aspects of this method have origins from https://matthewcranford.com/arcade-game-walkthrough-part-5-adding-enemies/

    this.x += 100 * dt; //movement of enemy
    this.x += this.speed * dt; //Varing speed of enemy by multiplying initial X-position by a new x-value. 
    
        if (this.x < hStep * 5){  //If x-position is less than the width of the canvass, enemy will continue to move at designated speed.
            this.x += this.speed * dt;
    
        } else {
                this.x = this.startPos; /*Otherwise, if x-position is greater than the width of the canvass, enemy will default
                                        to initial x-position.*/
            }
           
           //Collision Check
          //This Collision Check Statement is a concept originated from http://blog.sklambert.com/html5-canvas-game-2d-collision-detection
          //Used Dev Tools in order to find out height and width of player and enemy 
    
            for (enemy of allEnemies){ 
                if (this.x < player.x + player.width  && this.x + this.width  > player.x &&
                    this.y < player.y + player.height && this.y + this.height > player.y) {
            // The objects are touching
                        
                     player.reset();
                        
            }
            
            }
        };
    
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    
        




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const vStep = 83;
const hStep = 101;

const Player = function (x,y){
        //Properties            
        this.x = x;
        this.y = y;
        this.vStep = vStep;
        this.hStep = hStep;
        this.initX = 200; 
        this.initY = 400;    
        this.sprite = 'images/char-boy.png';
        this.height = 60;
        this.width = 32;    
        
    };




   //Methods
    Player.prototype.render = function (){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    Player.prototype.update = function(dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        //Need to check collision

        this.x * dt; // Movement of player

        //Check if player's x-value and y-value collided with enemy's x-value and y-value
        if (this.x === Enemy.x && this.y === Enemy.y){
                alert('Impact!');
                
                this.reset();
            
        }
        this.gameOver();    
    };

    Player.prototype.reset = function reset (){

        this.x = this.initX; 
        this.y = this.initY;            
    
    }

    Player.prototype.gameOver = function gamOver(){

        if(this.y === -15){
         
         const modalClass = document.querySelector('.modal');
         modalClass.classList.remove('hide_modal');
         allEnemies = [];  
        }
       
    };

   
  


    /*The values (83) and (101) in the function below are the height 
    and width of each square that comprises the building blocks 
    of the rows and co lums of game's background.
    */

    //Player Methods
    Player.prototype.handleInput = function(direction){ //This switch statement concept is from https://matthewcranford.com/arcade-game-walkthrough-part-4-heros-first-steps/
       
       switch(direction){

        case 'left':
        if (this.x > 0){
            this.x -= hStep;
        }   break;

        case 'right':
        if (this.x < hStep * 3){
            this.x += hStep;
        }   break;

        case 'up':
            if(this.y > 0){
               this.y -= vStep;
            }  break;
            
        case 'down': 
            if(this.y < vStep * 4){
                this.y += vStep;
            }
           
            break;            
       }    
       
    }



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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


const enemyA = new Enemy(-101,0, 25);
const enemyB = new Enemy(-101,83,100);
const enemyC = new Enemy(-101, 160, 75);
const enemyD = new Enemy(-101,240, 124 );
/*const enemyE = new Enemy();
const enemeyF= new Enemy();
*/

const player = new Player(200,400);
let allEnemies = [];
allEnemies.push(enemyA, enemyB, enemyC, enemyD);


console.log(allEnemies);

