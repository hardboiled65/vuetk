class Browser {
  static Column() {
    this.rows = [];
    return this;
  }

  constructor() {
    this._columns = [];
  }

  //=================
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
