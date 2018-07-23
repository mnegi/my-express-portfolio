var express = require('express');
var router = express.Router();
var myProjects = [
  {
    name: "Number Guessing Game",
    image: "/images/projects/number-guessing-game.jpg",
    description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    github: "https://www.github.com/mnegi",
    detailUrl: '/projects/number-guessing-game'
  },
  {
    name: "JS Console",
    image: "/images/projects/js-console.jpg",
    description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    github: "https://www.github.com/mnegi",
    detailUrl: '/projects/js-console'
  },
  {
    name: "Image Changer",
    image: "/images/projects/image-changer.jpg",
    description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    github: "https://www.github.com/mnegi",
    detailUrl: '/projects/image-changer'
  },
  {
    name: "Silly Story Generator",
    image: "/images/projects/silly-story-generator.jpg",
    description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    github: "https://www.github.com/mnegi",
    detailUrl: '/projects/silly-story-generator'
  },
  {
    name: "Image Gallery",
    image: "/images/projects/image-gallery.jpg",
    description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    github: "https://www.github.com/mnegi",
    detailUrl: '/projects/image-gallery'
  },
  {
    name: "Bouncing Balls",
    image: "/images/projects/bouncing-balls.jpg",
    description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    github: "https://www.github.com/mnegi",
    detailUrl: '/projects/bouncing-balls'
  }
];

var pMap = {
  "number-guessing-game":0,
  "js-console":1,
  "image-changer":2,
  "silly-story-generator":3,
  "image-gallery":4,
  "bouncing-balls":5
};

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Portfolio', showFooter: false });
});

router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'Portfolio', showFooter: true, projects: myProjects });
});

router.get('/projects/:projectName', function (req, res, next) {
  var pName = req.params.projectName;
  var index = parseInt(pMap[pName]);
  var projectDetail = myProjects[index];
  res.render('project-detail', { 
    layout: 'layout-projects', 
    title: 'Portfolio', 
    showFooter: true, 
    project:  projectDetail
  });
});

router.get('/projects/:projectName/demo', function (req, res, next) {
  var pName = req.params.projectName;
  console.log(pName);

  res.render('demos/'+ pName, { 
    layout: 'layout-empty', 
    title: 'Portfolio',
    pName: pName
  });
});

module.exports = router;
