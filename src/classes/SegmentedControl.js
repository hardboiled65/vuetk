const SwitchTracking = Object.freeze({
  SelectOne: Symbol('SwitchTracking.SelectOne'),
  SelectAny: Symbol('SwitchTracking.SelectAny'),
})

class SegmentedControl {
  static Segment() {
    this.image = null;
    this.label = '';
    return this;
  }

  constructor() {
    this._segments = [];
    this._trackingMode = SwitchTracking.SelectOne;
    this._selected = -1;
  }

  //==================
  // Getters/Setters
  //==================
  get segments() {
    return this._segments;
  }

  get trackingMode() {
    return this._trackingMode;
  }

  get selectedSegment() {
    return this._selected;
  }

  //==================
  // Instance methods
  //==================
  addSegment() {
    let segment = new SegmentedControl.Segment();
    this._segments.push(segment);
    return segment;
  }

  selectSegment(idx) {
    this._selected = idx;
  }
}

export { SegmentedControl as default }
