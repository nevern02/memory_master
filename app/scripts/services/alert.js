MemoryMaster.service('Alert', ['$timeout', function($timeout) {
  var alerts = [];
  var count = 0;

  this.getAlerts = function() {
    return alerts;
  }

  this.alert = function(message, color) {
    var newAlert = {text: message, color: color, isShowing: true};
    var time = count * 500;

    $timeout(function() { 
      alerts.unshift(newAlert) 
    }, time);

    count += 1; 

    $timeout(function() { 
      count -= 1 
      newAlert.isShowing = false; 
    }, time + 350);
  }
}]);
