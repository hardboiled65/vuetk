class MenuItem {
  constructor(title='') {
    this._title = title;
  }

  //=================
  // Getters/Setters
  //==================
  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

}

export { MenuItem as default }
