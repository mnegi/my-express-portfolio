var express = require('express');
var router = express.Router();
var data = require('../seed-data');

router.get('/', function (req, res, next) {
  res.render('index', { layout: 'layout-index', navHome: true });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', showFooter: true, navAbout: true });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', showFooter: true, navContact: true });
});

router.post('/contact', function(req, res, next) {
  // read the values passed from the ui
  var data = req.body;
  console.log(JSON.stringify(data));

  res.render('confirm', { title: 'Contact', showFooter: true, navContact: true, data: data });
});

router.get('/resume', function(req, res, next) {
  res.redirect('/manohar-negi-resume.pdf'); 
});

router.get('/signin', function(req, res, next) {
  res.render('admin/signin', { layout: 'layout-signin' });
});

router.post('/signin', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  // authenticate the user details
  if(email && email !== '' && password && password !== '' &&
      email === data.user.email && password === data.user.password){
    // create the session
    req.session.isAuthenticated = true;
    req.session.user = {'email': email};
    res.locals.user = {'email': email};

    res.render('admin/dashboard', { 
      layout: 'layout-admin', 
      title: 'Admin Dashboard',
      navDashboard: true
    });
  }else{
    var message = "Invalid email or password";
    res.render('admin/signin', { layout: 'layout-signin', error: true, message: message});
  }
});

router.get('/signout', function(req, res, next) {
  req.session.isAuthenticated = false;
  delete req.session.user;
  res.redirect('/signin'); 
});
module.exports = router;