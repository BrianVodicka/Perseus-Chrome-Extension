var a = document.createElement('script');
var b = document.createElement('script');
var c = document.createElement('script');

a.src = chrome.extension.getURL('myscript.js');
b.src = chrome.extension.getURL('morph.js');
c.src = chrome.extension.getURL('xmlhttp.js');

(document.head || document.Element).appendChild(a);
(document.head || document.Element).appendChild(b);
(document.head || document.Element).appendChild(c);
