var delayBetween = { min: 50, max: 100 };

$(function() {
  var wordSpans = wrapWords($('.text'));
  var animating = false;

  scheduleNextBatch(wordSpans.slice());  
  $('.container').mouseenter(function() {
    console.log('mouseover');
    if (animating)
      return;
    
    wordSpans.forEach(function($w) { $w.removeClass('animated'); });
    scheduleNextBatch(wordSpans.slice());
  });
  
  function scheduleNextBatch(wordsToAnimate) {
    animating = true;
    var delay = (Math.random() * (delayBetween.max - delayBetween.min)) + delayBetween.min;
    window.setTimeout(function() {
      animateNextBatch(wordsToAnimate);
    }, delay);
  }  
  
  function animateNextBatch(wordsToAnimate) {      
    var randomIndex = Math.floor(Math.random() * wordsToAnimate.length);
    wordsToAnimate[randomIndex].addClass('animated');      
    wordsToAnimate.splice(randomIndex, 1);
    
    if (wordsToAnimate.length === 0) {
      animating = false;
      return;
    }
    
    scheduleNextBatch(wordsToAnimate);
  }

  function wrapWords($element) {
    var filter = ':not(:has(*))';
    $element.find(filter).addBack(filter).each(function() {
      var $child = $(this);
      var text = $child.text();
      var words = text.split(' ').filter(function(w) {
        return /\S/.test(w);
      });
      var html = words.map(function(word) {
        return '<span class="word"><span class="word-inner-wrap">' + word + '</span></span>';
      }).join('&nbsp;');
      $child.html(html);
    });
    
    return $element.find('.word').get().map($);
  }
});
