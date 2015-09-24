/* global $ */
'use strict';

var FULL_STAR = 'fa-star';
var EMPTY_STAR = 'fa-star-o';
var $star = $('#star');

// initial setup:
$star.find('ul').each(function (i, ul) {
  // find the tip and give it an id that we can point to (aria-describedby)
  var tipID = rndid('hms-', 7);
  $(ul.parentNode).find('.tip').prop('id', tipID);

  var $h2 = $(ul).closest('.rate-me').find('h2');
  $h2.prop('id', rndid('h-', 7));
  ul.setAttribute('role', 'radiogroup');
  ul.setAttribute('aria-labelledby', $h2.prop('id'));
  // iterating through each ul and THEN each li within the
  // given ul to leverage `i` (index) for data-attributes
  $(ul).find('li').each(function (i, li) {
    var $li = $(li);
    $li.attr({
      'role': 'radio',
      'data-star-index': i,
      'aria-checked': 'false',
      'aria-labelledby': tipID + ' ' + $h2.prop('id')
    });

    if (0 === i) {
      li.tabIndex = 0;
    } else {
      li.tabIndex = -1;
    }

    $li.on('focus', focusHandler);
    $li.on('blur', blurHandler);

    $li.on('mouseover focus', function () {
      $(this)
        .addClass('open-hover')
        .prevAll()
          .addClass('open-hover');
    });

    $li.on('mouseout blur', function () {
      $(this)
        .removeClass('open-hover')
        .prevAll()
          .removeClass('open-hover');
    });
  });
});

// mouse users:
$star.on('click', '.five-stars li', function (e) {
  e.preventDefault();
  ratingConfig(this);
});


// keyboard users:
$star.on('keydown', '.five-stars li', function (keyVent) {
  var which = keyVent.which;
  var target = keyVent.target;

  switch (which) {

    case 37: // LEFT
      keyVent.preventDefault(); // don't scroll
      keyMotion(target, 'prev');
      break;
    case 38: // UP
      keyVent.preventDefault();
      keyMotion(target, 'next');
      break;
    case 39: // RIGHT
      keyVent.preventDefault();
      keyMotion(target, 'next');
      break;
    case 40: // DOWN
      keyVent.preventDefault();
      keyMotion(target, 'prev');
      break;
    case 13: // ENTER
      target.click();
      break;
    case 32: // SPACE BAR
      keyVent.preventDefault(); // don't scroll
      target.click();
      break;
  }
});

function focusHandler(e) {
  var numStars = parseInt(e.target.getAttribute('data-star-index'), 10) + 1;
  var $tip = $(e.target).closest('.five-stars').find('.tip').first();
  $tip.html(numStars + '/5 stars').show();
}

function blurHandler(e) {
  setTimeout(function () {
    var starIndex = parseInt(e.target.getAttribute('data-star-index'), 10);
    var isChecked = $(e.target).find('i').hasClass(FULL_STAR);

    if (starIndex === 0 && !isChecked) {
      var $tip = $(e.target).closest('.five-stars').find('.tip').first();
      $tip.html('not yet rated');
    }
  });
}

function fill(star) {
  $(star)
    .find('i')
    .removeClass(EMPTY_STAR)
    .addClass(FULL_STAR);
}

function unfill(star) {
  $(star)
    .find('i')
    .removeClass(FULL_STAR)
    .addClass(EMPTY_STAR);
}

function ratingConfig(star) {
  setActiveStar(star);
  var starIndex = star.getAttribute('data-star-index');
  var $allStars = $(star)
                    .closest('ul')
                    .find('li');


  $allStars.each(function (i) {
    if (i <= starIndex) {
      fill(this);
    } else {
      unfill(this);
    }
  });
}


function setActiveStar(star) {
  $(star)
    .closest('ul')
    .find('li')
    .each(function (i, li) {
      if (li === star) {
        li.tabIndex = 0;
        $(li).attr('aria-checked', 'true');
      } else {
        li.tabIndex = -1;
        $(li).attr('aria-checked', 'false');
      }
    });
}


function keyMotion(target, dir) {
  var currentIndex = parseInt($(target).attr('data-star-index'), 10);
  var $stars = $(target).closest('ul').find('li');
  var adjacentStar = (dir === 'prev') ? $stars[currentIndex - 1]
                      : $stars[currentIndex + 1];
  if (adjacentStar) {
    adjacentStar.click();
    adjacentStar.focus();
  }
}

///////////
// RNDID //
///////////
// @credit: Stephen Mathieson
// https://github.com/stephenmathieson/rndid
function rndid(prefix, length) {
  if ('number' == typeof prefix)
    length = prefix, prefix = '';
  length = length || exports.defaultLength;
  var id = (prefix || '') + str(length);
  if (document.getElementById(id)) return rndid(prefix, length);
  return id;
}

/**
 * Generate a random alpha-char.
 *
 * @api private
 * @return {String}
 */

function character() {
  return String.fromCharCode(Math.floor(Math.random() * 25) + 97);
}

/**
 * Generate a random alpha-string of `len` characters.
 *
 * @api private
 * @param {Number} len
 * @return {String}
 */

function str(len) {
  for (var i = 0, s = ''; i < len; i++) s += character();
  return s;
}
