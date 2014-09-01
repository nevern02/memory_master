'use strict';

MemorizeMaster.service('HighScores', function() {
  var scores = {};
  var isChromeEnabled = chrome && chrome.storage

  if (isChromeEnabled) {
    chrome.storage.sync.get('bestScores', function(data) {
      if (data['bestScores']) {
        scores = data['bestScores'];
      }
    });
  }

  this.get = function() {
    return scores;
  }

  this.save = function(stage, seconds) {
    var current = scores[stage];
    if (!current || seconds < current) {
      scores[stage] = seconds;
      if (isChromeEnabled) {
        chrome.storage.sync.set({'bestScores': $scope.bestScores}, function() { });
      }
    }
  }
});
