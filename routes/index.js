var express = require('express');
var router = express.Router();
var myProjects = [
  {
    name: "Number Guessing Game",
    alias: "number-guessing-game",
    image: "/projects/number-guessing-game/images/number-guessing-game.jpg",
    description: "In this project you will build a small number guessing game. System will select a random number between 1 and 100. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.",
    githubUrl: "https://www.github.com/mnegi/number-guessing-game",
    tags: [{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"}]
  },
  {
    name: "JS Console",
    alias: "js-console",
    image: "/projects/js-console/images/js-console.jpg",
    description: "In this project you will build a JavaScript console. In this console you will be able to run any JavaScript statements and expressions. Let's try to evaluate JavaScript expressions using your own code.",
    githubUrl: "https://www.github.com/mnegi/js-console",
    tags: [{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"}]
  },
  {
    name: "Image Changer",
    alias: "image-changer",
    image: "/projects/image-changer/images/image-changer.jpg",
    description: "This is a very simple JavaScript project which will toggle the images on click of it. In this project you will learn how to handle the events in JavaScript. Learn different ways you can attach event handlers.",
    githubUrl: "https://www.github.com/mnegi/image-changer",
    tags: [{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"}]
  },
  {
    name: "Silly Story Generator",
    alias: "silly-story-generator",
    image: "/projects/silly-story-generator/images/silly-story-generator.jpg",
    description: "In this project you will generates a silly story. We will have a variable username and converts the default US weight and temperature quantities and units in the story into UK equivalents and generate a random silly story.",
    githubUrl: "https://www.github.com/mnegi/silly-story-generator",
    tags: [{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"}]
  },
  {
    name: "Image Gallery",
    alias: "image-gallery",
    image: "/projects/image-gallery/images/image-gallery.jpg",
    description: "In this project you will learn how to create an image gallery just by using plain JavaScript. You will see a main image box and few thumbnail images at the bottom. On click of the thumbnail images it will open in the main image box.",
    githubUrl: "https://www.github.com/mnegi/image-gallery",
    tags: [{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"}]
  },
  {
    name: "Bouncing Balls",
    alias: "bouncing-balls",
    image: "/projects/bouncing-balls/images/bouncing-balls.jpg",
    description: "In this project we will build a bouncing balls demo, to show you how useful objects can be in JavaScript. Little balls will bounce around on the screen, and change color when they touch each other using the Canvas API.",
    githubUrl: "https://www.github.com/mnegi/bouncing-balls",
    tags: [{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"}]
  },
  {
    name: "JS Matrix Effect",
    alias: "js-matrix-effect",
    image: "/projects/js-matrix-effect/images/js-matrix-effect.jpg",
    description: "In this project your will build Matrix rain animation effect using HTML5 canvas and JavaScript. Learn multiple JavaScript features that has been used to create this project including String, Math and Canvas API.",
    githubUrl: "https://www.github.com/mnegi/js-matrix-effect",
    tags: [{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"},{name:"JavaScript",class:"primary"}]
  }
];

var pMap = {
  "number-guessing-game":0,
  "js-console":1,
  "image-changer":2,
  "silly-story-generator":3,
  "image-gallery":4,
  "bouncing-balls":5,
  "js-matrix-effect":6
};

function getProject(alias){
  var index = parseInt(pMap[alias]);
  return myProjects[index];
}

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Portfolio', navHome: true, showFooter: false });
});

router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'Portfolio', navProjects: true, showFooter: true, projects: myProjects });
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

module.exports = router;
