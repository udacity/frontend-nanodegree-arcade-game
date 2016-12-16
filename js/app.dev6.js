/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /* This is the publicly accessible image loading function. It accepts
     * an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     */
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            _load(urlOrArr);
        }
    }

    /* This is our private image loader function, it is
     * called by the public image loader function.
     */
    function _load(url) {
        if(resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
            return resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            var img = new Image();
            img.onload = function() {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the image's src attribute to the passed in URL.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* This is used by developers to grab references to images they know
     * have been previously loaded. If an image is cached, this functions
     * the same as calling load() on that URL.
     */
    function get(url) {
        return resourceCache[url];
    }

    /* This function determines if all of the images that have been requested
     * for loading have in fact been properly loaded.
     */
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* This object defines the publicly accessible functions available to
     * developers by creating a global Resources object.
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();

// sounds.js preloads all critical sound files to prevent
// sound delays. For more info check out this stack overflow site:
/*
 * http://stackoverflow.com/questions/31060642/preload-multiple-audio-files
 */
var audioFiles = [
    "sounds/class_switch.wav",
    "sounds/cloth.wav",
    "sounds/chainmail.wav",
    "sounds/bubbles.wav",
    "sounds/bite.wav",
    "sounds/beast.wav",
    "sounds/ogre.wav",
    "sounds/undead.wav",
    "sounds/magic.wav",
    "sounds/extra_life.wav",
    "sounds/game_over.wav"
];

function preloadAudio(url) {
    var audio = new Audio();
    // once this file loads, it will call loadedAudio()
    // the file will be kept by the browser as cache
    audio.addEventListener('canplaythrough', loadedAudio, false);
    audio.src = url;
}

var loaded = 0;
function loadedAudio() {
    // this will be called every time an audio file is loaded
    // we keep track of the loaded files vs the requested files
    loaded++;
    if (loaded == audioFiles.length){
    	// all have loaded
    	init();
    }
}

var audioPlayer = document.getElementById('player');
function play(index) {
    audioPlayer.src = audioFiles[index];
    audioPlayer.play();
}

function init() {
    // do your stuff here, audio has been loaded
    // for example, play all files one after the other
    var i = 0;
    // once the player ends, play the next one
    audioPlayer.onended = function() {
    	i++;
        if (i >= audioFiles.length) {
            // end
            return;
        }
    	play(i);
    };
    // play the first file
    play(i);
}

// we start preloading all the audio files
for (var i in audioFiles) {
    preloadAudio(audioFiles[i]);
}

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
var speedTwenty = 280;
var speedTwentyOne = 175;
var speedTwentyTwo = 320;
var speedTwentyThree = 120;
var speedTwentyFour = 300;
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

function Dragonkin(y) {
  var obj = new Enemy(y);
  obj.sound = new Audio('sounds/magic.wav');
  return obj;
}
Dragonkin.prototype = Object.create(Enemy.prototype);
Dragonkin.prototype.constructor = Enemy;

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
  obj.speed = speedSeventeen - 70;
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
function SkeletonKing(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_king.png';
  obj.speed = speedTwenty + 20;
  return obj;
}
SkeletonKing.prototype = Object.create(Undead.prototype);
SkeletonKing.prototype.constructor = Undead;

function SkeletonDancing(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_dancing.png';
  obj.speed = speedTwenty - 20;
  obj.direction = "left";
  return obj;
}
SkeletonDancing.prototype = Object.create(Undead.prototype);
SkeletonDancing.prototype.constructor = Undead;

function SkeletonSoldier(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_soldier.png';
  obj.speed = speedTwenty + 25;
  return obj;
}
SkeletonSoldier.prototype = Object.create(Undead.prototype);
SkeletonSoldier.prototype.constructor = Undead;

function SkeletonCentaur(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_centaur.png';
  obj.speed = speedTwenty - 15;
  obj.direction = "left";
  return obj;
}
SkeletonCentaur.prototype = Object.create(Undead.prototype);
SkeletonCentaur.prototype.constructor = Undead;

function SkeletonPriest(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/skeleton_priest.png';
  obj.speed = speedTwenty - 40;
  obj.direction = "left";
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

///////////////////////////////////////////////////
// Define Ghosts level 21 mobs
//////////////////////////////////

function SpiritTransparent(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/spirit_transparent.png';
  obj.speed = speedTwentyOne - 150;
  return obj;
}
SpiritTransparent.prototype = Object.create(Undead.prototype);
SpiritTransparent.prototype.constructor = Undead;

function SpiritBlue(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/spirit_blue.png';
  obj.speed = speedTwentyOne - 30;
  obj.direction = "left";
  return obj;
}
SpiritBlue.prototype = Object.create(Undead.prototype);
SpiritBlue.prototype.constructor = Undead;

function SpiritRed(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/spirit_red.png';
  obj.speed = speedTwentyOne - 50;
  return obj;
}
SpiritRed.prototype = Object.create(Undead.prototype);
SpiritRed.prototype.constructor = Undead;

function Ghast(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/ghast.png';
  obj.speed = speedTwentyOne + 30;
  obj.direction = "left";
  return obj;
}
Ghast.prototype = Object.create(Undead.prototype);
Ghast.prototype.constructor = Undead;

function Ghost(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/ghost.png';
  obj.speed = speedTwentyOne - 10;
  return obj;
}
Ghost.prototype = Object.create(Undead.prototype);
Ghost.prototype.constructor = Undead;

function BansheeOctopus(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/banshee_octopus.png';
  obj.speed = speedTwentyOne;
  obj.direction = "left";
  return obj;
}
BansheeOctopus.prototype = Object.create(Undead.prototype);
BansheeOctopus.prototype.constructor = Undead;

function BansheeGreen(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/banshee_green.png';
  obj.speed = speedTwentyOne - 20;
  return obj;
}
BansheeGreen.prototype = Object.create(Undead.prototype);
BansheeGreen.prototype.constructor = Undead;

function BansheeBlue(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/banshee_blue.png';
  obj.speed = speedTwentyOne + 20;
  obj.direction = "left";
  return obj;
}
BansheeBlue.prototype = Object.create(Undead.prototype);
BansheeBlue.prototype.constructor = Undead;

function Banshee(y) {
  var obj = new Undead(y);
  obj.sprite = 'img/banshee.png';
  obj.speed = speedTwentyOne + 30;
  return obj;
}
Banshee.prototype = Object.create(Undead.prototype);
Banshee.prototype.constructor = Undead;

///////////////////////////////////////////////////
// Define Gargoyles level 22 mobs
//////////////////////////////////

function GargoyleWhite(y, speed, direction) {
  var obj = new Undead(y);
  obj.sprite = 'img/gargoyle_white.png';
  obj.speed = speedTwentyTwo + speed;
  obj.direction = direction;
  return obj;
}
GargoyleWhite.prototype = Object.create(Undead.prototype);
GargoyleWhite.prototype.constructor = Undead;

function GargoyleRed(y, speed, direction) {
  var obj = new Undead(y);
  obj.sprite = 'img/gargoyle_red.png';
  obj.speed = speedTwentyTwo + speed;
  obj.direction = direction;
  return obj;
}
GargoyleRed.prototype = Object.create(Undead.prototype);
GargoyleRed.prototype.constructor = Undead;

function GargoyleBlack(y, speed, direction) {
  var obj = new Undead(y);
  obj.sprite = 'img/gargoyle_black.png';
  obj.speed = speedTwentyTwo + speed;
  obj.direction = direction;
  return obj;
}
GargoyleBlack.prototype = Object.create(Undead.prototype);
GargoyleBlack.prototype.constructor = Undead;

function GargoyleIce(y, speed, direction) {
  var obj = new Undead(y);
  obj.sprite = 'img/gargoyle_ice.png';
  obj.speed = speedTwentyTwo + speed;
  obj.direction = direction;
  return obj;
}
GargoyleIce.prototype = Object.create(Undead.prototype);
GargoyleIce.prototype.constructor = Undead;

///////////////////////////////////////////////////
// Define Dragonkin level 23 mobs
//////////////////////////////////

function DragonkinWhite(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragonkin_white.png';
  obj.speed = speedTwentyThree - 20;
  obj.direction = "left";
  return obj;
}
DragonkinWhite.prototype = Object.create(Dragonkin.prototype);
DragonkinWhite.prototype.constructor = Dragonkin;

function DragonkinRed(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragonkin_red.png';
  obj.speed = speedTwentyThree + 18;
  return obj;
}
DragonkinRed.prototype = Object.create(Dragonkin.prototype);
DragonkinRed.prototype.constructor = Dragonkin;

function DragonkinOrange(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragonkin_orange.png';
  obj.speed = speedTwentyThree + 10;
  obj.direction = "left";
  return obj;
}
DragonkinOrange.prototype = Object.create(Dragonkin.prototype);
DragonkinOrange.prototype.constructor = Dragonkin;

function DragonkinPurple(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragonkin_purple.png';
  obj.speed = speedTwentyThree + 30;
  return obj;
}
DragonkinPurple.prototype = Object.create(Dragonkin.prototype);
DragonkinPurple.prototype.constructor = Dragonkin;

function DragonkinGold(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragonkin_gold.png';
  obj.speed = speedTwentyThree - 30;
  obj.direction = "left";
  return obj;
}
DragonkinGold.prototype = Object.create(Dragonkin.prototype);
DragonkinGold.prototype.constructor = Dragonkin;

function DragonkinBlack(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragonkin_black.png';
  obj.speed = speedTwentyThree - 16;
  return obj;
}
DragonkinBlack.prototype = Object.create(Dragonkin.prototype);
DragonkinBlack.prototype.constructor = Dragonkin;

function DragonkinViolet(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragonkin_violet.png';
  obj.speed = speedTwentyThree + 32;
  obj.direction = "left";
  return obj;
}
DragonkinViolet.prototype = Object.create(Dragonkin.prototype);
DragonkinViolet.prototype.constructor = Dragonkin;

function DragonkinGreen(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragonkin_green.png';
  obj.speed = speedTwentyThree + 22;
  return obj;
}
DragonkinGreen.prototype = Object.create(Dragonkin.prototype);
DragonkinGreen.prototype.constructor = Dragonkin;

///////////////////////////////////////////////////
// Define Demons level 24 mobs
//////////////////////////////////

function DemonKnight(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/demon_knight.png';
  obj.speed = speedTwentyFour - 100;
  obj.direction = "left";
  return obj;
}
DemonKnight.prototype = Object.create(Dragonkin.prototype);
DemonKnight.prototype.constructor = Dragonkin;

function DemonGreen(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/demon_green.png';
  obj.speed = speedTwentyFour - 200;
  return obj;
}
DemonGreen.prototype = Object.create(Dragonkin.prototype);
DemonGreen.prototype.constructor = Dragonkin;

function BalrogLesser(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/balrog_lesser.png';
  obj.speed = speedTwentyFour - 40;
  obj.direction = "left";
  return obj;
}
BalrogLesser.prototype = Object.create(Dragonkin.prototype);
BalrogLesser.prototype.constructor = Dragonkin;

function GazerRed(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/gazer_red.png';
  obj.speed = speedTwentyFour + 10;
  return obj;
}
GazerRed.prototype = Object.create(Dragonkin.prototype);
GazerRed.prototype.constructor = Dragonkin;

function GazerPurple(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/gazer_purple.png';
  obj.speed = speedTwentyFour + 20;
  obj.direction = "left";
  return obj;
}
GazerPurple.prototype = Object.create(Dragonkin.prototype);
GazerPurple.prototype.constructor = Dragonkin;

function BalrogGreater(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/balrog_greater.png';
  obj.speed = speedTwentyFour + 40;
  return obj;
}
BalrogGreater.prototype = Object.create(Dragonkin.prototype);
BalrogGreater.prototype.constructor = Dragonkin;

function DemonHappy(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/demon_happy.png';
  obj.speed = speedTwentyFour;
  obj.direction = "left";
  return obj;
}
DemonHappy.prototype = Object.create(Dragonkin.prototype);
DemonHappy.prototype.constructor = Dragonkin;

function DemonBlack(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/demon_black.png';
  obj.speed = speedTwentyFour - 30;
  return obj;
}
DemonBlack.prototype = Object.create(Dragonkin.prototype);
DemonBlack.prototype.constructor = Dragonkin;

///////////////////////////////////////////////////
// Define Dragons level 25 mobs
//////////////////////////////////

function DragonBlue(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragon_blue.png';
  obj.speed = speedTwentyFive - 20;
  obj.direction = "left";
  return obj;
}
DragonBlue.prototype = Object.create(Dragonkin.prototype);
DragonBlue.prototype.constructor = Dragonkin;

function DragonCamo(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragon_camo.png';
  obj.speed = speedTwentyFive - 20;
  return obj;
}
DragonCamo.prototype = Object.create(Dragonkin.prototype);
DragonCamo.prototype.constructor = Dragonkin;

function DragonBlack(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragon_black.png';
  obj.speed = speedTwentyFive + 30;
  obj.direction = "left";
  return obj;
}
DragonBlack.prototype = Object.create(Dragonkin.prototype);
DragonBlack.prototype.constructor = Dragonkin;

function DragonGold(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragon_gold.png';
  obj.speed = speedTwentyFive - 50;
  return obj;
}
DragonGold.prototype = Object.create(Dragonkin.prototype);
DragonGold.prototype.constructor = Dragonkin;

function DragonPink(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragon_pink.png';
  obj.speed = speedTwentyFive - 15;
  obj.direction = "left";
  return obj;
}
DragonPink.prototype = Object.create(Dragonkin.prototype);
DragonPink.prototype.constructor = Dragonkin;

function DragonWhite(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragon_white.png';
  obj.speed = speedTwentyFive - 40;
  return obj;
}
DragonWhite.prototype = Object.create(Dragonkin.prototype);
DragonWhite.prototype.constructor = Dragonkin;

function DragonGreen(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragon_green.png';
  obj.speed = speedTwentyFive - 40;
  obj.direction = "left";
  return obj;
}
DragonGreen.prototype = Object.create(Dragonkin.prototype);
DragonGreen.prototype.constructor = Dragonkin;

function DragonFire(y) {
  var obj = new Dragonkin(y);
  obj.sprite = 'img/dragon_fire.png';
  obj.speed = speedTwentyFive + 50;
  return obj;
}
DragonFire.prototype = Object.create(Dragonkin.prototype);
DragonFire.prototype.constructor = Dragonkin;

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
var levelOne = [];
var levelTwo = [];
var levelThree = [];
var levelFour = [];
var levelFive = [];
var levelSix = [];
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

levelOne.push(snail, scorpion, beetle);

// Instantiate bugs lvl 2 enemies
var spider = new Spider(row3);
var roach = new Roach(row4);
var centipede = new Centipede(row5);

levelTwo.push(spider, roach, centipede);

// Instantiate bugs lvl 3 enemies
var antWorker = new AntWorker(row3);
var antSoldier = new AntSoldier(row4);
var mosquito = new Mosquito(row5);

levelThree.push(antWorker, antSoldier, mosquito);

// Instantiate bugs lvl 4 enemies
var larvaGrey = new LarvaGrey(row3);
var larvaOrange = new LarvaOrange(row4);
var brainBug = new BrainBug(row5);

levelFour.push(larvaGrey, larvaOrange, brainBug);

// Instantiate bugs lvl 5 enemies
var hornet = new Hornet(row3);
var firefly = new Firefly(row4);
var moth = new Moth(row5);

levelFive.push(hornet, firefly, moth);

// Instantiate worgs lvl 6 enemies
var worgWarrior = new WorgWarrior(row3);
var worgMage = new WorgMage(row4);
var worgRogue = new WorgRogue(row5);

levelSix.push(worgWarrior, worgMage, worgRogue);

// Instantiate Goblins lvl 7 enemies
var gobFighter = new GobFighter(row2);
var gobWarrior = new GobWarrior(row3);
var gobMage = new GobMage(row4);
var gobSorc = new GobSorc(row5);

levelSeven.push(gobFighter, gobWarrior, gobMage, gobSorc);

// Instantiate Elves lvl 8 enemies
var elfWarrior = new ElfWarrior(row2);
var elfMage = new ElfMage(row3);
var elfPriest = new ElfPriest(row4);
var elfNecromancer = new ElfNecromancer(row5);

levelEight.push(elfWarrior, elfMage, elfPriest, elfNecromancer);

// Instantiate Centaurs lvl 9 enemies
var centaurArcherOrange = new CentaurArcherOrange(row2);
var centaurArcherRed = new CentaurArcherRed(row3);
var centaurXbowBrown = new CentaurXbowBrown(row4);
var centaurXbowGrey = new CentaurXbowGrey(row5);

levelNine.push(centaurArcherOrange, centaurArcherRed, centaurXbowBrown, centaurXbowGrey);


// Instantiate Cyclops lvl 10 enemies
var ogreTwoHead = new OgreTwoHead(row2);
var ogreWitch = new OgreWitch(row3);
var cyclopsWarrior = new CyclopsWarrior(row4);
var cyclopsOfficer = new CyclopsOfficer(row5);

levelTen.push(ogreTwoHead, ogreWitch, cyclopsWarrior, cyclopsOfficer);

/////////////////////////////////////////
// Instantiate Sea Beasts lvl 11 enemies

var octopus = new Octopus(row2);
var jellyfish1 = new Jellyfish(row3, -20, "left");
var jellyfish2 = new Jellyfish(row3, 30, "right");
var jellyfish3 = new Jellyfish(row4, 40, "left");
var jellyfish4 = new Jellyfish(row4, 1, "right");
var dolphin = new Dolphin(row5);

levelEleven.push(octopus, jellyfish1, jellyfish2, jellyfish3, jellyfish4, dolphin);

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

levelTwelve.push(nagaWarriorLeft, nagaWarriorRight, nagaRogueLeft, nagaRogueRight,
                nagaMageLeft, nagaMageRight, nagaFighterLeft, nagaFighterRight);

/////////////////////////////////////////
// Instantiate Naga lvl 13 enemies

var squidmanLeft = new Squidman(row2, 10, "left", "img/squidman_left.png");
var nagaSoothsayerLeft = new NagaSoothsayer(row3, 16, "left", "img/naga_soothsayer_left.png");
var nagaSirenRight = new NagaSiren(row3, 40, "right", "img/naga_siren_right.png");
var nagaSirenLeft = new NagaSiren(row4, 0, "left", "img/naga_siren_left.png");
var nagaSoothsayerRight = new NagaSoothsayer(row4, 20, "right", "img/naga_soothsayer_right.png");
var squidmanRight = new Squidman(row5, 30, "right", "img/squidman_right.png");

levelThirteen.push(nagaSoothsayerLeft, nagaSirenRight, nagaSirenLeft,
                  nagaSoothsayerRight, squidmanLeft, squidmanRight);

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

levelFourteen.push(anemone, turtle, spikedTurtle, eel1, eel2, eel3, eel4, eel5, eel6);

/////////////////////////////////////////
// Instantiate Land Beasts lvl 15 enemies

var crocodile = new Crocodile(row2);
var stripedSnake = new StripedSnake(row3);
var lizard = new Lizard(row4);
var gecko = new Gecko(row5);
var giantSerpent = new GiantSerpent(row6);


levelFifteen.push(crocodile, stripedSnake, lizard, gecko, giantSerpent);

/////////////////////////////////////////
// Instantiate Land Beasts lvl 16 enemies

var trollBlue = new TrollBlue(row2);
var trollGrey = new TrollGrey(row3);
var trollGreen = new TrollGreen(row4);
var trollRed = new TrollRed(row3);
var trollBlack = new TrollBlack(row4);
var trollWhite = new TrollWhite(row5);

levelSixteen.push(trollBlue, trollGrey, trollGreen, trollRed, trollBlack, trollWhite);

/////////////////////////////////////////
// Instantiate Imps lvl 17 enemies

var impPurple = new ImpPurple(row3);
var impRed = new ImpRed(row3);
var impEnchanted = new ImpEnchanted(row4);
var impBlack = new ImpBlack(row4);
var impMaster = new ImpMaster(row6);

levelSeventeen.push(impPurple, impRed, impEnchanted, impBlack, impMaster);

/////////////////////////////////////////
// Instantiate Elementals lvl 18 enemies

var elementalSteel = new ElementalSteel(row2);
var elementalFlesh = new ElementalFlesh(row3);
var elementalLightning = new ElementalLightning(row3);
var elementalIce = new ElementalIce(row4);
var elementalRock = new ElementalRock(row4);
var elementalFire = new ElementalFire(row5);


levelEighteen.push(elementalSteel, elementalFlesh, elementalLightning,
                   elementalIce, elementalRock, elementalFire);

/////////////////////////////////////////
// Instantiate lvl 19 enemies (Abominations)

var abominationRed = new AbominationRed(row2);
var abominationGreen = new AbominationGreen(row2);
var abominationOrange = new AbominationOrange(row3);
var abominationBrown = new AbominationBrown(row4);
var abominationPink = new AbominationPink(row5);
var abominationYellow = new AbominationYellow(row5);

levelNineteen.push(abominationRed, abominationGreen, abominationOrange,
                   abominationBrown, abominationPink, abominationYellow);

/////////////////////////////////////////
// Instantiate lvl 20 enemies (Skeletons)

var skeletonDancing = new SkeletonDancing(row2);
var skeletonKing = new SkeletonKing(row2);
var skeletonSoldier = new SkeletonSoldier(row3);
var skeletonCentaur = new SkeletonCentaur(row3);
var skeletonBird = new SkeletonBird(row4);
var skeletonPriest = new SkeletonPriest(row4);
var skeletonHydra = new SkeletonHydra(row5);
var skeletonDragon = new SkeletonDragon(row5);

levelTwenty.push(skeletonDancing, skeletonKing, skeletonSoldier, skeletonCentaur,
                 skeletonBird, skeletonPriest, skeletonHydra, skeletonDragon);

/////////////////////////////////////////
// Instantiate lvl 21 enemies (Ghosts)

var spiritTransparent = new SpiritTransparent(row2);
var spiritBlue = new SpiritBlue(row2);
var spiritRed = new SpiritRed(row2);
var ghost = new Ghost(row3);
var ghast = new Ghast(row3);
var bansheeGreen = new BansheeGreen(row4);
var bansheeOctopus = new BansheeOctopus(row4);
var bansheeBlue = new BansheeBlue(row5);
var banshee = new Banshee(row5);

levelTwentyOne.push(spiritTransparent, spiritBlue, spiritRed,
                    ghost, ghast,
                    bansheeGreen, bansheeOctopus, bansheeBlue, banshee);

/////////////////////////////////////////
// Instantiate lvl 22 enemies (Gargoyles)

var gargoyleWhite1 = new GargoyleWhite(row2, -30, "left");
var gargoyleWhite2 = new GargoyleWhite(row2, 10, "right");
var gargoyleRed1 = new GargoyleRed(row3, -50, "left");
var gargoyleRed2 = new GargoyleRed(row3, -20, "right");
var gargoyleBlack1 = new GargoyleBlack(row4, 40, "left");
var gargoyleBlack2 = new GargoyleBlack(row4, 16, "right");
var gargoyleIce1 = new GargoyleIce(row5, 0, "left");
var gargoyleIce2 = new GargoyleIce(row5, -80, "right");

levelTwentyTwo.push(gargoyleWhite1, gargoyleWhite2, gargoyleRed1, gargoyleRed2,
                    gargoyleBlack1, gargoyleBlack2, gargoyleIce1, gargoyleIce2);

/////////////////////////////////////////
// Instantiate lvl 23 enemies (Dragonkin)

var dragonkinWhite = new DragonkinWhite(row2);
var dragonkinRed = new DragonkinRed(row2);
var dragonkinPurple = new DragonkinPurple(row3);
var dragonkinOrange = new DragonkinOrange(row3);
var dragonkinGold = new DragonkinGold(row4);
var dragonkinBlack = new DragonkinBlack(row4);
var dragonkinViolet = new DragonkinViolet(row5);
var dragonkinGreen = new DragonkinGreen(row5);

levelTwentyThree.push(dragonkinWhite, dragonkinRed, dragonkinPurple, dragonkinOrange,
                      dragonkinGold, dragonkinBlack, dragonkinViolet, dragonkinGreen);

/////////////////////////////////////////
// Instantiate lvl 24 enemies (Demons)

var demonKnight = new DemonKnight(row2);
var demonGreen = new DemonGreen(row2);
var balrogLesser = new BalrogLesser(row3);
var gazerRed = new GazerRed(row3);
var gazerPurple = new GazerPurple(row4);
var balrogGreater = new BalrogGreater(row4);
var demonHappy = new DemonHappy(row5);
var demonBlack = new DemonBlack(row5);

levelTwentyFour.push(demonKnight, demonGreen, balrogLesser, gazerRed, gazerPurple,
                     balrogGreater, demonHappy, demonBlack);

/////////////////////////////////////////
// Instantiate lvl 25 enemies (Dragons)

var dragonBlue = new DragonBlue(row2);
var dragonCamo = new DragonCamo(row2);
var dragonBlack = new DragonBlack(row3);
var dragonGold = new DragonGold(row3);
var dragonPink = new DragonPink(row4);
var dragonWhite = new DragonWhite(row4);
var dragonGreen = new DragonGreen(row5);
var dragonFire = new DragonFire(row5);

levelTwentyFive.push(dragonBlue, dragonCamo, dragonBlack, dragonGold, dragonPink,
                     dragonWhite, dragonGreen, dragonFire);

var ExtraLife = function(x, y) {
  this.x = x;
  this.y = y;
  this.sound = new Audio('sounds/extra_life.wav');
  this.consumed = false;
  this.sprite = 'img/extra_life.png';
};

// render ExtraLife sprite
ExtraLife.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// give the player one extra life
ExtraLife.prototype.giveBonus = function() {
  this.sound.play();
  player.lives ++;
}

///////////////////////////////////////
// Instantiate Items Section
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

// create extra life variables
var extraLife7 = new ExtraLife(colSeven, rowThree);
var extraLife9 = new ExtraLife(colSeven, rowFour);
var extraLife17 = new ExtraLife(colOne, rowSix);
var extraLife20 = new ExtraLife(colSeven, rowSix);
var extraLife23 = new ExtraLife(colSeven, rowFive);


// add all items to an array that can be used to reset consumed statues
var allItems = [];

allItems.push(extraLife7, extraLife9, extraLife17, extraLife20, extraLife23);

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

// draw obstacle's sprite
Obstacle.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

// create variables for setting obstacle images
var goldTree = "img/tree_gold.png";
var redTree = "img/tree_red.png";
var rock = "img/rock.png";
var bell = "img/bell.png";
var severedHead = "img/obstacle_severed_head.png";
var skullPile = "img/obstacle_skull_pile.png";
var skeletonChain = "img/obstacle_skeleton_chain.png";
var statue = "img/obstacle_statue.png";

// create an array for each level
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
// no obstacles level 11
// no obstacles level 12
var obstaclesThirteen = [];
// no obstacles level 14
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

// Instantiate all Objects and push them into their level's array
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



obstaclesOne.push(oneTree1, oneTree2, oneTree3, oneTree4, oneTree5, oneTree6, oneTree7, oneTree8, oneTree9, oneTree10, oneTree11, oneTree12, oneTree13);

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

obstaclesTwo.push(twoTree1, twoTree2, twoTree3, twoTree4, twoTree5, twoTree6, twoTree7, twoTree8);

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

obstaclesThree.push(threeTree1, threeTree2, threeTree3, threeTree4, threeRock1, threeRock2, threeRock3, threeRock4, threeRock5);

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

obstaclesFour.push(fourTree1, fourTree2, fourTree3, fourTree4, fourTree5, fourTree6, fourTree7, fourTree8, fourTree9);

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

obstaclesFive.push(fiveRock1, fiveRock2, fiveRock3, fiveRock4, fiveRock5, fiveRock6, fiveRock7, fiveRock8, fiveRock9);

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
obstaclesSix.push(sixTree1, sixTree2, sixTree3, sixTree4, sixTree5, sixRock1, sixRock2, sixRock3, sixRock4, sixRock5, sixRock6, sixTree6, sixTree7);

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
obstaclesSeven.push(sevenRock1, sevenRock2, sevenRock3, sevenRock4, sevenRock5, sevenRock6, sevenRock7, sevenRock8, sevenRock9, sevenRock10, sevenRock11, sevenTree1, sevenTree2, sevenTree3, sevenTree4);

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

obstaclesEight.push(eightTree1, eightTree2, eightTree3, eightTree4, eightTree5, eightTree6, eightTree7, eightTree8, eightTree9, eightTree10, eightTree11, eightTree12, eightTree13);

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

obstaclesNine.push(nineTree1, nineTree2, nineTree3, nineTree4, nineTree5, nineTree6, nineTree7, nineTree8, nineTree9, nineTree10, nineTree11, nineTree12, nineTree13);

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

obstaclesTen.push(tenRock1, tenRock2, tenRock3, tenRock4, tenRock5, tenRock6, tenRock7, tenRock8, tenRock9, tenRock10, tenRock11, tenRock12, tenRock13, tenRock14);

/////////////////////////////////////////
// No obstacles level 11 (Sea Beasts 1)
//////////////////////////////////////////

/////////////////////////////////////////
// No obstacles level 12 Sea (Naga 1)
////////////////////////////////////////////

/////////////////////////////////////////
// obstacles level 13 (Naga 2)

var thirteenBell1 = new Obstacle(colThree, rowThree, bell);
var thirteenBell2 = new Obstacle(colFive, rowThree, bell);

var thirteenBell3 = new Obstacle(colTwo, rowFive, bell);
var thirteenBell4 = new Obstacle(colFour, rowFive, bell);
var thirteenBell5 = new Obstacle(colSix, rowFive, bell);

obstaclesThirteen.push(thirteenBell1, thirteenBell2, thirteenBell3, thirteenBell4, thirteenBell5);

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

obstaclesFifteen.push(fifteenRock1, fifteenRock2, fifteenRock3, fifteenRock4, fifteenRock5, fifteenRock6, fifteenRock7, fifteenRock8, fifteenRock9, fifteenTree1, fifteenTree2, fifteenTree3, fifteenTree4);

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

obstaclesSixteen.push(sixteenTree1, sixteenTree2, sixteenTree3, sixteenTree4, sixteenTree5, sixteenTree6, sixteenTree7, sixteenRock1, sixteenRock2, sixteenRock3, sixteenRock4, sixteenRock5, sixteenRock6, sixteenRock7, sixteenRock8);

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

obstaclesSeventeen.push(seventeenRock1, seventeenRock2, seventeenRock3, seventeenRock4, seventeenRock5, seventeenRock6, seventeenRock7, seventeenRock8, seventeenRock9, seventeenRock10, seventeenRock11, seventeenRock12);

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

obstaclesEighteen.push(eighteenBell1, eighteenBell2, eighteenBell3, eighteenBell4, eighteenBell5, eighteenBell6, eighteenBell7, eighteenBell8, eighteenBell9, eighteenBell10, eighteenBell11);

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


obstaclesNineteen.push(nineteenRock1, nineteenRock2, nineteenRock3, nineteenRock4, nineteenHead1, nineteenHead2, nineteenHead3, nineteenHead4, nineteenHead5, nineteenHead6, nineteenHead7, nineteenHead8);

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

obstaclesTwenty.push(twentyPile1, twentyPile2, twentyPile3, twentyPile4, twentyPile5, twentyPile6, twentyPile7, twentyPile8, twentyChain1, twentyChain2, twentyChain3, twentyChain4, twentyChain5, twentyChain6, twentyChain7, twentyChain8, twentyChain9);

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

obstaclesTwentyOne.push(twentyOnePile1, twentyOnePile2, twentyOneHead1, twentyOneHead2, twentyOneChain1, twentyOneChain2, twentyOnePile3, twentyOnePile4, twentyOnePile5, twentyOnePile6, twentyOnePile7);

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

obstaclesTwentyTwo.push(twentyTwoStatue1, twentyTwoStatue2, twentyTwoStatue3, twentyTwoStatue4, twentyTwoStatue5, twentyTwoStatue6, twentyTwoStatue7, twentyTwoStatue8, twentyTwoStatue9, twentyTwoStatue10, twentyTwoStatue11, twentyTwoStatue12);

///////////////////////////////////
// Obstacles Level 23 (Dragonkin)

// lower row of rocks
var twentyThreeRock1 = new Obstacle(colTwo, rowTwo, rock);
var twentyThreeRock2 = new Obstacle(colThree, rowTwo, rock);
var twentyThreeRock3 = new Obstacle(colFour, rowTwo, rock);
var twentyThreeRock4 = new Obstacle(colFive, rowTwo, rock);
var twentyThreeRock5 = new Obstacle(colSix, rowTwo, rock);
var twentyThreeRock6 = new Obstacle(colSeven, rowTwo, rock);
//var twentyThreeRock7 = new Obstacle(colTwo, rowThree, rock);

// upper row of rocks
var twentyThreeRock7 = new Obstacle(colOne, rowFive, rock);
var twentyThreeRock8 = new Obstacle(colTwo, rowFive, rock);
var twentyThreeRock9 = new Obstacle(colThree, rowFive, rock);
var twentyThreeRock10 = new Obstacle(colFour, rowFive, rock);
var twentyThreeRock11 = new Obstacle(colFive, rowFive, rock);

obstaclesTwentyThree.push(twentyThreeRock1, twentyThreeRock2, twentyThreeRock3, twentyThreeRock4, twentyThreeRock5, twentyThreeRock6, twentyThreeRock7, twentyThreeRock8, twentyThreeRock9, twentyThreeRock10, twentyThreeRock11);

///////////////////////////////////
// Obstacles Level 24 (Demons)

// row 1 Obstacles
var twentyFourRock1 = new Obstacle(colOne, rowOne, rock);
var twentyFourPile2 = new Obstacle(colSeven, rowOne, skullPile);

// row 3 obstacles
var twentyFourPile3 = new Obstacle(colTwo, rowThree, skullPile);
var twentyFourStatue4 = new Obstacle(colThree, rowThree, statue);
var twentyFourStatue5 = new Obstacle(colFive, rowThree, statue);
var twentyFourChain6 = new Obstacle(colSix, rowThree, skeletonChain);

// row 5 obstacles
var twentyFourStatue7 = new Obstacle(colOne, rowFive, statue);
var twentyFourChain8 = new Obstacle(colThree, rowFive, skeletonChain);
var twentyFourChain9 = new Obstacle(colFour, rowFive, skeletonChain);
var twentyFourChain10 = new Obstacle(colFive, rowFive, skeletonChain);
var twentyFourRock11 = new Obstacle(colSeven, rowFive, rock);

obstaclesTwentyFour.push(twentyFourRock1, twentyFourPile2, twentyFourPile3, twentyFourStatue4, twentyFourStatue5, twentyFourChain6, twentyFourStatue7, twentyFourChain8, twentyFourChain9, twentyFourChain10, twentyFourRock11);

///////////////////////////////////
// Obstacles Level 25 (Dragons)

// lower row of rocks
var twentyFiveRock1 = new Obstacle(colTwo, rowTwo, rock);
var twentyFiveRock2 = new Obstacle(colFour, rowTwo, rock);
var twentyFiveRock3 = new Obstacle(colSix, rowTwo, rock);

// middle row of rocks (on the outside of statues)
var twentyFiveRock4 = new Obstacle(colOne, rowFour, rock);
var twentyFiveRock5 = new Obstacle(colSeven, rowFour, rock);

// middle statues
var twentyFiveStatue1 = new Obstacle(colThree, rowFour, statue);
var twentyFiveStatue2 = new Obstacle(colFour, rowFour, statue);
var twentyFiveStatue3 = new Obstacle(colFive, rowFour, statue);

// top left rocks
var twentyFiveRock6 = new Obstacle(colOne, rowSix, rock);
var twentyFiveRock7 = new Obstacle(colTwo, rowSix, rock);

// top right rocks
var twentyFiveRock8 = new Obstacle(colSix, rowSix, rock);
var twentyFiveRock9 = new Obstacle(colSeven, rowSix, rock);

obstaclesTwentyFive.push(twentyFiveRock1, twentyFiveRock2, twentyFiveRock3, twentyFiveRock4, twentyFiveRock5, twentyFiveStatue1, twentyFiveStatue2, twentyFiveStatue3, twentyFiveRock6, twentyFiveRock7, twentyFiveRock8, twentyFiveRock9);



//////////////////////////////////////////////////////////
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//////////////////////////////////////////////////////////
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.itemSound = new Audio("sounds/item.wav");
  this.gameOverSound = new Audio("sounds/game_over.wav");
  // game over source: http://soundbible.com/2052-Creepy-Laugh.html
  this.soundtrack = new Audio("sounds/Edward_Shallow_The_Infinite_Railroad.mp3");
  this.soundtrack.volume = 0.3;
  // soundtrack source: Edward Shallow
  // url= http://freemusicarchive.org/music/Edward_Shallow/
  this.soundtrack.loop = true;
  this.soundtrack.playing = false;
  this.lives = 3;
  this.level = 0;
  this.completedLevels = 0;
  this.score = 0;
  this.initialX = 416;
  this.initialY = 704;
  this.startY = 576;
  this.x = this.initialX;
  this.y = this.initialY;
  this.classes = [];
  this.collided = false;
  this.gamePaused = false;
  this.gameOver = false;
  this.gameVictory = false;

  // instantiate each class as an object before pushing into array
  var knight = {
    "className": "Knight",
    "moveSound": "sounds/chainmail.wav",
    "spriteUrl": "img/hero_knight.png"
  };

  var sorceress = {
    "className": "Sorceress",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_sorceress.png"
  };

  var mage = {
    "className": "Mage",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_mage.png"
  };

  var scribe = {
    "className": "Scribe",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_scribe.png"
  };

  var templar = {
    "className": "Templar",
    "moveSound": "sounds/chainmail.wav",
    "spriteUrl": "img/hero_templar.png"
  };

  var oracle = {
    "className": "Oracle",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_oracle.png"
  };

  var priest = {
    "className": "Priest",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_priest.png"
  };

  var monk = {
    "className": "Monk",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_monk.png"
  };

  var rogue = {
    "className": "Rogue",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_rogue.png"
  };

  var enchantress = {
    "className": "Enchantress",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_enchantress.png"
  };

  var paladin = {
    "className": "Paladin",
    "moveSound": "sounds/chainmail.wav",
    "spriteUrl": "img/hero_paladin.png"
  };

  var berserker = {
    "className": "Berserker",
    "moveSound": "sounds/chainmail.wav",
    "spriteUrl": "img/hero_berserker.png"
  };

  var ninja = {
    "className": "Ninja",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_ninja.png"
  };

  var engineer = {
    "className": "Engineer",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_engineer.png"
  };

  // now push each class into this.classes array
  this.classes.push(knight, sorceress, mage, scribe, templar, oracle, priest,
                    monk, rogue, enchantress, paladin, berserker, ninja, engineer);

  // starts game on a random class
  var randomClass = this.getRandomClass(0, (this.classes.length - 1));
  this.classIndex = randomClass; // this.classIndex = current class

  // draw correct class sprite
  this.sprite = this.classes[this.classIndex].spriteUrl;
}; // end Player constructor definition
///////////////////////////////////////////////////////////////////////
// Define Player methods section

// starts game on a random class
Player.prototype.getRandomClass = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// If player and item's hitbox touch eachother,
// make item's effect happen, and set item to consumed
Player.prototype.checkItems = function(item) {
  if (this.y === item.y && this.x === item.x && item.consumed === false) {
    item.giveBonus();
    item.consumed = true;
  }
};

// checkCollisions is invoked by player.update method
// checkCollisions takes 1 parameter: array of current level's mobs
Player.prototype.checkCollisions = function(enemiesList) {
  // Create player hitbox
  var playerTop = this.y;
  var playerBottom = this.y + 110;
  var playerRight = this.x + 90;
  var playerLeft = this.x;

  for (var i = 0; i < enemiesList.length; i++) {
    // Create enemy hitbox for each enemy on current level
    var enemyTop = enemiesList[i].y;
    var enemyBottom = enemiesList[i].y + 110;
    var enemyRight = enemiesList[i].x + 90;
    var enemyLeft = enemiesList[i].x;

    // If player and enemy's hitbox touch eachother, invoke collide function
    if ((playerTop <= enemyBottom) && (playerBottom >= enemyTop) && (playerLeft <= enemyRight) && (playerRight >= enemyLeft)) {
      enemiesList[i].sound.play();
      this.collide();
    }
  }
};

// Invoked by player.checkCollisions() if player touches enemy
// Reduces life and sends player back to beginning of level
// Sets game to gameOver if player is out of lives,
// and plays an annoying evil laugh
Player.prototype.collide = function() {
  this.lives--;
  if (this.lives < 1) {
    this.gameOverSound.play();
    this.gameOver = true;
  } else {
    this.collided = true;
  }
};

// this resets the player to the beginning of level after hitting an enemy
Player.prototype.resetAfterCollision = function() {
  this.collided = false;
  if (this.level === 1) {
    this.x = this.initialX;
    this.y = this.startY;
  } else {
    this.x = this.initialX;
    this.y = this.initialY;
  }
};


// this function handles player/obstacle collision
// checkObstacles is passed 1 parameter:
// an array of current level's obstacles
Player.prototype.checkObstacles = function(obstaclesList) {
  // setup player hitbox
  var playerY = this.y;
  var playerX = this.x;
  var playerTop = this.y - 128;
  var playerBottom = this.y + 128;
  var playerLeft = this.x - 128;
  var playerRight = this.x + 128;

  // create array to hold all blocked directions
  var blockedDirections = [];


  // loop through all obstacles on current level's array
  for (var i = 0; i < obstaclesList.length; i++) {

    // set each obstacles location
    var thisObstacle = obstaclesList[i];
    var obstacleX = obstaclesList[i].x;
    var obstacleY = obstaclesList[i].y;

    // prevents moving left
    if (playerLeft === obstacleX && playerY === obstacleY) {
      blockedDirections.push("Left is Blocked");
    }

    // prevents moving right
    if (playerRight === obstacleX && playerY === obstacleY) {
      blockedDirections.push("Right is Blocked");
    }

      // prevents moving down
    if (playerBottom === obstacleY && playerX === obstacleX) {
      blockedDirections.push("Down is Blocked");
    }

    // prevents moving up
    if (playerTop === obstacleY && playerX === obstacleX) {
      blockedDirections.push("Up is Blocked");
    }

  }
  return blockedDirections;
};

// Reset game to the beginning
// Reset includes lives, score, level, original position,
// Sets gameOver, gameVictory, and allItems.consumed to false
// And turns off the music
Player.prototype.resetGame = function() {
  this.gameOver = false;
  this.gameVictory = false;
  allItems.forEach(function(item) {
    item.consumed = false;
  });
  this.lives = 3;
  this.score = 0;
  this.level = 0;
  this.completedLevels = 0;
  this.x = this.initialX;
  this.y = this.startY;
  this.pauseMusic();
};

// this function allows
Player.prototype.toggleMusic = function() {
  if (this.soundtrack.playing === false) {
    this.playMusic();
  } else {
    this.pauseMusic();
  }
};

// used by player.toggleMusic to turn music on
Player.prototype.playMusic = function() {
  this.soundtrack.play();
  this.soundtrack.playing = true;
};

// used by player.toggleMusic to turn music off
Player.prototype.pauseMusic = function() {
  this.soundtrack.pause();
  this.soundtrack.playing = false;
};

// Draw the player's image
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set the proper level of enemies and items for the player's
// hitbox to check for
// And controls level up/down/victory conditions
Player.prototype.update = function(dt) {
  // Collision conditional for each level
  if (this.level === 1) {
    this.checkCollisions(levelOne);
  } else if (this.level === 2) {
    this.checkCollisions(levelTwo);
  } else if (this.level === 3) {
    this.checkCollisions(levelThree);
  } else if (this.level === 4) {
    this.checkCollisions(levelFour);
  } else if (this.level === 5) {
    this.checkCollisions(levelFive);
  } else if (this.level === 6) {
    this.checkCollisions(levelSix);
  } else if (this.level === 7) {
    this.checkItems(extraLife7);
    this.checkCollisions(levelSeven);
  } else if (this.level === 8) {
    this.checkCollisions(levelEight);
  } else if (this.level === 9) {
    this.checkItems(extraLife9);
    this.checkCollisions(levelNine);
  } else if (this.level === 10) {
    this.checkCollisions(levelTen);
  } else if (this.level === 11) {
    this.checkCollisions(levelEleven);
  } else if (this.level === 12) {
    this.checkCollisions(levelTwelve);
  } else if (this.level === 13) {
    this.checkCollisions(levelThirteen);
  } else if (this.level === 14) {
    this.checkCollisions(levelFourteen);
  } else if (this.level === 15) {
    this.checkCollisions(levelFifteen);
  } else if (this.level === 16) {
    this.checkCollisions(levelSixteen);
  } else if (this.level === 17) {
    this.checkItems(extraLife17);
    this.checkCollisions(levelSeventeen);
  } else if (this.level === 18) {
    this.checkCollisions(levelEighteen);
  } else if (this.level === 19) {
    this.checkCollisions(levelNineteen);
  } else if (this.level === 20) {
    this.checkItems(extraLife20);
    this.checkCollisions(levelTwenty);
  } else if (this.level === 21) {
    this.checkCollisions(levelTwentyOne);
  } else if (this.level === 22) {
    this.checkCollisions(levelTwentyTwo);
  } else if (this.level === 23) {
    this.checkItems(extraLife23);
    this.checkCollisions(levelTwentyThree);
  } else if (this.level === 24) {
    this.checkCollisions(levelTwentyFour);
  } else if (this.level === 25) {
    this.checkCollisions(levelTwentyFive);
  }

  // Level up conditional
  if (this.y <= 32) {
    // only add to score if it is first time player made it up
    if (this.level === this.completedLevels) {
      this.level++;
      this.completedLevels++;
      this.score += 100;
      // conditional for starting player above bottom trees on level one
      if (this.level === 1) {
        this.y = this.startY;
      } else {
        this.y = this.initialY;
      }
    // if already been on this level, don't add score
    } else {
      this.level++;
      this.y = this.initialY;
    }
  // conditional for going down to previous level
  } else if (this.y > this.initialY) {
    this.level--;
    this.y = 64;
  }
  // victory game conditions
  if (this.level === 26) {
    this.gameVictory = true;
  }
};

// End of Player Method definitions (except handleInput)
//////////////////////////////////////////////////////////
// all game controls are defined in handleInput.js

// handleInput.js defines all the game controls


// handleInput is passed 1 parameter: (key pressed)
// from document.addEventListener('keyup', function....)
Player.prototype.handleInput = function(key) {
if (key === 'music') {
  this.toggleMusic();
}
// start screen controls
if (player.level === 0) {
  // create sound for flipping between classes
  var newSwitchSound = new Audio("sounds/class_switch.wav");
  this.switchSound = newSwitchSound;
  if (key === 'right' || key === 'rightAlternate') {
    // increasing class index moves class selection right
    this.classIndex ++;
    this.switchSound.play();

    // Display proper player sprite
    // conditional lets player cycle through player.classes in a loop
    // when player tries to move past last class, they cycle to
    // the first class in the array
    if (this.classIndex < this.classes.length) {
      this.sprite = this.classes[this.classIndex].spriteUrl;
    } else {
      this.classIndex = 0;
      this.sprite = this.classes[this.classIndex].spriteUrl;
    }

  } else if (key === 'left' || key === 'leftAlternate') {
    // decreasing class index moves class selection left
    this.classIndex --;
    this.switchSound.play();
    // this conditional lets player cycle backwards through
    // player.classes in a loop
    if (this.classIndex > -1) {
      this.sprite = this.classes[this.classIndex].spriteUrl;
    } else {
      this.classIndex = this.classes.length - 1;
      this.sprite = this.classes[this.classIndex].spriteUrl;
    }
  // pressing enter selects class and begins game
  } else if (key === 'enter') {
    this.level ++;
    this.completedLevels ++;
    this.y = this.startY;
    this.score += 100;
  }
}

// Game controls section
// check that player.gamePaused, player.collided, player.gameOVer,
// and player.gameVictory are all false, disabling these controls
// on those screens
else if (player.level > 0 && this.gamePaused === false
  && this.collided === false
  && this.gameOver === false
  && this.gameVictory === false) {
  // conditional plays a swimming sound on water levels
  if (this.level >= 11 && this.level <= 14) {
    var waterWalkSound = new Audio("sounds/bubbles.wav");
    this.moveSound = waterWalkSound;
  // when not on water lvls, play regular classes moveSound
  } else {
    this.moveSound = new Audio(this.classes[this.classIndex].moveSound);
  }

  // Set an array to hold current levels obstacles
  // This array will then be passed to game controls
  // to prevent player from moving on tiles that hold obstacles
  var currentObstacles = [];
  if (this.level === 1) {
    currentObstacles = this.checkObstacles(obstaclesOne);
  } else if (this.level === 2) {
    currentObstacles = this.checkObstacles(obstaclesTwo);
  } else if (this.level === 3) {
    currentObstacles = this.checkObstacles(obstaclesThree);
  } else if (this.level === 4) {
    currentObstacles = this.checkObstacles(obstaclesFour);
  } else if (this.level === 5) {
    currentObstacles = this.checkObstacles(obstaclesFive);
  } else if (this.level === 6) {
    currentObstacles = this.checkObstacles(obstaclesSix);
  } else if (this.level === 7) {
    currentObstacles = this.checkObstacles(obstaclesSeven);
  } else if (this.level === 8) {
    currentObstacles = this.checkObstacles(obstaclesEight);
  } else if (this.level === 9) {
    currentObstacles = this.checkObstacles(obstaclesNine);
  } else if (this.level === 10) {
    currentObstacles = this.checkObstacles(obstaclesTen);
  } else if (this.level === 11) {
    // do nothing - no obstacles on level 11
  } else if (this.level === 12) {
    // do nothing - no obstacles on level 12
  } else if (this.level === 13) {
    currentObstacles = this.checkObstacles(obstaclesThirteen);
  } else if (this.level === 14) {
    // do nothing - no obstacles on level 14
  } else if (this.level === 15) {
    currentObstacles = this.checkObstacles(obstaclesFifteen);
  } else if (this.level === 16) {
    currentObstacles = this.checkObstacles(obstaclesSixteen);
  } else if (this.level === 17) {
    currentObstacles = this.checkObstacles(obstaclesSeventeen);
  } else if (this.level === 18) {
    currentObstacles = this.checkObstacles(obstaclesEighteen);
  } else if (this.level === 19) {
    currentObstacles = this.checkObstacles(obstaclesNineteen);
  } else if (this.level === 20) {
    currentObstacles = this.checkObstacles(obstaclesTwenty);
  } else if (this.level === 21) {
    currentObstacles = this.checkObstacles(obstaclesTwentyOne);
  } else if (this.level === 22) {
    currentObstacles = this.checkObstacles(obstaclesTwentyTwo);
  } else if (this.level === 23) {
    currentObstacles = this.checkObstacles(obstaclesTwentyThree);
  } else if (this.level === 24) {
    currentObstacles = this.checkObstacles(obstaclesTwentyFour);
  } else if (this.level === 25) {
    currentObstacles = this.checkObstacles(obstaclesTwentyFive);
  }

  // move up controls
  if ((key === 'up' || key === 'upAlternate')
    && (currentObstacles.indexOf("Up is Blocked") == -1)
    && (this.y > 64 || (this.x >= 288 && this.x <= 544))) {
    this.y -= 128;
    this.moveSound.play();

  // move down controls
  } else if ((key === 'down' || key === 'downAlternate')
    && (currentObstacles.indexOf("Down is Blocked") == -1)
    && (this.y < 704 || (this.x >= 288 && this.x <= 544))) {
    this.y += 128;
    this.moveSound.play();

  // move right controls
  } else if (((key === 'right' || key === 'rightAlternate')
    && this.x < 800)
    && (currentObstacles.indexOf("Right is Blocked") == -1)) {
    this.x += 128;
    this.moveSound.play();

  // move left controls
  } else if (((key === 'left'  || key === 'leftAlternate') && this.x > 33)
    && (currentObstacles.indexOf("Left is Blocked") == -1)) {
    this.x -= 128;
    this.moveSound.play();

  // pause game controls
  } else if (key === 'space') {
    this.gamePaused = true;
  }
// end regular game controls
////////////////////////////////////////////////////////////
// now check for other game state conditions

// player.gamePaused controls
} else if (this.gamePaused === true) {
  if (key === 'enter') {
    this.gamePaused = false;
    this.resetGame();
  } else if (key === 'space') {
    this.gamePaused = false;
  }

// player.collided controls
} else if (this.collided === true) {
  if (key === 'space') {
    this.resetAfterCollision();
  }

// player.gameOver controls
} else if (this.gameOver === true) {
  if (key === 'enter') {
    this.resetGame();
  }

// player.gameVictory controls
} else if (this.gameVictory === true) {
  if (key === 'enter') {
    this.resetGame();
  }
}

}; // end of Player.prototype.handleInput definition

var player = new Player(); // <- very important! instantiates player

// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',           // left arrow
        65: 'leftAlternate',  // a
        38: 'up',             // up arrow
        87: 'upAlternate',    // w
        39: 'right',          // right arrow
        68: 'rightAlternate', // d
        40: 'down',           // down arrow
        83: 'downAlternate',  // a
        32: 'space',          // spacebar
        13: 'enter',          // enter
        77: 'music'           // m
    };

  player.handleInput(allowedKeys[e.keyCode]);
});

//////////////////////////////////////////////
// Most of the work needed to add levels is located within
// this file
///
// Beyond this file, player level up methods must be updated in player.js
// And new enemies (or atleast a new array for level) must be defined
// within the enemy.js file
/////////////////////////////////////////////////////////

// Display the proper level of enemies
function renderEntities() {

    // renders the enemies, obstacles, and items for each level
    if (player.level === 1) {
      obstaclesOne.forEach(function(obstacle) {
        obstacle.render();
      });
      levelOne.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 2) {
      obstaclesTwo.forEach(function(obstacle) {
        obstacle.render();
      });
      levelTwo.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 3) {
      obstaclesThree.forEach(function(obstacle) {
        obstacle.render();
      });
      levelThree.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 4) {
      obstaclesFour.forEach(function(obstacle) {
        obstacle.render();
      });
      levelFour.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 5) {
      obstaclesFive.forEach(function(obstacle) {
        obstacle.render();
      });
      levelFive.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 6) {
      obstaclesSix.forEach(function(obstacle) {
        obstacle.render();
      });
      levelSix.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 7) {
      obstaclesSeven.forEach(function(obstacle) {
        obstacle.render();
      });
      if (extraLife7.consumed === false) {
        extraLife7.render();
      }
      levelSeven.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 8) {
      obstaclesEight.forEach(function(obstacle) {
        obstacle.render();
      });
      levelEight.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 9) {
      obstaclesNine.forEach(function(obstacle) {
        obstacle.render();
      });
      if (extraLife9.consumed === false) {
        extraLife9.render();
      }
      levelNine.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 10) {
      obstaclesTen.forEach(function(obstacle) {
        obstacle.render();
      });
      levelTen.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 11) {
      levelEleven.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 12) {
      levelTwelve.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 13) {
      obstaclesThirteen.forEach(function(obstacle) {
        obstacle.render();
      });
      levelThirteen.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 14) {
      levelFourteen.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 15) {
      obstaclesFifteen.forEach(function(obstacle) {
        obstacle.render();
      });
      levelFifteen.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 16) {
      obstaclesSixteen.forEach(function(obstacle) {
        obstacle.render();
      });
      levelSixteen.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 17) {
      obstaclesSeventeen.forEach(function(obstacle) {
        obstacle.render();
      });
      if (extraLife17.consumed === false) {
        extraLife17.render();
      }
      levelSeventeen.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 18) {
      obstaclesEighteen.forEach(function(obstacle) {
        obstacle.render();
      });
      levelEighteen.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 19) {
      obstaclesNineteen.forEach(function(obstacle) {
        obstacle.render();
      });
      levelNineteen.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 20) {
      obstaclesTwenty.forEach(function(obstacle) {
        obstacle.render();
      });
      if (extraLife20.consumed === false) {
        extraLife20.render();
      }
      levelTwenty.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 21) {
      obstaclesTwentyOne.forEach(function(obstacle) {
        obstacle.render();
      });
      levelTwentyOne.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 22) {
      obstaclesTwentyTwo.forEach(function(obstacle) {
        obstacle.render();
      });
      levelTwentyTwo.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 23) {
      obstaclesTwentyThree.forEach(function(obstacle) {
        obstacle.render();
      });
      if (extraLife23.consumed === false) {
        extraLife23.render();
      }
      levelTwentyThree.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 24) {
      obstaclesTwentyFour.forEach(function(obstacle) {
        obstacle.render();
      });
      levelTwentyFour.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 25) {
      obstaclesTwentyFive.forEach(function(obstacle) {
        obstacle.render();
      });
      levelTwentyFive.forEach(function(enemy) {
        enemy.render();
      });
    }

    player.render();
}

// Ensure collision is working properly for each level
function updateEntities(dt) {

    if (player.level === 1) {
      levelOne.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 2) {
      levelTwo.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 3) {
      levelThree.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 4) {
      levelFour.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 5) {
      levelFive.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 6) {
      levelSix.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 7) {
      levelSeven.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 8) {
      levelEight.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 9) {
      levelNine.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 10) {
      levelTen.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 11) {
      levelEleven.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 12) {
      levelTwelve.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 13) {
      levelThirteen.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 14) {
      levelFourteen.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 15) {
      levelFifteen.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 16) {
      levelSixteen.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 17) {
      levelSeventeen.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 18) {
      levelEighteen.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 19) {
      levelNineteen.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 20) {
      levelTwenty.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 21) {
      levelTwentyOne.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 22) {
      levelTwentyTwo.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 23) {
      levelTwentyThree.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 24) {
      levelTwentyFour.forEach(function(enemy) {
        enemy.update(dt);
      });
    } else if (player.level === 25) {
      levelTwentyFive.forEach(function(enemy) {
        enemy.update(dt);
      });
    }


    player.update();
}

//////////////////////////////////////
// Place tiles for each level
function renderWorld() {
  var rowImages = [];
      if (player.level === 1) { // bugs lvl 1
        rowImages = [
            'img/grass_light.png', // Top Row
            'img/grass_dark.png',  // Row 2
            'img/grass_dark.png',  // Row 3
            'img/grass_dark.png',  // Row 4
            'img/grass_light.png', // Row 5
            'img/grass_light.png'  // Row 6 Starting location
        ];
      } if (player.level === 2) { // bugs lvl 2
        rowImages = [
            'img/grass_light.png',   // Row 6 - Top Row
            'img/grass_red.png',    // Row 2 - Centipedes
            'img/grass_blue.png',   // Row 3 - Roaches
            'img/grass_yellow.png', // Row 4 - Spiders
            'img/grass_light.png',  // Row 5
            'img/grass_light.png'   // Row 6 Starting location
        ];
      } if (player.level === 3) { // ant bugs
        rowImages = [
            'img/shore_bottom.png',   // Row 6 - Top Row
            'img/grass_yellow.png',     // Row 5
            'img/grass_blue.png',     // Row 4
            'img/grass_red.png',     // Row 3
            'img/grass_light.png',    // Row 2
            'img/grass_light.png'     // Row 1 - Bottom Row
        ];
      } if (player.level === 4) { // larva bugs
        rowImages = [
            'img/sand_light.png',  // Row 6 - Top Row - Advances to next level
            'img/grass_light.png', // Row 5
            'img/grass_light.png', // Row 4
            'img/grass_light.png', // Row 3
            'img/sand_bright.png',   // Row 2
            'img/sand_bright.png'   // Row 1 Starting location
        ];
      } else if (player.level === 5) { // flying bugs
        rowImages = [
            'img/rock_path.png',    // Row 6 - Top row - Advances to next level
            'img/sand_brick.png',   // Row 5
            'img/sand_brick.png',   // Row 4
            'img/sand_brick.png',   // Row 3
            'img/sand_light.png',   // Row 2
            'img/sand_light.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 6) { // worgs
        rowImages = [
            'img/rock_path.png',   // Row 6 - Top row - Advances to next level
            'img/sand_dark.png',   // Row 5
            'img/sand_dark.png',   // Row 4
            'img/sand_dark.png',   // Row 3
            'img/sand_light.png',  // Row 2
            'img/rock_path.png',   // Row 1 - Bottom Row
        ];
      } else if (player.level === 7) { // goblins
        rowImages = [
            'img/grass_dark.png',  // Row 6 - Top row - Advances to next level
            'img/grey_brick.png',  // Row 5
            'img/grey_brick.png',  // Row 4
            'img/grey_brick.png',  // Row 3
            'img/grey_brick.png',  // Row 2
            'img/rock_path.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 8) { // elves
        rowImages = [
            'img/grass_light.png',  // Row 6 - Top row - Advances to next level
            'img/grass_red.png',    // Row 5
            'img/grass_yellow.png', // Row 4
            'img/grass_blue.png',   // Row 3
            'img/grass_dark.png',   // Row 2
            'img/grass_light.png'   // Row 1 - Bottom Row
        ];
      } else if (player.level === 9) { // centaurs
        rowImages = [
            'img/sand_dark.png',     // Row 6 - Top row
            'img/grass_yellow.png',  // Row 5
            'img/grass_red.png',     // Row 4
            'img/grass_blue.png',    // Row 3
            'img/grass_dark.png',    // Row 2
            'img/grass_light.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 10) { // ogres and cyclops
        rowImages = [
            'img/ocean.png',     // Row 6 - Top row
            'img/sand_light.png',  // Row 5
            'img/sand_light.png',     // Row 4
            'img/sand_light.png',    // Row 3
            'img/sand_dark.png',    // Row 2
            'img/sand_dark.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 11) { // sea creatures 1
        rowImages = [
            'img/ocean_deep_dark.png',     // Row 6 - Top row
            'img/ocean_deep.png',  // Row 5
            'img/ocean_deep.png',     // Row 4
            'img/ocean_deep.png',    // Row 3
            'img/ocean_deep.png',    // Row 2
            'img/ocean_bubbles.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 12) { // naga ocean 1
        rowImages = [
            'img/ocean_light.png',     // Row 6 - Top row
            'img/ocean_deep_dark.png',  // Row 5
            'img/ocean_deep_dark.png',     // Row 4
            'img/ocean_deep_dark.png',    // Row 3
            'img/ocean_deep_dark.png',    // Row 2
            'img/ocean_deep.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 13) { // naga city
        rowImages = [
            'img/ocean_light.png',     // Row 6 - Top row
            'img/aqua_brick.png',  // Row 5
            'img/aqua_brick.png',     // Row 4
            'img/aqua_brick.png',    // Row 3
            'img/aqua_brick.png',    // Row 2
            'img/ocean_light.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 14) { // sea creatures 2
        rowImages = [
            'img/ocean.png',     // Row 6 - Top row
            'img/ocean_deep_dark.png',  // Row 5
            'img/ocean_deep_dark.png',     // Row 4
            'img/ocean_deep_dark.png',    // Row 3
            'img/ocean_deep_dark.png',    // Row 2
            'img/ocean_light.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 15) { // lizards and snakes
        rowImages = [
            'img/grass_jungle.png',     // Row 6 - Top row
            'img/shore_jungle_top.png',  // Row 5
            'img/sand_dark.png',     // Row 4
            'img/sand_dark.png',    // Row 3
            'img/sand_dark.png',    // Row 2
            'img/ocean.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 16) { // trolls
        rowImages = [
            'img/badlands_gold.png',     // Row 6 - Top row
            'img/badlands_green.png',  // Row 5
            'img/badlands_green.png',     // Row 4
            'img/badlands_green.png',    // Row 3
            'img/badlands_green.png',    // Row 2
            'img/grass_jungle.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 17) { // imps
        rowImages = [
            'img/badlands_jungle.png',     // Row 6 - Top row
            'img/badlands_orange.png',  // Row 5
            'img/badlands_orange.png',     // Row 4
            'img/badlands_orange.png',    // Row 3
            'img/badlands_orange.png',    // Row 2
            'img/badlands_gold.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 18) { // elementals
        rowImages = [
            'img/grey_brick_cracked.png',     // Row 6 - Top row
            'img/badlands_jungle.png',  // Row 5
            'img/badlands_jungle.png',     // Row 4
            'img/badlands_jungle.png',    // Row 3
            'img/badlands_jungle.png',    // Row 2
            'img/badlands_green.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 19) { // abominations
        rowImages = [
            'img/rock_white.png',     // Row 6 - Top row
            'img/sand_white.png',  // Row 5
            'img/sand_white.png',     // Row 4
            'img/sand_white.png',    // Row 3
            'img/rock_white.png',    // Row 2
            'img/grey_brick_cracked.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 20) { // skeletons
        rowImages = [
            'img/brick_black.png',     // Row 6 - Top row
            'img/badlands_black.png',  // Row 5
            'img/badlands_black_bloody.png',     // Row 4
            'img/badlands_black_bloody.png',    // Row 3
            'img/badlands_black.png',    // Row 2
            'img/rock_white.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 21) { // ghosts
        rowImages = [
            'img/blue_block_unmarked.png',     // Row 6 - Top row
            'img/brick_fine_black.png',  // Row 5
            'img/brick_fine_black_mossy.png',     // Row 4
            'img/brick_fine_black_mossy.png',    // Row 3
            'img/brick_fine_black.png',    // Row 2
            'img/brick_black.png'   // Row 1 - Bottom Row
        ];
      } else if (player.level === 22) { // gargoyles
        rowImages = [
            'img/badlands_red.png',     // Row 6 - Top row
            'img/blue_block_face.png',  // Row 5
            'img/blue_block_cracked.png',     // Row 4
            'img/blue_block_cracked.png',    // Row 3
            'img/blue_block_face.png',    // Row 2
            'img/blue_block_unmarked.png'   // Row 1 - Bottom Row
        ];
      } else if (player.level === 23) { // dragonkin
        rowImages = [
            'img/hellscape.png',     // Row 6 - Top row
            'img/blackrock.png',  // Row 5
            'img/brick_vine.png',     // Row 4
            'img/brick_vine.png',    // Row 3
            'img/blackrock.png',    // Row 2
            'img/badlands_red.png'   // Row 1 - Bottom Row
        ];
      } else if (player.level === 24) { // demons
        rowImages = [
            'img/hellscape.png',     // Row 6 - Top row
            'img/blackrock.png',  // Row 5
            'img/blackrock.png',     // Row 4
            'img/blackrock.png',    // Row 3
            'img/blackrock.png',    // Row 2
            'img/hellscape.png'   // Row 1 - Bottom Row
        ];
      } else if (player.level === 25) { // dragons
        rowImages = [
            'img/end_stone.png',     // Row 6 - Top row
            'img/blackrock.png',  // Row 5
            'img/blackrock.png',     // Row 4
            'img/blackrock.png',    // Row 3
            'img/hellscape.png',    // Row 2
            'img/hellscape.png'   // Row 1 - Bottom Row
        ];
      }

  var  numRows = 6,
       numCols = 7,
       row, col;

  /* Loop through the number of rows and columns we've defined above
   * and, using the rowImages array, draw the correct image for that
   * portion of the "grid"
   */
  for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
          /* The drawImage function of the canvas' context element
           * requires 3 parameters: the image to draw, the x coordinate
           * to start drawing and the y coordinate to start drawing.
           * We're using our Resources helpers to refer to our images
           * so that we get the benefits of caching these images, since
           * we're using them over and over.
           */
          ctx.drawImage(Resources.get(rowImages[row]), (col * 128) + 32, (row * 128) + 64);
      }
  }
}

function renderGateBorder() {
  // draw ui background top left side
 var  numTopLeftCols = 5,
      topLeftCol;
       for (topLeftCol = 0; topLeftCol < numTopLeftCols; topLeftCol++) {
         ctx.drawImage(Resources.get('img/grey_border_block.png'), (topLeftCol * 64), 0);
       }

  // draw ui background top right side
 var  numTopRightCols = 5,
      topRightCol;
       for (topRightCol = 0; topRightCol < numTopRightCols; topRightCol++) {
         ctx.drawImage(Resources.get('img/grey_border_block.png'), (topRightCol * 64) + 640, 0);
       }

 // draw ui background bottom side (black coloring within the gate)
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 830, 906, 896);

 // draw ui left
  var  numLeftRows = 24,
       leftRow;
       for (leftRow = 0; leftRow < numLeftRows; leftRow++) {
       ctx.drawImage(Resources.get('img/grey_border_block_small.png'), 0, (leftRow * 32) + 64);
     }

 // draw ui right
 var numRightRows = 24,
     rightRow;
     for (rightRow = 0; rightRow < numRightRows; rightRow++) {
       ctx.drawImage(Resources.get('img/grey_border_block_small.png'), 928, (rightRow * 32) + 64);
     }

     // draw gate at top middle of screen
     ctx.drawImage(Resources.get('img/gate_three_blocks.png'), 320, 0);
     if (player.level > 1) {
      // draw gate at bottom middle of screen is player is above level 1
      ctx.drawImage(Resources.get('img/gate_three_blocks.png'), 320, 832);

      // draw ui background bottom left side
     var  numTopLeftCols = 5,
          topLeftCol;
           for (topLeftCol = 0; topLeftCol < numTopLeftCols; topLeftCol++) {
             ctx.drawImage(Resources.get('img/grey_border_block.png'), (topLeftCol * 64), 832);
           }

      // draw ui background bottom right side
    var numTopRightCols = 5,
        topRightCol;
           for (topRightCol = 0; topRightCol < numTopRightCols; topRightCol++) {
             ctx.drawImage(Resources.get('img/grey_border_block.png'), (topRightCol * 64) + 640, 832);
           }

    } else if (player.level <= 1) {
      // draw solid border at bottom if player is below level 2
      var numBotCols = 15,
          botCol;
            for (botCol = 0; botCol < numBotCols; botCol++) {
              ctx.drawImage(Resources.get('img/grey_border_block.png'), (botCol * 64) + 0, 832);
            }
    }
}

function renderSolidBorder() {

  var numBotCols = 15,
      botCol;
    for (botCol = 0; botCol < numBotCols; botCol++) {
      ctx.drawImage(Resources.get('img/grey_border_block.png'), (botCol * 64) + 0, 832);
    }
  // draw top border
  var numTopCols = 15,
      topCol;
      for (topCol = 0; topCol < numTopCols; topCol++) {
        ctx.drawImage(Resources.get('img/grey_border_block.png'), (topCol * 64) + 0, 0);
      }
    // draw ui left
  var numLeftRows = 24,
      leftRow;
      for (leftRow = 0; leftRow < numLeftRows; leftRow++) {
        ctx.drawImage(Resources.get('img/grey_border_block_small.png'), 0, (leftRow * 32) + 64);
      }

    // draw ui right
  var numRightRows = 24,
      rightRow;
      for (rightRow = 0; rightRow < numRightRows; rightRow++) {
        ctx.drawImage(Resources.get('img/grey_border_block_small.png'), 928, (rightRow * 32) + 64);
      }

}

function renderStartScreen() {
  // Draw main background
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 960, 896);

  // Draw game name
  ctx.font = '56pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Dungeon Dash', 260, 200);
  ctx.fillStyle = 'yellow';
  ctx.fillText('Dungeon Dash', 260, 200);
  // Draw line underneath game name
  ctx.beginPath();
  ctx.moveTo(230, 212);
  ctx.lineTo(730, 212);
  ctx.strokeStyle = 'yellow';
  ctx.lineWidth = 5;
  ctx.stroke();
  // draw Ty Sabs logo
  ctx.font = "12pt Impact";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('© Ty Sabs 2016', 824, 820);
  ctx.fillStyle = 'cyan';
  ctx.fillText('© Ty Sabs 2016', 824, 820);
  // draw url
  ctx.strokeText('tysabs.com', 40, 820);
  ctx.fillStyle = 'cyan';
  ctx.fillText('tysabs.com', 40, 820);
  // draw line underneath url
  ctx.beginPath();
  ctx.moveTo(36, 825);
  ctx.lineTo(120, 825);
  ctx.strokeStyle = 'cyan';
  ctx.lineWidth = 3;
  ctx.stroke();


    // select class message
  ctx.font = '36pt Ravi Prakash';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Select your class:', 320, 278);
  ctx.fillStyle = 'red';
  ctx.fillText('Select your class:', 320, 278);

  // select class instructions
  ctx.font = '24pt Ravi Prakash';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'white';
  ctx.strokeText('Use \'left\' or \'right\' keys to switch classes', 260, 650);
  ctx.fillText('Use \'left or \'right\' keys to switch classes', 260, 650);
  // press enter instructions
  ctx.fillStyle = 'yellow';
  ctx.strokeText('Press \'enter\' to choose a class and start game', 220, 720);
  ctx.fillText('Press \'enter\' to choose a class and start game', 220, 720);
  // music button instructions
  ctx.fillStyle = 'red';
  ctx.strokeText('Press \'m\' to play/pause music', 316, 790);
  ctx.fillText('Press \'m\' to play/pause music', 316, 790);

  // Draw class box
  ctx.beginPath();
  ctx.fillStyle = "grey";
  ctx.fillRect(380, 290, 180, 200);
  // draw class sprite
  ctx.drawImage(Resources.get(player.sprite), 402, 320);

  // draw class name section
  // set class name font style
  ctx.font = '20pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'yellow';

  // conditional to align class names characters 10+ long
  if (player.classes[player.classIndex].className.length >= 10) {
    ctx.strokeText(player.classes[player.classIndex].className, 400, 476);
    ctx.fillText(player.classes[player.classIndex].className, 400, 476);

  // conditional to align class names characters 8+ long
  } else if (player.classes[player.classIndex].className.length >= 8) {
    ctx.strokeText(player.classes[player.classIndex].className, 412, 476);
    ctx.fillText(player.classes[player.classIndex].className, 412, 476);

      // conditional to align class names characters 7 characters long
  } else if (player.classes[player.classIndex].className.length === 7) {
    ctx.strokeText(player.classes[player.classIndex].className, 422, 476);
    ctx.fillText(player.classes[player.classIndex].className, 422, 476);

      // conditional to align class names characters 5-6 long
  } else if (player.classes[player.classIndex].className.length >= 5) {
    ctx.strokeText(player.classes[player.classIndex].className, 432, 476);
    ctx.fillText(player.classes[player.classIndex].className, 432, 476);

      // conditional to align class names characters 4- short
  } else {
    ctx.strokeText(player.classes[player.classIndex].className, 440, 476);
    ctx.fillText(player.classes[player.classIndex].className, 440, 476);
  }
}

function renderStatistics() {
  // draw level background
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(854, 14, 96, 38);
  // draw level text
  ctx.font = '18pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Level: ' + player.level, 860, 40);
  ctx.fillStyle = 'yellow';
  ctx.fillText('Level: ' + player.level, 860, 40);

  // draw score background
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(14, 14, 124, 38);
  // draw score text
  ctx.font = '18pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Score: ' + player.score, 20, 40);
  ctx.fillStyle = 'yellow';
  ctx.fillText('Score: ' + player.score, 20, 40);

  // draw lives background box
  if (player.lives < 4) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(12, 844, 180, 40);
  } else if (player.lives === 4) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(12, 844, 200, 40);
  } else if (player.lives === 5) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(12, 844, 226, 40);
  } else if (player.lives === 6) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(12, 844, 252, 40);
  } else if (player.lives === 7) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(12, 844, 278, 40);
  } else if (player.lives === 8) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(12, 844, 304, 40);
  }

  // draw lives ///////////////////////////
  ctx.font = '24pt Arial';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Lives:', 16, 875);
  ctx.fillStyle = 'red';
  ctx.fillText('Lives:', 16, 875);
  if (player.lives === 1) {
   ctx.drawImage(Resources.get('img/heart.png'), 90, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 90, 832);
  } else if (player.lives === 2) {
   ctx.drawImage(Resources.get('img/heart.png'), 90, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 115, 832);
  } else if (player.lives === 3) {
   ctx.drawImage(Resources.get('img/heart.png'), 90, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 115, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 140, 832);
 } else if (player.lives === 4) {
   ctx.drawImage(Resources.get('img/heart.png'), 90, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 115, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 140, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 165, 832);
 } else if (player.lives === 5) {
   ctx.drawImage(Resources.get('img/heart.png'), 90, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 115, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 140, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 165, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 190, 832);
 } else if (player.lives === 6) {
   ctx.drawImage(Resources.get('img/heart.png'), 90, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 115, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 140, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 165, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 190, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 215, 832);
 } else if (player.lives === 7) {
   ctx.drawImage(Resources.get('img/heart.png'), 90, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 115, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 140, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 165, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 190, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 215, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 240, 832);
 } else if (player.lives === 8) {
   ctx.drawImage(Resources.get('img/heart.png'), 90, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 115, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 140, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 165, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 190, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 215, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 240, 832);
   ctx.drawImage(Resources.get('img/heart.png'), 265, 832);
  }
}

function renderPauseScreen() {

  // Draw Pause box
  ctx.beginPath();
  ctx.fillStyle = "grey";
  ctx.globalAlpha = 0.08;
  ctx.fillRect(192, 256, 576, 384);
  ctx.globalAlpha = 1;

  // Draw game name
  ctx.font = '56pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Game Paused', 280, 360);
  ctx.fillStyle = 'yellow';
  ctx.fillText('Game Paused', 280, 360);

  // draw unpause instructions
  ctx.font = '24pt Arial';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'yellow';
  ctx.strokeText('Press \'space\' to unpause game', 260, 500);
  ctx.fillText('Press \'space\' to unpause game', 260, 500);

  // draw reset instructions
  ctx.font = '24pt Arial';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'yellow';
  ctx.strokeText('Press \'enter\' to reset game', 290, 570);
  ctx.fillText('Press \'enter\' to reset game', 290, 570);
}

function renderCollideScreen() {
  // draw blood on player
  ctx.globalAlpha = 0.05;
  ctx.drawImage(Resources.get("img/blood_pool.png"), player.x, player.y);

  // Draw Pause box
  ctx.beginPath();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = "grey";
  ctx.fillRect(192, 256, 576, 448);
  ctx.globalAlpha = 1;

  // Draw game name
  ctx.font = '36pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('You have been killed!', 260, 360);
  ctx.fillStyle = 'yellow';
  ctx.fillText('You have been killed!', 260, 360);

  ctx.drawImage(Resources.get("img/skull.png"), 400, 404);


  // draw restart level instructions
  ctx.font = '24pt Arial';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'yellow';
  ctx.strokeText('Press \'space\' to restart level', 270, 590);
  ctx.fillText('Press \'space\' to restart level', 270, 590);


  // draw lives remaining
  ctx.font = '18pt Arial';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'red';
  ctx.strokeText('Lives Remaining: ' + player.lives, 550, 680);
  ctx.fillText('Lives Remaining: ' + player.lives, 550, 680);
}

function renderGameOverScreen() {
  ctx.drawImage(Resources.get('img/skull_large.png'), 32, 32);
  renderSolidBorder();

  // draw level background
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(854, 14, 90, 38);
  // draw level text
  ctx.font = '18pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Level: ' + player.level, 860, 40);
  ctx.fillStyle = 'yellow';
  ctx.fillText('Level: ' + player.level, 860, 40);

  // draw score background
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(14, 14, 124, 38);
  // draw score text
  ctx.font = '18pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Score: ' + player.score, 20, 40);
  ctx.fillStyle = 'yellow';
  ctx.fillText('Score: ' + player.score, 20, 40);

  // Draw game over words
  ctx.font = '84pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Game Over', 240, 180);
  ctx.fillStyle = 'red';
  ctx.fillText('Game Over', 240, 180);

  // draw reset instructions
  ctx.font = '36pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'yellow';
  ctx.strokeText('Press \'enter\' to reset game', 220, 420);
  ctx.fillText('Press \'enter\' to reset game', 220, 420);

  renderCredits();
}

function renderVictoryScreen() {

  // Draw main background
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 960, 896);

  // Draw game name
  ctx.font = '56pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Victory is Yours!', 230, 200);
  ctx.fillStyle = 'white';
  ctx.fillText('Victory is Yours!', 230, 200);
  // Draw line underneath game name
  ctx.beginPath();
  ctx.moveTo(200, 212);
  ctx.lineTo(750, 212);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;

  // draw victory message
  ctx.stroke();
  ctx.font = "24pt Ravi Prakash";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;

  // line 1 of victory msg
  ctx.strokeText('Our hero has reached the end of their journey', 180, 300);
  ctx.fillStyle = 'yellow';
  ctx.fillText('Our hero has reached the end of their journey.', 180, 300);
  // line 2 of victory msg
  ctx.strokeText('But in a way, they are just beginning.', 200, 340);
  ctx.fillText('But in a way, they are just beginning.', 200, 340);
  // line 4 of victory message
  ctx.strokeText('Young Adventurer, you must use what little power you have.', 100, 380);
  ctx.fillText('Young Adventurer, you must use what little power you have.', 100, 380);
  // line 4 of victory message
  ctx.strokeText('To save the world, and bring love to the people.', 176, 420);
  ctx.fillText('To save the world, and bring love to the people.', 176, 420);

  // press enter instructions
  ctx.font = '24pt Ravi Prakash';
  ctx.fillStyle = 'red';
  ctx.strokeText('Press \'enter\' to reset game', 300, 500);
  ctx.fillText('Press \'enter\' to reset game', 300, 500);

  renderCredits();

}

function renderCredits() {
  // draw credits background
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(240, 604, 460, 224);

  // draw credits
  ctx.font = '36pt Impact';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Credits:', 390, 662);
  ctx.fillStyle = 'white';
  ctx.fillText('Credits:', 390, 662);
  // Draw line underneath game name
  ctx.beginPath();
  ctx.moveTo(386, 670);
  ctx.lineTo(550, 670);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;
  ctx.stroke();


  // credits font
  ctx.font = '12pt Arial';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'cyan';
  // line 1 of credits
  ctx.strokeText('Made by Ty Sabs', 410, 700);
  ctx.fillText('Made by Ty Sabs', 410, 700);
  // line 2 of credits
  ctx.strokeText('Udacity Front-End Web Developer Nanodegree Program', 270, 730);
  ctx.fillText('Udacity Front-End Web Developer Nanodegree Program', 270, 730);
  // line 3 of credits
  ctx.strokeText('Graphics and sound effects supplied by OpenGameArt.org', 256, 760);
  ctx.fillText('Graphics and sound effects supplied by OpenGameArt.org', 256, 760);
  // line 4 of credits
  ctx.strokeText('Music provided by Edward Shallow at freemusicarchive.org', 254, 790);
  ctx.fillText('Music provided by Edward Shallow at freemusicarchive.org', 254, 790);

  // line 5 of credits
  ctx.strokeText('View readme for more info on credits', 340, 820);
  ctx.fillText('View readme for more info on credits', 340, 820);

  // draw Ty Sabs logo
  ctx.font = "12pt Impact";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('© Ty Sabs 2016', 824, 820);
  ctx.fillStyle = 'cyan';
  ctx.fillText('© Ty Sabs 2016', 824, 820);
  // draw url
  ctx.strokeText('tysabs.com', 40, 820);
  ctx.fillStyle = 'cyan';
  ctx.fillText('tysabs.com', 40, 820);
  // draw line underneath url
  ctx.beginPath();
  ctx.moveTo(36, 825);
  ctx.lineTo(120, 825);
  ctx.strokeStyle = 'cyan';
  ctx.lineWidth = 3;
  ctx.stroke();
}

/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        gameArea = doc.createElement('div'),
        musicButton = doc.createElement('button'),
        ctx = canvas.getContext('2d'),
        lastTime;

    // set game area dimensions
    // Dungeon Frogger is set to a 128x128 grid
    canvas.width = 960;
    canvas.height = 896;

    // add game display elements to html document
    doc.body.appendChild(gameArea);
    gameArea.appendChild(canvas);


    gameArea.setAttribute("id", "game-area");
    canvas.setAttribute("id", "game-canvas");



    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        // this conditional controls different game states
        // e.g. pause, collision, and game over events
        if (player.gamePaused === true) {
          renderPauseScreen();
        } else if (player.collided === true) {
          renderCollideScreen();
        } else if (player.gameOver === true) {
          renderGameOverScreen();
        } else {
          /* Call our update/render functions, pass along the time delta to
           * our update function since it may be used for smooth animation.
           */
          update(dt);
          render();
        }
        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
      if (player.level === 0) {
       // display Start screen
       renderStartScreen();
       renderGateBorder();
     } else if (player.level === 26) {
       // display Victory Screen
       renderVictoryScreen();
       renderSolidBorder();
     } else {
       // displays the game tiles, definition is in levelBuilder.js
       renderWorld();
       // invoke renderEntities before ui so monsters display on top layer
       // renderEntities definition is in levelBuilder.js
       renderEntities();
       // render UI above world and entities
       renderGateBorder();
       // render statistics above the border
       renderStatistics();
      }
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    /////////////////////////////////////////////////////////////////
    // All sprites for this game came from one tileset
    // Source: OpenArt.org
    // url='http://opengameart.org/content/dungeon-crawl-32x32-tiles'
    // Note: All images added to game must be called by Resources.load()
    Resources.load([
        'img/heart.png',
        // terrain section
        'img/grey_border_block.png',
        'img/grey_border_block_small.png',
        'img/gate_three_blocks.png',
        'img/grey_brick.png',
        'img/grey_brick_cracked.png',
        'img/rock_path.png',
        'img/rock_white.png',
        'img/ocean.png',
        'img/ocean_light.png',
        'img/ocean_bubbles.png',
        'img/ocean_deep.png',
        'img/ocean_deep_dark.png',
        'img/aqua_brick.png',
        'img/shore_top.png',
        'img/shore_bottom.png',
        'img/shore_jungle_top.png',
        'img/shore_jungle_bottom.png',
        'img/sand_brick.png',
        'img/sand_light.png',
        'img/sand_bright.png',
        'img/sand_dark.png',
        'img/sand_white.png',
        'img/grass_red.png',
        'img/grass_blue.png',
        'img/grass_yellow.png',
        'img/grass_light.png',
        'img/grass_dark.png',
        'img/grass_jungle.png',
        'img/badlands_green.png',
        'img/badlands_gold.png',
        'img/badlands_yellow.png',
        'img/badlands_orange.png',
        'img/badlands_jungle.png',
        'img/badlands_black.png',
        'img/badlands_black_bloody.png',
        'img/badlands_red.png',
        'img/brick_black.png',
        'img/brick_fine_black.png',
        'img/brick_fine_black_mossy.png',
        'img/blue_block_unmarked.png',
        'img/blue_block_cracked.png',
        'img/blue_block_face.png',
        'img/blackrock.png',
        'img/brick_vine.png',
        'img/hellscape.png',
        'img/end_stone.png',
        // enemy section
        'img/snail.png',
        'img/scorpion.png',
        'img/beetle.png',
        'img/centipede.png',
        'img/ant_worker.png',
        'img/ant_soldier.png',
        'img/mosquito.png',
        'img/larva_orange.png',
        'img/larva_grey.png',
        'img/brain_bug.png',
        'img/roach.png',
        'img/spider.png',
        'img/hornet.png',
        'img/firefly.png',
        'img/moth.png',
        'img/goblin_fighter.png',
        'img/goblin_warrior.png',
        'img/goblin_mage.png',
        'img/goblin_sorc.png',
        'img/worg_warrior.png',
        'img/worg_mage.png',
        'img/worg_rogue.png',
        'img/elf_warrior.png',
        'img/elf_mage.png',
        'img/elf_priest.png',
        'img/elf_necromancer.png',
        'img/centaur_archer_orange.png',
        'img/centaur_archer_red.png',
        'img/centaur_xbow_brown.png',
        'img/centaur_xbow_grey.png',
        'img/ogre_two.png',
        'img/ogre_witch.png',
        'img/cyclops_warrior.png',
        'img/cyclops_officer.png',
        'img/octopus.png',
        'img/jellyfish.png',
        'img/dolphin.png',
        'img/naga_warrior_left.png',
        'img/naga_warrior_right.png',
        'img/naga_mage_left.png',
        'img/naga_mage_right.png',
        'img/naga_rogue_left.png',
        'img/naga_rogue_right.png',
        'img/naga_fighter_left.png',
        'img/naga_fighter_right.png',
        'img/naga_soothsayer_left.png',
        'img/naga_soothsayer_right.png',
        'img/naga_siren_left.png',
        'img/naga_siren_right.png',
        'img/squidman_left.png',
        'img/squidman_right.png',
        'img/turtle.png',
        'img/spiked_turtle.png',
        'img/eel_left.png',
        'img/eel_right.png',
        'img/anemone.png',
        'img/crocodile.png',
        'img/snake_white_stripe.png',
        'img/gecko.png',
        'img/lizard.png',
        'img/giant_serpent.png',
        'img/troll_blue.png',
        'img/troll_grey.png',
        'img/troll_green.png',
        'img/troll_red.png',
        'img/troll_black.png',
        'img/troll_white.png',
        'img/imp_purple.png',
        'img/imp_red.png',
        'img/imp_enchanted.png',
        'img/imp_black.png',
        'img/imp_master.png',
        'img/elemental_fire.png',
        'img/elemental_steel.png',
        'img/elemental_rock.png',
        'img/elemental_ice.png',
        'img/elemental_flesh.png',
        'img/elemental_lightning.png',
        'img/abomination_red.png',
        'img/abomination_green.png',
        'img/abomination_brown.png',
        'img/abomination_orange.png',
        'img/abomination_pink.png',
        'img/abomination_yellow.png',
        'img/skeleton_dancing.png',
        'img/skeleton_king.png',
        'img/skeleton_soldier.png',
        'img/skeleton_centaur.png',
        'img/skeleton_priest.png',
        'img/skeleton_snake.png',
        'img/skeleton_bird.png',
        'img/skeleton_hound.png',
        'img/skeleton_hydra.png',
        'img/skeleton_dragon.png',
        'img/dragonkin_white.png',
        'img/dragonkin_red.png',
        'img/dragonkin_purple.png',
        'img/dragonkin_orange.png',
        'img/dragonkin_gold.png',
        'img/dragonkin_black.png',
        'img/dragonkin_violet.png',
        'img/dragonkin_green.png',
        'img/demon_knight.png',
        'img/demon_green.png',
        'img/demon_black.png',
        'img/demon_happy.png',
        'img/gazer_red.png',
        'img/gazer_purple.png',
        'img/balrog_lesser.png',
        'img/balrog_greater.png',
        // hero section
        'img/hero_knight.png',
        'img/hero_sorceress.png',
        'img/hero_mage.png',
        'img/hero_scribe.png',
        'img/hero_templar.png',
        'img/hero_oracle.png',
        'img/hero_priest.png',
        'img/hero_monk.png',
        'img/hero_rogue.png',
        'img/hero_enchantress.png',
        'img/hero_paladin.png',
        'img/hero_berserker.png',
        'img/hero_ninja.png',
        'img/hero_engineer.png',
        'img/spirit_blue.png',
        'img/spirit_red.png',
        'img/ghost.png',
        'img/ghast.png',
        'img/banshee_green.png',
        'img/banshee_octopus.png',
        'img/banshee_blue.png',
        'img/banshee.png',
        'img/spirit_transparent.png',
        'img/gargoyle_white.png',
        'img/gargoyle_red.png',
        'img/gargoyle_black.png',
        'img/gargoyle_ice.png',
        'img/dragon_blue.png',
        'img/dragon_camo.png',
        'img/dragon_black.png',
        'img/dragon_gold.png',
        'img/dragon_pink.png',
        'img/dragon_white.png',
        'img/dragon_green.png',
        'img/dragon_fire.png',
        // obstacle section
        'img/tree_gold.png',
        'img/tree_red.png',
        'img/rock.png',
        'img/bell.png',
        'img/obstacle_severed_head.png',
        'img/obstacle_skull_pile.png',
        'img/obstacle_skeleton_chain.png',
        'img/obstacle_statue.png',
        'img/skull.png',
        'img/skull_large.png',
        'img/blood_pool.png',
        'img/extra_life.png'

    ]);

    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
