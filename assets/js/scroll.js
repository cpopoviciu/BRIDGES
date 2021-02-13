//This Scripts handles the hiding of the scrolltoTopBtn

var rootElement = document.documentElement;
var scrollToTopBtn = document.getElementById("btnScrollToTop");

document.onscroll = function handleScroll() {
  // Do something on scroll
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if ((rootElement.scrollTop / scrollTotal ) > 0.20 ) {
    // Show button
    console.log("Show Button");
    scrollToTopBtn.style.opacity = 1;
  } else {
    // Hide button
    console.log("Hide Button");
    scrollToTopBtn.style.opacity = 0;
  }
}
