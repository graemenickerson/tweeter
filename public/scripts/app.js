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
  
  const min = 1000 * 60;
  const hour = 1000 * 60 * 60;
  const day = 1000 * 60 * 60 * 24;
  const month = 1000 * 60 * 60 * 24 * 30;
  const year = 1000 * 60 * 60 * 24 * 365;

  if ((timeDiff / (year) >= 2)) {// years
    result = Math.round(timeDiff / (year)) + ' years';
  } else if ((timeDiff / (year) >= 1)) {// year
    result = Math.round(timeDiff / (year)) + ' year';
  } else if ((timeDiff / (month) >= 2)) {// months
    result = Math.round(timeDiff / (month)) + ' months';
  } else if ((timeDiff / (month) >= 1)) {// month
    result = Math.round(timeDiff / (month)) + ' month';
  } else if ((timeDiff / (day) >= 2)) {// days
    result = Math.round(timeDiff / (day)) + ' days';
  } else if (timeDiff / (day) >= 1) {// day
    result = Math.round(timeDiff / (day)) + ' day';
  } else if (timeDiff / (hour) >= 2) {// hours
    result = Math.round(timeDiff / (hour)) + ' hours';
  } else if ((timeDiff / (hour) >= 1)) {// hour
    result = Math.round(timeDiff / (hour)) + ' hour';
  } else if (timeDiff / (min) >= 1) {//minutes
    result = Math.round(timeDiff / (min)) + ' minutes';
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