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
            'img/ocean_deep_dark.png',     // Row 6 - Top row
            'img/ocean_deep.png',  // Row 5
            'img/ocean_deep.png',     // Row 4
            'img/ocean_deep.png',    // Row 3
            'img/ocean_deep.png',    // Row 2
            'img/ocean_bubbles.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 12) {
        rowImages = [
            'img/ocean_light.png',     // Row 6 - Top row
            'img/ocean_deep_dark.png',  // Row 5
            'img/ocean_deep_dark.png',     // Row 4
            'img/ocean_deep_dark.png',    // Row 3
            'img/ocean_deep_dark.png',    // Row 2
            'img/ocean_deep.png'    // Row 1 - Bottom Row
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
      } else if (player.level === 14) {
        rowImages = [
            'img/ocean.png',     // Row 6 - Top row
            'img/ocean_deep_dark.png',  // Row 5
            'img/ocean_deep_dark.png',     // Row 4
            'img/ocean_deep_dark.png',    // Row 3
            'img/ocean_deep_dark.png',    // Row 2
            'img/ocean_light.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 15) {
        rowImages = [
            'img/grass_jungle.png',     // Row 6 - Top row
            'img/shore_jungle_top.png',  // Row 5
            'img/sand_dark.png',     // Row 4
            'img/sand_dark.png',    // Row 3
            'img/sand_dark.png',    // Row 2
            'img/ocean.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 16) {
        rowImages = [
            'img/badlands_gold.png',     // Row 6 - Top row
            'img/badlands_green.png',  // Row 5
            'img/badlands_green.png',     // Row 4
            'img/badlands_green.png',    // Row 3
            'img/badlands_green.png',    // Row 2
            'img/grass_jungle.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 17) {
        rowImages = [
            'img/badlands_jungle.png',     // Row 6 - Top row
            'img/badlands_orange.png',  // Row 5
            'img/badlands_orange.png',     // Row 4
            'img/badlands_orange.png',    // Row 3
            'img/badlands_orange.png',    // Row 2
            'img/badlands_gold.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 18) {
        rowImages = [
            'img/grey_brick_cracked.png',     // Row 6 - Top row
            'img/badlands_jungle.png',  // Row 5
            'img/badlands_jungle.png',     // Row 4
            'img/badlands_jungle.png',    // Row 3
            'img/badlands_jungle.png',    // Row 2
            'img/badlands_green.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 19) {
        rowImages = [
            'img/rock_white.png',     // Row 6 - Top row
            'img/sand_white.png',  // Row 5
            'img/sand_white.png',     // Row 4
            'img/sand_white.png',    // Row 3
            'img/rock_white.png',    // Row 2
            'img/grey_brick_cracked.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 20) {
        rowImages = [
            'img/brick_black.png',     // Row 6 - Top row
            'img/badlands_black.png',  // Row 5
            'img/badlands_black_bloody.png',     // Row 4
            'img/badlands_black_bloody.png',    // Row 3
            'img/badlands_black.png',    // Row 2
            'img/rock_white.png'    // Row 1 - Bottom Row
        ];
      } else if (player.level === 21) {
        rowImages = [
            'img/blue_block_unmarked.png',     // Row 6 - Top row
            'img/brick_fine_black.png',  // Row 5
            'img/brick_fine_black_mossy.png',     // Row 4
            'img/brick_fine_black_mossy.png',    // Row 3
            'img/brick_fine_black.png',    // Row 2
            'img/brick_black.png'   // Row 1 - Bottom Row
        ];
      } else if (player.level === 22) {
        rowImages = [
            'img/badlands_red.png',     // Row 6 - Top row
            'img/blue_block_face.png',  // Row 5
            'img/blue_block_cracked.png',     // Row 4
            'img/blue_block_cracked.png',    // Row 3
            'img/blue_block_face.png',    // Row 2
            'img/blue_block_unmarked.png'   // Row 1 - Bottom Row
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
