const DisplayMode = {
  IconAndLabel: 0,
  IconOnly: 1,
  LabelOnly: 2,
}

class Toolbar {
  constructor(displayMode=DisplayMode.IconAndLabel) {
    this._displayMode = displayMode;
  }

  //==================
  // Getters/Setters
  //==================
  get displayMode() {
    return this._displayMode;
  }

  set displayMode(mode) {
    this._displayMode = mode;
  }

  //=================
  // Constants
  //=================
  static get DisplayMode() {
    return DisplayMode;
  }
}

export { Toolbar as default }
