var express = require('express');
var data = require('../mydata.json');
var fs = require('fs');

var router = express.Router();

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
  
  data.myProjects.push(inputData);
  var index = Object.keys(data.projectIndex).length;
  data.projectIndex[inputData.alias] = index;

  console.log(JSON.stringify(data.myProjects));
  var jsonData = JSON.stringify(data);

  //fs.writeFile('mydata.json', jsonData, 'utf8', function());

  fs.writeFile("mydata.json", jsonData, function(err) {
    if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
      res.redirect('/admin/projects')
  }); 
  
  // res.render('admin/project-create', { 
  //   layout: 'layout-admin', 
  //   title: 'Projects Admin',
  //   navProjects: true
  // });
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