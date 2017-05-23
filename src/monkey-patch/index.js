/* eslint-disable */
(function(xhr) {
  const { ipcRenderer } = require('electron');
  const triggerKeyDown = (element, keyCode) => {
    const e =  new window.KeyboardEvent('keydown', {
      bubbles: true,
    });
    delete e.keyCode;
    Object.defineProperty(e, 'keyCode', {value: keyCode});
    element.dispatchEvent(e);
  };
  ipcRenderer.on('reply text', (event, message) => {
    const { user, response } = message;
    const element = document.querySelectorAll(`[data-username=\"${user}\"]`)[0];
    element.click();
    const editArea = document.getElementById('editArea');
    editArea.innerHTML = response.result.fulfillment.speech.replace('\\n', '<br>');
    angular.element(editArea).scope().editAreaCtn = editArea.innerHTML;
    triggerKeyDown(editArea, 13); /* send the message */
  });
  const findMe = () => {
    const header = document.querySelectorAll('div[class=\"header\"]')[0];
    if (!header) {
      return null;
    }

    const tmp = header.innerHTML.substring(header.innerHTML.indexOf('username=') + 9);
    return tmp.substring(0, tmp.indexOf('&'));
  };
  const banana = (xhrInstance, events) => {
    if (xhrInstance.readyState == 4 && xhrInstance.status === 200 && events[0].target.responseText) {
      const response = JSON.parse(events[0].target.responseText);
      const me = findMe();
      if (response.BaseResponse.Ret === 0 && response.AddMsgCount > 0) {
        const messages = response.AddMsgList.filter(message => (
          message.ToUserName === me && (
          message.MsgType === 1 /* text message */
            || message.MsgType === 3 /* images */
            || message.MsgType === 34 /* voice message */
            || message.MsgType === 49)) /* sharing */
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
