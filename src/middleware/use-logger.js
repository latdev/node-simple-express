const { request } = require('express');
const getLogger = require('../common/get-logger');

function setBytesSentHook(response) {
  const hooked = response.socket.write;
  response.bytesSent = 0;

  response.socket.write = function () {
    response.bytesSent += arguments[0].length;
    hooked.apply(this, arguments);
  };
}

module.exports = function useLogger() {
  const rootLogger = getLogger().child({
    source: 'request',
  });

  return (request, response, next) => {
    const requestAddress = structuredClone(request.ip);

    setBytesSentHook(response);

    response.on('finish', () => {
      rootLogger
        .child({
          ip: requestAddress,
          status: response.statusCode,
          sent: response.bytesSent,
        })
        .info(request.method + ' ' + request.url);
    });
    next();
  };
};
