var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017';
var db;
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to MongoDB Server...");
  db = client.db('portfolio');
});

function checkUser(userid, password, callback){
  var collection = db.collection('users');
  collection.find({'email': userid, 'password': password},{'password': 0}).toArray(function(err, docs) {
    if(err)
      callback(err, null);
    else
      callback(null, docs[0]);
  });
}

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
  function doLogin(error, data){
    if(error){
      // handle it
      var message = "Invalid email or password";
      res.render('admin/signin', { layout: 'layout-signin', error: true, messages:[message] });
    }

    console.log(JSON.stringify(data));

    req.session.isAuthenticated = true;
    req.session.user = data;
    res.locals.user = data;

    res.render('admin/dashboard', { 
      layout: 'layout-admin', 
      title: 'Admin Dashboard',
      navDashboard: true
    });
  };

  var email = req.body.email;
  var password = req.body.password;
  // validate inputs
  req.checkBody('email', 'Email is required').
      notEmpty().withMessage('Email can not be empty').
      isEmail().withMessage('Please enter a valid email');
  req.checkBody('password', 'Password is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
        messages.push(error.msg);
    });
    res.render('admin/signin', {layout:'layout-signin', error: messages.length > 0,messages: messages});
  }else{   
    // authenticate the user details
    checkUser(email, password, doLogin);
  }
});

router.get('/signout', function(req, res, next) {
  req.session.isAuthenticated = false;
  delete req.session.user;
  res.redirect('/signin'); 
});
module.exports = router;