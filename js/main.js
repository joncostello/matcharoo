$(document).ready( function() {
  initBoard();
});

function initBoard() {
  $('#gameboard > span').addClass('hide');
  $('#gameboard > span').removeClass('matched');
  $('#gameboard > span').click(function(e) {
    e.preventDefault();
    flip(this);
  });
  $('#matched').text('0');
  $('#missed').text('0');
}
function flip(card) {
  if ( $('#gameboard').data('comparing') == true ) {
    //don't flip because two cards are already showing
  }
  else {
    $(card).toggleClass('hide');
    var visibleCards = $('#gameboard > span:not(.hide, .matched)');
    if (visibleCards.length === 2) {
      $('#gameboard').data('comparing', true);
      setTimeout(function() {
        compareCards(visibleCards);
        $('#gameboard').data('comparing', false);
      }, 500);
    }
  }
    
}
function addNumber(selector) {
  var current = $(selector).text();
  if (isNaN(parseInt(current))) {
    $(selector).text('0');
  }
  else {
    $(selector).text( parseInt(current) + 1 );
  }
};
function compareCards(cards) {
  
  var first = $(cards[0]);
  var second = $(cards[1]);
  if (first.attr('class') == second.attr('class') ) {
    //cards match!
    cards.removeClass('hide');
    cards.addClass('matched');
    cards.off('click');
    addNumber('#matched');
    if (isGameOver()) {
      alert('Game Over! Press OK to reset');
      initBoard();
    }
  }
  else if (cards.length == 2) {
    cards.toggleClass('hide');
    addNumber('#missed');
  }
}
function isGameOver() {
  var cards = $('#gameboard > span').length;
  var matched = $('#gameboard > .matched').length;
  console.log(cards);
  console.log(matched);
  if (cards == matched) {
    return true;
  }
  else {
    return false;
  }
}
