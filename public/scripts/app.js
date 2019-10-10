// app.js
// Graeme Nickerson
// October 2019

$(document).ready(function() {

  // Takes a given date and returns the approx. time since then.
  const timeAgo = (givenDate) => {
    let result = 'A few seconds ago';
    let dateNow = new Date();
    const timeDiff  = dateNow - givenDate;
    const time = [(1000 * 60 * 60 * 24 * 365), (1000 * 60 * 60 * 24 * 30), (1000 * 60 * 60 * 24), (1000 * 60 * 60), (1000 * 60)]
    const words = ['years', 'year', 'months', 'month', 'days', 'day', 'hours', 'hour', 'minutes', 'minute'];

    for (let i = 1; i < time.length; i++) {
      if ((timeDiff / time[i]) >= 2) {
        result = `${Math.round(timeDiff / time[i])} ${words[i * 2]}`;
      } else if ((timeDiff / time[i]) >= 1) {
        result = `${Math.round(timeDiff / time[i])} ${words[(i * 2) + 1]}`;
      }
    }
    return result;
  };

  // Takes a json object and returns a formatted html string
  const createTweetElement = function(input) {
    const escape = function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
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
        <h6>${timeAgo(input.created_at)}</h6>
        <span name="interactions">
          <h6>Like and such</h6>
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
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
    .then(function (data) {
      renderTweets(data);
    });
  };

  // Posts the new tweet to the database and calls loadTweet
  $('#new-post').submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const data = $('textarea').val();
    if (data.length > 140) {
      alert("Post too long!!");
    } else if (data === '' || data === null ) {
      alert("Enter something into field to post.");
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
          loadTweets();
        });
    }
  });

  // Toggles visibility of new tweet form
  $('#write-tweet').click(function() {
    $('#new-post').slideToggle("slow");
    $('textarea').focus();
  });

  loadTweets();
});