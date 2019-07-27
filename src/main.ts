import { app, Menu, MenuItem, MenuItemConstructorOptions } from 'electron';

import ApiKeyWindow from './windows/api-key';
import MessageBus from './message-bus';
import SettingsWindow from './windows/settings';
import WeChatWindow from './windows/wechat';

class WeChatAI {
  private apiKeyWindow: ApiKeyWindow;
  private menu: Menu;
  private messageBus: MessageBus;
  private settingsWindow: SettingsWindow;
  private wechatWindow: WeChatWindow;

  public init() {
    const gotTheLock = app.requestSingleInstanceLock();
    if (!gotTheLock) {
      app.quit();
      return;
    }

    app.on('second-instance', () => {
      // Someone tried to run a second instance, we should focus our window.
      if (this.wechatWindow) {
        if (this.wechatWindow.window.isMinimized()) {
          this.wechatWindow.window.restore();
        }
        this.wechatWindow.window.focus();
      }
    });

    this.initApp();
  }

  private initApp() {
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
  }

  private createWeChatWindow() {
    this.wechatWindow = new WeChatWindow();
    // this.wechatWindow.window.webContents.openDevTools();
  }

  private createMessageBus() {
    this.messageBus = new MessageBus(this.wechatWindow.window.webContents);
  }

  private createSettingsMenu() {
    const instance = this;
    const template: MenuItemConstructorOptions[] = [];
    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'hide' }, { type: 'separator' }, { role: 'quit' }],
      });
    }
    this.menu = Menu.buildFromTemplate(template);
    const settingsMenuItem = new MenuItem({
      label: 'Settings',
      submenu: [
        {
          click: () => {
            instance.settingsWindow.show();
          },
          enabled: false,
          label: 'Auto Reply',
        },
        {
          click: () => {
            instance.apiKeyWindow.show();
          },
          label: 'Api Key',
        },
      ],
    });
    this.menu.append(settingsMenuItem);
    Menu.setApplicationMenu(this.menu);
  }

  private createSettingsWindow() {
    this.settingsWindow = new SettingsWindow(this.wechatWindow.window);
  }

  private createApiKeyWindow() {
    this.apiKeyWindow = new ApiKeyWindow(this.wechatWindow.window);
  }
}

new WeChatAI().init();
