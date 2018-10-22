class MenuItem {
  constructor(title='') {
    this._title = title;
    this._isSeparator = false;
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

  //==================
  // Instance methods
  //==================
  isSeparator() {
    return this._isSeparator;
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
