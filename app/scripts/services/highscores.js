'use strict';

MemoryMaster.service('HighScores', ['$http', '$q', function($http, $q) {
  var highScore       = 0;
  var deferred        = $q.defer();
  var scoresUrl       = 'https://memory.blrice.net/scores';
  var isChromeEnabled = typeof(chrome) !== 'undefined' && chrome.storage

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

  $http.get(scoresUrl).then(function(response) {
    deferred.resolve(response.data);
  });

  this.current = function() {
    return highScore;
  }

  this.getScores = function() {
    return deferred.promise;
  }

  this.save = function(score) {
    highScore = score;
    if (isChromeEnabled) {
      chrome.storage.sync.set({'highScore': score}, null);
    } else {
      document.cookie = 'highScore=' + highScore;
    }
  }
}]);
