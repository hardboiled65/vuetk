const IconName = {
  Action: 'Action',
  Add: 'Add',
}

function Icon(name) {
  this.name = name;

  return this;
}

Icon.prototype.src = function(size) {
  if (this.name === 'Add') {
    return require('oxygen-icons/32x32/actions/list-add.png');
  }
  return require('oxygen-icons/32x32/actions/system-run.png');
}

export { Icon as default }
