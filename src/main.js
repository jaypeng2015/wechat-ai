const { app, Menu, MenuItem } = require('electron');

const MessageBus = require('./message-bus');
const WeChatWindow = require('./windows/wechat');
const SettingsWindow = require('./windows/settings');
const ApiKeyWindow = require('./windows/api-key');

class WeChatMe {
  constructor() {
    this.wechatWindow = null;
    this.settingsWindow = null;
    this.apiKeyWindow = null;
    this.messageBus = null;
    this.menu = null;
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
      this.createApiKeyWindow();
      this.createSettingsWindow();
      this.createSettingsMenu();
      this.createMessageBus();
    });

    app.on('activate', () => {
      if (this.wechatWindow == null) {
        this.createWeChatWindow();
      } else {
        this.wechatWindow.show();
      }
    });

    app.on('before-quit', () => {
      this.settingsWindow.removeAllListeners('close');
    });
  }

  createWeChatWindow() {
    this.wechatWindow = new WeChatWindow();
  }

  createMessageBus() {
    this.messageBus = new MessageBus(this.wechatWindow.window.webContents);
  }

  createSettingsMenu() {
    const instance = this;
    const template = [];
    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'hide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      });
    }
    this.menu = Menu.buildFromTemplate(template);
    const settingsMenuItem = new MenuItem({
      label: 'Settings',
      submenu: [
        {
          label: 'Auto Reply',
          click: () => {
            instance.settingsWindow.show();
          },
          enabled: false,
        },
        {
          label: 'Api Key',
          click: () => {
            instance.apiKeyWindow.show();
          },
        },
      ],
    });
    this.menu.append(settingsMenuItem);
    Menu.setApplicationMenu(this.menu);
  }

  createSettingsWindow() {
    this.settingsWindow = new SettingsWindow(this.wechatWindow.window);
  }

  createApiKeyWindow() {
    this.apiKeyWindow = new ApiKeyWindow(this.wechatWindow.window);
  }
}

new WeChatMe().init();
