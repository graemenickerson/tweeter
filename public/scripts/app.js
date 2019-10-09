$(document).ready(function() {
let data234 = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const timeAgo = (givenDate) => {
  let result = 0;
  let dateNow = new Date();
  const timeDiff  = (dateNow - givenDate);

  if ((timeDiff / (1000 * 60 * 60 * 24 * 365) >= 2)) {// years
    result = Math.round(timeDiff / (1000 * 60 * 60 * 24 * 365)) + ' years';
  } else if ((timeDiff / (1000 * 60 * 60 * 24 * 365) >= 1)) {// year
    result = Math.round(timeDiff / (1000 * 60 * 60 * 24 * 365)) + ' year';
  } else if ((timeDiff / (1000 * 60 * 60 * 24 * 30) >= 2)) {// months
    result = Math.round(timeDiff / (1000 * 60 * 60 * 24 * 30)) + ' months';
  } else if ((timeDiff / (1000 * 60 * 60 * 24 * 30) >= 1)) {// month
    result = Math.round(timeDiff / (1000 * 60 * 60 * 24 * 30)) + ' month';
  } else if ((timeDiff / (1000 * 60 * 60 * 24) >= 2)) {// days
    result = Math.round(timeDiff / (1000 * 60 * 60 * 24)) + ' days';
  } else if (timeDiff / (1000 * 60 * 60 * 24) >= 1) {// day
    result = Math.round(timeDiff / (1000 * 60 * 60 * 24)) + ' day';
  } else if (timeDiff / (1000 * 60 * 60) >= 2) {// hours
    result = Math.round(timeDiff / (1000 * 60 * 60)) + ' hours';
  } else if ((timeDiff / (1000 * 60 * 60) >= 1)) {// hour
    result = Math.round(timeDiff / (1000 * 60 * 60)) + ' hour';
  } else if (timeDiff / (1000 * 60) >= 1) {//minutes
    result = Math.round(timeDiff / (1000 * 60)) + ' minutes';
  } else {
    result = timeDiff / (1000) + ' seconds';
  }

  return result;
};


const createTweetElement = function(input) {
  let $tweet = $('<article>').addClass('tweet');

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
        <h6>like and such</h6>
      </span>
    </footer>
  `;

  $($tweet).append(markup);

  return $tweet;
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('#tweet').append(createTweetElement(tweet));
  }
};

// createTweetElement(data[0]);
renderTweets(data234);
});