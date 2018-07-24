var express = require('express');
var router = express.Router();
var fs = require('fs');

// get the seed data
var data = require('../seed-data');

function getProject(alias){
    if(alias){
        var index = parseInt(data.projectIndex[alias]);
        return data.myProjects[index];
    }else{
        return data.myProjects;
    }
}

router.get('/', function (req, res, next) {
    res.render('projects', { 
        title: 'Projects', 
        navProjects: true, 
        showFooter: true, 
        projects: getProject() 
    });
});
  
router.get('/:projectAlias', function (req, res, next) {
    var project = getProject(req.params.projectAlias);
    res.render('project-detail', { 
      title: project.name ,
      navProjects: true, 
      showFooter: true, 
      project:  project
    });
});
  
router.get('/:projectAlias/demo', function (req, res, next) {
    var project = getProject(req.params.projectAlias);
    res.render('demos/'+ req.params.projectAlias, { 
      layout: 'layout-demo', 
      title: project.name ,
      project: project
    });
});

module.exports = router;