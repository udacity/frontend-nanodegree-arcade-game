// obstacle.js creates obstacles that player must navigate around

var Obstacle = function(x, y, image) {
  this.x = x;
  this.y = y;
  this.left = this.x - 128;
  this.right = this.x + 128;
  this.top = this.y - 128;
  this.bottom = this.y + 128;
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
var rowFive = 192;

var goldTree = "img/tree_gold.png";
var redTree = "img/tree_red.png";


var obstaclesOne = [];
var obstaclesTwo = [];

// Obstacle parameters - x, y, level, image

/////////////////////////////////////////////
// level one obstacles

// bottom row
var oneTree1 = new Obstacle(colOne, rowOne, goldTree);
var oneTree2 = new Obstacle(colTwo, rowOne, goldTree);
var oneTree3 = new Obstacle(colThree, rowOne, goldTree);
var oneTree4 = new Obstacle(colFour, rowOne, goldTree);
var oneTree5 = new Obstacle(colFive, rowOne, goldTree);
var oneTree6 = new Obstacle(colSix, rowOne, goldTree);
var oneTree7 = new Obstacle(colSeven, rowOne, goldTree);

// middle row
var oneTree10 = new Obstacle(colThree, rowFour, goldTree);
var oneTree8 = new Obstacle(colFour, rowFour, goldTree);
var oneTree9 = new Obstacle(colFive, rowFour, goldTree);

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

/////////////////////////////////////////
// obstacles level 2

// second row
var twoTree1 = new Obstacle(colOne, rowTwo, redTree);
var twoTree2 = new Obstacle(colTwo, rowTwo, redTree);
var twoTree3 = new Obstacle(colThree, rowTwo, redTree);
var twoTree4 = new Obstacle(colFour, rowTwo, redTree);
var twoTree5 = new Obstacle(colFive, rowTwo, redTree);

//fourth rowTwo
var twoTree6 = new Obstacle(colSeven, rowFive, redTree);
var twoTree7 = new Obstacle(colSix, rowFive, redTree);
var twoTree8 = new Obstacle(colFive, rowFive, redTree);

obstaclesTwo.push(twoTree1);
obstaclesTwo.push(twoTree2);
obstaclesTwo.push(twoTree3);
obstaclesTwo.push(twoTree4);
obstaclesTwo.push(twoTree5);
obstaclesTwo.push(twoTree6);
obstaclesTwo.push(twoTree7);
obstaclesTwo.push(twoTree8);
