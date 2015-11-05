// Bye
var Win = {
  update: function(dt) {
    this.render();
  },
  render: function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '36pt Helvetica';
    ctx.textSmoothingEnabled = true;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('You Win', ctx.canvas.width/2, ctx.canvas.height/2);
  },
  resetState: function() {
    currentState = 'playing';
  }
};
