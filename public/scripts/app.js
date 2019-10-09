/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

{/* <script type="text/javascript" src="/vendor/jquery-2.2.3.min.js"></script> */}

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

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  let result = [];
  for (let tweet in tweets) {

  }
  
}

const createTweetElement = (input) => {
  const $tweet = `
    <div class="tweet">
      <article>
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
      </article>
    </div>
  `;
    
  
  return $tweet;
};


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got
// all the right elements, classes, etc.