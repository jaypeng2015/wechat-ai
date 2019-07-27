import _ from 'lodash';
import { app, BrowserWindow } from 'electron';
import { readFileSync } from 'fs';
import path from 'path';

export default class WeChatWindow {
  public window: BrowserWindow;

  constructor() {
    this.createWindow();
    this.initWindowEvents();
  }

  public hide() {
    this.window.hide();
  }

  public show() {
    this.window.show();
    this.window.focus();
  }

  private createWindow() {
    this.window = new BrowserWindow({
      height: 760,
      icon: path.join(__dirname, '../../assets/icons/png/wechat-ai.png'),
      show: false,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
      width: 900,
    });

    const script = readFileSync(path.join(__dirname, '../monkey-patch/index.js'));
    this.window.once('ready-to-show', () => {
      this.window.show();
    });
    this.window.loadURL('https://wx.qq.com');
    this.window.webContents.on('dom-ready', () => {
      // Monkey patch here
      const javaStript =
        "var script = document.createElement('script');" +
        'script.type = "text/javascript";' +
        `script.text = "${_.replace(script.toString(), /\n/g, '')}";` +
        'document.head.appendChild(script);';
      this.window.webContents.executeJavaScript(javaStript);
    });
  }

  private initWindowEvents() {
    this.window.once('close', event => {
      event.preventDefault();
      app.exit();
    });
  }
}
