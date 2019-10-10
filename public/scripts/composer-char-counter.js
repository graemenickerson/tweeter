// composer-char-counter.js
// Graeme Nickerson
// October 2019

$(document).ready(function() {

  // Updates the label below the form input to show remaining characters available.
  $('[name="text"]').keyup(function() {
    const numOfChars = $(this).val().length;
    const $counter = $(this).siblings()[1];
    const counterValue = 140 - numOfChars;
    if (counterValue < 0) {
      $($counter).text(counterValue).addClass('neg');
    } else {
      $($counter).text(counterValue).removeClass('neg');
    }
  });

  // Tracks the scroll level of the window and shows the to top button
  // when scrolled down. If the narrow view of the site is active a nav
  // bar with the patterned backround will be displayed as the user scrolls.
  $(document).scroll(function() {
    if ($(document).scrollTop() > 20) {
      $('#to-top').show();
      $('#write-tweet').hide();
    } else {
      $('#to-top').hide();
      $('#write-tweet').show();
    }
    if ($(document).scrollTop() > 280 && $(window).width() < 1024) {
      $('nav').addClass('scrolled');
    } else {
      $('nav').removeClass('scrolled');
    }
  });

  // Scrolls the window to the top and toggles the new tweet form
  $("#to-top").click(function() {
    $("HTML, BODY").animate({ scrollTop: 0 }, 1000);
    $('#new-post').slideToggle("slow");
    $('textarea').focus();
  });

});