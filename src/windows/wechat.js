const _ = require('lodash');
const path = require('path');
const { readFileSync } = require('fs');
const { BrowserWindow } = require('electron');

class WeChatWindow {
  constructor() {
    this.createWindow();
    this.initWindowEvents();
  }

  createWindow() {
    this.wechatWindow = new BrowserWindow({
      width: 900,
      height: 760,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
    });

    const script = readFileSync(path.join(__dirname, '../monkey-patch/index.js'));
    this.wechatWindow.webContents.openDevTools();
    this.wechatWindow.loadURL('https://wx.qq.com');
    this.wechatWindow.webContents.on('dom-ready', () => {
      // Monkey patch here
      const javaStript =
        "var script = document.createElement('script');"
        + 'script.type = "text/javascript";'
        + `script.text = "${_.replace(script.toString(), /\n/g, '')}";`
        + 'document.head.appendChild(script);';
      this.wechatWindow.webContents.executeJavaScript(javaStript);
    });
  }

  initWindowEvents() {
    this.wechatWindow.on('close', (event) => {
      if (this.wechatWindow.isVisible()) {
        event.preventDefault();
        this.hide();
      }
    });
  }

  hide() {
    this.wechatWindow.hide();
  }

  show() {
    this.wechatWindow.show();
    this.wechatWindow.focus();
  }
}

module.exports = WeChatWindow;
