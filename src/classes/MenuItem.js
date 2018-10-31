class MenuItem {
  constructor(title='') {
    this._title = title;
    this._isSeparator = false;
    this._action = null;
    this._submenu = null;
  }

  //==================
  // Getters/Setters
  //==================
  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get action() {
    return this._action;
  }

  set action(action) {
    this._action = action;
  }

  //==================
  // Instance methods
  //==================
  isSeparator() {
    return this._isSeparator;
  }

  hasSubmenu() {
    return (this._submenu === null);
  }

  //==================
  // Class methods
  //==================
  static separator() {
    let item = new MenuItem();
    item._isSeparator = true;
    return item;
  }
}

export { MenuItem as default }
