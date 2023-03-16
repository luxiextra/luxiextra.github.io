const projects = [
  {
    title: "Agripocalypse",
    description: "Lorem ipsum",
    contributions: [
      "Lead Programmer",
      "Finite state machines for player and enemies",
      "Developer Tools for level building and item creation",
      "Unity HDRP for volumetric lighting",
    ],
    imageURL: "agripocalypse.gif"
  },
  {
    title: "VizBoXR",
    description: "Lorem ipsum",
    contributions: [
      "Relay Networking using Unity Netcode.", 
      "Worked with SteamVR and GoogleARCore"
    ],
  },
  {
    title: "Space Junk Janitor Simulator 2222",
    description: "Lorem ipsum",
    contributions: "Lorem ipsum",
  },
  {
    title: "Fashion For All",
    description: "Lorem ipsum",
    contributions: "Lorem ipsum",
  },
  {
    title: "Fr0G-0",
    description: "Lorem ipsum",
    contributions: "Lorem ipsum",
    imageURL: "froggo.gif"

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


generateProjectTiles(projects);

document.addEventListener("DOMContentLoaded", function () {
  
  initializeHoverEffects();

});