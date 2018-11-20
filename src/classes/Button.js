const ButtonType = {
  PushButton: 0,
}

class Button {
  constructor(type=Button.ButtonType.PushButton, title=null) {
    this._type = type;
    this._title = title;
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
