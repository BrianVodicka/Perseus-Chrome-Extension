var a = document.createElement('script');

a.src = chrome.extension.getURL('myscript.js');

(document.head || document.Element).appendChild(a);
