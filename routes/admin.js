var express = require('express');
var path = require('path');
var fs = require('fs');
var unzip = require('unzip');
var projectService = require('../service/projectService');
var router = express.Router();

function getBlog(alias){
  if(alias){
      var index = parseInt(data.blogIndex[alias]);
      return data.myBlog[index];
  }else{
      return data.myBlog;
  }
}
router.get('/', function (req, res, next) {
  res.render('admin/dashboard', { 
    layout: 'layout-admin', 
    title: 'Admin Dashboard',
    navDashboard: true
  });
});

router.get('/projects', function (req, res, next) {
  function listProjects(error, data){
    res.render('admin/projects', { 
      layout: 'layout-admin', 
      title: 'Projects Admin',
      navProjects: true,
      projects: data
    });
  };
  projectService.getProjects(listProjects);
});

router.get('/projects/create', function (req, res, next) {
  res.render('admin/project-create', { 
    layout: 'layout-admin', 
    title: 'Projects Admin',
    navProjects: true
  });
});

router.post('/projects/create', function (req, res, next) {
  var callback = function(error, data){
    console.log(error);
    console.log(data);
    res.redirect('/admin/projects');
  };
  var inputData = req.body;
  projectService.create(inputData, callback);
});


router.get('/projects/:projectAlias', function (req, res, next) {
  function getProject(error, data){
    res.render('admin/project-detail', { 
      layout: 'layout-admin', 
      title: data.name,
      navProjects: true,
      project: data
    });
  };
  projectService.getProjectByAlias(req.params.projectAlias, getProject);
});

router.post('/projects/:projectAlias/update', function (req, res) {
  var pAlias = req.params.projectAlias;
  var callback = function(error, data){
    console.log(error);
    console.log(data);
    res.redirect('/admin/projects/'+ pAlias);
  };
  var inputData = req.body;
  projectService.update(req.params.projectAlias, inputData, callback);
});

router.get('/projects/:projectAlias/delete', function (req, res) {
  var pAlias = req.params.projectAlias;
  function deleteProject(error, data){
    if(error){
      // do something
    }else{
      res.redirect('/admin/projects')
    }
  }
  projectService.delete(req.params.projectAlias, deleteProject);
});


module.exports = router;