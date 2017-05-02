#Frogger Arcade Game

##Summary

Frogger arcade game is a small game created during Udacity's Front-End Web Developer Nanodegree Program.
The project's framework was forked from [here](https://github.com/udacity/frontend-nanodegree-arcade-game) and 
the following [criteria](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub) had to be meet. 
Additional functionality was added to see how javascript works with HTML5 Canvas.

This game uses HTML5 Canvas, CSS3 and Javascript.


##Setup

To run the game, clone or download the repo and run the index.html.
* Use Google Chrome Browser for the best experience.


##How to Play

###Objective
The objective of the game is to move the Hero from the starting position to the top most tile (Water) while avoiding the Enemies.

Upon reaching the top, you're awarded 500 points.

You have 5 lives. Every collision with an enemy will cost you a life. Once you lose all 5, you have to restart.

###Controls

Use the left and right key to chose the Hero and press enter to select.
After selecting the Hero, use the arrow keys to move to your destination.


##For The Developer

###Modifications

If you want to modify the game, the bellow are some examples of what you can do.

####In js/app.js

* Under Lives.reset, modify numLives to increase or decrease the amount of lives a player starts with.
* Add more enemies by adding Enemy objects to the allEnemies array. 
  * You can vary the speed of each enemy by setting a suggested value of 1-3 when instantiating  new Enemy.
* There are more sprite images under the images folder, feel free to implement any one of them. Just make sure to load the image first by adding it to
Resources.load under js/engine.js


##Note From the Developer

I had a lot of fun implementing the requirments and thinking of how to make the game more enjoyable.
The truth is there was so much more i could do like creating levels, increasing the difficulty of the monsters/bugs, adding
features features such as a jump (jumping two tiles instead of moving up one), and the list goes on but i think i reached a point where i can say that i learned what the course was trying to teach me about HTML5 with Canvas and Javascript.

Enjoy!
