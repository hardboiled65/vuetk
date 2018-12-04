import Rect from './Rect'
import Button from './Button'
import Image from './Image'

//====================
// Enums
//====================
const WindowType = Object.freeze({
  DocumentWindow: Symbol('WindowType.DocumentWindow'),
  AppWindow: Symbol('WindowType.AppWindow'),
  Panel: Symbol('WindowType.Panel'),
  Dialog: Symbol('WindowType.Dialog'),
  Alert: Symbol('WindowType.Alert'),
})

const WindowState = Object.freeze({
  Main: Symbol('WindowState.Main'),
  Key: Symbol('WindowState.Key'),
  Inactive: Symbol('WindowState.Inactive'),
})

class ApplicationWindow {
  constructor(type) {
    this._type = type;
    this._title = '';
    this._rect = new Rect();
    this._rect.x = 0;
    this._rect.y = 0;
    this._state = WindowState.Inactive;
    this._closeButton = new Button();
    this._minimizeButton = new Button();
  }

  //==================
  // Getters/Setters
  //==================
  get type() {
    return this._type;
  }

  get state() {
    return this._state;
  }

  set state(windowState) {
    this._state = windowState;
  }

  get rect() {
    return this._rect;
  }

  get x() {
    return this._rect.x;
  }

  set x(posX) {
    this._rect.x = posX;
  }

  get y() {
    return this._rect.y;
  }

  set y(posY) {
    this._rect.y = (posY >= 0) ? posY : 0;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get closeButton() {
    return this._closeButton;
  }

  get minimizeButton() {
    return this._minimizeButton;
  }

  //=================
  // Constants
  //=================
  static get WindowType() {
    return WindowType;
  }

  static get WindowState() {
    return WindowState;
  }
}

class Alert extends ApplicationWindow {
  constructor(message=null, informativeText='This is an alert.') {
    super(WindowType.Alert);
    this._message = message;
    this._informativeText = informativeText;
    this._buttons = [];
    this._icon = Image.SystemImage.caution;

    // Set default buttons.
    this._buttons.push(new Button());
    this._buttons.push(new Button());
    this._buttons[0].title = 'Ok';
    this._buttons[1].title = 'Cancel';

    this._callback = null;

    this._vm = null;
  }

  //==================
  // Getters/Setters
  //==================
  get message() {
    return this._message;
  }

  set message(message) {
    this._message = message;
  }

  get informativeText() {
    return this._informativeText;
  }

  set informativeText(text) {
    this._informativeText = text;
  }

  get buttons() {
    return this._buttons;
  }

  get icon() {
    return this._icon;
  }

  set icon(image) {
    this._icon = image;
  }

  runModal(vm, callback) {
    vm.$vuetk.state.modal = this;
    vm.$vuetk.state.modalOpened = true;
    if (callback) {
      this._callback = callback();
    } else {
      this._callback = () => {};
    }
  }
}

//=================
// Constants
//=================
ApplicationWindow.aboutPanel = new ApplicationWindow(WindowType.Panel);
ApplicationWindow.aboutPanel.minimizeButton.enabled = false;

export {
  ApplicationWindow,
  Alert,
}
