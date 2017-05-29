const _ = require('lodash');
const uuid = require('uuid');
const { ipcMain, Menu } = require('electron');
const apiAi = require('../api-ai');
const settings = require('../settings');

class MessageBus {
  constructor(webContents) {
    this.sessions = {};
    this.webContents = webContents;
    this.initiate();
  }

  initiate() {
    ipcMain.on('wechatMessage', (event, messages) => {
      const promises = _.map(messages, message => this.handleMessage(message));
      Promise.all(promises);
    });

    ipcMain.on('get contact', (event, contacts) => {
      settings.syncContacts(contacts.MemberList);
      const menu = Menu.getApplicationMenu().items.find(item => item.label === 'Settings');
      const subMenu = menu.submenu.items.find(sub => sub.label === 'Auto Reply');
      subMenu.enable = true;
      subMenu.enabled = true;
    });

    ipcMain.on('loadAutoReplySettings', (event) => {
      const contacts = settings.getContacts() || {};
      const array = _.values(contacts);
      event.sender.send('loadAutoReplySettingsReply', array);
    });

    ipcMain.on('udpateAutoReplySettings', (event, contact) => {
      settings.updateContact(contact);
    });

    ipcMain.on('getApiKey', (event) => {
      event.sender.send('getApiKeyReply', settings.getApiKey());
    });

    ipcMain.on('setApiKey', (event, apiKey) => {
      settings.setApiKey(apiKey);
    });
  }

  /**
   * Handle message.
   * @param {Object} message A WeChat message which looks like:
   * ```
   * { AppInfo: { AppID: '', Type: 0 },
   *   AppMsgType: 0,
   *   Content: 'Hi ',
   *   CreateTime: 1495406416,
   *   FileName: '',
   *   FileSize: '',
   *   ForwardFlag: 0,
   *   FromUserName: '@9bdc295a3bd018e6ea5c6df03bc7e4120f2fd949f23f103917eabf98a2e19502',
   *   HasProductId: 0,
   *   ImgHeight: 0,
   *   ImgStatus: 1,
   *   ImgWidth: 0,
   *   MediaId: '',
   *   MsgId: '8861816552738285552',
   *   MsgType: 1,
   *   NewMsgId: 8861816552738286000,
   *   OriContent: '',
   *   PlayLength: 0,
   *   RecommendInfo:
   *   { Alias: '',
   *     AttrStatus: 0,
   *     City: '',
   *     Content: '',
   *     NickName: '',
   *     OpCode: 0,
   *     Province: '',
   *     QQNum: 0,
   *     Scene: 0,
   *     Sex: 0,
   *     Signature: '',
   *     Ticket: '',
   *     UserName: '',
   *     VerifyFlag: 0 },
   *   Status: 3,
   *   StatusNotifyCode: 0,
   *   StatusNotifyUserName: '',
   *   SubMsgType: 0,
   *   Ticket: '',
   *   ToUserName: '@9bdc295a3bd018e6ea5c6df03bc7e4120f2fd949f23f103917eabf98a2e19502',
   *   Url: '',
   *   VoiceLength: 0
   * }
   * ```
   */
  async handleMessage(message) {
    const { MsgType, Content, FromUserName } = message;
    const contacts = settings.getContacts() || {};
    const enabled = contacts[FromUserName];
    if (!enabled) {
      return;
    }

    let sessionId = this.sessions[FromUserName];
    if (!sessionId) {
      sessionId = uuid.v4();
      this.sessions[FromUserName] = sessionId;
    }

    let response;
    switch (MsgType) {
      case 1: // text message
        response = await apiAi.request(Content, sessionId);
        if (_.get(response, 'status.code') === 200) {
          this.webContents.send('reply text', {
            user: FromUserName,
            response,
          });
        }
        break;
      default:
        // ignore other types of messages for now
    }
  }
}

module.exports = MessageBus;
