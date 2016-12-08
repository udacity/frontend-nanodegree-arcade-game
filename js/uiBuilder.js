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
 var  numRightRows = 24,
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
     var  numTopRightCols = 5,
           topRightCol;
           for (topRightCol = 0; topRightCol < numTopRightCols; topRightCol++) {
             ctx.drawImage(Resources.get('img/grey_border_block.png'), (topRightCol * 64) + 640, 832);
           }

    } else if (player.level <= 1) {
      // draw solid border at bottom if player is below level 2
      var  numBotCols = 15,
            botCol;
            for (botCol = 0; botCol < numBotCols; botCol++) {
              ctx.drawImage(Resources.get('img/grey_border_block.png'), (botCol * 64) + 0, 832);
            }
    }
}

function renderSolidBorder() {

  var  numBotCols = 15,
    botCol;
    for (botCol = 0; botCol < numBotCols; botCol++) {
      ctx.drawImage(Resources.get('img/grey_border_block.png'), (botCol * 64) + 0, 832);
    }
  // draw top border
  var  numTopCols = 15,
    topCol;
      for (topCol = 0; topCol < numTopCols; topCol++) {
        ctx.drawImage(Resources.get('img/grey_border_block.png'), (topCol * 64) + 0, 0);
      }
    // draw ui left
  var  numLeftRows = 24,
        leftRow;
      for (leftRow = 0; leftRow < numLeftRows; leftRow++) {
        ctx.drawImage(Resources.get('img/grey_border_block_small.png'), 0, (leftRow * 32) + 64);
      }

    // draw ui right
  var  numRightRows = 24,
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
  // TODO maybe make this into a loop?
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
