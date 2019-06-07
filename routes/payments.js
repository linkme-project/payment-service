let os = require('os');
let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.send(`Payment Service running on ${os.hostname()}`);
});

module.exports = router;
