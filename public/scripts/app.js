// app.js
// Graeme Nickerson
// October 2019

$(document).ready(function() {

  // Takes a json object and returns a formatted html string
  const createTweetElement = function(input) {
    const escape = function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    let $tweet = $('<article>');

    const markup = `
      <header>
        <div>
          <img src="${input.user.avatars}">
          <h3>${input.user.name}</h3>
        </div>
        <h4>${input.user.handle}</h4>
      </header>
      <p>${escape(input.content.text)}</p>
      <footer>
        <h6 id="from-now">${moment(input.created_at).fromNow()}</h6>
        <span name="interactions">
          <h6>⚑ 🔁♥︎</h6>
        </span>
      </footer>
    `;
    $($tweet).append(markup);
    return $tweet;
  };

  // Loops through each object in a database array and send them for formatting.
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('#tweet').prepend(createTweetElement(tweet));
    }
  };

  // Loads the tweets into the main document
  const loadTweets = (initailLoad = true) => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
      .then(function(data) {
        if (initailLoad) {
          renderTweets(data);
        } else {
          renderTweets([data[data.length - 1]]);
        }
      });
  };

  // Posts the new tweet to the database and calls loadTweet
  $('#new-post').submit(function(event) {
    event.preventDefault();
    removeError();
    const serializedData = $(this).serialize();
    const data = $('textarea').val();
    if (data.length > 140) {
      renderError("Your post is too long!!");
    } else if (data === '' || data === null) {
      renderError("There needs to be text in the input field!");
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: serializedData
      })
        .then(() => {
          $('textarea').val('');
          $('.counter').text(140);
          $('#new-post').slideToggle("slow");
          // removefocus
          loadTweets(false);
        });
    }
  });

  // Toggles visibility of new tweet form
  $('#write-tweet').click(function() {
    $('#new-post').slideToggle("slow");
    $('textarea').focus();
  });

  // Dismisses error messages
  $('#error-dismiss').click(function() {
    removeError();
  });

  // Shows Error Message
  const renderError = function(message) {
    $('#error-message').text(message);
    $('.Error').slideDown("slow");
  };

  // Removes Error Message
  const removeError = function() {
    $('.Error').slideUp("slow");
  };

  loadTweets();
});