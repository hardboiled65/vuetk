import View from './View'

const Orientation = {
  Horizontal: 0,
  Vertical: 1
}

class StackView extends View {
  constructor() {
    super();

    this._orientation = StackView.Orientation.Horizontal;
  }

  //=================
  // Getters/Setters
  //=================
  get orientation() {
    return this._orientation;
  }

  //=================
  // Constants
  //=================
  static get Orientation() {
    return Orientation;
  }
}

export { StackView as default }
