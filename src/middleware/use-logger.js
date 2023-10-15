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
    const requestStart = process.hrtime.bigint();

    /**
     *
     *  @todo setBytesSentHook can be replaced
     *   request.socket.bytesRead
     *   request.socket.bytesWritten
     *
     *  but this method are some buggy with keep-alive connection
     *
     */
    setBytesSentHook(response);

    response.on('finish', () => {
      rootLogger
        .child({
          ip: requestAddress,
          status: response.statusCode,
          // read: request.socket.bytesRead,
          sent: response.bytesSent,
          duration: Math.round(parseInt(process.hrtime.bigint() - requestStart) / 1000000) / 1000
        })
        .info(request.method + ' ' + request.url);
    });
    next();
  };
};
