import Control from './Control'

class TableColumn {
  constructor() {
    this._title = '';
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
}

class TableView extends Control {
  constructor() {
    super();
  }

  static get TableColumn() {
    return TableColumn;
  }
}

export { TableView as default }
