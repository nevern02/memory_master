MemorizeMaster.factory('Timer', ['$interval', '$q', function($interval, $q) {
  var Timer = function(startingSeconds) {
    var timer = null;
    var deferred = null;

    this.startingSeconds = startingSeconds || 300; // 5 minutes
    this.currentSeconds = this.startingSeconds;
  }

  Timer.prototype.tick = function() {
    this.currentSeconds -= 1;
    deferred.notify(this.currentSeconds);

    if (this.currentSeconds === 0) {
      this.stop();
      deferred.resolve();
    }
  }

  Timer.prototype.remaining = function() {
    return this.currentSeconds;
  }

  Timer.prototype.reset = function() {
    this.currentSeconds = this.startingSeconds;
  }

  Timer.prototype.stop = function(isFailure) {
    $interval.cancel(timer);

    if (isFailure) {
      deferred.reject(this.currentSeconds);
    }
  }

  Timer.prototype.start = function() {
    deferred = $q.defer();
    var instance = this;

    timer = $interval(function() { instance.tick(); }, 1000);

    return deferred.promise;
  }

  return Timer;
}]);
