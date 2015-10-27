'use strict';

MemoryMaster.controller('AlertCtrl', ['$scope', 'Alert', function($scope, Alert) {
  $scope.alerts = []

  $scope.$watch(function() { return Alert.getAlerts().length },
                function(newValue, oldValue) {
                  if (newValue !== oldValue && newValue > oldValue) {
                    $scope.alerts = Alert.getAlerts();
                  }
                });
}]);
