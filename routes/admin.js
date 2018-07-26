var express = require('express');
var router = express.Router();
var data = require('../seed-data');

function getProject(alias){
    if(alias){
        var index = parseInt(data.projectIndex[alias]);
        return data.myProjects[index];
    }else{
        return data.myProjects;
    }
}
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
  res.render('admin/projects', { 
    layout: 'layout-admin', 
    title: 'Projects Admin',
    navProjects: true,
    projects: getProject()  
  });
});

router.get('/projects/:projectAlias', function (req, res, next) {
  var project = getProject(req.params.projectAlias);
  res.render('admin/project-detail', { 
    layout: 'layout-admin', 
    title: project.name,
    navProjects: true,
    project: project
  });
});

router.get('/blog', function (req, res, next) {
  res.render('admin/blog', { 
    layout: 'layout-admin', 
    title: 'Blog Admin',
    navBlog: true,
    blogs: getBlog()  
  });
});

// router.get('/projects/:projectAlias', function (req, res, next) {
//   var project = getProject(req.params.projectAlias);
//   res.render('admin/project-detail', { 
//     title: project.name ,
//     navProjects: true, 
//     showFooter: true, 
//     project:  project
//   });
// });

module.exports = router;