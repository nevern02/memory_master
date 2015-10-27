MemoryMaster.controller('ModalInstanceCtlr', ['$scope', '$modalInstance', function($scope, $modalInstance) {
  $scope.close = function() {
    $modalInstance.close();
  }

  $scope.dismiss = function() {
    $modalInstance.dismiss();
  }
}]);
