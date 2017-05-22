const { app } = require('electron');

const WeChatWindow = require('./windows/wechat');
const MessageBus = require('./message-bus');

class WeChatMe {
  constructor() {
    this.wechatWindow = null;
    this.messageBus = null;
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
      this.createMessageBus();
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

  createMessageBus() {
    this.messageBus = new MessageBus(this.wechatWindow.wechatWindow.webContents);
  }
}

new WeChatMe().init();
