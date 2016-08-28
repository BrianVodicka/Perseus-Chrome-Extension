var documents = new Array();

var vocabHelpBoxHTML = '<div class="widget primary"> ' +
  '<div class="header">Vocab Help</div>' +
  '<div class="contents" id="vocabHelp" style="display:block;">' + 
  
  '</div>' +
  '</div>';

var vocabHelpBox  = document.createElement('div');
vocabHelpBox.innerHTML = vocabHelpBoxHTML;

var rightCol = document.getElementById('right_col');
rightCol.insertBefore(vocabHelpBox, rightCol.firstChild);

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
            var grammarParts = $(tmpContainer).clone().children().remove().end().text();
            var word = $($(tmpContainer).find('span.la')[0]).find('a').text();
            var definitions = $(tmpContainer).find('.lex_sense');
            console.log(word + ' ' + grammarParts);
            var vocabHelp = document.getElementById('vocabHelp');
            for (var k = definitions.length-1; k >= 0; k--) {
              var tmpDefinition = document.createElement("p");
              tmpDefinition.innerHTML = $(definitions[k]).text();
              console.log(tmpDefinition);
               
              vocabHelp.insertBefore(tmpDefinition, vocabHelp.firstChild);
            }
            var wordText = document.createElement("p");
            wordText.innerHTML = word + ' ' + grammarParts;
            vocabHelp.insertBefore(wordText, vocabHelp.firstChild);
          });
        }
      }
    }
  });
}

$('a').css("color", "blue");
