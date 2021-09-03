const router = new (require('express')).Router();

router.get('/welcome', function(req, res) {
  res.send('Hello world!');
});

module.exports = router;
