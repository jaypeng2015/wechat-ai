const { BrowserWindow } = require('electron');

class SettingsWindow {
  constructor(parent) {
    this.createWindow(parent);
    this.initWindowEvents();
  }

  createWindow(parent) {
    this.window = new BrowserWindow({
      width: 640,
      height: 480,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
      parent,
      modal: false,
      show: false,
      resizable: false,
    });

    this.window.loadURL(`file://${__dirname}/settings.html`);
  }

  initWindowEvents() {
    this.window.on('close', (event) => {
      event.preventDefault();
      this.hide();
    });
  }

  hide() {
    this.window.hide();
  }

  show() {
    this.window.webContents.send('show');
    this.window.show();
    this.window.focus();
  }

  removeAllListeners(name) {
    this.window.removeAllListeners(name);
  }
}

module.exports = SettingsWindow;
