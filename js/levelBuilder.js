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

    // renders the enemies and obstacles for each level
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
      obstaclesEleven.forEach(function(obstacle) {
        obstacle.render();
      });
      levelEleven.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 12) {
      obstaclesTwelve.forEach(function(obstacle) {
        obstacle.render();
      });
      levelTwelve.forEach(function(enemy) {
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
      } else if (player.level === 9) {
        rowImages = [
            'img/sand_dark.png',     // Row 6 - Top row
            'img/grass_yellow.png',  // Row 5
            'img/grass_red.png',     // Row 4
            'img/grass_blue.png',    // Row 3
            'img/grass_dark.png',    // Row 2
            'img/grass_light.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 10) {
        rowImages = [
            'img/ocean.png',     // Row 6 - Top row
            'img/sand_light.png',  // Row 5
            'img/sand_light.png',     // Row 4
            'img/sand_light.png',    // Row 3
            'img/sand_dark.png',    // Row 2
            'img/sand_dark.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 11) {
        rowImages = [
            'img/ocean_light.png',     // Row 6 - Top row
            'img/ocean_deep.png',  // Row 5
            'img/ocean_deep.png',     // Row 4
            'img/ocean_deep.png',    // Row 3
            'img/ocean_deep.png',    // Row 2
            'img/ocean_bubbles.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 12) {
        rowImages = [
            'img/ocean_light.png',     // Row 6 - Top row
            'img/ocean_deep.png',  // Row 5
            'img/ocean_deep.png',     // Row 4
            'img/ocean_deep.png',    // Row 3
            'img/ocean_deep.png',    // Row 2
            'img/ocean_light.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 13) {
        rowImages = [
            'img/ocean_light.png',     // Row 6 - Top row
            'img/aqua_brick.png',  // Row 5
            'img/aqua_brick.png',     // Row 4
            'img/aqua_brick.png',    // Row 3
            'img/aqua_brick.png',    // Row 2
            'img/ocean_light.png'    // Row 1 - Bottom Row
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
