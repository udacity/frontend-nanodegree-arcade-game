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
      levelThree.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 4) {
      levelFour.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 5) {
      levelFive.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 6) {
      levelSix.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 7) {
      levelSeven.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 8) {
      levelEight.forEach(function(enemy) {
        enemy.render();
      });
    } else if (player.level === 9) {
      levelNine.forEach(function(enemy) {
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
    }


    player.update();
}

//////////////////////////////////////
// Place tiles for each level
function renderWorld() {
  var rowImages = [];
      if (player.level == 1) {
        rowImages = [
            'img/grass_light.png',   // Top Row
            'img/grass_dark.png', // Row 2
            'img/grass_dark.png', // Row 3
            'img/grass_dark.png', // Row 4
            'img/grass_light.png', // Row 5
            'img/grass_light.png' // Row 6 Starting location
        ];
      } if (player.level == 2) {
        rowImages = [
            'img/sand_light.png',   // Top Row - Advances to next level
            'img/grass_red.png', // Row 2 - Centipedes
            'img/grass_blue.png', // Row 3 - Roaches
            'img/grass_yellow.png', // Row 4 - Spiders
            'img/grass_light.png', // Row 5
            'img/grass_light.png' // Row 6 Starting location
        ];
      } if (player.level == 3) {
        rowImages = [
            'img/grass_yellow.png',   // Top Row - Advances to next level
            'img/sand_light.png', // Row 2
            'img/sand_light.png', // Row 3
            'img/sand_light.png', // Row 4
            'img/grass_light.png', // Row 5
            'img/grass_light.png' // Row 6 Starting location
        ];
      } if (player.level == 4) {
        rowImages = [
            'img/sand_light.png',   // Top Row - Advances to next level
            'img/grass_light.png', // Row 2
            'img/grass_light.png', // Row 3
            'img/grass_light.png', // Row 4
            'img/grass_red.png', // Row 5
            'img/grass_blue.png' // Row 6 Starting location
        ];
      } else if (player.level == 5) {
        rowImages = [
            'img/rock_path.png',   // Top row
            'img/sand_brick.png',   // Row 2
            'img/sand_brick.png',   // Row 3
            'img/sand_brick.png',   // Row 4
            'img/sand_light.png',   // Row 5
            'img/sand_light.png'    // Row 6 - Bottom Row
        ];
      } else if (player.level == 6) {
        rowImages = [
            'img/rock_path.png',   // Top row
            'img/sand_dark.png',  // Row 2
            'img/sand_dark.png',   // Row 3
            'img/sand_dark.png',   // Row 4
            'img/sand_light.png',   // Row 5
            'img/rock_path.png',    // Row 6 - Bottom Row
        ];
      } else if (player.level == 7) {
        rowImages = [
            'img/grass_dark.png',   // Top row
            'img/grey_brick.png',  // Row 2
            'img/grey_brick.png',   // Row 3
            'img/grey_brick.png',   // Row 4
            'img/grey_brick.png',   // Row 5
            'img/rock_path.png'    // Row 6 - Bottom Row
        ];
      } else if (player.level == 8 || player.level == 9) {
        rowImages = [
            'img/grass_light.png',        // Top row
            'img/grass_red.png',    // Row 2
            'img/grass_yellow.png', // Row 3
            'img/grass_blue.png',   // Row 4
            'img/grass_dark.png',  // Row 5
            'img/grass_light.png'    // Row 6 - Bottom Row
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
