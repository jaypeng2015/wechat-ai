const { ipcMain } = require('electron');

class MessageBus {
  constructor() {
    MessageBus.initiate();
  }

  static initiate() {
    ipcMain.on('wechatMessage', (event, messages) => {
      console.log('message received');
      console.log(event);
      console.log(messages);
    });
  }
}

module.exports = MessageBus;
