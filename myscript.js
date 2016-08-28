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
      console.log(links);
      for (var j = 0; j < links.length; j++) {
        console.log($(links[j]).text());
        if ($(links[j]).text() == 'Lewis & Short') {
          var linkItems = $(links[j]).attr('id').split(':');
          console.log(linkItems);
          var targetWord = linkItems[3].substring(6,linkItems[3].length);
          console.log(targetWord);
          targetWord = targetWord.substring(0, targetWord.length-5);
          console.log(targetWord);
          var dictEntryLink = "text?doc=" + linkItems[0] + "%3A" + linkItems[1] + "%3A" + linkItems[2] + "%3Aentry%3D" + targetWord;
          $.get(dictEntryLink, function(newData) {
            console.log(dictEntryLink);
            var dictEntryHTML = $.parseHTML(newData);
            var entryContainer = $(dictEntryHTML).find('#text_main');
            var tmpContainer = $(entryContainer).find('.text')[0];
            var targetText = $(tmpContainer).text().split('I');
            var grammarParts = targetText[0];
            var definition = targetText[1];
            console.log(grammarParts);
            console.log(definition);
          });
        }
      }
    }
  });
}

$('a').css("color", "blue");
