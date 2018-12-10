import Rect from './Rect'

//====================
// Enums
//====================
const LayoutType = Object.freeze({
  None: Symbol('LayoutType.None'),
  Flexbox: Symbol('LayoutType.Flexbox'),
  Grid: Symbol('LayoutType.Grid'),
})

const Orientation = Object.freeze({
  Horizontal: Symbol('Orientation.Horizontal'),
  Vertical: Symbol('Orientation.Vertical'),
})

const Direction = Object.freeze({
  Auto: Symbol('Direction.Auto'),
  LeftToRight: Symbol('Direction.LeftToRight'),
  RightToLeft: Symbol('Direction.RightToLeft'),
})

const LayoutPolicyType = Object.freeze({
  Fixed: Symbol('LayoutPolicy.Fixed'),
  Auto: Symbol('LayoutPolicy.Auto'),
})

class LayoutPolicy {
  constructor() {
    this._width = LayoutPolicyType.Fixed;
    this._height = LayoutPolicyType.Auto;
  }

  //==================
  // Getters/Setters
  //==================
  get width() {
    return this._width;
  }

  set width(widthPolicy) {
    this._width = widthPolicy;
  }

  get height() {
    return this._height;
  }

  set height(heightPolicy) {
    this._height = heightPolicy;
  }

  //==================
  // Enums
  //==================
  static get LayoutPolicyType() {
    return LayoutPolicyType;
  }
}

class Layout {
  constructor() {
    this._type = Layout.LayoutType.None;
    this._orientation = Layout.Orientation.Horizontal;
    this._direction = Layout.Direction.Auto;
    this._policy = new Layout.LayoutPolicy();
  }

  //=================
  // Getters/Setters
  //=================
  get type() {
    return this._type;
  }

  set type(layoutType) {
    this._type = layoutType;
  }

  get orientation() {
    return this._orientation;
  }

  set orientation(orientation) {
    this._orientation = orientation;
  }

  get direction() {
    return this._direction;
  }

  get policy() {
    return this._policy;
  }

  //=================
  // Classes
  //=================
  static get LayoutPolicy() {
    return LayoutPolicy;
  }

  //=================
  // Enums
  //=================
  static get LayoutType() {
    return LayoutType;
  }

  static get Orientation() {
    return Orientation;
  }

  static get Direction() {
    return Direction;
  }
}

class View {
  constructor() {
    this._rect = new Rect();
    this._anchor = {
      top: null,
      right: null,
      bottom: null,
      left: null
    };
    this._layout = new View.Layout();
  }

  get rect() {
    return this._rect;
  }

  get layout() {
    return this._layout;
  }

  set layout(val) {
    this._layout = val;
  }

  get anchorTop() {
    return this._anchor.top;
  }

  set anchorTop(top) {
    this._anchor.top = top;
  }

  get anchorRight() {
    return this._anchor.right;
  }

  set anchorRight(right) {
    this._anchor.right = right;
  }

  get anchorBottom() {
    return this._anchor.bottom;
  }

  set anchorBottom(bottom) {
    this._anchor.bottom = bottom;
  }

  get anchorLeft() {
    return this._anchor.left;
  }

  set anchorLeft(left) {
    this._anchor.left = left;
  }

  //=================
  // Classes
  //=================
  static get Layout() {
    return Layout;
  }

  //=================
  // Enums
  //=================
  static get LayoutType() {
    return LayoutType;
  }

  static get Orientation() {
    return Orientation;
  }

  static get Direction() {
    return Direction;
  }

  static get LayoutPolicyType() {
    return LayoutPolicyType;
  }
}

//=================
// Constants
//=================
View.windowBody = (() => {
  let view = new View();
  view.anchorTop = 0;
  view.anchorLeft = 0;
  view.anchorRight = 0;
  view.anchorBottom = 0;
  return view;
})();

export { View as default }
