/* eslint-disable */
(function(xhr) {
  const { ipcRenderer } = require('electron');
  ipcRenderer.on('reply text', (event, message) => {
    const { user, response } = message;
    console.log('reply to', user);
    console.log('reply text', response.result.fulfillment.speech);
  });
  const banana = (xhrInstance, events) => {
    if (xhrInstance.readyState == 4 && xhrInstance.status === 200 && events[0].target.responseText) {
      const response = JSON.parse(events[0].target.responseText);
      if (response.BaseResponse.Ret === 0 && response.AddMsgCount > 0) {
        const messages = response.AddMsgList.filter(message => (
          message.MsgType === 1 /* text message */
            || message.MsgType === 3 /* images */
            || message.MsgType === 34 /* voice message */
            || message.MsgType === 49) /* sharing */
        );
        if (messages.length > 0) {
          ipcRenderer.send('wechatMessage', messages);
        }
      }
    }
  };
  const open = xhr.open;
  xhr.open = function(method, url, async) {
    if (/^POST$/i.test(method) && url.startsWith('/cgi-bin/mmwebwx-bin/webwxsync?')) {
      const send = this.send;
      this.send = function() {
        const rsc = this.onreadystatechange;
        if (rsc) {
          this.onreadystatechange = function() {
            banana(this, arguments);
            return rsc.apply(this, arguments);
          };
        }
        return send.apply(this, arguments);
      };
    }
    return open.apply(this, arguments);
  };
})(XMLHttpRequest.prototype);
/* eslint-enable */
