var Project = require('../models/projectModel');
module.exports.getProjects =  function(callback){
    Project.find({}, function(err, projects){
        if(err){
            console.log(JSON.stringify(err));
            callback(err, null);

        }else if (projects){
          console.log(JSON.stringify(projects));
          callback(null, projects);
        }
    });
}

module.exports.getProjectByAlias =  function(alias, callback){
    Project.findOne({'alias': alias}, function(err, project){
        if(err){
            console.log(JSON.stringify(err));
            callback(err, null);

        }else if (project){
          console.log(JSON.stringify(project));
          callback(null, project);
        }
    });
}
function urlify(str){
    var urlifyStr = str.trim().toLowerCase();
    urlifyStr = urlifyStr.replace(/ /g,'-');
    // handle for ? & - 
    return urlifyStr;
}
module.exports.create = function(project, callback){
    console.log('---create project---');
    var projectModel = new Project();
    projectModel.name = project.name;
    projectModel.alias = urlify(project.name); 
    projectModel.githubUrl = project.githubUrl;
    projectModel.image = project.image;
    projectModel.description = project.description;
    projectModel.tags = [];

    var tags = project.tags.trim();
    tags = tags.split(',');
    for(var i=0; i<tags.length; i++){
        projectModel.tags.push({'name':tags[i], 'class': 'info' });
    }

    projectModel.imageSliders = project.imageSliders;
    projectModel.relatedProjects = project.relatedProjects;
    projectModel.createAt = new Date();
    projectModel.save(function(err, project){
        console.log(JSON.stringify(project));
        if(err){
            callback(err, null);
        }else{
            callback(null, project);
        }
    });
}

module.exports.update = function(projectAlias, pObject, callback){
    Project.findOne({'alias': projectAlias}, function(err, project){
        if(err){
            callback(err, null);
        }else{

            console.log(JSON.stringify(project));
            if(pObject.name){
                project.name = pObject.name;
            }
            if(pObject.image){
                project.image = pObject.image;
            }
            if(pObject.description){
                project.description = pObject.description;
            }
            if(pObject.githubUrl){
                project.githubUrl = pObject.githubUrl;
            }
            
            project.save(function(err, project){
                console.log(JSON.stringify(project));
                if(err){
                    callback(err, null);
                }else{
                    callback(null, project);
                }
            });
        }
    });
}

module.exports.delete = function(projectAlias, callback){
    Project.remove({'alias': projectAlias}, function(err, project){
        if(err){
            console.log(JSON.stringify(err));
            callback(err, null);
        }else{
            callback(null, project);
        }
    });
}