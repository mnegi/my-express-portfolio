var data = {
  myProjects: [
    {
      name: "Number Guessing Game",
      alias: "number-guessing-game",
      image: "/projects/number-guessing-game/images/number-guessing-game.png",
      description: "In this project you will build a small number guessing game. System will select a random number between 1 and 100. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.",
      githubUrl: "https://www.github.com/mnegi/number-guessing-game",
      tags: [{name:"JavaScript",class:"primary"},{name:"Math",class:"info"},{name:"Random",class:"danger"}],
      imageSliders: ['slide1.png','slide2.png','slide3.png','slide4.png'],
      relatedProjects: [{name:'JS Console', link: 'js-console'},{name:'Image Gallery', link: 'image-gallery'}, {name:'Bouncing Balls', link: 'bouncing-balls'}, {name:'Matrix Effect', link: 'matrix-effect'}]
    },
    {
      name: "JS Console",
      alias: "js-console",
      image: "/projects/js-console/images/js-console.png",
      description: "In this project you will build a JavaScript console. In this console you will be able to run any JavaScript statements and expressions. Let's try to evaluate JavaScript expressions using your own code.",
      githubUrl: "https://www.github.com/mnegi/js-console",
      tags: [{name:"JavaScript",class:"primary"},{name:"Console",class:"warning"},{name:"geval",class:"success"}],
      imageSliders: ['slide1.png','slide2.png','slide3.png','slide4.png'],
      relatedProjects: [{name:'JS Console', link: 'js-console'},{name:'Image Gallery', link: 'image-gallery'}, {name:'Bouncing Balls', link: 'bouncing-balls'}, {name:'Matrix Effect', link: 'matrix-effect'}]
    },
    {
      name: "Image Changer",
      alias: "image-changer",
      image: "/projects/image-changer/images/image-changer.png",
      description: "This is a very simple JavaScript project which will toggle the images on click of it. In this project you will learn how to handle the events in JavaScript. Learn different ways you can attach event handlers.",
      githubUrl: "https://www.github.com/mnegi/image-changer",
      tags: [{name:"JavaScript",class:"success"},{name:"Events",class:"primary"},{name:"Image",class:"secondary"}],
      imageSliders: ['slide1.png','slide2.png'],
      relatedProjects: [{name:'JS Console', link: 'js-console'},{name:'Image Gallery', link: 'image-gallery'}, {name:'Bouncing Balls', link: 'bouncing-balls'}, {name:'Matrix Effect', link: 'matrix-effect'}]
    },
    {
      name: "Silly Story Generator",
      alias: "silly-story-generator",
      image: "/projects/silly-story-generator/images/silly-story-generator.png",
      description: "In this project you will generates a silly story. We will have a variable username and converts the default US weight and temperature quantities and units in the story into UK equivalents and generate a random silly story.",
      githubUrl: "https://www.github.com/mnegi/silly-story-generator",
      tags: [{name:"JavaScript",class:"primary"},{name:"String",class:"info"},{name:"Array",class:"warning"},{name:"Math.round",class:"danger"},],
      imageSliders: ['slide1.png','slide2.png','slide3.png'],
      relatedProjects: [{name:'JS Console', link: 'js-console'},{name:'Image Gallery', link: 'image-gallery'}, {name:'Bouncing Balls', link: 'bouncing-balls'}, {name:'Matrix Effect', link: 'matrix-effect'}]
    },
    {
      name: "Image Gallery",
      alias: "image-gallery",
      image: "/projects/image-gallery/images/image-gallery.png",
      description: "In this project you will learn how to create an image gallery just by using plain JavaScript. You will see a main image box and few thumbnail images at the bottom. On click of the thumbnail images it will open in the main image box.",
      githubUrl: "https://www.github.com/mnegi/image-gallery",
      tags: [{name:"JavaScript",class:"primary"},{name:"Images",class:"secondary"},{name:"Events",class:"danger"}],
      imageSliders: ['slide1.png','slide2.png','slide3.png','slide4.png', 'slide5.png'],
      relatedProjects: [{name:'JS Console', link: 'js-console'},{name:'Image Gallery', link: 'image-gallery'}, {name:'Bouncing Balls', link: 'bouncing-balls'}, {name:'Matrix Effect', link: 'matrix-effect'}]
    },
    {
      name: "Bouncing Balls",
      alias: "bouncing-balls",
      image: "/projects/bouncing-balls/images/bouncing-balls.png",
      description: "In this project we will build a bouncing balls demo, to show you how useful objects can be in JavaScript. Little balls will bounce around on the screen, and change color when they touch each other using the Canvas API.",
      githubUrl: "https://www.github.com/mnegi/bouncing-balls",
      tags: [{name:"JavaScript",class:"primary"},{name:"Canvas",class:"success"},{name:"Animation",class:"warning"},{name:"Random",class:"info"}],
      imageSliders: ['slide1.png','slide2.png','slide3.png'],
      relatedProjects: [{name:'JS Console', link: 'js-console'},{name:'Image Gallery', link: 'image-gallery'}, {name:'Bouncing Balls', link: 'bouncing-balls'}, {name:'Matrix Effect', link: 'matrix-effect'}]
    },
    {
      name: "Matrix Effect",
      alias: "matrix-effect",
      image: "/projects/matrix-effect/images/matrix-effect.png",
      description: "In this project your will build Matrix rain animation effect using HTML5 canvas and JavaScript. Learn multiple JavaScript features that has been used to create this project including String, Math and Canvas API.",
      githubUrl: "https://www.github.com/mnegi/matrix-effect",
      tags: [{name:"JavaScript",class:"primary"},{name:"Canvas",class:"secondary"},{name:"String",class:"info"}],
      imageSliders: ['slide1.png','slide2.png','slide3.png'],
      relatedProjects: [{name:'JS Console', link: 'js-console'},{name:'Image Gallery', link: 'image-gallery'}, {name:'Bouncing Balls', link: 'bouncing-balls'}, {name:'Matrix Effect', link: 'matrix-effect'}]
    },
    {
      name: "Top 5 Searches",
      alias: "top-5-searches",
      image: "/projects/top-5-searches/images/top-5-searches.png",
      description: "In this project you will build a fake search site, with a search box. The idea is that when terms are entered in the search box, the top 5 previous search terms are displayed in the list. It always shows last 5 searches. ",
      githubUrl: "https://www.github.com/mnegi/top-5-searches",
      tags: [{name:"JavaScript",class:"primary"},{name:"Array",class:"secondary"},{name:"Events",class:"info"}],
      imageSliders: ['slide1.png','slide2.png','slide3.png','slide4.png','slide5.png'],
      relatedProjects: [{name:'JS Console', link: 'js-console'},{name:'Image Gallery', link: 'image-gallery'}, {name:'Bouncing Balls', link: 'bouncing-balls'}, {name:'Matrix Effect', link: 'matrix-effect'}]
    }
  ],

  pMap: {
    "number-guessing-game":0,
    "js-console":1,
    "image-changer":2,
    "silly-story-generator":3,
    "image-gallery":4,
    "bouncing-balls":5,
    "matrix-effect":6,
    "top-5-searches":7
  }
};

module.exports = data;