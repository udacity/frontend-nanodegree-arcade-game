frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

# Memory Game Project

[![MemoryGame last commit](https://img.shields.io/github/last-commit/google/skia.svg)](https://github.com/jdmedlock/arcadegame)
<br/>
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/jdmedlock/arcadegame/)

## Table of Contents

* [Overview](#overview)
* [How to Play](#how-to-play)
* [Player UI Feature](#player-ui-features)
* [Change Log](#change-log)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)

## Overview

The Arcade Game project was created as part of the Exploring JS section of the
[Udacity Front-End Web Developer Nanodegree Program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001). The
purpose of this assignment is to demonstrate mastery of the Javascript classes
and objects, but also to build on creating responsive and accessible web apps.

You can play the game here --> [Arcade Game](https://jdmedlock.github.io/arcadegame/)

## How to Play

This game is a browser-based game similar to the classic
[Frogger](https://en.wikipedia.org/wiki/Frogger) arcade game developed by
Konami in 1981.

In our game the objective is to move the players avatar from the starting point
at the bottom of the game board to the water at the top of the board - without
getting hit by a bug.

The bugs move at varying speeds from left-to-right across the paved lanes on
the board. The player uses keyboard arrow keys to move the avatar left, right,
up and down to move one block at a time.

The game is won when the player's avatar reaches the water. However, if the
avatar collides with a bug the game is lost. At the end of a game they players
score is updated and the avatar is moved to the starting square. A new game can
be started by clicking the 'Start Game' button.

## Player UI Features

In addition to the basic game play several UI components have been implemented
to provide the player with features to improve the overall experience.

* Start Game - This button allows the player to start a new game at any time -
even if the current game is still in progress.

* Save Game - This button allows the cumulative score and gems to be saved to
a file.

* Load Game - This button allows the cumulative score and gems to be restored
from a previously saved file.

* Score - The players score is represented as 'www / ggg' where 'www' is the
number of games won and 'ggg' is the number of games played

* Gems - These are collectibles that are added and removed based on the
players win percentage. A gem is added whenever the players win percentage
advances into the next higher percentile group. A gem is taken away when the win
percentage drops into the next lower percentile groups. There are ten percentile
groups each representing a score of

| Gems Accumulated | Win Percentile |
|:----------------:|:--------------:|
| 0 | 0-9% |
| 1 | 10-19% |
| 2 | 20-29% |
| 3 | 30-39% |
| 4 | 40-49% |
| 5 | 50-59% |
| 6 | 60-69% |
| 7 | 70-79% |
| 8 | 80-89% |
| 9 | 90-99% |
| 10 | 100% |

## Dependencies

This app has the following dependencies

| Module/Library | Environment | Description | Related Files |
|:---------------|:------------|:------------|:--------------|
| NPM            | Development | Package manager | package.json |
| Babel          | Development | Transpiler  | .babelrc |
| WebPack        | Development | Bundler     | webpack.config.js |

To build the production application bundle, `/dist/bundle-app.js` issue the
command `npm run build` from the command line. This bundle must be referenced
in the file `index.html` using the `<script src="dist/bundle-app.js"></script>`
tag at the bottom of the `<body>` section of the source page.

A complete list of libraries and packages used in this app can be found in the
`package.json` file.

## Change Log

For more information see [Change Log](https://github.com/jdmedlock/arcadegame/blob/development/CHANGELOG.md)

## Contributing

See [Contributing](https://github.com/jdmedlock/arcadegame/blob/development/CONTRIBUTING.md)
and our [Collaborator Guide](https://github.com/jdmedlock/arcadegame/blob/development/COLLABORATOR_GUIDE.md).

## Authors

Developers on this project can be found on the [Contributors](https://github.com/jdmedlock/arcadegame/graphs/contributors) page of this repo.

## License

[MIT](https://tldrlegal.com/license/mit-license)

