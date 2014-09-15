'use strict';

MemorizeMaster.controller('ScoreCtrl', ['$scope', 'Score', 'Alert', function($scope, Score, Alert) {
  $scope.score = 0;
  $scope.multiplier = 1;

  $scope.$watch(function() { return Score.getScore() },
                function(newValue, oldValue) {
                  if (newValue !== oldValue) {
                    $scope.score = newValue;
                  }
                });

  $scope.$watch(function() { return Score.getTotalMultiplier() },
                function(newValue, oldValue) {
                  if (newValue !== oldValue) {
                    $scope.multiplier = newValue;
                  }
                });

  $scope.$on('cards.match', function() {
    Score.add(10);
  });

  $scope.$on('cards.miss', function() {
    Score.resetMultiplier();
  });

  $scope.$on('$stateChangeSuccess', function(event, toState) {
    if (toState.name === 'welcome') {
      Score.reset();
    } 
  });

  $scope.$watch('stage', function(newValue, oldValue) {
    if (newValue !== oldValue && newValue > oldValue) {
      Score.setStageMultiplier($scope.stage - 1);
    }
  });
}]);

