'use strict';

MemoryMaster.service('HighScores', ['$http', '$q', function($http, $q) {
  var personalBest    = 0;
  var urlRoot         = 'https://memory.blrice.net';
  var isChromeEnabled = typeof(chrome) !== 'undefined' && chrome.storage

  if (isChromeEnabled) {
    chrome.storage.sync.get('highScore', function(data) {
      if (data['highScore']) {
        personalBest = data['highScore'];
      }
    });
  } else {
    var cookie = document.cookie.replace(/(?:(?:^|.*;\s*)highScore\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookie.length > 0) {
      personalBest = parseInt(cookie);
    }
  }

  this.getPersonalBest = function() {
    return personalBest;
  }

  this.getRank = function(score) {
    var deferred     = $q.defer();
    var url          = urlRoot + '/rank';
    var personalBest = this.getPersonalBest();

    if (personalBest > 0) {
      url += '?score=' + personalBest;
    }

    $http.get(url).then(function(response) {
      deferred.resolve(response.data);
    });

    return deferred.promise;
  }

  this.setPersonalBest = function(name, score) {
    personalBest = score;

    if (isChromeEnabled) {
      chrome.storage.sync.set({'highScore': score}, null);
    } else {
      document.cookie = 'highScore=' + score;
    }

    var url = urlRoot + '/scores';

    $http.post(url, {'score': personalBest, 'time': Date.now(), 'name': name});
  }
}]);
