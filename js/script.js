document.addEventListener("DOMContentLoaded", function () {
    var hoverableChildren = document.querySelectorAll(".hoverable-child");
  
    hoverableChildren.forEach(function (hoverableChild) {
      hoverableChild.addEventListener("mouseover", function () {
        this.parentElement.classList.add("hover-effect");
      });
  
      hoverableChild.addEventListener("mouseout", function () {
        this.parentElement.classList.remove("hover-effect");
      });
    });
  });
  