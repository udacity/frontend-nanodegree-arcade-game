# Front End Nanodegree Arcade Game Project
===============================
## Project Overview
You will be provided with visual assets and a game loop engine.  Using these tools, add a number of entities to the game including a Player character and enemies(Bugs) to recreate the classic arcade game Frogger.  The Player must move across the game and reach the other side(water).  If the Player collides with an enemy(bug), the player resets to the beginning.   

Use object-oriented function - either class functions(like Player and Enemy) or class prototype functions.  Use the keyword 'this' appropriately within your class and class prototype functions.  Also be sure to update the readme.md file with instructions on how to run and play the game.

Use the [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking prior to submission.  

## Basic Functionality

The player must move left, right, up and down.  

The enemies move at varying speeds.

Once the player reaches the water, the game is won and there is an alert.

### Additional Functionality
Some cool functionalities you can add to your game are:
Allowing the user to select their own character image before starting the game.
Implementing a score for the game such as:
* deducting a life when there is a collision occurs.
* creating collectable items that the player can collect to gain additional points.
* anything else that will make your project Udacious!!!

## Getting Started
An art asset and game engine is provided for you to download or clone from the Udacity repository.  

The repository contains:

* [**CSS**] Folder: contains a style.css file which does NOT need to be edited.

* [**Images**] Folder: contains png images used to display the game.  The player and enemy images are located in this folder.

* [**JS Folder**]:  contains the app.js file, app engine needed to run the game and a resources.js file.  
The app.js file is what you will be editing to build the game.  Additional IMPORTANT information on the app.js file below

as well as the following files:

* [**index.html**]:  opening this file should load the game.

* [**README.md**]: needs to be edited to contain the instructions on how to load and play the game

### app.js 
You will need to implement the Player and Enemy classes using Object-oriented JavaScript.  Part of the Enemy code is provided to you and you will need to complete the following:

* The Enemy function, which initiates the Enemy by: 
** loading the image by setting this.sprite to the appropriate image in the image folder.
** setting the Enemies initial location (needs to implement this)
** Setting the Enemies initial speed (needs to be implemented)

* Update the method for the Enemy 
** Update the enemy location (needs to be implemented)
** Handles the collision with the Player (needs to be implemented)
** if you want, you can add additional enemy methods

Implement the Player class.  Hint - use the enemy class as an example on how to get started.
Implement:
* the Player function, which initiates the Player by:
** loading the image by setting this.sprite to the appropriate image in the image folder
** setting the Player's initial location

* the update method for the Player (can be similar to the one for the Enemy)
* render method for the Player (use code from the render method for the Enemy)
* the handleInput method, which receives user input, allowedKeys and moves the player according to the input.
** the left arrow key should move the player to the left, right arrow to the right, up arrow up, down arrow down.
** create boundaries that prevent the player from moving off screen.
** if the player reaches the water, reset the player by moving the player back to the initial starting location.

Once Player and Enemy have been implemented, instantiate them by:
* creating a new Player object 
* creating several new Enemy objets and placing them in an array call allEnemies.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).
