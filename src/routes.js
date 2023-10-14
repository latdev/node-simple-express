const { Router } = require('express');
const WelcomeController = require('./controllers/WelcomeController');

module.exports = function useRouter() {
  const routes = new Router();

  routes.get('/', (_, res) => res.redirect(302, '/welcome'));
  routes.get('/welcome', WelcomeController.actionIndex);

  return (request, response, next) => {
    routes(request, response, next);
  };
};
