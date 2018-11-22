import Control from './Control'

class Browser extends Control {
  static Column() {
    this.rows = [];
    this.width = 100;
    return this;
  }

  constructor() {
    super();
    this._columns = [];
  }

  //==================
  // Getters/Setters
  //==================
  get columns() {
    return this._columns;
  }

  //==================
  // Instance methods
  //==================
  addColumn() {
    this._columns.push(new Browser.Column());
  }
}

export { Browser as default }
