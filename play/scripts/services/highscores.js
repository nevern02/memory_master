'use strict';

MemoryMaster.service('HighScores', function() {
  var highScore = 0;
  var isChromeEnabled = chrome && chrome.storage

  if (isChromeEnabled) {
    chrome.storage.sync.get('highScore', function(data) {
      if (data['highScore']) {
        highScore = data['highScore'];
      } 
    });
  } else {
    var cookie = document.cookie.replace(/(?:(?:^|.*;\s*)highScore\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookie.length > 0) {
      highScore = parseInt(cookie);
    }
  }

  this.current = function() {
    return highScore;
  }

  this.save = function(score) {
    highScore = score;
    if (isChromeEnabled) {
      chrome.storage.sync.set({'highScore': score}, null);
    } else {
      document.cookie = 'highScore=' + highScore;
    }
  }
});
