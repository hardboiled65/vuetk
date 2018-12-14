import Control from './Control'

class Column {
  constructor() {
    this.rows = []
    this.width = 100;
    this._selectedRow = -1;
  }

  get selectedRow() {
    return this._selectedRow;
  }
}

class Browser extends Control {
  constructor() {
    super();
    this._columns = [];
    this._selectedColumn = -1;
  }

  //==================
  // Getters/Setters
  //==================
  get columns() {
    return this._columns;
  }

  get selectedColumn() {
    return this._selectedColumn;
  }

  //==================
  // Instance methods
  //==================
  addColumn() {
    this._columns.push(new Browser.Column());
  }

  selectedRow(columnIdx) {
    return this._columns[columnIdx].selectedRow;
  }

  selectRow(rowIdx, columnIdx) {
    this._columns[columnIdx]._selectedRow = rowIdx;
  }

  //==================
  // Classes
  //==================
  static get Column() {
    return Column;
  }
}

export { Browser as default }
