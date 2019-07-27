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

  private createWindow(parent) {
    this.window = new BrowserWindow({
      height: 480,
      modal: false,
      parent,
      resizable: false,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
      width: 500,
    });

    this.window.loadURL(`file://${__dirname}/html/settings.html`);
  }

  private initWindowEvents() {
    this.window.on('close', event => {
      event.preventDefault();
      this.hide();
    });
  }
}
