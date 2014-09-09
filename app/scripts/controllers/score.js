'use strict';

MemorizeMaster.controller('ScoreCtrl', ['$scope', function($scope) {
  $scope.score = 0;
  $scope.multiplier = 1;
  var history = [];

  $scope.$on('cards.match', function() {
    $scope.score += 10 * $scope.multiplier;

    if (history[0]) {
      $scope.multiplier += 1;
    }

    recordHistory(true);
  });

  $scope.$on('cards.miss', function() {
    $scope.multiplier = 1;
    recordHistory(false);
  });

  $scope.$on('game.reset', function() {
    $scope.score = 0;
    $scope.multiplier = 1;
    history = []
  });

  var recordHistory = function(match) {
    history.unshift(match);

    if (history.length > 50) {
      history.pop();
    }
  }
}]);

