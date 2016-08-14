#Game Programming Basics

You can think of a game as a collection of things, or *entities*. These things are whatever you have on your screen at any given moment. If we look at this game, for instance:  
![Example Game Frame](game.png)

This game is simply a collection of the following things:
* A scrolling background
* A player object
* Six projectile objects (you can only see 5)
* Eight enemy objects
* A GUI (may or may not be an object)
* Whichever other objects you need in order to render these objects and handle inputs.

That's all. The only catch is that each of these *game entities* has to have enough information about its *state* so that the game can know what to do each frame. Also, each entity in he game must have an update() method. We will see why shortly.

A game is basically an infinite loop that runs 30-60 times per second and *calls the update method of all the game entities in existence. Then, once they are all updated, the game calls each entity's render method* so that they all get drawn onto the screen. Therefore, in order to program a projectile, all you need to do is give it a position (x and y coordinates), give it an x velocity, give it a y velocity, give it an update method, and a render method. In the update method, all you need to do is change the x position and y position according to the x velocity and y velocity. For instance, consider this code:

```javascript
//other code hidden
//projectile update function:
function(){
  this.x += this.velx;
  this.y += this.vely;
}
```
And that's it. Then, besides that, all you need in order to make a player that shoots projectiles is, *somewhere* in the player function you detect when the "shoot" button is pressed and then you create a **new Projectile()** with the appropriate x, y, velx, and vely. And that *somewhere* is, of course, in the update function.

To put it in pseudo-code, a game is just this:

```javascript
while(true){
  player.update()
  for each enemy{
    enemy.update()
  }
  for each of the other entities{
    entity.update()
  }
  player.render()
  //render all enemies
  //render other entities
}
```

Each of those update functions, in turn, define the behavior of what tiny little action each entity will take *between the current frame and the next,* as outlined above.

All the things that happen in a game happen within the update methods of various entities. Want your enemies to chase you? Make them do so in their update method. Want your player to shoot projectiles? In his update method, make it so that if a certain key is pressed, a new projectile object is created.
