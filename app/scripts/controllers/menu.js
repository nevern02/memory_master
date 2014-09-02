MemorizeMaster.controller('MenuCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
  $scope.close = function() {
    $modalInstance.close();
  }

  $scope.dismiss = function() {
    $modalInstance.dismiss();
  }

  $scope.nextStage = function() {
    $modalInstance.close({
      newStage: $scope.stage + 1,
      cardCount: Math.min(50, $scope.numberOfCards + 2)
    });
  }
}]);
