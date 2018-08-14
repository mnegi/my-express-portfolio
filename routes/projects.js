var express = require('express');
var router = express.Router();
var projectService  = require('../service/projectService');

router.get('/', function (req, res, next) {
    function listProjects(error, data){
        res.render('projects', { 
            title: 'Projects', 
            navProjects: true, 
            showFooter: true, 
            projects: data
        });
    };
    projectService.getProjects(listProjects);
});
  
router.get('/:projectAlias', function (req, res, next) {
    function getProject(error, project){  
        console.log(project);
        res.render('project-detail', { 
            title: project.name ,
            navProjects: true, 
            showFooter: true, 
            project:  project
        });
    };
    projectService.getProjectByAlias(req.params.projectAlias, getProject);
});
  
router.get('/:projectAlias/demo', function (req, res, next) {
    function renderDemo(error, project){  
        console.log(project);
        res.render('demo', { 
            layout: 'layout-demo',
            title: project.name,
            project: project
        });
    };
    projectService.getProjectByAlias(req.params.projectAlias, renderDemo);
});

module.exports = router;