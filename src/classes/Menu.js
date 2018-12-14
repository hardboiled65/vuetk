const MenuType = {
  MenuBarMenu: 0,
  ContextMenu: 1,
  Submenu: 2,
}

class Menu {
  constructor(type, title=null) {
    this._type = type;
    this._title = title;
    this._items = [];
  }

  //=================
  // Getters/Setters
  //==================
  get type() {
    return this._type;
  }

  set type(type) {
    this._type = type;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get items() {
    return this._items;
  }

  //=================
  // Constants
  //=================
  static get MenuType() {
    return MenuType;
  }
}

export { Menu as default }
