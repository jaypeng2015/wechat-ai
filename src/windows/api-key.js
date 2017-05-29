const { BrowserWindow } = require('electron');

class ApiKeyWindow {
  constructor(parent) {
    this.createWindow(parent);
    this.initWindowEvents();
  }

  createWindow(parent) {
    this.window = new BrowserWindow({
      width: 480,
      height: 300,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
      parent,
      modal: false,
      show: false,
      resizable: false,
    });

    this.window.loadURL(`file://${__dirname}/api-key.html`);
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
    this.window.webContents.send('show api key');
    this.window.show();
    this.window.focus();
  }

  removeAllListeners(name) {
    this.window.removeAllListeners(name);
  }
}

module.exports = ApiKeyWindow;
