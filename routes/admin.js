var express = require('express');
var data = require('../mydata.json');
var path = require('path');
var fs = require('fs');
var unzip = require('unzip');
var projectService = require('../service/projectService');
var mediaService = require('../service/mediaService');
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

router.get('/projects/:projectAlias/upload', function (req, res) {
  var pAlias = req.params.projectAlias;
  res.render('admin/upload', { 
    layout: 'layout-admin', 
    title: 'Upload Cover Image',
    navProjects: true,
    actionUrl: '/admin/projects/'+ pAlias+ '/upload'
  });
});

router.post('/projects/:projectAlias/upload', function (req, res, next) {
  var pAlias = req.params.projectAlias;
  var dir = path.join(__dirname, '../public/images/projects');
  var finishUpload = function (err, data){
    if(err){
      //throw new Error('errro...');
      console.log(err)
      res.render('404');
    }else{
      res.redirect('/admin/projects/' + pAlias);
    }
  };

  var callback = function(error, data){
    if(error){
      console.log(error);
    }else{
      projectService.update(pAlias, { image: '/images/projects/'+ pAlias + '.png'}, finishUpload);
    }
  };
  
  mediaService.uploadMedia(req, res, dir, pAlias + '.png', callback);
});

router.get('/projects/:projectAlias/uploaddemo', function (req, res) {
  var pAlias = req.params.projectAlias;
  res.render('admin/upload', { 
    layout: 'layout-admin', 
    title: 'Upload demo project',
    navProjects: true,
    actionUrl: '/admin/projects/'+ pAlias+ '/uploaddemo'
  });
});

router.post('/projects/:projectAlias/uploaddemo', function (req, res, next) {
  var pAlias = req.params.projectAlias;
  var dir = path.join(__dirname, '../public/project-demos/'+ pAlias);
  var finishUpload = function (err, data){
    if(err){
      console.error(err)
      throw new Error('errro...');
    }else{
      // unzip the contents to the same folder
      var zipfile = dir + '/' + pAlias + '.zip';
      // how to handle this error???
      fs.createReadStream(zipfile).pipe(unzip.Extract({ path: dir }));
      fs.unlinkSync(zipfile);
      res.redirect('/admin/projects/' + pAlias);
    }
  };
  
  mediaService.uploadMedia(req, res, dir, pAlias + '.zip', finishUpload);
});


router.get('/media', function (req, res) {
res.render('admin/upload', { 
  layout: 'layout-admin', 
  title: 'Image Upload',
  navProjects: true
});
});

// router.post('/media', function (req, res) {
// // var dir = path.join(__dirname, '../public/projects/' 

// // mediaService.upload(req, res, '')
// // req, res, path, alias, callback
// // upload(req, res, function (err) {
// //   if (err) {
// //     return res.end("Error uploading file.");
// //   }
// //   res.end("File is uploaded");
// // });
// });



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