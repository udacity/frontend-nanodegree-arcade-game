// gem class
class Gem {
  static firstGem(gems) { return gems[0];}

  constructor(x, y, sprite) {
    this._x = x;
    this._y = y;
    this._sprite = sprite;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  get sprite() {
    return this._sprite;
  }

  set sprite(value) {
    this._sprite = value;
  }

  render() {
    ctx.drawImage(Resources.get(this._sprite), this._x, this._y);
  }
}
