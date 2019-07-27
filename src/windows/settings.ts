import { BrowserWindow } from 'electron';

export default class SettingsWindow {
  private window: BrowserWindow;
  constructor(parent) {
    this.createWindow(parent);
    this.initWindowEvents();
  }

  public hide() {
    this.window.hide();
  }

  public show() {
    this.window.webContents.send('show');
    this.window.show();
    this.window.focus();
  }

  createWindow(parent) {
    this.window = new BrowserWindow({
      width: 500,
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

    this.window.loadURL(`file://${__dirname}/html/settings.html`);
  }

  initWindowEvents() {
    this.window.on('close', event => {
      event.preventDefault();
      this.hide();
    });
  }
}
