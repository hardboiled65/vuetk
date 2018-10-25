<template>
  <div id="app">
    <bl-window ref="mainWindow"
      :menus="menus">
      <!-- Window toolbar -->
      <template slot="toolbar">
        <bl-button
          :instance="upButton">
        </bl-button>
        <bl-button
          :instance="newFolderButton">
        </bl-button>
      </template>
      <!-- Window body -->
      <template slot="body">
        <bl-browser
          :instance="browser"
          @selectColumn="onSelectColumn"
          @selectRow="onSelectRow">
          <div class="preview"
            style="width: auto;">
            <div class="preview-content"
              v-if="selectedFile !== null && selectedFile.type === 'text'">
              <bl-button
                :instance="editButton">
              </bl-button>
              <h3>{{ selectedFile.name }}</h3>
              <p>{{ selectedFile.data }}</p>
            </div>
          </div>
        </bl-browser>
      </template>
      <!-- Confirm delete -->
      <bl-alert ref="alert"
        v-if="modal"
        v-model="modal"
        :instance="alert">
      </bl-alert>
      <!-- About panel -->
      <bl-window
        v-if="showAbout"
        @windowClose="showAbout = false">
        <bl-view>Hello!</bl-view>
      </bl-window>
      <!-- Editor window -->
      <bl-window
        v-if="showEditor"
        :instance="editor"
        @windowClose="showEditor = false">
        <textarea
          v-model="selectedFile.data">
        </textarea>
      </bl-window>
    </bl-window>
  </div>
</template>

<script>
import BlWindow from '@/components/BlWindow'
import BlAlert from '@/components/BlAlert'
import BlButton from '@/components/BlButton'
import BlView from '@/components/BlView'
import BlBrowser from '@/components/BlBrowser'

import { ApplicationWindow, Alert } from '@/classes/Window'
import Menu from '@/classes/Menu'
import MenuItem from '@/classes/MenuItem'
import Button from '@/classes/Button'
import Browser from '@/classes/Browser'
import Icon from '@/classes/Icon'

export default {
  name: 'app',
  components: {
    BlWindow,
    BlAlert,
    BlButton,
    BlView,
    BlBrowser,
  },

  data: () => ({
    menus: [],
    //===================
    // Unique references
    //===================
    menu: null,
    modal: null,
    //===============
    // Views
    //===============
    browser: null,
    upButton: null,
    newFolderButton: null,
    editButton: null,
    alert: null,
    editor: null,
    //===============
    // State
    //===============
    pwd: '/',
    selectedDir: null,
    selectedFile: null,
    root: {
      type: 'folder',
      name: '/',
      children: []
    },
    showAbout: false,
    showEditor: false,
  }),

  watch: {
    selectedDir(newValue) {
      this.setRows();
    },
  },

  created() {
    this.$bl.app = this;

    // Set menus
    this.menus.push(new Menu(Menu.MenuType.MenuBarMenu, 'File'));
    this.menus.push(new Menu(Menu.MenuType.MenuBarMenu, 'Edit'));
    this.menus.push(new Menu(Menu.MenuType.MenuBarMenu, 'Help'));

    this.menus[0].items.push(new MenuItem('New Text File'));
    this.menus[0].items[0].action = this.newTextFileAction;

    this.menus[1].items.push(new MenuItem('Delete'));
    this.menus[1].items[0].action = this.deleteFileAction;

    this.menus[2].items.push(new MenuItem('Handbook'));
    this.menus[2].items.push(MenuItem.separator());
    this.menus[2].items.push(new MenuItem('About'));

    this.menus[2].items[2].action = () => {
      this.showAbout = true;
    }

    // Set alert
    this.alert = new Alert();
    this.alert.message = 'Delete';
    this.alert.informativeText = 'Are you sure to delete file?';
    this.alert.icon = new Icon('Control.Action');

    // Set browser
    this.browser = new Browser();
    this.browser.addColumn();
    this.browser.addColumn();

    // Set buttons
    this.upButton = new Button();
    this.upButton.title = 'Up';
    this.upButton.action = this.onClickUpButton;

    this.newFolderButton = new Button();
    this.newFolderButton.title = 'New Folder';
    this.newFolderButton.action = this.onClickNewFolderButton;

    this.editButton = new Button();
    this.editButton.title = 'Edit';
    this.editButton.action = this.editAction;

    // Set windows
    this.createEditor();

    // Set directory structure
    this.root.children.push({
      type: 'folder',
      name: 'Documents',
      children: [],
      parent: this.root
    });

    let docs = this.findFile('/Documents');
    docs.children.push({
      type: 'text',
      name: 'README.txt',
      parent: docs,
      data: 'Hello, VueTK!'
    });

    // Sync directory structure
    this.setRows();
  },

  mounted() {
    this.$refs.mainWindow.title = 'Pouch'

    window.location.replace(window.location.origin + '#/');
  },

  methods: {
    //===================
    // Initialize views
    //===================
    createEditor() {
      this.editor = new ApplicationWindow(1);
    },

    // File handling
    //===================
    findFile(path) {
      let dir = this.root;
      if (path === '/') {
        return dir;
      }
      const paths = path.split('/');
      for (let i = 1; i < paths.length; ++i) {
        dir = dir.children.find(child => {
          return child.name === paths[i];
        });
      }
      return dir;
    },

    getFullPath(file) {
      let path = file.name;
      let it = file.parent;
      while (it !== this.root) {
        path = it.name + '/' + path;
        it = it.parent;
      }
      path = '/' + path;
      return path;
    },

    enterDir(path) {
      console.log('enter', path);
      const dir = this.findFile(path);
      this.pwd = path;
      window.location.replace(window.location.origin + '#' + this.pwd)
    },

    childOf(path, parentPath) {
      const targetPath = (parentPath === '/') ? parentPath : parentPath + '/';
      return path.replace(/[^/]+$/, '') === targetPath;
    },

    parentDir(path) {
      path = path.replace(/[^/]+$/, '');
      if (path === '/') {
        return '/';
      }
      return path.substring(0, path.length - 1);
    },

    //======================
    // Sync columns & rows
    //======================
    setRows() {
      // Set column-0
      const pwdFile = this.findFile(this.pwd);
      this.browser.columns[0].rows = [];
      for (let i = 0; i < pwdFile.children.length; ++i) {
        this.browser.columns[0].rows.push(pwdFile.children[i].name);
      }
      // Set column-1
      this.browser.columns[1].rows = [];
      if (this.selectedDir) {
        const selectedDirFile = this.findFile(this.selectedDir);
        for (let i = 0; i < selectedDirFile.children.length; ++i) {
          this.browser.columns[1].rows.push(selectedDirFile.children[i].name);
        }
      }
    },

    //======================
    // Click actions
    //======================
    onClickFile(file) {
      const path = this.getFullPath(file);
      if (file.type === 'folder') {
        if (path === this.pwd) {
          return;
        }
        this.selectedDir = path;
        // this.pwd = this.parentDir(path);
        this.enterDir(this.parentDir(path));
      } else {
        this.selectedFile = file;
      }
    },

    onClickUpButton() {
      if (this.pwd === '/') {
        return;
      }
      let path = this.pwd.replace(/[^/]+$/, '');
      path !== '/' ? path = path.substring(0, path.length -1) : null;
      this.enterDir(path);
      this.setRows();
    },

    onClickNewFolderButton() {
      let folder = this.findFile(this.selectedDir || this.pwd);
      let name = 'Folder';
      // Append number if same name exists.
      let num = 2;
      let found;
      do {
        found = folder.children.find(f => {
          return f.name === name;
        });
        if (found) {
          name = 'Folder ' + num;
        }
        ++num;
      } while (found)

      // Add to folder.
      folder.children.push({
        type: 'folder',
        name: name,
        parent: folder,
        children: []
      });
      this.setRows();
    },

    onSelectColumn(col) {
      // console.log('col', col);
    },

    onSelectRow(col, row) {
      if (col === 0 && row !== null) {
        const filename = this.browser.columns[col].rows[row];
        const path = (this.pwd === '/') ? `/${filename}` : `${this.pwd}/${filename}`;
        const file = this.findFile(path);
        this.onClickFile(file);
        this.setRows();
      } else if (col === 0 && row === null) {
        this.selectedDir = null;
      }

      if (col === 1 && row !== null) {
        const filename = this.browser.columns[col].rows[row];
        const path = (this.selectedDir === '/')
          ? `/${filename}`
          : `${this.selectedDir}/${filename}`;
        const file = this.findFile(path);
        this.onClickFile(file);
        this.setRows();
      } else if (col === 1 && row === null) {
        this.selectedFile = null;
      }
    },

    //===================
    // Actions
    //===================
    newFolderAction() {
      this.onClickNewFolderButton();
    },

    newTextFileAction() {
      let folder = this.findFile(this.pwd);
      folder.children.push({
        type: 'text',
        name: new Date().toLocaleString().replace(/[/]/g, '-'),
        parent: folder,
        data: ''
      });
      this.setRows();
    },

    editAction() {
      this.showEditor = true;
    },

    deleteFileAction() {
      this.modal = this.alert;
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
