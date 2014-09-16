'use strict';

MemorizeMaster.service('HighScores', function() {
  var highScore = null;
  var isChromeEnabled = chrome && chrome.storage

  if (isChromeEnabled) {
    chrome.storage.sync.get('highScore', function(data) {
      if (data['highScore']) {
        highScore = data['highScore'];
      } else {
        highScore = 0;
      }
    });
  }

  this.current = function() {
    return highScore;
  }

  this.save = function(score) {
    if (highScore !== null && score > highScore && isChromeEnabled) {
      highScore = score;
      chrome.storage.sync.set({'highScore': score}, null);
    }
  }
});
