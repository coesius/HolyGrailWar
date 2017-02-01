var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index.html');
});

router.get('/reset', function(req, res, next) {
  res.send('reset.html');
});

module.exports = router;
