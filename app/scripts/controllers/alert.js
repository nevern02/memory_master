'use strict';

MemorizeMaster.controller('AlertCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.alerts = []
  var count = 0;

  $scope.$on('alert', function(event, message, color) {
    var newAlert = {text: message, color: color, isShowing: true};
    var time = count * 500;

    $timeout(function() { 
      $scope.alerts.unshift(newAlert) 
    }, time);

    count += 1; 

    $timeout(function() { 
      count -= 1 
      newAlert.isShowing = false; 
    }, time + 350);
  });

}]);
