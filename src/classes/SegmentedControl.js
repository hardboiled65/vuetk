class SegmentedControl {
  static Segment() {
    this.label = '';
    return this;
  }

  constructor() {
    this._segments = [];
  }

  //==================
  // Getters/Setters
  //==================
  get segments() {
    return this._segments;
  }

  //==================
  // Instance methods
  //==================
  addSegment() {
    let segment = new SegmentedControl.Segment();
    this._segments.push(segment);
    return segment;
  }
}

export { SegmentedControl as default }
