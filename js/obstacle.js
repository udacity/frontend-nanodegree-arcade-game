// obstacle.js creates obstacles that player must navigate around

var Obstacle = function(x, y, level, image) {
  this.x = x;
  this.y = y;
  this.left = this.x - 128;
  this.right = this.x + 128;
  this.top = this.y - 128;
  this.bottom = this.y + 128;
  this.level = level;
  this.sprite = image;
  this.obstacleRight = false;
  this.obstacleLeft = false;
  this.obstacleTop = false;
  this.obstacleBottom = false;
};

Obstacle.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Obstacle.prototype.update = function() {
//  if (player.level === 1) {
//    this.checkObstacles(obstaclesOne);
//  }
};

Obstacle.prototype.checkObstacles = function(obstaclesList) {
/*
  var playerY = player.y;
  var playerX = player.x;

  for (var i = 0; i < obstaclesList.length; i++) {

    // prevents moving left
    if (playerX === this.right && playerY === this.y) {
      this.obstacleRight = true;
    } else if (playerX !== this.right || playerY !== this.y) {
      this.obstacleRight = false;
    }

    // prevents moving right
    if (playerX === this.left && playerY === this.y) {
      this.obstacleLeft = true;
    } else if (playerX !== this.left || playerY !== this.y) {
      this.obstacleLeft = false;
    }

    // prevents moving down
    if (playerY === this.top && playerX === this.x) {
      this.obstacleTop = true;
    } else if (playerY !== this.top || playerX !== this.x) {
      this.obstacleTop = false;
    }

    // prevents moving up
    if (playerY === this.bottom && playerX === this.x) {
      this.obstacleBottom = true;
    } else if (playerY !== this.bottom || playerX !== this.x) {
      this.obstacleBottom = false;
    }
  }*/
};

// columns (x-value)
var colOne = 32;
var colTwo = 160;
var colThree = 288;
var colFour = 416;
var colFive = 544;
var colSix = 672;
var colSeven = 800;

// rows (y-value)
var rowOne = 704;
var rowTwo = 576;
var rowThree = 448;
var rowFour = 320;


var obstaclesOne = [];
var obstaclesTwo = [];

// Obstacle parameters - x, y, level, image

// level one obstacles
var oneTree1 = new Obstacle(colOne, rowOne, 1, "img/tree_1.png");
var oneTree2 = new Obstacle(colTwo, rowOne, 1, "img/tree_1.png");
var oneTree3 = new Obstacle(colThree, rowOne, 1, "img/tree_1.png");
var oneTree4 = new Obstacle(colFour, rowOne, 1, "img/tree_1.png");
var oneTree5 = new Obstacle(colFive, rowOne, 1, "img/tree_1.png");
var oneTree6 = new Obstacle(colSix, rowOne, 1, "img/tree_1.png");
var oneTree7 = new Obstacle(colSeven, rowOne, 1, "img/tree_1.png");

var oneTree10 = new Obstacle(colThree, rowFour, 1, "img/tree_1.png");
var oneTree8 = new Obstacle(colFour, rowFour, 1, "img/tree_1.png");
var oneTree9 = new Obstacle(colFive, rowFour, 1, "img/tree_1.png");

obstaclesOne.push(oneTree1);
obstaclesOne.push(oneTree2);
obstaclesOne.push(oneTree3);
obstaclesOne.push(oneTree4);
obstaclesOne.push(oneTree5);
obstaclesOne.push(oneTree6);
obstaclesOne.push(oneTree7);
obstaclesOne.push(oneTree8);
obstaclesOne.push(oneTree9);
obstaclesOne.push(oneTree10);
