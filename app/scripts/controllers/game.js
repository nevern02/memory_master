'use strict';

MemoryMaster.controller('GameCtrl', ['$scope', '$state', 'HighScores', function($scope, $state, HighScores) {
  $scope.numberOfCards = 10;
  $scope.stage = 1;
  $state.go('welcome');
  $scope.isBrowser = !window.location.protocol.match(/chrome-extension/);

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (toState.name === 'prepare' && fromState.name === 'stageComplete') {
      $scope.stage += 1;
      $scope.numberOfCards = Math.min($scope.numberOfCards + 2, 20);
    } else if (toState.name == 'welcome') {
      $scope.stage = 1;
      $scope.numberOfCards = 10;
    }
  });
}]);
