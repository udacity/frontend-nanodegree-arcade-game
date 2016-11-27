// obstacle.js creates obstacles that player must navigate around

var Obstacle = function(x, y, image) {
  this.x = x;
  this.y = y;
  this.left = this.x - 128;
  this.right = this.x + 128;
  this.top = this.y - 128;
  this.bottom = this.y + 128;
  this.sprite = image;
};

Obstacle.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Obstacle.prototype.update = function() {

};

Obstacle.prototype.checkObstacles = function(obstaclesList) {

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
var rock = "img/rock.png";


var obstaclesOne = [];
var obstaclesTwo = [];
var obstaclesThree = [];
var obstaclesFour = [];
var obstaclesFive = [];
var obstaclesSix = [];
var obstaclesSeven = [];
var obstaclesEight = [];
var obstaclesNine = [];
var obstaclesTen = [];
var obstaclesEleven = [];

// Obstacle parameters - x, y, level, image

/////////////////////////////////////////////
// level one obstacles

// bottom row trees
var oneTree1 = new Obstacle(colOne, rowOne, goldTree);
var oneTree2 = new Obstacle(colTwo, rowOne, goldTree);
var oneTree3 = new Obstacle(colThree, rowOne, goldTree);
var oneTree4 = new Obstacle(colFour, rowOne, goldTree);
var oneTree5 = new Obstacle(colFive, rowOne, goldTree);
var oneTree6 = new Obstacle(colSix, rowOne, goldTree);
var oneTree7 = new Obstacle(colSeven, rowOne, goldTree);

// middle row trees
var oneTree8 = new Obstacle(colThree, rowFour, goldTree);
var oneTree9 = new Obstacle(colFour, rowFour, goldTree);
var oneTree10 = new Obstacle(colFive, rowFour, goldTree);

// oddball trees
var oneTree11 = new Obstacle(colSeven, rowThree, goldTree);
var oneTree12 = new Obstacle(colOne, rowThree, goldTree);
var oneTree13 = new Obstacle(colOne, rowFour, goldTree);



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

obstaclesOne.push(oneTree11);
obstaclesOne.push(oneTree12);
obstaclesOne.push(oneTree13);


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

/////////////////////////////////////////
// obstacles level 3 (ants)

// right bottom side
var threeTree1 = new Obstacle(colSeven, rowOne, redTree);
var threeTree2 = new Obstacle(colSeven, rowTwo, redTree);

// left bottom side
var threeTree3 = new Obstacle(colOne, rowOne, redTree);
var threeTree4 = new Obstacle(colOne, rowTwo, redTree);

// middle
var threeRock1 = new Obstacle(colThree, rowThree, rock);
var threeRock2 = new Obstacle(colFour, rowThree, rock);
var threeRock3 = new Obstacle(colFive, rowThree, rock);

// top
var threeRock4 = new Obstacle(colTwo, rowFive, rock);
var threeRock5 = new Obstacle(colSix, rowFive, rock);

obstaclesThree.push(threeTree1);
obstaclesThree.push(threeTree2);
obstaclesThree.push(threeTree3);
obstaclesThree.push(threeTree4);
obstaclesThree.push(threeRock1);
obstaclesThree.push(threeRock2);
obstaclesThree.push(threeRock3);
obstaclesThree.push(threeRock4);
obstaclesThree.push(threeRock5);

/////////////////////////////////////////
// obstacles level 4 (larva)

// lower left
var fourTree1 = new Obstacle(colOne, rowThree, redTree);
var fourTree2 = new Obstacle(colTwo, rowThree, redTree);

// lower right
var fourTree3 = new Obstacle(colSix, rowThree, redTree);
var fourTree4 = new Obstacle(colSeven, rowThree, redTree);

// top middle
var fourTree5 = new Obstacle(colTwo, rowFive, redTree);
var fourTree6 = new Obstacle(colThree, rowFive, redTree);
var fourTree7 = new Obstacle(colFour, rowFive, redTree);
var fourTree8 = new Obstacle(colFive, rowFive, redTree);
var fourTree9 = new Obstacle(colSix, rowFive, redTree);

obstaclesFour.push(fourTree1);
obstaclesFour.push(fourTree2);
obstaclesFour.push(fourTree3);
obstaclesFour.push(fourTree4);
obstaclesFour.push(fourTree5);
obstaclesFour.push(fourTree6);
obstaclesFour.push(fourTree7);
obstaclesFour.push(fourTree8);
obstaclesFour.push(fourTree9);

/////////////////////////////////////////
// obstacles level 5 (flying bugs)

// lower left rocks
var fiveRock1 = new Obstacle(colThree, rowThree, rock);
var fiveRock2 = new Obstacle(colFour, rowThree, rock);
var fiveRock3 = new Obstacle(colTwo, rowThree, rock);
var fiveRock4 = new Obstacle(colOne, rowThree, rock);

// upper right rocks
var fiveRock5 = new Obstacle(colSeven, rowFive, rock);
var fiveRock6 = new Obstacle(colSix, rowFive, rock);
var fiveRock7 = new Obstacle(colFive, rowFive, rock);
var fiveRock8 = new Obstacle(colFour, rowFive, rock);
var fiveRock9 = new Obstacle(colThree, rowFive, rock);

obstaclesFive.push(fiveRock1);
obstaclesFive.push(fiveRock2);
obstaclesFive.push(fiveRock3);
obstaclesFive.push(fiveRock4);

obstaclesFive.push(fiveRock5);
obstaclesFive.push(fiveRock6);
obstaclesFive.push(fiveRock7);
obstaclesFive.push(fiveRock8);
obstaclesFive.push(fiveRock9);
