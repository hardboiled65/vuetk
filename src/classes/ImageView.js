import Control from './Control'

class ImageView extends Control {
  constructor(image) {
    super();
    this._image = image;
  }

  //==================
  // Getters/Setters
  //==================
  get image() {
    return this._image;
  }

  set image(image) {
    this._image = image;
  }

  get width() {
    return this.rect.width;
  }

  set width(width) {
    this.rect.width = width;
  }

  get height() {
    return this.rect.height;
  }

  set height(height) {
    this.rect.height = height;
  }
}

export { ImageView as default }
