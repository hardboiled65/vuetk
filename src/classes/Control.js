import View from './View'

class Control extends View {
  constructor() {
    super();

    this._enabled = true;
  }

  //==================
  // Getters/Setters
  //==================
  get enabled() {
    return this._enabled;
  }

  set enabled(bool) {
    this._enabled = bool;
  }
}

export { Control as default }
