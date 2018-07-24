var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { layout: 'layout-index', navHome: true });
});

router.get('/about', function(req, res, next) {
  res.render('about', { showFooter: true, navAbout: true });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { layout:'layout-contact', showFooter: true, navContact: true });
});

router.get('/resume', function(req, res, next) {
  res.redirect('/manohar-negi-resume.pdf'); 
});

module.exports = router;