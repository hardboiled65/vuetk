import Control from './Control'

const ButtonType = {
  PushButton: 0,
}

class Button extends Control {
  constructor(type=Button.ButtonType.PushButton, title=null) {
    super();
    this._type = type;
    this._title = title;
    this._image = null;
    this._action = null;
  }

  //==================
  // Getters/Setters
  //==================
  get type() {
    return this._type;
  }

  set type(buttonType) {
    this._type = buttonType;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get image() {
    return this._image;
  }

  set image(image) {
    this._image = image;
  }

  get action() {
    if (this._action === null) {
      return function() {};
    }
    return this._action;
  }

  set action(action) {
    this._action = action;
  }

  //=================
  // Constants
  //=================
  static get ButtonType() {
    return ButtonType;
  }
}

export { Button as default }
