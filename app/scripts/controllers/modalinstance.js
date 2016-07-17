MemoryMaster.controller('ModalInstanceCtlr', ['$scope', '$uibModalInstance', 'Analytics', function($scope, $modalInstance, Analytics) {
  $scope.allowTracking = Analytics.isEnabled();

  $scope.close = function(nextState) {
    $modalInstance.close({next: nextState});
  }

  $scope.dismiss = function() {
    $modalInstance.dismiss();
  }

  $scope.$watch('allowTracking', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      Analytics.setEnabled(newValue);
    }
  });
}]);
