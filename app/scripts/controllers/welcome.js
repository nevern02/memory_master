MemorizeMaster.controller('WelcomeCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
  $scope.testing = 'test';

  $scope.close = function() {
    $modalInstance.close();
  }
}]);
