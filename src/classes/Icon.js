const IconName = {
  Action: 'Action',
  Add: 'Add',
}

const SystemImages = {
  Control: {
    Action: {
      '16x16': require('oxygen-icons/16x16/actions/system-run.png'),
      '32x32': require('oxygen-icons/32x32/actions/system-run.png'),
    },
    Add: {
      '16x16': require('oxygen-icons/16x16/actions/list-add.png'),
      '32x32': require('oxygen-icons/32x32/actions/list-add.png'),
    }
  }
}

function Icon(name) {
  this.name = name;

  return this;
}

Icon.prototype.src = function(size) {
  const [category, name] = this.name.split('.');
  const image = SystemImages[category][name];
  return image[size];
}

Icon.prototype.Control = {
  Action: new Icon('Control.Action'),
  Add: new Icon('Control.Add'),
  // Bluetooth
  // Bookmarks
  // ColumnView
  // EnterFullScreen
  // ExitFullScreen
  // FlowView
  // GoBack
  // GoForward
  // GoLeft
  // GoRight
  // IconView
  // LeftFacingTriangle
  // ListView
  // Locked
  // Unlocked
  // Path
  // QuickLook
  // Refresh
  // Remove
  // RightFacingTriangle
  // Share
  // Slideshow
  // SmartBadge
  // StopProgress
}

Icon.prototype.Freestanding = {
  // FollowLink
  // InvalidData
  // Refresh
  // Reveal
  // StopProgress
}

Icon.prototype.MenuState = {
  // Mixed
  // On
}

// Multi-Item Drag Image Icons
// {
//   MultipleDocuments
// }

Icon.prototype.Permission = {
  // Everyone
  // User
  // UserGroup
  // UserGuest
}

Icon.prototype.Preferences = {
  // Advanced
  // General
  // UserAccounts
}

Icon.prototype.Status = {
  // Available
  // None
  // PartiallyAvailable
  // Unavailable
}

Icon.prototype.SystemEntity = {
  // ApplicationIcon
  // // Bonjour
  // FolderBurnable
  // Caution
  // Computer
  // Folder
  // Home
  // Network
  // FolderSmart
  // TrashEmpty
  // TrashFull
}

Icon.prototype.Toolbar = {
  // ColorPanel
  // FontPanel
  // Info
}

export { Icon as default }
