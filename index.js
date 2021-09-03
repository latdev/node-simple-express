const express = require('express');
const pathjoin = require('path').join;
const relative = target => pathjoin(__dirname, target);

const app = express();
const WelcomeController = require(relative('controllers/WelcomeController'));

app.set('view engine', 'pug');
app.set('views', relative('views'));

app.use('/static', express.static(relative('static')));
app.use('/v1', WelcomeController);
app.get('/', (_, res) => res.redirect('/v1/welcome'));

app.listen(3000, 'localhost', function() {
  console.log('server started on http://localhost:3000/');
});
