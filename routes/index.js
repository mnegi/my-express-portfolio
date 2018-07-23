var express = require('express');
var router = express.Router();
var fs = require('fs');

// get the seed data
var data = require('../seed-data');

function getProject(alias){
  if(alias){
    var index = parseInt(data.pMap[alias]);
    return data.myProjects[index];
  }else{
    return data.myProjects;
  }
}

router.get('/', function (req, res, next) {
  res.render('index', { layout: 'layout-index' });
});

router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'Portfolio', navProjects: true, showFooter: true, projects: getProject() });
});

router.get('/projects/:projectAlias', function (req, res, next) {
  res.render('project-detail', { 
    title: 'Portfolio', 
    navProjects: true, 
    showFooter: true, 
    project:  getProject(req.params.projectAlias)
  });
});

router.get('/projects/:projectAlias/demo', function (req, res, next) {
  res.render('demos/'+ req.params.projectAlias, { 
    layout: 'layout-demo', 
    title: 'Portfolio',
    project: getProject(req.params.projectAlias)
  });
});

router.get('/resume', function(req, res, next) {
  res.redirect('/manohar-negi-resume.pdf'); 

  // fs.readFile('../public/manohar-negi-resume.pdf' , function (err,data){
  //     res.contentType("application/pdf");
  //     res.send(data);
  // });
});

module.exports = router;
