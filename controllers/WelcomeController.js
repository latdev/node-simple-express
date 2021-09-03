const router = new (require('express')).Router();

router.get('/welcome', function(req, res) {
  res.render('Hello world!');
});

module.exports = router;
