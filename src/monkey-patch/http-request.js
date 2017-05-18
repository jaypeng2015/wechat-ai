/* eslint-disable */
(function(xhr) {
  function banana(xhrInstance, events) {
    if (events[0].target.responseText) {
      const response = JSON.parse(events[0].target.responseText);
      console.log(response)
    }
  }
  var open = xhr.open;
  xhr.open = function(method, url, async) {
    if (/^POST$/i.test(method) && url.startsWith('/cgi-bin/mmwebwx-bin/webwxsync?')) {
      var send = this.send;
      this.send = function() {
        var rsc = this.onreadystatechange;
        console.log('rsc', rsc);
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
