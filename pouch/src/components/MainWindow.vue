<template>
  <div class="bl-window main-window"
    :class="windowClass">
    <!-- Window menu bar -->
    <bl-menu
      :instance="mainMenu">
    </bl-menu>
    <!-- Window toolbar -->
    <bl-toolbar
      :instance="toolbar">
      <bl-toolbar-item label="Up">
        <bl-button slot-scope="slotProps"
          :instance="upButton"
          :anchorTop="slotProps.anchorTop"
          :anchorRight="slotProps.anchorRight"
          :anchorBottom="slotProps.anchorBottom"
          :anchorLeft="slotProps.anchorLeft">
        </bl-button>
      </bl-toolbar-item>
      <bl-toolbar-item label="New Folder">
        <bl-button
          :instance="newFolderButton">
        </bl-button>
      </bl-toolbar-item>
      <bl-toolbar-item label="Move">
        <bl-segmented-control
          :instance="moveSegments">
        </bl-segmented-control>
      </bl-toolbar-item>
    </bl-toolbar>
    <!-- Window body -->
    <bl-view
      constant="WindowBody">
      <bl-button
        :instance="newFolderButton"
        :anchorTop="10"
        :anchorRight="10">
      </bl-button>
      <bl-stack-view
        :anchorTop="10"
        :anchorRight="100"
        :anchorBottom="10"
        :anchorLeft="10">
        <bl-browser
          :instance="browser"
          :anchorTop="10"
          :anchorLeft="10"
          :anchorBottom="10"
          :anchorRight="100"
          @selectColumn="onSelectColumn"
          @selectRow="onSelectRow">
        </bl-browser>
        <bl-view class="preview">
          <div class="preview-content"
            v-if="selectedFile !== null && selectedFile.type === 'text'">
            <bl-button
              :instance="editButton">
            </bl-button>
            <h3>{{ selectedFile.name }}</h3>
            <p>{{ selectedFile.data }}</p>
          </div>
        </bl-view>
      </bl-stack-view>
    </bl-view>
    <!-- Confirm delete -->
    <bl-alert
      v-if="modal"
      :instance="modal">
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
  </div>
</template>

<script>
  import {
    ApplicationWindow,
    Alert,
    Menu,
    MenuItem,
    Button,
    SegmentedControl,
    Icon,
    Browser,
    Toolbar,
  } from '@hardboiled65/vuetk'

  import BlWindow from '@hardboiled65/vuetk/src/components/BlWindow'

  export default {
    name: 'main-window',
    extends: BlWindow,

    data: () => ({
      menus: [],
      //===================
      // Unique references
      //===================
      menu: null,
      //===============
      // Views
      //===============
      mainMenu: null,
      browser: null,
      upButton: null,
      newFolderButton: null,
      editButton: null,
      editor: null,
      moveSegments: null,
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
      selectedDir(/*newValue*/) {
        this.setRows();
      },
    },

    computed: {
      mainView() {
        return true;
      },
    },

    created() {
      this.$bl.app = this;

      // Set menus
      this.mainMenu = new Menu(Menu.MenuType.MenuBarMenu, 'MainMenu');

      this.mainMenu.items.push(new MenuItem('File'));
      let menuItemFile = this.mainMenu.items[0];
      menuItemFile.submenu = new Menu(Menu.MenuType.Submenu, 'File');
      menuItemFile.submenu.items.push(new MenuItem('New Text File'));
      menuItemFile.submenu.items[0].action = this.newTextFileAction;

      this.mainMenu.items.push(new MenuItem('Edit'));
      let menuItemEdit = this.mainMenu.items[1];
      menuItemEdit.submenu = new Menu(Menu.MenuType.Submenu, 'Edit');
      menuItemEdit.submenu.items.push(new MenuItem('Delete'));
      menuItemEdit.submenu.items[0].action = this.deleteFileAction;

      this.mainMenu.items.push(new MenuItem('Help'));
      let menuItemHelp = this.mainMenu.items[2];
      menuItemHelp.submenu = new Menu(Menu.MenuType.Submenu, 'Help');
      menuItemHelp.submenu.items.push(new MenuItem('Handbook'));
      menuItemHelp.submenu.items.push(new MenuItem('About'));
      menuItemHelp.submenu.items[1].action = () => {
        this.showAbout = true;
      }

      // Set toolbar
      this.toolbar = new Toolbar();

      // Set segmented controls
      this.moveSegments = new SegmentedControl();
      this.moveSegments.addSegment().label = 'Back';
      this.moveSegments.addSegment().label = 'Forward';

      // Set browser
      this.browser = new Browser();
      this.browser.anchorTop = 0;
      this.browser.anchorRight = 0;
      this.browser.anchorBottom = 0;
      this.browser.anchorLeft = 0;
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
      window.location.replace(window.location.origin + '#/');
    },

    methods: {
      //===================
      // Initialize views
      //===================
      createEditor() {
        this.editor = new ApplicationWindow(ApplicationWindow.WindowType.Panel);
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
        // eslint-disable-next-line
        console.log('enter', path);
        // eslint-disable-next-line
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
        // eslint-disable-next-line
        console.log('col', col);
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
        let alert = new Alert('Delete');
        alert.informativeText = 'Are you sure to delete file?';
        alert.icon = new Icon('Control.Action');
        alert.runModal(this);
      },
    }
  }
</script>
