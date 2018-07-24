var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { layout: 'layout-index' });
});

router.get('/resume', function(req, res, next) {
  res.redirect('/manohar-negi-resume.pdf'); 
});

module.exports = router;