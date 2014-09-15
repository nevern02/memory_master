'use strict'; 

MemorizeMaster.controller('GameCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.numberOfCards = 10;
  $scope.stage = 1;
  $state.go('welcome');

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (toState.name === 'prepare' && fromState.name === 'stageComplete') {
      $scope.stage += 1;
      $scope.numberOfCards += 2;
    } else if (toState.name == 'welcome') {
      $scope.stage = 1;
      $scope.numberOfCards = 10;
    }
  });
}]);
