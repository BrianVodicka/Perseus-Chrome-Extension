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
  clearHelpBox();
  getPopupWindowHTML(linkText, 'morph', function(theWindowSrc) {
    var definitions = findDefinitions(theWindowSrc);
    console.log(definitions);
    for (var x = 0; x < definitions.length; x++) {
      doDictSearch(definitions[x]); 
    }
  });
}

function clearHelpBox() {
  var vocabHelp = document.getElementById('vocabHelp');
  $(vocabHelp).empty();
  var waitingText = document.createTextNode("Loading..."); 
  vocabHelp.appendChild(waitingText);
}

function getPopupWindowHTML(linkText, name, callback) {
  $.get(linkText, function(data) {
    console.log('returning');
    callback($.parseHTML(data));
  });
}

function findDefinitions(srcPage) {
  var definitions = [];
  var definitionContainers = $(srcPage).find('.lemma');
  for (var i = 0; i < definitionContainers.length; i++) {
    var word = $(definitionContainers[i]).find('.lemma_header').find('h4').text();
    var definition = $(definitionContainers[i]).find('.lemma_definition').text();
    var links = $(definitionContainers[i]).find('a');
    var definitionsItem = [word, definition, links];
    definitions.push(definitionsItem);
  }
  return definitions;
}

function doDictSearch(definitions) {
  var word = definitions[0];
  var definition = definitions[1];
  var links = definitions[2];
  var vocabHelp = document.getElementById('vocabHelp');
  for (var j = 0; j < links.length; j++) {
    if ($(links[j]).text() == 'Lewis & Short') {
      var linkItems = $(links[j]).attr('id').split(':');
      var targetWord = linkItems[3].substring(6,linkItems[3].length);
      targetWord = targetWord.substring(0, targetWord.length-5);
      var dictEntryLink = "text?doc=" + linkItems[0] + "%3A" + linkItems[1] + "%3A" + linkItems[2] + "%3Aentry%3D" + targetWord;
      $.get(dictEntryLink, function(newData) {
        console.log(dictEntryLink);
        var dictEntryHTML = $.parseHTML(newData);
        var entryContainer = $(dictEntryHTML).find('#text_main');
        var tmpContainer = $(entryContainer).find('.text')[0];
        var grammarParts = $(tmpContainer).clone().children().remove().end().text();
        var word = $($(tmpContainer).find('span.la')[0]).find('a').text();
        var definitions = $(tmpContainer).find('.lex_sense');
        for (var k = definitions.length-1; k >= 0; k--) {
          var tmpDefinition = document.createElement("p");
          tmpDefinition.innerHTML = $(definitions[k]).text();
          console.log(tmpDefinition);
           
          vocabHelp.insertBefore(tmpDefinition, vocabHelp.firstChild);
        }
        var wordText = document.createElement("p");
        wordText.innerHTML = '<p class="wordTitle">' + word + ' ' + grammarParts + ' ' + definition + '</p>';
        vocabHelp.insertBefore(wordText, vocabHelp.firstChild);
      });
    }
  }
}
