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
var speedTen = 190;
var speedEleven = 200;
var speedTwelve = 210;
var speedThirteen = 220;
var speedFourteen = 230;
var speedFifteen= 240;
var speedSixteen = 250;
var speedSeventeen = 260;
var speedEighteen = 270;
var speedNineteen = 290;

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

function Beast(y) {
  var obj = new Enemy(y);
  obj.sound = new Audio('sounds/beast.wav');
  return obj;
}

Beast.prototype = Object.create(Enemy.prototype);
Beast.prototype.constructor = Enemy;

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
// Define Centaurs level 9 mobs
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
  obj.speed = speedNine + 40;
  obj.direction = "left";
  return obj;
}
CentaurArcherRed.prototype = Object.create(Humanoid.prototype);
CentaurArcherRed.prototype.constructor = Humanoid;

function CentaurXbowBrown(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/centaur_xbow_brown.png';
  obj.speed = speedNine - 10;
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

///////////////////////////////////////////////////
// Define Ogre/Cyclops level 10 mobs
//////////////////////////////////
function OgreTwoHead(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/ogre_two.png';
  obj.speed = speedTen;
  obj.direction = "left";
  return obj;
}
OgreTwoHead.prototype = Object.create(Humanoid.prototype);
OgreTwoHead.prototype.constructor = Humanoid;

function OgreWarrior(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/ogre_warrior.png';
  obj.speed = speedTen - 20;
  obj.direction = "left";
  return obj;
}
OgreWarrior.prototype = Object.create(Humanoid.prototype);
OgreWarrior.prototype.constructor = Humanoid;

function CyclopsWarrior(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/cyclops_warrior.png';
  obj.speed = speedTen - 5;
  return obj;
}
CyclopsWarrior.prototype = Object.create(Humanoid.prototype);
CyclopsWarrior.prototype.constructor = Humanoid;

function CyclopsOfficer(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/cyclops_officer.png';
  obj.speed = speedTen + 20;
  return obj;
}
CyclopsOfficer.prototype = Object.create(Humanoid.prototype);
CyclopsOfficer.prototype.constructor = Humanoid;

///////////////////////////////////////////////////
// Define Sea Creatures level 11 mobs
//////////////////////////////////
function Octopus(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/octopus.png';
  obj.speed = speedEleven + 10;
  return obj;
}
Octopus.prototype = Object.create(Beast.prototype);
Octopus.prototype.constructor = Beast;

function Jellyfish(y, speed, direction) {
  var obj = new Beast(y);
  obj.sprite = 'img/jellyfish.png';
  obj.direction = direction;
  obj.speed = speedEleven + speed;
  return obj;
}
Jellyfish.prototype = Object.create(Beast.prototype);
Jellyfish.prototype.constructor = Beast;

function Dolphin(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/dolphin.png';
  obj.speed = speedEleven + 50;
  obj.direction = "left";
  return obj;
}
Dolphin.prototype = Object.create(Beast.prototype);
Dolphin.prototype.constructor = Beast;

///////////////////////////////////////////////////
// Define Naga level 12 mobs
//////////////////////////////////
function NagaWarrior(y, speed, direction, image) {
  var obj = new Humanoid(y);
  obj.sprite = image;
  obj.speed = speedTwelve + speed;
  obj.direction = direction;
  return obj;
}
NagaWarrior.prototype = Object.create(Humanoid.prototype);
NagaWarrior.prototype.constructor = Humanoid;

function NagaRogue(y, speed, direction, image) {
  var obj = new Humanoid(y);
  obj.sprite = image;
  obj.speed = speedTwelve + speed;
  obj.direction = direction;
  return obj;
}
NagaRogue.prototype = Object.create(Humanoid.prototype);
NagaRogue.prototype.constructor = Humanoid;

function NagaMage(y, speed, direction, image) {
  var obj = new Humanoid(y);
  obj.sprite = image;
  obj.speed = speedTwelve + speed;
  obj.direction = direction;
  return obj;
}
NagaMage.prototype = Object.create(Humanoid.prototype);
NagaMage.prototype.constructor = Humanoid;

function NagaFighter(y, speed, direction, image) {
  var obj = new Humanoid(y);
  obj.sprite = image;
  obj.speed = speedTwelve + speed;
  obj.direction = direction;
  return obj;
}
NagaFighter.prototype = Object.create(Humanoid.prototype);
NagaFighter.prototype.constructor = Humanoid;

///////////////////////////////////////////////////
// Define Naga level 13 mobs
//////////////////////////////////

function NagaSiren(y, speed, direction, image) {
  var obj = new Humanoid(y);
  obj.sprite = image;
  obj.speed = speedTwelve + speed;
  obj.direction = direction;
  return obj;
}
NagaSiren.prototype = Object.create(Humanoid.prototype);
NagaSiren.prototype.constructor = Humanoid;

function NagaSoothsayer(y, speed, direction, image) {
  var obj = new Humanoid(y);
  obj.sprite = image;
  obj.speed = speedTwelve + speed;
  obj.direction = direction;
  return obj;
}
NagaSoothsayer.prototype = Object.create(Humanoid.prototype);
NagaSoothsayer.prototype.constructor = Humanoid;

///////////////////////////////////////////////////
// Define Deep Sea Creatures level 14 mobs
//////////////////////////////////

function Anemone(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/anemone.png';
  obj.speed = speedFourteen;
  obj.direction = "left";
  return obj;
}
Anemone.prototype = Object.create(Beast.prototype);
Anemone.prototype.constructor = Beast;

function Eel(y, speed, direction, image) {
  var obj = new Beast(y);
  obj.sprite = image;
  obj.speed = speedFourteen + speed;
  obj.direction = direction;
  return obj;
}
Eel.prototype = Object.create(Beast.prototype);
Eel.prototype.constructor = Beast;

function Turtle(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/turtle.png';
  obj.speed = speedFourteen - 100;
  obj.direction = "left";
  return obj;
}
Turtle.prototype = Object.create(Beast.prototype);
Turtle.prototype.constructor = Beast;

function SpikedTurtle(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/spiked_turtle.png';
  obj.speed = speedFourteen - 120;
  return obj;
}
SpikedTurtle.prototype = Object.create(Beast.prototype);
SpikedTurtle.prototype.constructor = Beast;

///////////////////////////////////////////////////
// Define Beach Beastss level 15 mobs
//////////////////////////////////

function Crocodile(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/crocodile.png';
  obj.speed = speedFifteen + 20;
  return obj;
}
Crocodile.prototype = Object.create(Beast.prototype);
Crocodile.prototype.constructor = Beast;

function Gecko(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/gecko.png';
  obj.speed = speedFifteen - 30;
  obj.direction = "left";
  return obj;
}
Gecko.prototype = Object.create(Beast.prototype);
Gecko.prototype.constructor = Beast;

function Lizard(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/lizard.png';
  obj.speed = speedFifteen - 20;
  return obj;
}
Lizard.prototype = Object.create(Beast.prototype);
Lizard.prototype.constructor = Beast;


function StripedSnake(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/snake_white_stripe.png';
  obj.speed = speedFifteen;
  obj.direction = "left";
  return obj;
}
StripedSnake.prototype = Object.create(Beast.prototype);
StripedSnake.prototype.constructor = Beast;

function GiantSerpent(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/giant_serpent.png';
  obj.speed = speedFifteen + 40;
  return obj;
}
GiantSerpent.prototype = Object.create(Beast.prototype);
GiantSerpent.prototype.constructor = Beast;


///////////////////////////////////////////////////////
// Instantiate all objects
//////////////////////////
// rows for setting positioning entities
// row 1 = bottom || row 4 = top
var row1 = 576;
var row2 = 448;
var row3 = 320;
var row4 = 192;
var row5 = 64;


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
var levelTen = [];
var levelEleven = [];
var levelTwelve = [];
var levelThirteen = [];
var levelFourteen = [];
var levelFifteen = [];
var levelSixteen = [];
var levelSeventeen = [];
var levelEighteen = [];
var levelNineteen = [];
var levelTwenty = [];


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

// Instantiate Cyclops lvl 10 enemies
var ogreTwoHead = new OgreTwoHead(row1);
var ogreWarrior = new OgreWarrior(row2);
var cyclopsWarrior = new CyclopsWarrior(row3);
var cyclopsOfficer = new CyclopsOfficer(row4);

levelTen.push(ogreTwoHead);
levelTen.push(ogreWarrior);
levelTen.push(cyclopsWarrior);
levelTen.push(cyclopsOfficer);

/////////////////////////////////////////
// Instantiate Sea Beasts lvl 11 enemies

var octopus = new Octopus(row1);
var jellyfish1 = new Jellyfish(row2, -20, "left");
var jellyfish2 = new Jellyfish(row2, 30, "right");
var jellyfish3 = new Jellyfish(row3, 40, "left");
var jellyfish4 = new Jellyfish(row3, 1, "right");
var dolphin = new Dolphin(row4);

levelEleven.push(octopus);
levelEleven.push(jellyfish1);
levelEleven.push(jellyfish2);
levelEleven.push(jellyfish3);
levelEleven.push(jellyfish4);
levelEleven.push(dolphin);

/////////////////////////////////////////
// Instantiate Naga lvl 12 enemies

var nagaWarriorLeft = new NagaWarrior(row1, -10, "left", "img/naga_warrior_left.png");
var nagaWarriorRight = new NagaWarrior(row1, 10, "right", "img/naga_warrior_right.png");
var nagaRogueLeft = new NagaRogue(row2, 20, "left", "img/naga_rogue_left.png");
var nagaRogueRight = new NagaRogue(row3, 30, "right", "img/naga_rogue_right.png");
var nagaMageLeft = new NagaMage(row3, 0, "left", "img/naga_mage_left.png");
var nagaMageRight = new NagaMage(row2, -5, "right", "img/naga_mage_right.png");
var nagaFighterLeft = new NagaFighter(row4, 20, "left", "img/naga_fighter_left.png");
var nagaFighterRight = new NagaFighter(row4, -10, "right", "img/naga_fighter_right.png");

levelTwelve.push(nagaWarriorLeft);
levelTwelve.push(nagaWarriorRight);
levelTwelve.push(nagaRogueLeft);
levelTwelve.push(nagaRogueRight);
levelTwelve.push(nagaMageLeft);
levelTwelve.push(nagaMageRight);
levelTwelve.push(nagaFighterLeft);
levelTwelve.push(nagaFighterRight);

/////////////////////////////////////////
// Instantiate Naga lvl 13 enemies

var nagaSoothsayerRight1 = new NagaSoothsayer(row1, 10, "right", "img/naga_soothsayer_right.png");
var nagaSoothsayerLeft1 = new NagaSoothsayer(row2, -20, "left", "img/naga_soothsayer_left.png");
var nagaSirenRight1 = new NagaSiren(row2, -5, "right", "img/naga_siren_right.png");
var nagaSirenLeft1 = new NagaSiren(row3, 0, "left", "img/naga_siren_left.png");
var nagaSoothsayerRight3 = new NagaSoothsayer(row3, 30, "right", "img/naga_soothsayer_right.png");
var nagaSirenLeft2 = new NagaSiren(row4, 8, "left", "img/naga_siren_left.png");

levelThirteen.push(nagaSoothsayerRight1);
levelThirteen.push(nagaSoothsayerLeft1);
levelThirteen.push(nagaSirenRight1);
levelThirteen.push(nagaSirenLeft1);
levelThirteen.push(nagaSoothsayerRight3);
levelThirteen.push(nagaSirenLeft2);

/////////////////////////////////////////
// Instantiate Water Beasts lvl 14 enemies

var anemone = new Anemone(row1);
var turtle = new Turtle(row4);
var spikedTurtle = new SpikedTurtle(row4);
var eel1 = new Eel(row2, 10, "left", "img/eel_left.png");
var eel2 = new Eel(row2, 0, "right", "img/eel_right.png");
var eel3 = new Eel(row2, 30, "right", "img/eel_right.png");
var eel4 = new Eel(row3, -10, "left", "img/eel_left.png");
var eel5 = new Eel(row3, 40, "left", "img/eel_left.png");
var eel6 = new Eel(row3, 20, "right", "img/eel_right.png");

levelFourteen.push(anemone);
levelFourteen.push(turtle);
levelFourteen.push(spikedTurtle);
levelFourteen.push(eel1);
levelFourteen.push(eel2);
levelFourteen.push(eel3);
levelFourteen.push(eel4);
levelFourteen.push(eel5);
levelFourteen.push(eel6);

/////////////////////////////////////////
// Instantiate Land Beasts lvl 15 enemies

var crocodile = new Crocodile(row1);
var stripedSnake = new StripedSnake(row2);
var lizard = new Lizard(row3);
var gecko = new Gecko(row4);
var giantSerpent = new GiantSerpent(row5);


levelFifteen.push(crocodile);
levelFifteen.push(stripedSnake);
levelFifteen.push(lizard);
levelFifteen.push(gecko);
levelFifteen.push(giantSerpent);
