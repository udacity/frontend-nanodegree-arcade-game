
// Define random number function for randomizing enemy starter location
function getRandomX(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
function Enemy(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // randomX variable positions enemies randomly
    // random placement looks better than having them all start at 0
    var randomX = getRandomX(33, 640);
    this.x = randomX;
    this.y = y;
    this.direction = "right";
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  if (this.direction == "right" && this.x <= 704) {
    this.x += (this.speed * dt) + 1;
  } else if (this.direction == "right") {
    this.x = 0;
  } else if (this.direction == "left" && this.x >= 1) {
    this.x -= (this.speed *dt) + 1;
  } else if (this.direction == "left") {
    this.x = 704;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

// Define ground bugs level 1
function Snail(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/snail.png';
  obj.speed = 50;
  return obj;
}
Snail.prototype = Object.create(Bug.prototype);
Snail.prototype.constructor = Bug;

function Scorpion(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/scorpion.png';
  obj.speed = 80;
  return obj;
}
Scorpion.prototype = Object.create(Bug.prototype);
Scorpion.prototype.constructor = Bug;

function Beetle(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/beetle.png';
  obj.speed = 130;
  return obj;
}
Beetle.prototype = Object.create(Bug.prototype);
Beetle.prototype.constructor = Bug;

// Define ground bugs level 1
function Spider(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/spider.png';
  obj.speed = 120;
  return obj;
}
Spider.prototype = Object.create(Bug.prototype);
Spider.prototype.constructor = Bug;

function Roach(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/roach.png';
  obj.speed = 100;
  return obj;
}
Roach.prototype = Object.create(Bug.prototype);
Roach.prototype.constructor = Bug;

function Centipede(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/centipede.png';
  obj.speed = 130;
  return obj;
}
Centipede.prototype = Object.create(Bug.prototype);
Centipede.prototype.constructor = Bug;

// Define level 2 bugs
function Hornet(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/hornet.png';
  obj.speed = 140;
  return obj;
}
Hornet.prototype = Object.create(Bug.prototype);
Hornet.prototype.constructor = Bug;

function Firefly(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/firefly.png';
  obj.speed = 185;
  return obj;
}
Firefly.prototype = Object.create(Bug.prototype);
Firefly.prototype.constructor = Bug;

function Moth(y) {
  var obj = new Bug(y);
  obj.sprite = 'img/moth.png';
  obj.speed = 50;
  return obj;
}
Moth.prototype = Object.create(Bug.prototype);
Moth.prototype.constructor = Bug;

//////////////////////////////
// Define Worgs - level 3 mobs
//////////////////////////////

function WorgWarrior(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/worg_warrior.png';
  obj.speed = 200;
  return obj;
}
WorgWarrior.prototype = Object.create(Humanoid.prototype);
WorgWarrior.prototype.constructor = Humanoid;

function WorgMage(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/worg_mage.png';
  obj.speed = 188;
  obj.direction = "left";
  return obj;
}
WorgMage.prototype = Object.create(Humanoid.prototype);
WorgMage.prototype.constructor = Humanoid;

function WorgRogue(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/worg_rogue.png';
  obj.speed = 220;
  obj.direction = "left";
  return obj;
}
WorgRogue.prototype = Object.create(Humanoid.prototype);
WorgRogue.prototype.constructor = Humanoid;


////////////////////////////////
// Define goblins level 4 mobs
//////////////////////////////////
function GobMage(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/goblin_mage.png';
  obj.speed = 230;
  return obj;
}
GobMage.prototype = Object.create(Humanoid.prototype);
GobMage.prototype.constructor = Humanoid;

function GobSorc(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/goblin_sorc.png';
  obj.speed = 240;
  return obj;
}
GobSorc.prototype = Object.create(Humanoid.prototype);
GobSorc.prototype.constructor = Humanoid;

function GobWarrior(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/goblin_warrior.png';
  obj.speed = 280;
  return obj;
}
GobWarrior.prototype = Object.create(Humanoid.prototype);
GobWarrior.prototype.constructor = Humanoid;

function GobFighter(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/goblin_fighter.png';
  obj.speed = 290;
  return obj;
}
GobWarrior.prototype = Object.create(Humanoid.prototype);
GobWarrior.prototype.constructor = Humanoid;

////////////////////////////////
// Define goblins level 5 mobs
//////////////////////////////////
function ElfWarrior(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/elf_warrior.png';
  obj.speed = 50;
  obj.direction = "left";
  return obj;
}
ElfWarrior.prototype = Object.create(Humanoid.prototype);
ElfWarrior.prototype.constructor = Humanoid;

function ElfMage(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/elf_mage.png';
  obj.speed = 230;
  obj.direction = "left";
  return obj;
}
ElfMage.prototype = Object.create(Humanoid.prototype);
ElfMage.prototype.constructor = Humanoid;

function ElfPriest(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/elf_priest.png';
  obj.speed = 250;
  return obj;
}
ElfPriest.prototype = Object.create(Humanoid.prototype);
ElfPriest.prototype.constructor = Humanoid;

function ElfNecromancer(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/elf_necromancer.png';
  obj.speed = 210;
  obj.direction = "left";
  return obj;
}
ElfNecromancer.prototype = Object.create(Humanoid.prototype);
ElfNecromancer.prototype.constructor = Humanoid;



///////////////////////////////////////////////////////
// Instantiate all objects section
// Each level is an array beginning with 'all' e.g. levelTwo
// Place player object in a variable called player
////////////////////////////////////////////////////////

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


// Instantiate bugs lvl 1 enemies
var snail = new Snail(row2);
var scorpion = new Scorpion(row3);
var beetle = new Beetle(row4);

levelOne.push(snail);
levelOne.push(scorpion);
levelOne.push(beetle);


// Instantiate bugs lvl 1 enemies
var spider = new Spider(row2);
var roach = new Roach(row3);
var centipede = new Centipede(row4);

levelTwo.push(spider);
levelTwo.push(roach);
levelTwo.push(centipede);

// Instantiate bugs lvl 2 enemies
var hornet = new Hornet(row2);
var firefly = new Firefly(row3);
var moth = new Moth(row4);

levelThree.push(hornet);
levelThree.push(firefly);
levelThree.push(moth);

// Instantiate worgs lvl 3 enemies
var worgWarrior = new WorgWarrior(row2);
var worgMage = new WorgMage(row3);
var worgRogue = new WorgRogue(row4);

levelFour.push(worgWarrior);
levelFour.push(worgMage);
levelFour.push(worgRogue);

// Instantiate Goblins lvl 4 enemies
var gobFighter = new GobFighter(row1);
var gobWarrior = new GobWarrior(row2);
var gobMage = new GobMage(row3);
var gobSorc = new GobSorc(row4);

levelFive.push(gobFighter);
levelFive.push(gobWarrior);
levelFive.push(gobMage);
levelFive.push(gobSorc);


// Instantiate Elves lvl 5 enemies
var elfWarrior = new ElfWarrior(row1);
var elfMage = new ElfMage(row2);
var elfPriest = new ElfPriest(row3);
var elfNecromancer = new ElfNecromancer(row4);

levelSix.push(elfWarrior);
levelSix.push(elfMage);
levelSix.push(elfPriest);
levelSix.push(elfNecromancer);
