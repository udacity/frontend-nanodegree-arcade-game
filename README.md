frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

## Changes for the solution
- Added `GameCharacter` class for common functionality of `Enemy` and `Player` classes. This includes implementation of `render()`, `getNextInstanceId()` and `getBoundingRectangle()`. `getNextInstanceId()` generates unique id for each new instance.
- `Enemy` class implemented. This inherits `GameCharacter` and adds implementation of `update()`, `resetSpeed()` and `resetPosition()`.
- `Player` class implemented. This inherits `GameCharacter` and adds implementation of `update()`, `handleInput()`, `reset()` and `resetPosition()`. `handleInput()` prevents player from going off-screen.
- Added `Rectangle` class for purpose of collision detection. This includes implementation of `doesOverlap()`.
- Handled collision detection using logic of whether or not bounding rectangle of `player` overlaps with any of `enemy` objects.
- Handled scenario of winning.

## How to Run
- Just open the index.html in chrome web browser.
  OR
- Play the game at [http://fend-game.surge.sh](http://fend-game.surge.sh)