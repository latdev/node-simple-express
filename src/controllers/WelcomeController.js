module.exports = class WelcomeController {
  static actionIndex(_, response) {
    response.render('welcome');
  }
};
