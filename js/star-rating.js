var fullStar = 'fa-star';
var emptyStar = 'fa-star-o';
var $star = $('#star');

// initial setup:
$star.find('ul').each(function (i, ul) {
  // iterating through each ul and THEN each li within the
  // given ul to leverage `i` (index) for data-attributes
  $(ul).find('li').each(function (i, li) {
    $(li).attr({
      'role': 'button',
      'data-star-index': i
    });

    if (0 === i) {
      li.tabIndex = 0;
    } else {
      li.tabIndex = -1;
    }
    $(li).on('focus', focusHandler);
  });
});

// mouse users:
$star.on('click', '.five-stars li', function () {
  ratingConfig(this);
});

// keyboard users:
// $star.on('keydown', '.five-stars li', function (keyVent) {

// });

function focusHandler() {
  var isChecked = $(this).hasClass(fullStar);
  var numStars = parseInt(this.getAttribute('data-star-index'), 10) + 1;
  var $tip = $(this).closest('.five-stars').find('.tip').first();
  $tip.html(numStars + '/5 stars').show();
}

function fill(star) {
  $(star)
    .find('i')
    .removeClass(emptyStar)
    .addClass(fullStar);
}

function unfill(star) {
  $(star)
    .find('i')
    .removeClass(fullStar)
    .addClass(emptyStar);
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
      } else {
        li.tabIndex = -1;
      }
    });
}
