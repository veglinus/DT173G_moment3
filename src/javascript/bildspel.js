// Source: https://www.w3schools.com/w3css/w3css_slideshow.asp
var bildspel = document.getElementById("bildspel");
var slideIndex = 0;
//carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("slideImage");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 5000); // Change image every 2 seconds
}