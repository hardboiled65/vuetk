import Control from './Control'

class Label extends Control {
  constructor(text) {
    super();
    this._text = text;
    this._selectable = false;
  }

  //==================
  // Getters/Setters
  //==================
  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
  }

  get selectable() {
    return this._selectable;
  }

  set selectable(bool) {
    this._selectable = bool;
  }
}

export { Label as default }
