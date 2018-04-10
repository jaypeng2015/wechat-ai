const _ = require('lodash');
const path = require('path');
const { readFileSync } = require('fs');
const { app, BrowserWindow } = require('electron');

class WeChatWindow {
  constructor() {
    this.createWindow();
    this.initWindowEvents();
  }

  createWindow() {
    this.window = new BrowserWindow({
      width: 900,
      height: 760,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
      show: false,
      icon: path.join(__dirname, '../../assets/icons/png/wechatai.png'),
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

  initWindowEvents() {
    this.window.once('close', event => {
      event.preventDefault();
      app.exit();
    });
  }

  hide() {
    this.window.hide();
  }

  show() {
    this.window.show();
    this.window.focus();
  }
}

module.exports = WeChatWindow;
