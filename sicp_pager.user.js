// ==UserScript==
// @name        SICP pager
// @description pager script for online SICP (http://mitpress.mit.edu/sicp/full-text/book/book.html)
// @include     http://mitpress.mit.edu/sicp/full-text/book/*
// ==/UserScript==
// author       outZider
// version      0.1.6
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
(function() {
  var d = {};
  window.addEventListener("load", function() {
    a = document.getElementsByTagName('a');
    for (i = 0; i < a.length; i++) {
      if (a[i].firstChild) {
        v = a[i].firstChild.nodeValue;
        if (v == "next" || v == "previous" || v == "first" || v == "contents" || v == "index") {
          if (!d[v]) {
            d[v] = a[i];
          }
        }
      }
    }
  }, false);
  window.addEventListener("keydown", function(e) {
    var action = getAction(e);
    if (!action) return;
    switch (action) {
      case "next":
      case "previous":
      case "first":
      case "contents":
      case "index":
        if (d[action])
          window.location.href = d[action];
        break;
      case "retrieve":
        if (GM_getValue("theLastReferredPage"))
          window.location.href = GM_getValue("theLastReferredPage");
        break;
      case "bookmark":
        GM_setValue("theLastReferredPage", window.location.href);
        break;
    }
  }, false);
  function getAction(e) {
    switch (e.keyCode) {
      case 39: // ->
        return "next";
      case 37: // <-
        return "previous";
      case 68: // ^D
        return e.ctrlKey ? "next" : null;
      case 83: // ^S
        return e.ctrlKey ? "previous" : null;
      case 82: // ^R to retrieve bookmark
        return e.ctrlKey ? "retrieve" : null;
      case 66: // ^B to bookmark this page
        return e.ctrlKey ? "bookmark" : null;
      case 70: // ^F to jump to the first page
        return e.ctrlKey ? "first" : null;
      case 67: // ^C to jump to the contents page
        return e.ctrlKey ? "contents" : null;
      case 73: // ^I to jump to the index page
        return e.ctrlKey ? "index" : null;
      default:
        return null;
    }
  }
})();
