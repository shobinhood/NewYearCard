(function() {
  "use strict"

  // get handles to each element
  var white = document.querySelector(".white"),
      green = document.querySelector(".green"),
      blue = document.querySelector(".blue"),
      orange = document.querySelector(".orange"),
      airplane = document.querySelector(".airplane"),
      clouds = document.querySelector(".clouds");

  // create an object for each element
  // the object will contain values for the x position and parallax amount
  var whiteCloud = {
    handle: white,
    xPosition: white.offsetLeft,
    yPosition: white.offsetTop,
    parallax: 0.05
  };

  var greenCloud = {
    handle: green,
    xPosition: green.offsetLeft,
    yPosition: white.offsetTop,
    parallax: 0.1
  };

  var blueCloud = {
    handle: blue,
    xPosition: blue.offsetLeft,
    yPosition: blue.offsetTop,
    parallax: 0.15
  };

  var orangeCloud = {
    handle: orange,
    xPosition: orange.offsetLeft,
    yPosition: orange.offsetTop,
    parallax: 0.2
  };

  var plane = {
    handle: airplane,
    xPosition: airplane.offsetLeft,
    yPosition: airplane.offsetTop,
    parallax: 0.7
  };

  // place all of the objects into one containing object
  var elements = {
    theWhiteCloud: whiteCloud,
    theGreenCloud: greenCloud,
    theBlueCloud: blueCloud,
    theOrangeCloud: orangeCloud,
    theAirplane: plane
  };

  // move the items based on the mouse x position
  // and multiply the amount by the parallax value
  var moveItems = function(event) {
    var mouseX = event.x;
    var windowWidth = window.innerWidth / 2;

    for (var element in elements) {
      var thisElement = elements[element];
      var xPosition = thisElement.xPosition;
      var elementPositionX = thisElement.parallax * (windowWidth - mouseX) + thisElement.xPosition;
      thisElement.handle.style.left = elementPositionX + "px";
    }
  };
  
  // reset the xPosition values on each object
  // used for updating the element positions after a window resize event
  var resetXPositions = function () {
    for (var element in elements) {
      var thisElement = elements[element];
      thisElement.xPosition = thisElement.handle.offsetLeft;
    }
  };

  // center the airplane and clouds on the background
  // when page is first loaded or window is resized
  // then update each object's xPosition value
  var centerElements = function(event) {
    clouds.style.left = (window.innerWidth / 2) - (clouds.offsetWidth / 4) + "px";
    airplane.style.left = (window.innerWidth / 2) - (airplane.offsetWidth / 2) + "px";
    
    resetXPositions();
  };
 
  // center clouds and airplane on page load
  centerElements();

  // move elements on mouse move
  document.addEventListener("mousemove", moveItems);
  
  // recenter the elements when the window is resized
  window.onresize = centerElements;

}());