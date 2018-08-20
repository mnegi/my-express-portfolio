var express = require('express');
var md5 = require('js-md5');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
var apiUrl = "http://localhost:3030/";

// function checkUser(userid, password, callback){
//   var collection = db.collection('users');
//   collection.find({'email': userid, 'password': password},{'password': 0}).toArray(function(err, docs) {
//     if(err)
//       callback(err, null);
//     else
//       callback(null, docs[0]);
//   });
// }

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
  var password = md5(req.body.password);
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
    var args = {
      data: req.body,
      headers: { "Content-Type": "application/json" }
    };

    console.log(JSON.stringify(args.data));

    client.post(apiUrl + 'signin', args, function (jsonData, response) {
        // OK case
        if(jsonData){
            console.log(JSON.stringify(jsonData));
            req.session.isAuthenticated = true;
            req.session.user = jsonData.data[0];
            res.locals.user = jsonData.data[0];

            res.render('admin/dashboard', { 
              layout: 'layout-admin', 
              title: 'Admin Dashboard',
              navDashboard: true
            });
        }else{
          res.render('admin/signin', { 
            layout: 'layout-signin', 
            error: true, 
            messages:[jsonData.err.msg]
          });
        }
    });
  }
});

router.get('/signup', function(req, res, next) {
  res.render('admin/signup', { layout: 'layout-signin' });
});

router.post('/signup', function(req, res, next) {
  // read the values from the body
  // [ take the password and encrypt it ]
  // use the model and save the data
  var args = {
    data: req.body,
    headers: { "Content-Type": "application/json" }
  };

  console.log(JSON.stringify(args.data));

  client.post(apiUrl + 'signup', args, function (jsonData, response) {
      // OK case
      if(jsonData){
          console.log(JSON.stringify(jsonData));
          res.redirect('/signin');
      }else{
        res.render('admin/signup', { layout: 'layout-signin' , hasErrors: true, error: jsonData.data.err});
      }
  });
});

router.get('/signout', function(req, res, next) {
  req.session.isAuthenticated = false;
  delete req.session.user;
  res.redirect('/signin'); 
});

module.exports = router;