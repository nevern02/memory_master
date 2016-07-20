'use strict';

MemoryMaster.service('Timer', ['$interval', '$q', function($interval, $q) {
  var startingSeconds = 30;
  var currentSeconds = startingSeconds;
  var promise = null;
  var deferred = null;

  var tick = function() {
    currentSeconds -= 1;
    deferred.notify(currentSeconds);

    if (currentSeconds === 0) {
      stop();
      deferred.resolve();
    }
  }

  this.remaining = function() {
    return currentSeconds;
  }

  this.start = function() {
    deferred = $q.defer();
    promise = $interval(function() { tick(); }, 1000);
    return deferred.promise;
  }

  this.stop = function() {
    $interval.cancel(promise);
  }

  this.reset = function() {
    currentSeconds = startingSeconds;
  }

  this.subtract = function(amount) {
    currentSeconds -= amount;
  }

  this.add = function(amount) {
    currentSeconds += amount;
  }
}]);
