const express = require('express');

const getLogger = require('./common/get-logger');
const useRouter = require('./routes');
const useLogger = require('./middleware/use-logger');
const {
  useNotFound,
  useErrors,
} = require('./middleware/use-errors/use-errors');

module.exports = async function main() {
  const app = express();

  //app.set('trust proxy', '127.0.0.1');
  app.set('view engine', 'pug');
  app.set('views', __dirname + '/views');
  app.locals.pretty = true;

  app.use('/static', express.static(__dirname + '/../static'));
  app.use(useLogger(), useRouter());
  app.use(useNotFound(), useErrors());

  app.listen(3000, 'localhost', function () {
    getLogger().info('server started on http://localhost:3000/');
  });
};
