import Rect from './Rect'

class View {
  constructor() {
    this._rect = new Rect();
    this._anchor = {
      top: null,
      right: null,
      bottom: null,
      left: null
    };
  }

  get rect() {
    return this._rect;
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
}

View.WindowBody = (() => {
  let view = new View();
  view.anchorTop = 0;
  view.anchorLeft = 0;
  view.anchorRight = 0;
  view.anchorBottom = 0;
  return view;
})();

export { View as default }
