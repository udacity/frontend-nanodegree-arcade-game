// Enemies our player must avoid
function Enemy(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // randomX variable positions enemies randomly
    // random placement looks better than having them all start at 0
    var randomX = this.getRandomX(33, 640);
    this.x = randomX;
    this.y = y;
    this.direction = "right";
}

// Define random number function for randomizing enemy starter location
Enemy.prototype.getRandomX = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  if (this.direction == "right" && this.x <= 960) {
    this.x += (this.speed * dt) + 1;
  } else if (this.direction == "right") {
    this.x = 0;
  } else if (this.direction == "left" && this.x >= 1) {
    this.x -= (this.speed *dt) + 1;
  } else if (this.direction == "left") {
    this.x = 960;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


////////////////////////////////////////////////
///////////////////////////////////////////////////////
// Set Speeds for each level
//////////////////////////

var speedOne = 100;
var speedTwo = 110;
var speedThree = 120;
var speedFour = 130;
var speedFive = 140;
var speedSix = 150;
var speedSeven = 160;
var speedEight = 170;
var speedNine = 180;

////////////////////////////////////////////////////////////
// Enemy type definition section
// Define superclasses of Enemy
function Bug(y) {
  var obj = new Enemy(y);
  obj.sound = new Audio('sounds/bite.wav');
  return obj;
}

Bug.prototype = Object.create(Enemy.prototype);
Bug.prototype.constructor = Enemy;

function Humanoid(y) {
  var obj = new Enemy(y);
  obj.sound = new Audio('sounds/ogre.wav');
  return obj;
}

Bug.prototype = Object.create(Enemy.prototype);
Bug.prototype.constructor = Enemy;

//////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// Define subclass enemies for each level now
//
////////////////////////////////////////////////
/////////////////////////////////////////////////
// Define level 1 bugs
function Snail(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/snail.png';
  obj.speed = speedOne - 10;
  return obj;
}
Snail.prototype = Object.create(Bug.prototype);
Snail.prototype.constructor = Bug;

function Scorpion(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/scorpion.png';
  obj.speed = speedOne + 30;
  return obj;
}
Scorpion.prototype = Object.create(Bug.prototype);
Scorpion.prototype.constructor = Bug;

function Beetle(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/beetle.png';
  obj.speed = speedOne + 10;
  return obj;
}
Beetle.prototype = Object.create(Bug.prototype);
Beetle.prototype.constructor = Bug;

///////////////////////////////////////////////
// Define ground bugs level 2
function Spider(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/spider.png';
  obj.speed = speedTwo + 30;
  return obj;
}
Spider.prototype = Object.create(Bug.prototype);
Spider.prototype.constructor = Bug;

function Roach(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/roach.png';
  obj.speed = speedTwo + 20;
  return obj;
}
Roach.prototype = Object.create(Bug.prototype);
Roach.prototype.constructor = Bug;

function Centipede(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/centipede.png';
  obj.speed = speedTwo;
  return obj;
}
Centipede.prototype = Object.create(Bug.prototype);
Centipede.prototype.constructor = Bug;

///////////////////////////////////////////////
// Define ground bugs level 3

function AntWorker(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/ant_worker.png';
  obj.speed = speedThree + 30;
  obj.direction = "left";
  return obj;
}
AntWorker.prototype = Object.create(Bug.prototype);
AntWorker.prototype.constructor = Bug;

function AntSoldier(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/ant_soldier.png';
  obj.speed = speedThree + 20;
  obj.direction = "left";
  return obj;
}
AntSoldier.prototype = Object.create(Bug.prototype);
AntSoldier.prototype.constructor = Bug;

function Mosquito(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/mosquito.png';
  obj.speed = speedThree - 5;
  obj.direction = "left";
  return obj;
}
Mosquito.prototype = Object.create(Bug.prototype);
Mosquito.prototype.constructor = Bug;

///////////////////////////////////////////////
// Define larva bugs level 4

function LarvaGrey(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/larva_grey.png';
  obj.speed = speedFour + 10;
  obj.direction = "left";
  return obj;
}
LarvaGrey.prototype = Object.create(Bug.prototype);
LarvaGrey.prototype.constructor = Bug;

function LarvaOrange(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/larva_orange.png';
  obj.speed = speedFour;
  obj.direction = "left";
  return obj;
}
LarvaOrange.prototype = Object.create(Bug.prototype);
LarvaOrange.prototype.constructor = Bug;

function BrainBug(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/brain_bug.png';
  obj.speed = speedFour;
  obj.direction = "left";
  return obj;
}
BrainBug.prototype = Object.create(Bug.prototype);
BrainBug.prototype.constructor = Bug;


//////////////////////////////////////////////////////
// Define flying bugs level 5
function Hornet(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/hornet.png';
  obj.speed = speedFive + 30;
  return obj;
}
Hornet.prototype = Object.create(Bug.prototype);
Hornet.prototype.constructor = Bug;

function Firefly(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/firefly.png';
  obj.speed = speedFive;
  return obj;
}
Firefly.prototype = Object.create(Bug.prototype);
Firefly.prototype.constructor = Bug;

function Moth(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/moth.png';
  obj.speed = speedFive - 30;
  return obj;
}
Moth.prototype = Object.create(Bug.prototype);
Moth.prototype.constructor = Bug;

////////////////////////////////////////////////////
// Define Worgs - level 6 mobs
//////////////////////////////

function WorgWarrior(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/worg_warrior.png';
  obj.speed = speedSix + 10;
  return obj;
}
WorgWarrior.prototype = Object.create(Humanoid.prototype);
WorgWarrior.prototype.constructor = Humanoid;

function WorgMage(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/worg_mage.png';
  obj.speed = speedSix;
  obj.direction = "left";
  return obj;
}
WorgMage.prototype = Object.create(Humanoid.prototype);
WorgMage.prototype.constructor = Humanoid;

function WorgRogue(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/worg_rogue.png';
  obj.speed = speedSix + 40;
  obj.direction = "left";
  return obj;
}
WorgRogue.prototype = Object.create(Humanoid.prototype);
WorgRogue.prototype.constructor = Humanoid;


///////////////////////////////////////////////////
// Define goblins level 7 mobs
//////////////////////////////////
function GobMage(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/goblin_mage.png';
  obj.speed = speedSeven + 10;
  return obj;
}
GobMage.prototype = Object.create(Humanoid.prototype);
GobMage.prototype.constructor = Humanoid;

function GobSorc(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/goblin_sorc.png';
  obj.speed = speedSeven;
  return obj;
}
GobSorc.prototype = Object.create(Humanoid.prototype);
GobSorc.prototype.constructor = Humanoid;

function GobWarrior(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/goblin_warrior.png';
  obj.speed = speedSeven;
  return obj;
}
GobWarrior.prototype = Object.create(Humanoid.prototype);
GobWarrior.prototype.constructor = Humanoid;

function GobFighter(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/goblin_fighter.png';
  obj.speed = speedSeven + 40;
  return obj;
}
GobWarrior.prototype = Object.create(Humanoid.prototype);
GobWarrior.prototype.constructor = Humanoid;

///////////////////////////////////////////////////
// Define elves level 8 mobs
//////////////////////////////////
function ElfWarrior(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/elf_warrior.png';
  obj.speed = speedEight + 30;
  obj.direction = "left";
  return obj;
}
ElfWarrior.prototype = Object.create(Humanoid.prototype);
ElfWarrior.prototype.constructor = Humanoid;

function ElfMage(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/elf_mage.png';
  obj.speed = speedEight;
  obj.direction = "left";
  return obj;
}
ElfMage.prototype = Object.create(Humanoid.prototype);
ElfMage.prototype.constructor = Humanoid;

function ElfPriest(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/elf_priest.png';
  obj.speed = speedEight + 20;
  return obj;
}
ElfPriest.prototype = Object.create(Humanoid.prototype);
ElfPriest.prototype.constructor = Humanoid;

function ElfNecromancer(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/elf_necromancer.png';
  obj.speed = speedEight + 30;
  obj.direction = "left";
  return obj;
}
ElfNecromancer.prototype = Object.create(Humanoid.prototype);
ElfNecromancer.prototype.constructor = Humanoid;

///////////////////////////////////////////////////
// Define elves level 8 mobs
//////////////////////////////////
function CentaurArcherOrange(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/centaur_archer_orange.png';
  obj.speed = speedNine + 60;
  return obj;
}
CentaurArcherOrange.prototype = Object.create(Humanoid.prototype);
CentaurArcherOrange.prototype.constructor = Humanoid;

function CentaurArcherRed(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/centaur_archer_red.png';
  obj.speed = speedNine + 60;
  obj.direction = "left";
  return obj;
}
CentaurArcherRed.prototype = Object.create(Humanoid.prototype);
CentaurArcherRed.prototype.constructor = Humanoid;

function CentaurXbowBrown(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/centaur_xbow_brown.png';
  obj.speed = speedNine + 20;
  obj.direction = "left";
  return obj;
}
CentaurXbowBrown.prototype = Object.create(Humanoid.prototype);
CentaurXbowBrown.prototype.constructor = Humanoid;

function CentaurXbowGrey(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/centaur_xbow_grey.png';
  obj.speed = speedNine + 20;
  return obj;
}
CentaurXbowGrey.prototype = Object.create(Humanoid.prototype);
CentaurXbowGrey.prototype.constructor = Humanoid;

///////////////////////////////////////////////////////
// Instantiate all objects
//////////////////////////
// rows for setting positioning entities
// row 1 = bottom || row 4 = top
var row1 = 576;
var row2 = 448;
var row3 = 320;
var row4 = 192;


// Instantiate arrays for each level
// var allEnemies = [];
var levelOne = [];
var levelTwo = []; // level 1
var levelThree = []; // level 2
var levelFour = [];      // level 3
var levelFive = [];    // level 4
var levelSix = [];    // level 5
var levelSeven = [];
var levelEight = [];
var levelNine = [];


// Instantiate bugs lvl 1 enemies
var snail = new Snail(row2);
var scorpion = new Scorpion(row3);
var beetle = new Beetle(row4);

levelOne.push(snail);
levelOne.push(scorpion);
levelOne.push(beetle);


// Instantiate bugs lvl 2 enemies
var spider = new Spider(row2);
var roach = new Roach(row3);
var centipede = new Centipede(row4);

levelTwo.push(spider);
levelTwo.push(roach);
levelTwo.push(centipede);

// Instantiate bugs lvl 3 enemies
var antWorker = new AntWorker(row2);
var antSoldier = new AntSoldier(row3);
var mosquito = new Mosquito(row4);

levelThree.push(antWorker);
levelThree.push(antSoldier);
levelThree.push(mosquito);

// Instantiate bugs lvl 4 enemies
var larvaGrey = new LarvaGrey(row2);
var larvaOrange = new LarvaOrange(row3);
var brainBug = new BrainBug(row4);

levelFour.push(larvaGrey);
levelFour.push(larvaOrange);
levelFour.push(brainBug);


// Instantiate bugs lvl 5 enemies
var hornet = new Hornet(row2);
var firefly = new Firefly(row3);
var moth = new Moth(row4);

levelFive.push(hornet);
levelFive.push(firefly);
levelFive.push(moth);


// Instantiate worgs lvl 6 enemies
var worgWarrior = new WorgWarrior(row2);
var worgMage = new WorgMage(row3);
var worgRogue = new WorgRogue(row4);

levelSix.push(worgWarrior);
levelSix.push(worgMage);
levelSix.push(worgRogue);

// Instantiate Goblins lvl 7 enemies
var gobFighter = new GobFighter(row1);
var gobWarrior = new GobWarrior(row2);
var gobMage = new GobMage(row3);
var gobSorc = new GobSorc(row4);

levelSeven.push(gobFighter);
levelSeven.push(gobWarrior);
levelSeven.push(gobMage);
levelSeven.push(gobSorc);


// Instantiate Elves lvl 8 enemies
var elfWarrior = new ElfWarrior(row1);
var elfMage = new ElfMage(row2);
var elfPriest = new ElfPriest(row3);
var elfNecromancer = new ElfNecromancer(row4);

levelEight.push(elfWarrior);
levelEight.push(elfMage);
levelEight.push(elfPriest);
levelEight.push(elfNecromancer);

// Instantiate Centaurs lvl 9 enemies
var centaurArcherOrange = new CentaurArcherOrange(row1);
var centaurArcherRed = new CentaurArcherRed(row2);
var centaurXbowBrown = new CentaurXbowBrown(row3);
var centaurXbowGrey = new CentaurXbowGrey(row4);

levelNine.push(centaurArcherOrange);
levelNine.push(centaurArcherRed);
levelNine.push(centaurXbowBrown);
levelNine.push(centaurXbowGrey);
