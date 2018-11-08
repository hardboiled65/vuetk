function Image(srcs) {
  this._srcs = srcs;
}

Image.prototype.src = function(size) {
  return this._srcs[size];
}

Image.prototype.SystemImage = {
  ActionTemplate: new Image({
    '16x16': require('oxygen-icons/16x16/actions/system-run.png'),
    '32x32': require('oxygen-icons/32x32/actions/system-run.png'),
  }),
  AddTemplate: new Image({
    '16x16': require('oxygen-icons/16x16/actions/list-add.png'),
    '32x32': require('oxygen-icons/32x32/actions/list-add.png'),
  }),
  BluetoothTemplate: new Image({
  }),
}

Image.SystemImage = Image.prototype.SystemImage;

export { Image as default }
