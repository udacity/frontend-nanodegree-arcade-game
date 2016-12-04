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
var speedSeventeen = 100;
var speedEighteen = 270;
var speedNineteen = 290;
var speedTwenty = 300;
var speedTwentyOne = 310;
var speedTwentyTwo = 320;
var speedTwentyThree = 330;
var speedTwentyFour = 340;
var speedTwentyFive = 350;

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
Humanoid.prototype = Object.create(Enemy.prototype);
Humanoid.prototype.constructor = Enemy;

function Beast(y) {
  var obj = new Enemy(y);
  obj.sound = new Audio('sounds/beast.wav');
  return obj;
}
Beast.prototype = Object.create(Enemy.prototype);
Beast.prototype.constructor = Enemy;

function Undead(y) {
  var obj = new Enemy(y);
  obj.sound = new Audio('sounds/undead.wav');
  return obj;
}
Undead.prototype = Object.create(Enemy.prototype);
Undead.prototype.constructor = Enemy;

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

function OgreWitch(y) {
  var obj = new Humanoid(y);
  obj.sprite = 'img/ogre_witch.png';
  obj.speed = speedTen - 20;
  obj.direction = "left";
  return obj;
}
OgreWitch.prototype = Object.create(Humanoid.prototype);
OgreWitch.prototype.constructor = Humanoid;

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
  obj.speed = speedThirteen + speed;
  obj.direction = direction;
  return obj;
}
NagaSiren.prototype = Object.create(Humanoid.prototype);
NagaSiren.prototype.constructor = Humanoid;

function NagaSoothsayer(y, speed, direction, image) {
  var obj = new Humanoid(y);
  obj.sprite = image;
  obj.speed = speedThirteen + speed;
  obj.direction = direction;
  return obj;
}
NagaSoothsayer.prototype = Object.create(Humanoid.prototype);
NagaSoothsayer.prototype.constructor = Humanoid;

function Squidman(y, speed, direction, image) {
var obj = new Humanoid(y);
obj.sprite = image;
obj.speed = speedThirteen + speed;
obj.direction = direction;
return obj;
}
Squidman.prototype = Object.create(Humanoid.prototype);
Squidman.prototype.constructor = Humanoid;
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
// Define Beach Beasts level 15 mobs
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

///////////////////////////////////////////////////
// Define Trolls level 16 mobs
//////////////////////////////////

function TrollBlue(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/troll_blue.png';
  obj.speed = speedSixteen - 150;
  obj.direction = "left";
  return obj;
}
TrollBlue.prototype = Object.create(Beast.prototype);
TrollBlue.prototype.constructor = Beast;

function TrollGrey(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/troll_grey.png';
  obj.speed = speedSixteen + 30;
  obj.direction = "left";
  return obj;
}
TrollGrey.prototype = Object.create(Beast.prototype);
TrollGrey.prototype.constructor = Beast;

function TrollGreen(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/troll_green.png';
  obj.speed = speedSixteen - 40;
  obj.direction = "left";
  return obj;
}
TrollGreen.prototype = Object.create(Beast.prototype);
TrollGreen.prototype.constructor = Beast;

function TrollRed(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/troll_red.png';
  obj.speed = speedSixteen - 30;
  return obj;
}
TrollRed.prototype = Object.create(Beast.prototype);
TrollRed.prototype.constructor = Beast;

function TrollBlack(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/troll_black.png';
  obj.speed = speedSixteen + 40;
  return obj;
}
TrollBlack.prototype = Object.create(Beast.prototype);
TrollBlack.prototype.constructor = Beast;

function TrollWhite(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/troll_white.png';
  obj.speed = speedSixteen - 80;
  return obj;
}
TrollWhite.prototype = Object.create(Beast.prototype);
TrollWhite.prototype.constructor = Beast;

///////////////////////////////////////////////////
// Define Imps level 17 mobs
//////////////////////////////////

function ImpPurple(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/imp_purple.png';
  obj.speed = speedSeventeen;
  return obj;
}
ImpPurple.prototype = Object.create(Beast.prototype);
ImpPurple.prototype.constructor = Beast;

function ImpRed(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/imp_red.png';
  obj.speed = speedSeventeen + 8;
  obj.direction = "left";
  return obj;
}
ImpRed.prototype = Object.create(Beast.prototype);
ImpRed.prototype.constructor = Beast;

function ImpEnchanted(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/imp_enchanted.png';
  obj.speed = speedSeventeen + 80;
  obj.direction = "left";
  return obj;
}
ImpEnchanted.prototype = Object.create(Beast.prototype);
ImpEnchanted.prototype.constructor = Beast;

function ImpBlack(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/imp_black.png';
  obj.speed = speedSeventeen + 20;
  return obj;
}
ImpBlack.prototype = Object.create(Beast.prototype);
ImpBlack.prototype.constructor = Beast;

function ImpMaster(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/imp_master.png';
  obj.speed = speedSeventeen + 140;
  return obj;
}
ImpMaster.prototype = Object.create(Beast.prototype);
ImpMaster.prototype.constructor = Beast;

///////////////////////////////////////////////////
// Define Elementals level 18 mobs
//////////////////////////////////

function ElementalFire(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/elemental_fire.png';
  obj.speed = speedEighteen + 20;
  return obj;
}
ElementalFire.prototype = Object.create(Beast.prototype);
ElementalFire.prototype.constructor = Beast;

function ElementalSteel(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/elemental_steel.png';
  obj.speed = speedEighteen + 40;
  obj.direction = "left";
  return obj;
}
ElementalSteel.prototype = Object.create(Beast.prototype);
ElementalSteel.prototype.constructor = Beast;

function ElementalFlesh(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/elemental_flesh.png';
  obj.speed = speedEighteen - 60;
  return obj;
}
ElementalFlesh.prototype = Object.create(Beast.prototype);
ElementalFlesh.prototype.constructor = Beast;

function ElementalIce(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/elemental_ice.png';
  obj.speed = speedEighteen;
  obj.direction = "left";
  return obj;
}
ElementalIce.prototype = Object.create(Beast.prototype);
ElementalIce.prototype.constructor = Beast;

function ElementalRock(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/elemental_rock.png';
  obj.speed = speedEighteen - 10;
  return obj;
}
ElementalRock.prototype = Object.create(Beast.prototype);
ElementalRock.prototype.constructor = Beast;

function ElementalLightning(y) {
  var obj = new Beast(y);
  obj.sprite = 'img/elemental_lightning.png';
  obj.speed = speedEighteen + 70;
  obj.direction = "left";
  return obj;
}
ElementalLightning.prototype = Object.create(Beast.prototype);
ElementalLightning.prototype.constructor = Beast;

///////////////////////////////////////////////////
// Define Abominations level 19 mobs
//////////////////////////////////

function AbominationRed(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/abomination_red.png';
  obj.speed = speedNineteen + 10;
  obj.direction = "left";
  return obj;
}
AbominationRed.prototype = Object.create(Undead.prototype);
AbominationRed.prototype.constructor = Undead;

function AbominationGreen(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/abomination_green.png';
  obj.speed = speedNineteen - 30;
  return obj;
}
AbominationGreen.prototype = Object.create(Undead.prototype);
AbominationGreen.prototype.constructor = Undead;

function AbominationYellow(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/abomination_yellow.png';
  obj.speed = speedNineteen - 40;
  obj.direction = "left";
  return obj;
}
AbominationYellow.prototype = Object.create(Undead.prototype);
AbominationYellow.prototype.constructor = Undead;

function AbominationPink(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/abomination_pink.png';
  obj.speed = speedNineteen + 30;
  return obj;
}
AbominationPink.prototype = Object.create(Undead.prototype);
AbominationPink.prototype.constructor = Undead;

function AbominationOrange(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/abomination_orange.png';
  obj.speed = speedNineteen - 50;
  return obj;
}
AbominationOrange.prototype = Object.create(Undead.prototype);
AbominationOrange.prototype.constructor = Undead;

function AbominationBrown(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/abomination_brown.png';
  obj.speed = speedNineteen + 14;
  obj.direction = "left";
  return obj;
}
AbominationBrown.prototype = Object.create(Undead.prototype);
AbominationBrown.prototype.constructor = Undead;

///////////////////////////////////////////////////
// Define Skeletons level 20 mobs
//////////////////////////////////
function SkeletonDancing(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_dancing.png';
  obj.speed = speedTwenty - 20;
  return obj;
}
SkeletonDancing.prototype = Object.create(Undead.prototype);
SkeletonDancing.prototype.constructor = Undead;

function SkeletonCentaur(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_centaur.png';
  obj.speed = speedTwenty + 20;
  obj.direction = "left";
  return obj;
}
SkeletonCentaur.prototype = Object.create(Undead.prototype);
SkeletonCentaur.prototype.constructor = Undead;

function SkeletonSoldier(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_soldier.png';
  obj.speed = speedTwenty + 25;
  return obj;
}
SkeletonSoldier.prototype = Object.create(Undead.prototype);
SkeletonSoldier.prototype.constructor = Undead;

function SkeletonBear(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_bear.png';
  obj.speed = speedTwenty - 15;
  obj.direction = "left";
  return obj;
}
SkeletonBear.prototype = Object.create(Undead.prototype);
SkeletonBear.prototype.constructor = Undead;

function SkeletonPriest(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_priest.png';
  obj.speed = speedTwenty - 40;
  return obj;
}
SkeletonPriest.prototype = Object.create(Undead.prototype);
SkeletonPriest.prototype.constructor = Undead;

function SkeletonSnake(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_snake.png';
  obj.speed = speedTwenty - 10;
  obj.direction = "left";
  return obj;
}
SkeletonSnake.prototype = Object.create(Undead.prototype);
SkeletonSnake.prototype.constructor = Undead;

function SkeletonBird(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_bird.png';
  obj.speed = speedTwenty + 24;
  return obj;
}
SkeletonBird.prototype = Object.create(Undead.prototype);
SkeletonBird.prototype.constructor = Undead;

function SkeletonHound(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_hound.png';
  obj.speed = speedTwenty - 18;
  obj.direction = "left";
  return obj;
}
SkeletonHound.prototype = Object.create(Undead.prototype);
SkeletonHound.prototype.constructor = Undead;

function SkeletonHydra(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_hydra.png';
  obj.speed = speedTwenty + 40;
  return obj;
}
SkeletonHydra.prototype = Object.create(Undead.prototype);
SkeletonHydra.prototype.constructor = Undead;

function SkeletonDragon(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_dragon.png';
  obj.speed = speedTwenty + 60;
  obj.direction = "left";
  return obj;
}
SkeletonDragon.prototype = Object.create(Undead.prototype);
SkeletonDragon.prototype.constructor = Undead;


///////////////////////////////////////////////////////
// Instantiate all objects
//////////////////////////
// rows for setting positioning entities

// rows (y-value) row1 = starting row || row6 = next level row
var row1 = 704;
var row2 = 576;
var row3 = 448;
var row4 = 320;
var row5 = 192;
var row6 = 64;


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
var levelTwentyOne = [];
var levelTwentyTwo = [];
var levelTwentyThree = [];
var levelTwentyFour = [];
var levelTwentyFive = [];


// Instantiate bugs lvl 1 enemies
var snail = new Snail(row3);
var scorpion = new Scorpion(row4);
var beetle = new Beetle(row5);

levelOne.push(snail);
levelOne.push(scorpion);
levelOne.push(beetle);


// Instantiate bugs lvl 2 enemies
var spider = new Spider(row3);
var roach = new Roach(row4);
var centipede = new Centipede(row5);

levelTwo.push(spider);
levelTwo.push(roach);
levelTwo.push(centipede);

// Instantiate bugs lvl 3 enemies
var antWorker = new AntWorker(row3);
var antSoldier = new AntSoldier(row4);
var mosquito = new Mosquito(row5);

levelThree.push(antWorker);
levelThree.push(antSoldier);
levelThree.push(mosquito);

// Instantiate bugs lvl 4 enemies
var larvaGrey = new LarvaGrey(row3);
var larvaOrange = new LarvaOrange(row4);
var brainBug = new BrainBug(row5);

levelFour.push(larvaGrey);
levelFour.push(larvaOrange);
levelFour.push(brainBug);


// Instantiate bugs lvl 5 enemies
var hornet = new Hornet(row3);
var firefly = new Firefly(row4);
var moth = new Moth(row5);

levelFive.push(hornet);
levelFive.push(firefly);
levelFive.push(moth);


// Instantiate worgs lvl 6 enemies
var worgWarrior = new WorgWarrior(row3);
var worgMage = new WorgMage(row4);
var worgRogue = new WorgRogue(row5);

levelSix.push(worgWarrior);
levelSix.push(worgMage);
levelSix.push(worgRogue);

// Instantiate Goblins lvl 7 enemies
var gobFighter = new GobFighter(row2);
var gobWarrior = new GobWarrior(row3);
var gobMage = new GobMage(row4);
var gobSorc = new GobSorc(row5);

levelSeven.push(gobFighter);
levelSeven.push(gobWarrior);
levelSeven.push(gobMage);
levelSeven.push(gobSorc);


// Instantiate Elves lvl 8 enemies
var elfWarrior = new ElfWarrior(row2);
var elfMage = new ElfMage(row3);
var elfPriest = new ElfPriest(row4);
var elfNecromancer = new ElfNecromancer(row5);

levelEight.push(elfWarrior);
levelEight.push(elfMage);
levelEight.push(elfPriest);
levelEight.push(elfNecromancer);

// Instantiate Centaurs lvl 9 enemies
var centaurArcherOrange = new CentaurArcherOrange(row2);
var centaurArcherRed = new CentaurArcherRed(row3);
var centaurXbowBrown = new CentaurXbowBrown(row4);
var centaurXbowGrey = new CentaurXbowGrey(row5);

levelNine.push(centaurArcherOrange);
levelNine.push(centaurArcherRed);
levelNine.push(centaurXbowBrown);
levelNine.push(centaurXbowGrey);

// Instantiate Cyclops lvl 10 enemies
var ogreTwoHead = new OgreTwoHead(row2);
var ogreWitch = new OgreWitch(row3);
var cyclopsWarrior = new CyclopsWarrior(row4);
var cyclopsOfficer = new CyclopsOfficer(row5);

levelTen.push(ogreTwoHead);
levelTen.push(ogreWitch);
levelTen.push(cyclopsWarrior);
levelTen.push(cyclopsOfficer);

/////////////////////////////////////////
// Instantiate Sea Beasts lvl 11 enemies

var octopus = new Octopus(row2);
var jellyfish1 = new Jellyfish(row3, -20, "left");
var jellyfish2 = new Jellyfish(row3, 30, "right");
var jellyfish3 = new Jellyfish(row4, 40, "left");
var jellyfish4 = new Jellyfish(row4, 1, "right");
var dolphin = new Dolphin(row5);

levelEleven.push(octopus);
levelEleven.push(jellyfish1);
levelEleven.push(jellyfish2);
levelEleven.push(jellyfish3);
levelEleven.push(jellyfish4);
levelEleven.push(dolphin);

/////////////////////////////////////////
// Instantiate Naga lvl 12 enemies

var nagaWarriorLeft = new NagaWarrior(row2, -10, "left", "img/naga_warrior_left.png");
var nagaWarriorRight = new NagaWarrior(row2, 10, "right", "img/naga_warrior_right.png");
var nagaRogueLeft = new NagaRogue(row3, 20, "left", "img/naga_rogue_left.png");
var nagaRogueRight = new NagaRogue(row4, 30, "right", "img/naga_rogue_right.png");
var nagaMageLeft = new NagaMage(row4, 0, "left", "img/naga_mage_left.png");
var nagaMageRight = new NagaMage(row3, -5, "right", "img/naga_mage_right.png");
var nagaFighterLeft = new NagaFighter(row5, 20, "left", "img/naga_fighter_left.png");
var nagaFighterRight = new NagaFighter(row5, -10, "right", "img/naga_fighter_right.png");

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

var squidmanLeft = new Squidman(row2, 10, "left", "img/squidman_left.png");
var nagaSoothsayerLeft1 = new NagaSoothsayer(row3, -20, "left", "img/naga_soothsayer_left.png");
var nagaSirenRight1 = new NagaSiren(row3, -5, "right", "img/naga_siren_right.png");
var nagaSirenLeft1 = new NagaSiren(row4, 0, "left", "img/naga_siren_left.png");
var nagaSoothsayerRight1 = new NagaSoothsayer(row4, -20, "right", "img/naga_soothsayer_right.png");
var squidmanRight = new Squidman(row5, 30, "right", "img/squidman_right.png");

levelThirteen.push(nagaSoothsayerRight1);
levelThirteen.push(nagaSoothsayerLeft1);
levelThirteen.push(nagaSirenRight1);
levelThirteen.push(nagaSirenLeft1);
levelThirteen.push(nagaSoothsayerRight1);
levelThirteen.push(squidmanLeft);
levelThirteen.push(squidmanRight);

/////////////////////////////////////////
// Instantiate Water Beasts lvl 14 enemies

var anemone = new Anemone(row2);
var turtle = new Turtle(row5);
var spikedTurtle = new SpikedTurtle(row5);
var eel1 = new Eel(row3, 10, "left", "img/eel_left.png");
var eel2 = new Eel(row3, 0, "right", "img/eel_right.png");
var eel3 = new Eel(row3, 30, "right", "img/eel_right.png");
var eel4 = new Eel(row4, -10, "left", "img/eel_left.png");
var eel5 = new Eel(row4, 40, "left", "img/eel_left.png");
var eel6 = new Eel(row4, 20, "right", "img/eel_right.png");

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

var crocodile = new Crocodile(row2);
var stripedSnake = new StripedSnake(row3);
var lizard = new Lizard(row4);
var gecko = new Gecko(row5);
var giantSerpent = new GiantSerpent(row6);


levelFifteen.push(crocodile);
levelFifteen.push(stripedSnake);
levelFifteen.push(lizard);
levelFifteen.push(gecko);
levelFifteen.push(giantSerpent);

/////////////////////////////////////////
// Instantiate Land Beasts lvl 16 enemies

var trollBlue = new TrollBlue(row2);
var trollGrey = new TrollGrey(row3);
var trollGreen = new TrollGreen(row4);
var trollRed = new TrollRed(row3);
var trollBlack = new TrollBlack(row4);
var trollWhite = new TrollWhite(row5);

levelSixteen.push(trollBlue);
levelSixteen.push(trollGrey);
levelSixteen.push(trollGreen);
levelSixteen.push(trollRed);
levelSixteen.push(trollBlack);
levelSixteen.push(trollWhite);

/////////////////////////////////////////
// Instantiate Imps lvl 17 enemies

var impPurple = new ImpPurple(row3);
var impRed = new ImpRed(row3);
var impEnchanted = new ImpEnchanted(row4);
var impBlack = new ImpBlack(row4);
var impMaster = new ImpMaster(row6);

levelSeventeen.push(impPurple);
levelSeventeen.push(impRed);
levelSeventeen.push(impEnchanted);
levelSeventeen.push(impBlack);
levelSeventeen.push(impMaster);

/////////////////////////////////////////
// Instantiate Elementals lvl 18 enemies

var elementalSteel = new ElementalSteel(row2);
var elementalFlesh = new ElementalFlesh(row3);
var elementalLightning = new ElementalLightning(row3);
var elementalIce = new ElementalIce(row4);
var elementalRock = new ElementalRock(row4);
var elementalFire = new ElementalFire(row5);


levelEighteen.push(elementalSteel);
levelEighteen.push(elementalFlesh);
levelEighteen.push(elementalLightning);
levelEighteen.push(elementalIce);
levelEighteen.push(elementalRock);
levelEighteen.push(elementalFire);

/////////////////////////////////////////
// Instantiate lvl 19 enemies (Abominations)

var abominationRed = new AbominationRed(row2);
var abominationGreen = new AbominationGreen(row2);
var abominationOrange = new AbominationOrange(row3);
var abominationBrown = new AbominationBrown(row4);
var abominationPink = new AbominationPink(row5);
var abominationYellow = new AbominationYellow(row5);

levelNineteen.push(abominationRed);
levelNineteen.push(abominationGreen);
levelNineteen.push(abominationOrange);
levelNineteen.push(abominationBrown);
levelNineteen.push(abominationPink);
levelNineteen.push(abominationYellow);

/////////////////////////////////////////
// Instantiate lvl 19 enemies (Skeletons)

var skeletonDancing = new SkeletonDancing(row2);
var skeletonCentaur = new SkeletonCentaur(row2);
var skeletonSoldier = new SkeletonSoldier(row3);
var skeletonBear = new SkeletonBear(row3);
var skeletonBird = new SkeletonBird(row4);
var skeletonHound = new SkeletonHound(row4);
var skeletonHydra = new SkeletonHydra(row5);
var skeletonDragon = new SkeletonDragon(row5);

levelTwenty.push(skeletonDancing);
levelTwenty.push(skeletonCentaur);
levelTwenty.push(skeletonSoldier);
levelTwenty.push(skeletonBear);
levelTwenty.push(skeletonBird);
levelTwenty.push(skeletonHound);
levelTwenty.push(skeletonHydra);
levelTwenty.push(skeletonDragon);
