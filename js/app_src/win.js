// Bye
var Win = {
  update: function(dt) {
    this.render();
    //setTimeout(this.resetState, 2000);
    this.resetState();
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

    setTimeout(function(){
      document.addEventListener('keyup', function(e){
        player.handleInput(global.allowedKeys[e.keyCode]);
      });
      player.reset();
      currentState = 'playing';
    },2000);

  }
};
