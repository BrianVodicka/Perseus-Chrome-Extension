var s = document.createElement('script');
s.src = chrome.extension.getURL('myscript.js');
s.onload = function() {
  this.remove;
};
(document.head || document.Element).appendChild(s);
