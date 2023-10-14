const getLogger = require('../../common/get-logger');

function useNotFound() {
  return (req, res) => {
    res.status(404);
    res.format({
      html: function () {
        res.render(__dirname + '/404', { url: req.url });
      },
      json: function () {
        res.json({ error: 'Not found' });
      },
      default: function () {
        res.type('txt').send('Not found');
      },
    });
  };
}

function useErrors() {
  return (err, req, res, next) => {
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().

    getLogger()
      .child({
        source: 'request-failed',
      })
      .error(err);

    res.status(err.status || 500);
    res.render(__dirname + '/500', { error: err });
  };
}

module.exports = { useNotFound, useErrors };
