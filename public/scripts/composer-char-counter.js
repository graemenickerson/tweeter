// composer-char-counter.js
// Graeme Nickeson
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
  // when scrolled down.
  $(document).scroll(function() {
    if($(document).scrollTop() > 20) {
      document.getElementById("to-top").style.display = "block";
      document.getElementById("write-tweet").style.display = "none";
    } else {
      document.getElementById("to-top").style.display = "none";
      document.getElementById("write-tweet").style.display = "block";
    }
  });

  // Scrolls the window to the top and toggles the new tweet form
  $("#to-top").click(function() {
    $("HTML, BODY").animate({ scrollTop: 0 }, 1000); 
    $('#new-post').slideToggle("slow");
    $('textarea').focus();
  }); 

});