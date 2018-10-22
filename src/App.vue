<template>
  <div id="app">
    <bl-window ref="mainWindow"
      :menus="menus">
      <template slot="toolbar">
        <bl-button
          :instance="upButton">
        </bl-button>
        <bl-button
          :instance="newFolderButton">
        </bl-button>
      </template>
      <template slot="body">
        <div class="body-frame"
          style="display: flex; height: 80%">
          <div class="current-dir"
            style="width: 400px; border-right: 1px solid black;"
            @click="selectedDir = null">
            <div class="file"
              v-for="file in findFile(pwd).children" :key="file.name"
              @click.stop="onClickFile(file)"
              @contextmenu.stop.prevent="onClickFile(file)">
              <span>{{ file.name }}</span>
            </div>
          </div>
          <div class="sub-dir"
            v-if="selectedDir !== null"
            style="width: 400px;">
            <div class="file"
              v-for="file in findFile(selectedDir).children" :key="file.name"
              @click.stop="onClickFile(file)">
              <span>{{ file.name }}</span>
            </div>
          </div>
          <div class="sub-dir empty"
            v-else
            style="width: 400px;">
          </div>
          <div class="preview"
            style="width: auto;">
            <div class="preview-content"
              v-if="selectedFile !== null && findFile(selectedFile).type === 'text'">
              <p>{{ findFile(selectedFile).data }}</p>
            </div>
          </div>
        </div>
      </template>
      <!-- Confirm delete -->
      <div id="app2"></div>
      <bl-alert
        v-if="modal"
        v-model="modal"
        :instance="alert">
      </bl-alert>
    </bl-window>
  </div>
</template>

<script>
import BlWindow from '@/components/BlWindow'
import BlAlert from '@/components/BlAlert'
import BlButton from '@/components/BlButton'

import { Alert } from '@/classes/Window'
import Menu from '@/classes/Menu'
import MenuItem from '@/classes/MenuItem'
import Button from '@/classes/Button'

export default {
  name: 'app',
  components: {
    BlWindow,
    BlAlert,
    BlButton,
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
    upButton: null,
    newFolderButton: null,
    alert: null,
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
  }),

  created() {
    this.$bl.app = this;

    // Set menus
    this.menus.push(new Menu(Menu.MenuType.MenuBarMenu, 'File'));
    this.menus.push(new Menu(Menu.MenuType.MenuBarMenu, 'Edit'));
    this.menus.push(new Menu(Menu.MenuType.MenuBarMenu, 'Help'));

    this.menus[2].items.push(new MenuItem('About'));

    // Set alert
    this.alert = new Alert();
    this.alert.message = 'Delete';

    // Set buttons
    this.upButton = new Button();
    this.upButton.title = 'Up';
    this.upButton.action = this.onClickUpButton;

    this.newFolderButton = new Button();
    this.newFolderButton.title = 'New Folder';
    this.newFolderButton.action = this.onClickNewFolderButton;

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
  },

  mounted() {
    this.$refs.mainWindow.title = 'Pouch'
  },

  methods: {
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
    // Click actions
    //======================
    onClickFile(file) {
      const path = this.getFullPath(file);
      if (file.type === 'folder') {
        if (path === this.pwd) {
          return;
        }
        this.selectedDir = path;
        this.pwd = this.parentDir(path);
      } else {
        this.selectedFile = path;
      }
    },

    onClickUpButton() {
      if (this.pwd === '/') {
        return;
      }
      let path = this.pwd.replace(/[^/]+$/, '');
      path !== '/' ? path = path.substring(0, path.length -1) : null;
      this.enterDir(path);
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
    }
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

.file:hover {
  background-color: #9999ff;
  color: white;
}

.sub-dir {
  border-right: 1px solid grey;
}
</style>
