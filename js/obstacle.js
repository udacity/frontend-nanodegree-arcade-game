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
var rowSix = 64;

var goldTree = "img/tree_gold.png";
var redTree = "img/tree_red.png";
var rock = "img/rock.png";
var bell = "img/bell.png";
var severedHead = "img/obstacle_severed_head.png";
var skullPile = "img/obstacle_skull_pile.png";
var skeletonChain = "img/obstacle_skeleton_chain.png";
var statue = "img/obstacle_statue.png";


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
//var obstaclesEleven = [];
var obstaclesThirteen = [];
var obstaclesFourteen = [];
var obstaclesFifteen = [];
var obstaclesSixteen = [];
var obstaclesSeventeen = [];
var obstaclesEighteen = [];
var obstaclesNineteen = [];
var obstaclesTwenty = [];
var obstaclesTwentyOne = [];
var obstaclesTwentyTwo = [];
var obstaclesTwentyThree = [];
var obstaclesTwentyFour = [];
var obstaclesTwentyFive = [];

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


/////////////////////////////////////////
// obstacles level 6 (worgs)

// lower middle trees
var sixTree1 = new Obstacle(colTwo, rowTwo, redTree);
var sixTree2 = new Obstacle(colThree, rowTwo, goldTree);
var sixTree3 = new Obstacle(colFour, rowTwo, goldTree);
var sixTree4 = new Obstacle(colFive, rowTwo, goldTree);
var sixTree5 = new Obstacle(colSix, rowTwo, redTree);

// left middle rocks
var sixRock1 = new Obstacle(colOne, rowFour, rock);
var sixRock2 = new Obstacle(colTwo, rowFour, rock);
var sixRock3 = new Obstacle(colThree, rowFour, rock);

// right middle rocks
var sixRock4 = new Obstacle(colFive, rowFour, rock);
var sixRock5 = new Obstacle(colSix, rowFour, rock);
var sixRock6 = new Obstacle(colSeven, rowFour, rock);

// top trees
var sixTree6 = new Obstacle(colOne, rowSix, goldTree);
var sixTree7 = new Obstacle(colSeven, rowSix, goldTree);

// add obstacles to level six obstacle array
obstaclesSix.push(sixTree1);
obstaclesSix.push(sixTree2);
obstaclesSix.push(sixTree3);
obstaclesSix.push(sixTree4);
obstaclesSix.push(sixTree5);

obstaclesSix.push(sixRock1);
obstaclesSix.push(sixRock2);
obstaclesSix.push(sixRock3);

obstaclesSix.push(sixRock4);
obstaclesSix.push(sixRock5);
obstaclesSix.push(sixRock6);

obstaclesSix.push(sixTree6);
obstaclesSix.push(sixTree7);


/////////////////////////////////////////
// obstacles level 7 (goblins)

// lower left rocks
var sevenRock1 = new Obstacle(colOne, rowTwo, rock);
var sevenRock2 = new Obstacle(colTwo, rowTwo, rock);
var sevenRock3 = new Obstacle(colThree, rowTwo, rock);

// middle right rocks
var sevenRock4 = new Obstacle(colSix, rowThree, rock);
var sevenRock5 = new Obstacle(colThree, rowFour, rock);
var sevenRock6 = new Obstacle(colFour, rowFour, rock);
var sevenRock7 = new Obstacle(colFive, rowFour, rock);
var sevenRock8 = new Obstacle(colSix, rowFour, rock);
var sevenRock9 = new Obstacle(colSeven, rowFour, rock);

// upper left rocks
var sevenRock10 = new Obstacle(colOne, rowSix, rock);
var sevenRock11 = new Obstacle(colTwo, rowSix, rock);

//upper right trees
var sevenTree1 = new Obstacle(colSix, rowFive, goldTree);
var sevenTree2 = new Obstacle(colSeven, rowFive, goldTree);
var sevenTree3 = new Obstacle(colSix, rowSix, goldTree);
var sevenTree4 = new Obstacle(colSeven, rowSix, goldTree);

// add obstacles to level seven obstacle array
obstaclesSeven.push(sevenRock1);
obstaclesSeven.push(sevenRock2);
obstaclesSeven.push(sevenRock3);

obstaclesSeven.push(sevenRock4);
obstaclesSeven.push(sevenRock5);
obstaclesSeven.push(sevenRock6);
obstaclesSeven.push(sevenRock7);
obstaclesSeven.push(sevenRock8);
obstaclesSeven.push(sevenRock9);

obstaclesSeven.push(sevenRock10);
obstaclesSeven.push(sevenRock11);

obstaclesSeven.push(sevenTree1);
obstaclesSeven.push(sevenTree2);
obstaclesSeven.push(sevenTree3);
obstaclesSeven.push(sevenTree4);


/////////////////////////////////////////
// obstacles level 8 (elves)

// middle trees
var eightTree1 = new Obstacle(colTwo, rowTwo, goldTree);
var eightTree2 = new Obstacle(colSix, rowTwo, goldTree);
var eightTree3 = new Obstacle(colThree, rowThree, redTree);
var eightTree4 = new Obstacle(colFour, rowThree, redTree);
var eightTree5 = new Obstacle(colFive, rowThree, redTree);

// top trees
var eightTree6 = new Obstacle(colOne, rowFour, goldTree);
var eightTree7 = new Obstacle(colSeven, rowFour, goldTree);
var eightTree8 = new Obstacle(colOne, rowFive, redTree);
var eightTree9 = new Obstacle(colTwo, rowFive, redTree);
var eightTree10 = new Obstacle(colThree, rowFive, redTree);
var eightTree11 = new Obstacle(colFive, rowFive, redTree);
var eightTree12 = new Obstacle(colSix, rowFive, redTree);
var eightTree13 = new Obstacle(colSeven, rowFive, redTree);

obstaclesEight.push(eightTree1);
obstaclesEight.push(eightTree2);
obstaclesEight.push(eightTree3);
obstaclesEight.push(eightTree4);
obstaclesEight.push(eightTree5);

obstaclesEight.push(eightTree6);
obstaclesEight.push(eightTree7);
obstaclesEight.push(eightTree8);
obstaclesEight.push(eightTree9);
obstaclesEight.push(eightTree10);
obstaclesEight.push(eightTree11);
obstaclesEight.push(eightTree12);
obstaclesEight.push(eightTree13);


/////////////////////////////////////////
// obstacles level 9 (centaurs)

// lower trees
var nineTree1 = new Obstacle(colTwo, rowTwo, redTree);
var nineTree2 = new Obstacle(colThree, rowTwo, redTree);
var nineTree3 = new Obstacle(colFour, rowTwo, redTree);
var nineTree4 = new Obstacle(colFive, rowTwo, redTree);
var nineTree5 = new Obstacle(colSix, rowTwo, redTree);
var nineTree6 = new Obstacle(colSeven, rowTwo, redTree);
var nineTree7 = new Obstacle(colTwo, rowThree, redTree);

//upper trees
var nineTree8 = new Obstacle(colFive, rowFour, goldTree);
var nineTree9 = new Obstacle(colOne, rowFive, goldTree);
var nineTree10 = new Obstacle(colTwo, rowFive, goldTree);
var nineTree11 = new Obstacle(colThree, rowFive, goldTree);
var nineTree12 = new Obstacle(colFour, rowFive, goldTree);
var nineTree13 = new Obstacle(colFive, rowFive, goldTree);

obstaclesNine.push(nineTree1);
obstaclesNine.push(nineTree2);
obstaclesNine.push(nineTree3);
obstaclesNine.push(nineTree4);
obstaclesNine.push(nineTree5);
obstaclesNine.push(nineTree6);
obstaclesNine.push(nineTree7);

obstaclesNine.push(nineTree8);
obstaclesNine.push(nineTree9);
obstaclesNine.push(nineTree10);
obstaclesNine.push(nineTree11);
obstaclesNine.push(nineTree12);
obstaclesNine.push(nineTree13);

/////////////////////////////////////////
// obstacles level 10 (ogres)

// lower left and right rocks
var tenRock1 = new Obstacle(colOne, rowOne, rock);
var tenRock2 = new Obstacle(colSeven, rowOne, rock);
var tenRock3 = new Obstacle(colOne, rowTwo, rock);
var tenRock4 = new Obstacle(colSeven, rowTwo, rock);

// middle rocks
var tenRock5 = new Obstacle(colThree, rowThree, rock);
var tenRock6 = new Obstacle(colFour, rowThree, rock);
var tenRock7 = new Obstacle(colFive, rowThree, rock);
var tenRock8 = new Obstacle(colTwo, rowFour, rock);
var tenRock9 = new Obstacle(colThree, rowFour, rock);
var tenRock10 = new Obstacle(colFour, rowFour, rock);
var tenRock11 = new Obstacle(colFive, rowFour, rock);
var tenRock12 = new Obstacle(colSix, rowFour, rock);
var tenRock13 = new Obstacle(colOne, rowSix, rock);
var tenRock14 = new Obstacle(colSeven, rowSix, rock);

obstaclesTen.push(tenRock1);
obstaclesTen.push(tenRock2);
obstaclesTen.push(tenRock3);
obstaclesTen.push(tenRock4);

obstaclesTen.push(tenRock5);
obstaclesTen.push(tenRock6);
obstaclesTen.push(tenRock7);
obstaclesTen.push(tenRock8);
obstaclesTen.push(tenRock9);
obstaclesTen.push(tenRock10);
obstaclesTen.push(tenRock11);
obstaclesTen.push(tenRock12);
obstaclesTen.push(tenRock13);
obstaclesTen.push(tenRock14);

/////////////////////////////////////////
// No obstacles level 11 (Sea Beasts 1)
//////////////////////////////////////////


/////////////////////////////////////////
// No obstacles level 12 Sea (Naga)
////////////////////////////////////////////

/////////////////////////////////////////
// obstacles level 13 (Naga)

var thirteenBell1 = new Obstacle(colThree, rowThree, bell);
var thirteenBell2 = new Obstacle(colFive, rowThree, bell);

var thirteenBell3 = new Obstacle(colTwo, rowFive, bell);
var thirteenBell4 = new Obstacle(colFour, rowFive, bell);
var thirteenBell5 = new Obstacle(colSix, rowFive, bell);

obstaclesThirteen.push(thirteenBell1);
obstaclesThirteen.push(thirteenBell2);
obstaclesThirteen.push(thirteenBell3);
obstaclesThirteen.push(thirteenBell4);
obstaclesThirteen.push(thirteenBell5);

/////////////////////////////////////////
// No obstacles level 14 Deep Sea Mobs
////////////////////////////////////////////

/////////////////////////////////////////
// obstacles level 15 (Land Beasts)

// bottom row of rocks
var fifteenRock1 = new Obstacle(colOne, rowTwo, rock);
var fifteenRock2 = new Obstacle(colTwo, rowTwo, rock);
var fifteenRock3 = new Obstacle(colThree, rowTwo, rock);
var fifteenRock4 = new Obstacle(colFive, rowTwo, rock);
var fifteenRock5 = new Obstacle(colSix, rowTwo, rock);
var fifteenRock6 = new Obstacle(colSeven, rowTwo, rock);

// middle row of rocks
var fifteenRock7 = new Obstacle(colThree, rowFour, rock);
var fifteenRock8 = new Obstacle(colFour, rowFour, rock);
var fifteenRock9 = new Obstacle(colFive, rowFour, rock);

// top left row of redTrees
var fifteenTree1 = new Obstacle(colOne, rowSix, redTree);
var fifteenTree2 = new Obstacle(colTwo, rowSix, redTree);

// top right row of redTrees
var fifteenTree3 = new Obstacle(colSix, rowSix, redTree);
var fifteenTree4 = new Obstacle(colSeven, rowSix, redTree);

obstaclesFifteen.push(fifteenRock1);
obstaclesFifteen.push(fifteenRock2);
obstaclesFifteen.push(fifteenRock3);
obstaclesFifteen.push(fifteenRock4);
obstaclesFifteen.push(fifteenRock5);
obstaclesFifteen.push(fifteenRock6);
obstaclesFifteen.push(fifteenRock7);
obstaclesFifteen.push(fifteenRock8);
obstaclesFifteen.push(fifteenRock9);
obstaclesFifteen.push(fifteenTree1);
obstaclesFifteen.push(fifteenTree2);
obstaclesFifteen.push(fifteenTree3);
obstaclesFifteen.push(fifteenTree4);

/////////////////////////////////////////
// obstacles level 16 (Land Beasts)

// lower left trees
var sixteenTree1 = new Obstacle(colOne, rowOne, goldTree);
var sixteenTree2 = new Obstacle(colOne, rowTwo, goldTree);

// lower right trees
var sixteenTree3 = new Obstacle(colSeven, rowOne, goldTree);
var sixteenTree4 = new Obstacle(colSeven, rowTwo, goldTree);

// lower middle trees
var sixteenTree5 = new Obstacle(colThree, rowTwo, redTree);
var sixteenTree6 = new Obstacle(colFour, rowTwo, redTree);
var sixteenTree7 = new Obstacle(colFive, rowTwo, redTree);

// upper middle trees
var sixteenRock1 = new Obstacle(colTwo, rowFour, rock);
var sixteenRock2 = new Obstacle(colThree, rowFour, rock);
var sixteenRock3 = new Obstacle(colFive, rowFour, rock);
var sixteenRock4 = new Obstacle(colSix, rowFour, rock);

// top left trees
var sixteenRock5 = new Obstacle(colOne, rowSix, rock);
var sixteenRock6 = new Obstacle(colTwo, rowSix, rock);
// top right trees
var sixteenRock7 = new Obstacle(colSix, rowSix, rock);
var sixteenRock8 = new Obstacle(colSeven, rowSix, rock);

obstaclesSixteen.push(sixteenTree1);
obstaclesSixteen.push(sixteenTree2);
obstaclesSixteen.push(sixteenTree3);
obstaclesSixteen.push(sixteenTree4);

obstaclesSixteen.push(sixteenTree5);
obstaclesSixteen.push(sixteenTree6);
obstaclesSixteen.push(sixteenTree7);

obstaclesSixteen.push(sixteenRock1);
obstaclesSixteen.push(sixteenRock2);
obstaclesSixteen.push(sixteenRock3);
obstaclesSixteen.push(sixteenRock4);

obstaclesSixteen.push(sixteenRock5);
obstaclesSixteen.push(sixteenRock6);
obstaclesSixteen.push(sixteenRock7);
obstaclesSixteen.push(sixteenRock8);

/////////////////////////////////////////
// obstacles level 17 (Imps)

// lower row of rocks
var seventeenRock1 = new Obstacle(colOne, rowTwo, rock);
var seventeenRock2 = new Obstacle(colThree, rowTwo, rock);
var seventeenRock3 = new Obstacle(colFour, rowTwo, rock);
var seventeenRock4 = new Obstacle(colFive, rowTwo, rock);
var seventeenRock5 = new Obstacle(colSix, rowTwo, rock);
var seventeenRock6 = new Obstacle(colSeven, rowTwo, rock);

// top row of rocks
var seventeenRock7 = new Obstacle(colOne, rowFive, rock);
var seventeenRock8 = new Obstacle(colTwo, rowFive, rock);
var seventeenRock9 = new Obstacle(colThree, rowFive, rock);
var seventeenRock10 = new Obstacle(colFour, rowFive, rock);
var seventeenRock11 = new Obstacle(colFive, rowFive, rock);
var seventeenRock12 = new Obstacle(colSeven, rowFive, rock);

obstaclesSeventeen.push(seventeenRock1);
obstaclesSeventeen.push(seventeenRock2);
obstaclesSeventeen.push(seventeenRock3);
obstaclesSeventeen.push(seventeenRock4);
obstaclesSeventeen.push(seventeenRock5);
obstaclesSeventeen.push(seventeenRock6);

obstaclesSeventeen.push(seventeenRock7);
obstaclesSeventeen.push(seventeenRock8);
obstaclesSeventeen.push(seventeenRock9);
obstaclesSeventeen.push(seventeenRock10);
obstaclesSeventeen.push(seventeenRock11);
obstaclesSeventeen.push(seventeenRock12);

/////////////////////////////////////////
// obstacles level 18 (Elementals)

// row two
var eighteenBell1 = new Obstacle(colTwo, rowTwo, bell);
var eighteenBell2 = new Obstacle(colFour, rowTwo, bell);
var eighteenBell3 = new Obstacle(colSix, rowTwo, bell);
// row three
var eighteenBell4 = new Obstacle(colTwo, rowThree, bell);
var eighteenBell5 = new Obstacle(colSix, rowThree, bell);
// row four
var eighteenBell6 = new Obstacle(colTwo, rowFour, bell);
var eighteenBell7 = new Obstacle(colThree, rowFour, bell);
var eighteenBell8 = new Obstacle(colFive, rowFour, bell);
var eighteenBell9 = new Obstacle(colSix, rowFour, bell);
// row six
var eighteenBell10 = new Obstacle(colOne, rowSix, bell);
var eighteenBell11 = new Obstacle(colSeven, rowSix, bell);

obstaclesEighteen.push(eighteenBell1);
obstaclesEighteen.push(eighteenBell2);
obstaclesEighteen.push(eighteenBell3);
obstaclesEighteen.push(eighteenBell4);
obstaclesEighteen.push(eighteenBell5);
obstaclesEighteen.push(eighteenBell6);
obstaclesEighteen.push(eighteenBell7);
obstaclesEighteen.push(eighteenBell8);
obstaclesEighteen.push(eighteenBell9);
obstaclesEighteen.push(eighteenBell10);
obstaclesEighteen.push(eighteenBell11);

///////////////////////////////////
// Obstacles Level 19 (Abominations)

// lower left rocks
var nineteenRock1 = new Obstacle(colOne, rowOne, rock);
var nineteenRock2 = new Obstacle(colTwo, rowOne, rock);

// lower right rocks
var nineteenRock3 = new Obstacle(colSix, rowOne, rock);
var nineteenRock4 = new Obstacle(colSeven, rowOne, rock);

// middle row severed heads
var nineteenHead1 = new Obstacle(colOne, rowThree, severedHead);
var nineteenHead2 = new Obstacle(colThree, rowThree, severedHead);
var nineteenHead3 = new Obstacle(colFour, rowThree, severedHead);
var nineteenHead4 = new Obstacle(colFive, rowThree, severedHead);
var nineteenHead5 = new Obstacle(colSeven, rowThree, severedHead);

// top row severed heads
var nineteenHead6 = new Obstacle(colTwo, rowFive, severedHead);
var nineteenHead7 = new Obstacle(colFour, rowFive, severedHead);
var nineteenHead8 = new Obstacle(colSix, rowFive, severedHead);


obstaclesNineteen.push(nineteenRock1);
obstaclesNineteen.push(nineteenRock2);
obstaclesNineteen.push(nineteenRock3);
obstaclesNineteen.push(nineteenRock4);

obstaclesNineteen.push(nineteenHead1);
obstaclesNineteen.push(nineteenHead2);
obstaclesNineteen.push(nineteenHead3);
obstaclesNineteen.push(nineteenHead4);
obstaclesNineteen.push(nineteenHead5);

obstaclesNineteen.push(nineteenHead6);
obstaclesNineteen.push(nineteenHead7);
obstaclesNineteen.push(nineteenHead8);

///////////////////////////////////
// Obstacles Level 20 (Skeletons)

// left side skull piles
var twentyPile1 = new Obstacle(colOne, rowOne, skullPile);
var twentyPile2 = new Obstacle(colOne, rowTwo, skullPile);
var twentyPile3 = new Obstacle(colOne, rowThree, skullPile);
var twentyPile4 = new Obstacle(colOne, rowFour, skullPile);
var twentyPile5 = new Obstacle(colOne, rowFive, skullPile);
var twentyPile6 = new Obstacle(colOne, rowSix, skullPile);

// right side skull piles
var twentyPile7 = new Obstacle(colSeven, rowOne, skullPile);
var twentyPile8 = new Obstacle(colSeven, rowTwo, skullPile);

// lower left skeleton chains
var twentyChain1 = new Obstacle(colTwo, rowTwo, skeletonChain);
var twentyChain2 = new Obstacle(colThree, rowTwo, skeletonChain);

// upper right skeleton chains
var twentyChain3 = new Obstacle(colFive, rowThree, skeletonChain);
var twentyChain4 = new Obstacle(colFive, rowFour, skeletonChain);
var twentyChain5 = new Obstacle(colSix, rowFour, skeletonChain);
var twentyChain6 = new Obstacle(colThree, rowFive, skeletonChain);
var twentyChain7 = new Obstacle(colFour, rowFive, skeletonChain);
var twentyChain8 = new Obstacle(colFive, rowFive, skeletonChain);
var twentyChain9 = new Obstacle(colSix, rowFive, skeletonChain);

obstaclesTwenty.push(twentyPile1);
obstaclesTwenty.push(twentyPile2);
obstaclesTwenty.push(twentyPile3);
obstaclesTwenty.push(twentyPile4);
obstaclesTwenty.push(twentyPile5);
obstaclesTwenty.push(twentyPile6);

obstaclesTwenty.push(twentyPile7);
obstaclesTwenty.push(twentyPile8);

obstaclesTwenty.push(twentyChain1);
obstaclesTwenty.push(twentyChain2);

obstaclesTwenty.push(twentyChain3);
obstaclesTwenty.push(twentyChain4);
obstaclesTwenty.push(twentyChain5);
obstaclesTwenty.push(twentyChain6);
obstaclesTwenty.push(twentyChain7);
obstaclesTwenty.push(twentyChain8);
obstaclesTwenty.push(twentyChain9);

///////////////////////////////////
// Obstacles Level 21 (Ghosts)

// lower skulls
var twentyOnePile1 = new Obstacle(colOne, rowTwo, skullPile);
var twentyOnePile2 = new Obstacle(colSeven, rowTwo, skullPile);
// lower severed heads
var twentyOneHead1 = new Obstacle(colTwo, rowTwo, severedHead);
var twentyOneHead2 = new Obstacle(colSix, rowTwo, severedHead);

// middle skeleton chains
var twentyOneChain1 = new Obstacle(colThree, rowFour, skeletonChain);
var twentyOneChain2 = new Obstacle(colFive, rowFour, skeletonChain);

// top skull piles
var twentyOnePile3 = new Obstacle(colTwo, rowFive, skullPile);
var twentyOnePile4 = new Obstacle(colThree, rowFive, skullPile);
var twentyOnePile5 = new Obstacle(colFour, rowFive, skullPile);
var twentyOnePile6 = new Obstacle(colFive, rowFive, skullPile);
var twentyOnePile7 = new Obstacle(colSix, rowFive, skullPile);

obstaclesTwentyOne.push(twentyOnePile1);
obstaclesTwentyOne.push(twentyOnePile2);
obstaclesTwentyOne.push(twentyOneHead1);
obstaclesTwentyOne.push(twentyOneHead2);

obstaclesTwentyOne.push(twentyOneChain1);
obstaclesTwentyOne.push(twentyOneChain2);

obstaclesTwentyOne.push(twentyOnePile3);
obstaclesTwentyOne.push(twentyOnePile4);
obstaclesTwentyOne.push(twentyOnePile5);
obstaclesTwentyOne.push(twentyOnePile6);
obstaclesTwentyOne.push(twentyOnePile7);

///////////////////////////////////
// Obstacles Level 22 (Gargoyles)

// lower left column of statues
var twentyTwoStatue1 = new Obstacle(colTwo, rowTwo, statue);
var twentyTwoStatue2 = new Obstacle(colTwo, rowThree, statue);

// lower middle column of statues
var twentyTwoStatue3 = new Obstacle(colFour, rowTwo, statue);
var twentyTwoStatue4 = new Obstacle(colFour, rowThree, statue);

// lower middle column of statues
var twentyTwoStatue5 = new Obstacle(colSix, rowTwo, statue);
var twentyTwoStatue6 = new Obstacle(colSix, rowThree, statue);

// top left statues
var twentyTwoStatue7 = new Obstacle(colOne, rowFive, statue);
var twentyTwoStatue8 = new Obstacle(colOne, rowSix, statue);

// top middle statues
var twentyTwoStatue9 = new Obstacle(colThree, rowFive, statue);
var twentyTwoStatue10 = new Obstacle(colFive, rowFive, statue);

// top right statues
var twentyTwoStatue11 = new Obstacle(colSeven, rowFive, statue);
var twentyTwoStatue12 = new Obstacle(colSeven, rowSix, statue);

obstaclesTwentyTwo.push(twentyTwoStatue1);
obstaclesTwentyTwo.push(twentyTwoStatue2);
obstaclesTwentyTwo.push(twentyTwoStatue3);
obstaclesTwentyTwo.push(twentyTwoStatue4);
obstaclesTwentyTwo.push(twentyTwoStatue5);
obstaclesTwentyTwo.push(twentyTwoStatue6);
obstaclesTwentyTwo.push(twentyTwoStatue7);
obstaclesTwentyTwo.push(twentyTwoStatue8);
obstaclesTwentyTwo.push(twentyTwoStatue9);
obstaclesTwentyTwo.push(twentyTwoStatue10);
obstaclesTwentyTwo.push(twentyTwoStatue11);
obstaclesTwentyTwo.push(twentyTwoStatue12);
