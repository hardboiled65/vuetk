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
    this._selectedColumn = -1;
    this._selectedRow = -1;

    this._headerView = null;
  }

  static get TableColumn() {
    return TableColumn;
  }
}

export { TableView as default }
