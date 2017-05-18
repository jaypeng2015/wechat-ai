const { app } = require('electron');

const WeChatWindow = require('./windows/wechat');

class WeChatMe {
  constructor() {
    this.wechatWindow = null;
  }

  checkInstance() {
    return !app.makeSingleInstance(() => {
      if (this.wechatWindow) {
        this.wechatWindow.show();
      }
    });
  }

  init() {
    if (this.checkInstance()) {
      this.initApp();
    } else {
      app.quit();
    }
  }

  initApp() {
    app.on('ready', () => {
      this.createWeChatWindow();
    });

    app.on('activate', () => {
      if (this.wechatWindow == null) {
        this.createWeChatWindow();
      } else {
        this.wechatWindow.show();
      }
    });

    app.on('will-quit', () => {
      app.quit();
    });
  }

  createWeChatWindow() {
    this.wechatWindow = new WeChatWindow();
  }
}

new WeChatMe().init();
