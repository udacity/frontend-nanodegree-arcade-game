var player = {
  top: y,
  bottom: y+171,
  left: x,
  right: x+101
}

var enemy = {
  top: y,
  bottom: y+171,
  left: x,
  right: x+101
}

intersect = function (enemy, player) {
  return !(enemy.left > player.right || // detects gap between sides
           enemy.right < player.left ||
           enemy.top > player.bottom ||
           enemy.bottom < player.top
           );
}

// 1. always have enemy on left side of comparison
// 2. compare leftmost with rightmost, and topmost and bottommost
// 3. evaluates to true if there IS a gap