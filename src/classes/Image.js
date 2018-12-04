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
    '16x16': require('oxygen-icons/16x16/apps/preferences-system-bluetooth.png'),
    '32x32': require('oxygen-icons/32x32/apps/preferences-system-bluetooth.png'),
  }),
  columnViewTemplate: new Image({
    '16x16': require('oxygen-icons/16x16/actions/view-file-columns.png'),
    '32x32': require('oxygen-icons/32x32/actions/view-file-columns.png'),
  }),
  goBackTemplate: new Image({
    '16x16': require('oxygen-icons/16x16/actions/go-previous.png'),
    '32x32': require('oxygen-icons/32x32/actions/go-previous.png'),
  }),
  goForwardTemplate: new Image({
    '16x16': require('oxygen-icons/16x16/actions/go-next.png'),
    '32x32': require('oxygen-icons/32x32/actions/go-next.png'),
  }),
  goLeftTemplate: new Image({
    '16x16': require('oxygen-icons/16x16/actions/go-previous-view.png'),
    '32x32': require('oxygen-icons/32x32/actions/go-previous-view.png'),
  }),
  goRightTemplate: new Image({
    '16x16': require('oxygen-icons/16x16/actions/go-next-view.png'),
    '32x32': require('oxygen-icons/32x32/actions/go-next-view.png'),
  }),
  listViewTemplate: new Image({
    '16x16': require('oxygen-icons/16x16/actions/view-list-text.png'),
    '32x32': require('oxygen-icons/32x32/actions/view-list-text.png'),
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
