
$(document).ready(function() {
  // --- our code goes here ---
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
});