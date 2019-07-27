import { BrowserWindow } from 'electron';

export default class ApiKeyWindow {
  private window: BrowserWindow;
  constructor(parent) {
    this.createWindow(parent);
    this.initWindowEvents();
  }

  public hide() {
    this.window.hide();
  }

  public show() {
    this.window.webContents.send('show api key');
    this.window.show();
    this.window.focus();
  }

  private createWindow(parent) {
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

  private initWindowEvents() {
    this.window.on('close', event => {
      event.preventDefault();
      this.hide();
    });
  }
}
