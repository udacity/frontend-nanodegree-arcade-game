// Bye
var Win = {
  update: function(dt) {
    this.render();
    setTimeout(this.resetState, 2000);
  },
  render: function() {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '36pt Helvetica';
    ctx.textSmoothingEnabled = true;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('You Win', ctx.canvas.width/2, ctx.canvas.height/2);
  },
  resetState: function() {
    player.reset();
    currentState = 'playing';
    document.addEventListener('keyup', function(e){
      player.handleInput(global.allowedKeys[e.keyCode]);
    });
  }
};
