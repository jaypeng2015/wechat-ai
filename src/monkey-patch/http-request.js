/* eslint-disable */
(function monkeyPatch(xhr) {
  var send = xhr.send;
  function banana(xhrInstance, args) {
    console.log(xhrInstance, args);
  }
  xhr.send = function monkeySend() {
    var rsc = this.onreadystatechange;
    if (rsc) {
      this.onreadystatechange = function onreadystatechange() {
        banana(this, arguments);
        return rsc.apply(this, arguments);
      };
    }
    return send.apply(this, arguments);
  };
})(XMLHttpRequest.prototype);
/* eslint-enable */
