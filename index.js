const main = require('./src/main');
const getLogger = require('./src/common/get-logger');

main().catch((err) => getLogger().error(err));
