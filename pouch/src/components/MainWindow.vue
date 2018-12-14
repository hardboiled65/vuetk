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
          :anchorLeft="slotProps.anchorLeft"
          :enabled="pwd !== '/'">
        </bl-button>
      </bl-toolbar-item>
      <bl-toolbar-item label="Back/Forward">
        <bl-segmented-control
          :instance="backForwardSegments">
        </bl-segmented-control>
      </bl-toolbar-item>
      <bl-toolbar-item label="View">
        <bl-segmented-control
          :instance="viewSegments">
        </bl-segmented-control>
      </bl-toolbar-item>
      <bl-toolbar-item label="New Folder">
        <bl-button
          :instance="newFolderButton">
        </bl-button>
      </bl-toolbar-item>
    </bl-toolbar>
    <!-- Window body -->
    <bl-view
      constant="windowBody">
      <bl-split-view
        :anchorTop="0"
        :anchorRight="0"
        :anchorBottom="0"
        :anchorLeft="0">
        <bl-view
          :width="200">
          <bl-table-view
            :instance="sidebar"
            :anchorTop="0"
            :anchorRight="0"
            :anchorBottom="0"
            :anchorLeft="0">
            <template slot="column">
              <bl-view
                :layoutType="$bl.View.LayoutType.Flexbox"
                :orientation="$bl.View.Layout.Orientation.Vertical"
                :width="'Auto'">
                <div>Home</div>
                <div>Documents</div>
              </bl-view>
            </template>
          </bl-table-view>
        </bl-view>
        <bl-view
          :width="'Auto'">
          <bl-browser
            :instance="browser"
            :anchorTop="10"
            :anchorLeft="10"
            :anchorBottom="10"
            :anchorRight="10"
            @selectRow="onSelectRow">
          </bl-browser>
        </bl-view>
        <bl-view class="preview"
          v-if="selectedFile !== null && selectedFile.type === 'text'"
          :width="300">
          <div class="preview-content">
            <bl-button
              :instance="editButton">
            </bl-button>
            <h3>{{ selectedFile.name }}</h3>
            <p>{{ selectedFile.data }}</p>
          </div>
        </bl-view>
      </bl-split-view>
    </bl-view>
    <!-- Confirm delete -->
    <bl-alert
      v-if="modal"
      :instance="modal">
    </bl-alert>
    <!-- About panel -->
    <bl-window
      v-if="showAbout"
      :constant="'aboutPanel'"
      @windowClose="showAbout = false">
      <bl-view>Hello!</bl-view>
    </bl-window>
    <!-- Editor window -->
    <bl-window
      v-if="showEditor"
      :instance="editor"
      @windowClose="showEditor = false">
      <template slot="body">
        <textarea
          v-model="selectedFile.data">
        </textarea>
      </template>
    </bl-window>
  </div>
</template>

<script>
  import path from 'path'

  import {
    ApplicationWindow,
    Alert,
    Menu,
    MenuItem,
    Button,
    SegmentedControl,
    TableView,
    Browser,
    Toolbar,
    Image,
  } from '@hardboiled65/vuetk'

  import BlWindow from '@hardboiled65/vuetk/src/components/BlWindow'

  const VIEW_SEGMENTS_INDEX_BROWSER = 1;

  export default {
    name: 'main-window',
    extends: BlWindow,

    data: () => ({
      //===============
      // Views
      //===============
      mainMenu: null,
      sidebar: null,
      browser: null,
      upButton: null,
      newFolderButton: null,
      editButton: null,
      editor: null,
      backForwardSegments: null,
      viewSegments: null,
      //===============
      // State
      //===============
      pwd: '/',
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
      'backForwardSegments.selectedSegment'(newVal, oldVal) {
        if (oldVal > -1 && newVal === -1) {
          // eslint-disable-next-line
          console.log('momentary segment ' + oldVal + ' clicked.');
        }
      },
    },

    computed: {
      mainView() {
        return true;
      },
    },

    created() {
      this.instance.title = 'Pouch';

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
      this.backForwardSegments = new SegmentedControl();
      this.backForwardSegments.style = SegmentedControl.Style.Separated;
      this.backForwardSegments.trackingMode = SegmentedControl.SwitchTracking.Momentary;
      this.backForwardSegments.addSegment().image = Image.SystemImage.goBackTemplate;
      this.backForwardSegments.addSegment().image = Image.SystemImage.goForwardTemplate;

      this.viewSegments = new SegmentedControl();
      // this.viewSegments.addSegment().label = 'List';
      this.viewSegments.addSegment().image = Image.SystemImage.listViewTemplate;
      // this.viewSegments.addSegment().label = 'Browser';
      this.viewSegments.addSegment().image = Image.SystemImage.columnViewTemplate;
      this.viewSegments.selectSegment(VIEW_SEGMENTS_INDEX_BROWSER);

      // Set sidebar
      this.sidebar = new TableView();

      // Set browser
      this.browser = new Browser();
      this.browser.addColumn();

      // Set buttons
      this.upButton = new Button();
      this.upButton.title = 'Up';
      this.upButton.action = this.onClickUpButton;

      this.newFolderButton = new Button();
      this.newFolderButton.title = 'New Folder';
      this.newFolderButton.action = this.newFolderAction;

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
      this.reloadColumn(0);
    },

    mounted() {
      window.location.replace(window.location.origin
        + window.location.pathname
        + '#/');
    },

    methods: {
      //===================
      // Initialize views
      //===================
      createEditor() {
        this.editor = new ApplicationWindow(ApplicationWindow.WindowType.Panel);
        this.editor.title = 'Text Editor';
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

      paths(path) {
        if (path === '/') {
          return ['/'];
        }
        let paths = path.split('/');
        paths[0] = '/';
        return paths;
      },

      enterDir(path) {
        // eslint-disable-next-line
        console.log('enter', path);
        // eslint-disable-next-line
        const dir = this.findFile(path);
        const oldPwd = this.pwd;

        this.pwd = path;

        const viewIdx = this.viewSegments.selectedSegment;
        if (viewIdx === VIEW_SEGMENTS_INDEX_BROWSER) {
          // Set browser columns.
          if (oldPwd.length < path.length) {
            this.browser.addColumn();
            this.reloadColumn(this.browser.columns.length - 1);
          }
        }
        window.location.replace(window.location.origin
          + window.location.pathname
          + '#' + this.pwd)
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
      reloadColumn(columnIndex) {
        // Get column's directory.
        const dirPath = this.pathOfColumn(columnIndex);
        const dir = this.findFile(dirPath);
        this.browser.columns[columnIndex].rows = [];
        for (let i = 0; i < dir.children.length; ++i) {
          this.browser.columns[columnIndex].rows.push(dir.children[i].name);
        }
        // Set column-1
        /*
        this.browser.columns[1].rows = [];
        if (this.selectedDir) {
          const selectedDirFile = this.findFile(this.selectedDir);
          for (let i = 0; i < selectedDirFile.children.length; ++i) {
            this.browser.columns[1].rows.push(selectedDirFile.children[i].name);
          }
        }
        */
      },

      //======================
      // Click actions
      //======================
      onClickFile(file) {
        this.selectedFile = file;
        const path = this.getFullPath(file);
        if (file.type === 'folder') {
          if (path === this.pwd) {
            return;
          }
          this.enterDir(path);
        }
      },

      onClickUpButton() {
        if (this.pwd === '/') {
          return;
        }
        let path = this.pwd.replace(/[^/]+$/, '');
        path !== '/' ? path = path.substring(0, path.length -1) : null;
        this.enterDir(path);
        this.reloadColumn();
      },


      //=====================
      // Browser events
      //=====================
      onSelectColumn(col) {
        if (col === this.browser.columns.length - 1) {
          return;
        }
        const columnMaxIdx = this.browser.columns.length - 1;
        // Get selected column's path.
        let newPwd = this.pwd;
        for (let i = columnMaxIdx; i > col; --i) {
          newPwd = path.join(newPwd, '..');
          this.browser.columns.pop();
        }
        this.enterDir(newPwd);
      },

      onSelectRow(col, row) {
        this.onSelectColumn(col);
        if (row !== null) {
          const filename = this.browser.columns[col].rows[row];
          const filepath = path.join(this.pwd, filename);
          const file = this.findFile(filepath);
          this.onClickFile(file);
        } else {
          this.selectedFile = null;
        }
      },

      //===================
      // Browser functions
      //===================
      pathOfColumn(col) {
        const columnMaxIdx = this.browser.columns.length - 1;
        let columnPath = this.pwd;
        for (let i = columnMaxIdx; i > col; --i) {
          columnPath = path.join(columnPath, '..');
        }
        return columnPath;
      },

      //===================
      // Actions
      //===================
      newFolderAction() {
        let folder = this.findFile(this.pwd);
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
        const idx = this.paths(this.pwd).length - 1;
        this.browser.columns[idx].rows.push(name);
      },

      newTextFileAction() {
        let folder = this.findFile(this.pwd);
        let newFile = {
          type: 'text',
          name: new Date().toLocaleString().replace(/[/]/g, '-'),
          parent: folder,
          data: ''
        };
        folder.children.push(newFile);
        const idx = this.browser.columns.length - 1;
        this.browser.columns[idx].rows.push(newFile.name);
      },

      editAction() {
        this.showEditor = true;
      },

      deleteFileAction() {
        let alert = new Alert('Delete');
        alert.informativeText = 'Are you sure to delete file?';
        // alert.icon = new Icon('Control.Action');
        alert.buttons[0].title = 'Delete';
        alert.runModal(this);
      },
    }
  }
</script>
