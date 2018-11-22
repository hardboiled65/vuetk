function Image(srcs) {
  this._srcs = srcs;
}

Image.prototype.src = function(size) {
  return this._srcs[size];
}

Image.prototype.SystemImage = {
  // Control icons
  actionTemplate: new Image({
    '16x16': require('oxygen-icons/16x16/actions/system-run.png'),
    '32x32': require('oxygen-icons/32x32/actions/system-run.png'),
  }),
  addTemplate: new Image({
    '16x16': require('oxygen-icons/16x16/actions/list-add.png'),
    '32x32': require('oxygen-icons/32x32/actions/list-add.png'),
  }),
  bluetoothTemplate: new Image({
  }),

  // Freestanding button icons

  // Menu icons

  // Multi-item drag image icons

  // Permissions icons

  // Preferences icons

  // Status icons

  // System entity icons
  applicationIcon: new Image({
    '16x16': require('oxygen-icons/16x16/apps/preferences-system-windows-actions.png'),
    '32x32': require('oxygen-icons/32x32/apps/preferences-system-windows-actions.png'),
  }),
  caution: new Image({
    '16x16': require('oxygen-icons/16x16/status/dialog-warning.png'),
    '32x32': require('oxygen-icons/32x32/status/dialog-warning.png'),
  }),

  // Toolbar icons
}

Image.SystemImage = Image.prototype.SystemImage;

export { Image as default }
