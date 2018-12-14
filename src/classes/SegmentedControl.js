const SwitchTracking = Object.freeze({
  SelectOne: Symbol('SwitchTracking.SelectOne'),
  SelectAny: Symbol('SwitchTracking.SelectAny'),
  Momentary: Symbol('SwitchTracking.Momentary'),
})

const Style = Object.freeze({
  Default: Symbol('Style.Default'),
  Separated: Symbol('Style.Separated'),
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
    this._style = Style.Default;
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

  set trackingMode(switchTracking) {
    this._trackingMode = switchTracking;
  }

  get selectedSegment() {
    return this._selected;
  }

  get style() {
    return this._style;
  }

  set style(style) {
    this._style = style;
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

  //==================
  // Enums
  //==================
  static get Style() {
    return Style;
  }

  static get SwitchTracking() {
    return SwitchTracking;
  }
}

export { SegmentedControl as default }
