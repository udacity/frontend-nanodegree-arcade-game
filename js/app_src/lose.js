var Lose = {
  resetTimer: 0,
  resetLength: 1,
  update: function(dt) {
    // console.log('you lose');
    this.render();
    this.resetState(dt);
  },
  render: function() {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '36pt Helvetica';
    ctx.textSmoothingEnabled = true;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('You Lose', ctx.canvas.width/2, ctx.canvas.height/2);
  },
  resetState: function(dt) {
    this.resetTimer += dt;
    if ( this.resetTimer > this.resetLength ) {
      document.addEventListener('keyup', player.handleInput);
      player.reset();
      currentState = 'playing';
      this.resetTimer = 0;
      player.reset();
      allEnemies.forEach(function(enemy) {
        enemy.reset();
      });
    }
  }
};
