class Rect {
  constructor() {
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;
  }

  //==================
  // Getters/Setters
  //==================
  get x() {
    return this._x;
  }

  set x(posX) {
    this._x = posX;
  }

  get y() {
    return this._y;
  }

  set y(posY) {
    this._y = posY;
  }

  get width() {
    return this._width;
  }

  set width(width) {
    this._width = (width >= 0) ? width : 0;
  }

  get height() {
    return this._height;
  }

  set height(height) {
    this._height = (height >= 0) ? height : 0;
  }
}

export { Rect as default }
