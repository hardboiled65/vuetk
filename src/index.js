//===============
// Components
//===============
import BlView from './components/BlView'
import BlBrowser from './components/BlBrowser'

import BlWindow from './components/BlWindow'
import BlAlert from './components/BlAlert'
import BlMenuBar from './components/BlMenuBar'
import BlWindowToolbar from './components/BlWindowToolbar'

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

export {
  ApplicationWindow,
  Alert,
  Menu,
  MenuItem,
  Button,
  SegmentedControl,
  Icon,
  Browser,
}

export default {
  install(Vue, options) {
    Vue.component(BlView.name, BlView);
    Vue.component(BlBrowser.name, BlBrowser);
    Vue.component(BlWindow.name, BlWindow);
    Vue.component(BlAlert.name, BlAlert);
    Vue.component(BlMenuBar.name, BlMenuBar);
    Vue.component(BlWindowToolbar.name, BlWindowToolbar);
    Vue.component(BlMenu.name, BlMenu);
    Vue.component(BlMenuItem.name, BlMenuItem);
    Vue.component(BlButton.name, BlButton);
    Vue.component(BlSegmentedControl.name, BlSegmentedControl);

    Vue.prototype.$bl = {
      Button: Button,
      Menu: Menu,
    };
  },
}

