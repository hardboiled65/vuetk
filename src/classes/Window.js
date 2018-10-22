const WindowType = {
  MainWindow: 0,
  PanelWindow: 1,
  AlertWindow: 2,
}

import Button from './Button'

class Alert {
  constructor(message=null, informativeText='This is an alert.') {
    this._type = WindowType.AlertWindow;
    this._message = message;
    this._informativeText = informativeText;
    this._buttons = [];

    // Set default buttons.
    this._buttons.push(new Button());
    this._buttons.push(new Button());
    this._buttons[0].title = 'Ok';
    this._buttons[1].title = 'Cancel';
  }

  //=================
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
}

export {
  Alert,
}