const WindowType = {
  DocumentWindow: 0,
  AppWindow: 1,
  Panel: 2,
  Dialog: 3,
  Alert: 4,
  MainWindow: 10,
  AlertWindow: 12,
}

const WindowState = {
  Main: 0,
  Key: 1,
  Inactive: 2,
}

import Button from './Button'

class ApplicationWindow {
  constructor(type) {
    this._type = type;
    this._title = '';
    this._x = 0;
    this._y = 0;
  }

  //==================
  // Getters/Setters
  //==================
  get type() {
    return this._type;
  }

  get x() {
    return this._x;
  }

  set x(posX) {
    this._x = posX;
  }

  get y() {
    return this._y;
  }

  set y(posY) {
    this._y = (posY >= 0) ? posY : 0;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
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
    // this._type = WindowType.AlertWindow;
    this._message = message;
    this._informativeText = informativeText;
    this._buttons = [];

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

export {
  ApplicationWindow,
  Alert,
}
