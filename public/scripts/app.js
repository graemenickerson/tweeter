$(document).ready(function() {

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

  const createTweetElement = function(input) {
    let $tweet = $('<article>');

    const markup = `
      <header>
        <div>
          <img src="${input.user.avatars}">
          <h3>${input.user.name}</h3>
        </div>
        <h4>${input.user.handle}</h4>
      </header>
      <p>${input.content.text}</p>
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

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('#tweet').prepend(createTweetElement(tweet));
    }
  };

  $('#new-post').submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const data = $('textarea').val();
    console.log(data);
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
          // removefocus
          loadTweets();
        });
    }
  });

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
    .then(function (data) {
      renderTweets(data);
    });

  };

  loadTweets();
});