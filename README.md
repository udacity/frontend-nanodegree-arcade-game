# frontend-nanodegree-arcade-game
Hello! My name is **Paulo Freitas** Nobrega and this is my version of Frontend Nanodegree Arcade Game of Udacity. You can access the rubric of the game at this link: (https://review.udacity.com/#!/projects/2696458597/rubric).

#### Game History
In my version of the game the main character has his town invaded by insects. Your goal avoid insects. But stay tuned! You do not know how to swim, so avoid the water. Perhaps you did not like that idea. Do not worry, I developed a faithful version the rubric of the project. You can get it on this link:

#### How to Play?
As I mentioned, you should divert the insects avoiding falling into the water. When an insect finishes his route, crosses the entire display, a standard amount of points (10 potos) are added to your score. When you reach a new level the game difficulty increases. This is because the speed of insects is proportional to the level of the game. Since the level rises, the insects receive an additional of speed.

When your character is hit by an insect, one of their lives is taken. By the way , you start the game with a default amount of lives (3 lives). If you lose your lives, the game comes to an end. But do not worry, sporadically some bonus appear on the scene. If you rescue them you'll earn scores and extra lives.

The game has no end. Your goal is to exceed their own limits. Beat your record, or the record of his friends, and show that you are a true champion. Good Game!

#### Installation
You can download the **.zip** file directly on this link: (https://github.com/paulofreitasnobrega/frontend-nanodegree-arcade-game/archive/master.zip)

If you prefer to use git:

```git
git clone https://github.com/paulofreitasnobrega/frontend-nanodegree-arcade-game.git
```
# For Developers
Now I will comment on some sections and specific codes.

#### Configuration
In **config.js** you will find the configuration of virtually all parts of the game. You can play and change them, but be warned, it will affect how the game behaves. For this reason, I suggest you learn about the codes involved before making permanent changes. Let's for a simple example:

This is an excerpt of our configuration file. He is responsible for representation of the lines of the scenario. We'll talk more forward scenario. These settings define that we will have a line representing a ground superfice with water, three lines representing a ground superfice with stones and a line representing an area of land with grass.

```javascript
rows: {
    water: 1,
    stone: 3,
    grass: 1
}
```

See results:
[image here]

Let's try a small change and see the result.

```javascript
rows: {
    water: 1,
    stone: 2,
    grass: 2
}
```

[image here]

Nice. Now we have two surfaces of grass.

#### Scenario and Routes
Just above we see a part of the configuration file responsible for the lines of my scenario. But the scenario of the game also features columns. The addition of rows and columns form the backdrop as a whole.
Let's leave the columns a bit aside now and focus on the lines. I want you to imagine these lines as roads connecting point A to point B. Each game insect must travel this road, going from point A to the point B. These imaginary roads are routes of scenario. That is, a point on the Y axis, near the center of each line that defines where each insect should be on the scenario.

The **routes.js** file directly associates these routes, the surfaces of terrain (water, stone, etc). Do you remember the aforementioned setting up? So in that case we would have three routes on the surface of stone. This is very interesting, when we created a new enemy for the game, we have the freedom to define which surfaces this enemy can walk. Look at this example:

```javascript
var MyEnemy = function() {
    // code ...
    this.terrainsSurface = ['stone', 'grass'];
    // code ...
};

Bug.prototype = Object.create(Enemy.prototype);
Bug.prototype.constructor = Bug;
```

This example creates an enemy able to walk the stone surfaces and grass. Cool!
