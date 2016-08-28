var documents = new Array();

function m(src, which, docIndex) {
  var linkText = src.getAttribute('href');
  var originalText = linkText;
  if (documents[docIndex]) {
    linkText = linkText + '&d' + documents[docIndex];
    if (which != -1) {
      linkText = linkText + '&i=' + which;
    }
  }
  var theWindowSrc = getPopupWindowSrc(linkText, 'morph');
  
}

function getPopupWindowSrc(linkText, name) {
  $.get(linkText, function(data) {
    var tmpHTML = $.parseHTML(data);
    var objects = $(tmpHTML).find('.lemma');
    for (var i = 0; i < objects.length; i++) {
      console.log(objects);
      var word = $(objects[i]).find('.lemma_header').find('h4').text();
      console.log(word);
      var definition = $(objects[i]).find('.lemma_definition').text();
      console.log(definition);
      var links = $(objects[i]).find('a');
      for (var j = 0; j < links.length; j++) {
        if ($(links[j]).text() == 'Lewis & Short') {
          $(links[j]).click(function() {
            var lexiconEntries = [];
            while (lexiconEntries != 0) {
              lexiconEntries = $(objects[i]).find('.lexicon_entry');
            }
            var dictContainer = $(lexiconEntries[0]).find('.text_container')[0];
            var tmp = dictContainer.find('div')[0].find('p')[0];
            var targetItem = tmp.find('a').text() + ' ' + tmp.text();
            console.log(targetItem); 
          });
        }
      }
    }
  });
}

$('a').css("color", "blue");
