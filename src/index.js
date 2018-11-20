//===============
// Components
//===============
import BlView from './components/BlView'
import BlStackView from './components/BlStackView'
import BlBrowser from './components/BlBrowser'
import BlTableView from './components/BlTableView'

import BlWindow from './components/BlWindow'
import BlAlert from './components/BlAlert'
import BlToolbar from './components/BlToolbar'
import BlToolbarItem from './components/BlToolbarItem'

import BlMenu from './components/BlMenu'
import BlMenuItem from './components/BlMenuItem'

import BlButton from './components/BlButton'
import BlSegmentedControl from './components/BlSegmentedControl'

//===============
// Classes
//===============
import { ApplicationWindow, Alert } from './classes/Window'
import Menu from './classes/Menu'
import MenuItem from './classes/MenuItem'
import Button from './classes/Button'
import SegmentedControl from './classes/SegmentedControl'
import Icon from './classes/Icon'
import Browser from './classes/Browser'
import Toolbar from './classes/Toolbar'
import View from './classes/View'

export {
  ApplicationWindow,
  Alert,
  Menu,
  MenuItem,
  Button,
  SegmentedControl,
  Icon,
  Browser,
  Toolbar,
  View,
}

export default {
  install(Vue, options) {
    // Global state
    var state = {
      app: null,
      modal: null,
      menuOpened: false,
      modalOpened: false,
    };

    Vue.component(BlView.name, BlView);
    Vue.component(BlStackView.name, BlStackView);
    Vue.component(BlBrowser.name, BlBrowser);
    Vue.component(BlWindow.name, BlWindow);
    Vue.component(BlAlert.name, BlAlert);
    Vue.component(BlToolbar.name, BlToolbar);
    Vue.component(BlMenu.name, BlMenu);
    Vue.component(BlMenuItem.name, BlMenuItem);
    Vue.component(BlButton.name, BlButton);
    Vue.component(BlSegmentedControl.name, BlSegmentedControl);
    Vue.component(BlToolbarItem.name, BlToolbarItem);
    Vue.component(BlTableView.name, BlTableView);

    Vue.prototype.$bl = {
      Button: Button,
      Menu: Menu,
      MenuItem: MenuItem,
      View: View,
    };

    Vue.prototype.$vuetk = {
      state: state,
    };
  },
}

