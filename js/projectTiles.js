const projects = [
  {
    title: "Molementum",
    imageURL: "molementum.gif",
    contributions: [
      "Networking systems including gameplay synchronization, lobby creation, and Steam integration",
      "Finite state machine for player movement, and a modular upgrades system",
      "Dynamic objectives system, and general game architecture"
    ],
    dates: "Sept 2023 - May 2024",
    teamSize: "19",
    roles: [ 
      "Lead Programmer", 
      "Networking Programmer", 
      "Systems Programmer"
    ],
    pageURL:"molementum.html"
  },  
  {
    title: "Agripocalypse",
    imageURL: "agripocalypse.gif",
    contributions: [
      "Finite state machines for player and enemies",
      "In-depth developer tools for level building, enemy pathing, and item creation",
      "Configured Unity HDRP for volumetric lighting",
    ],
    dates: "Jan 2023 - May 2023",
    pageURL:"agripocalypse.html"
  },
  {
    title: "VizBoXR",
    imageURL: "vizboxr.gif",
    contributions: [
      "Networking system that sends large amounts of data to many users",
      "Multiplayer lobby hosting/joining from Windows & Android",
      "R&D with GoogleARCore, SteamVR, and Oculus"
    ],
    dates: "June 2022 - Dec 2022",
    pageURL:"vizboxr.html"
  },
  {
    title: "Space Junk Janitor Simulator 2222",
    imageURL: "sjjs.gif",
    contributions: [
      "Movement system using bone rigging",
      "Spline-based \"gravity-path\" level gimmick", 
      "Dynamic mini-map that is auto-generated for each level"
    ],
    dates: "April 2022 - May 2022",
    pageURL:"sjjs.html"
  },
  {
    title: "Fashion For All",
    imageURL: "ffa.gif",
    contributions: [
      "UI-based gameplay system",
      "System that creates images using different combinations of colors, patterns, and styles", 
      "Dynamically generated UI"
    ],
    dates: "Feb 2022 - March 2022",
    pageURL:"ffa.html"

  },
  {
    title: "Fr0G-0",
    imageURL: "froggo.gif",
    contributions: [
      "Platformer gameplay implementation",
      "Basic Enemy AI", 
      "Level building tools",
      "Little frogs that follow the player :)"
    ],
    dates: "Jan 2022 - Feb 2022",
    pageURL:"froggo.html"
  },
];


function replacePlaceholders(templateString, data) {
  return Object.keys(data).reduce((str, key) => {
    const placeholder = `{{${key}}}`;
    if (Array.isArray(data[key])) {
      const pElements = data[key].map(item => `<p>${item}</p>\n`).join('');
      return str.replace(placeholder, pElements);
    } else {
      return str.replace(placeholder, data[key]);
    }
  }, templateString);
}

function generateProjectTiles(projects) {
  const projectTileGrid = document.querySelector('#project-tile-grid');
  const template = document.getElementById('project-tile-template').innerHTML;

  projectTileGrid.innerHTML = "";
  projects.forEach((project) => {
    const projectTile = replacePlaceholders(template, project);
    projectTileGrid.innerHTML += projectTile;
  });
}

function isProjectPage() {
  const path = window.location.pathname;
  return path.startsWith("/projects/");
}

async function fillInfoGrid(projects) {
  const url = window.location.pathname;
  const projectPageName = url.substring(url.lastIndexOf('/') + 1);
  const projectData = projects.find(project => project.pageURL === projectPageName);

  const templateResponse = await fetch('/elements/projectInfoGridTemplate.html');
  const templateText = await templateResponse.text();
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = templateText;
  
  const template = tempDiv.querySelector('#info-grid').content.cloneNode(true);
  const templateString = template.querySelector('.info-grid').outerHTML;

  const infoGrid = document.querySelector('#info-grid');
  infoGrid.innerHTML = replacePlaceholders(templateString, projectData);
}

function initializeHoverEffects() {
  var hoverableChildren = document.querySelectorAll(".hoverable-child");

  hoverableChildren.forEach(function (hoverableChild) {
    hoverableChild.addEventListener("mouseover", function () {
      this.parentElement.classList.add("hover-effect");
    });

    hoverableChild.addEventListener("mouseout", function () {
      this.parentElement.classList.remove("hover-effect");
    });
  });
}

if (isProjectPage())
  fillInfoGrid(projects);
else
  generateProjectTiles(projects);

document.addEventListener("DOMContentLoaded", function () {
  
  initializeHoverEffects();

});