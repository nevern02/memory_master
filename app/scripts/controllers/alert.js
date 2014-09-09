'use strict';

MemorizeMaster.controller('AlertCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.alerts = []

  $scope.$on('alert', function(event, message, color) {
    var newAlert = {text: message, color: color, isShowing: true};
    $scope.alerts.unshift(newAlert);
    $timeout(function() { newAlert.isShowing = false; }, 10);
    cleanup();
  });

  var cleanup = function() {
    if ($scope.alerts.length > 50) {
      $scope.alerts = _.reject($scope.alerts, function(alert) {
        return alert.isShowing;
      });
    }
  }
}]);
