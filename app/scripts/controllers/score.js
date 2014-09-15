'use strict';

MemorizeMaster.controller('ScoreCtrl', ['$scope', '$rootScope', 'Score', function($scope, $rootScope, Score) {
  $scope.multiplier = 1;
  $scope.stageMultiplier = 0;
  var history = [];

  $scope.getScore = function() {
    return Score.getScore();
  }

  $scope.$on('cards.match', function() {
    var newScore = $scope.getScore() + 10 * ($scope.multiplier + $scope.stageMultiplier);
    Score.setScore(newScore);

    if (history[0]) {
      $scope.multiplier += 1;
    }

    recordHistory(true);
  });

  $scope.$on('cards.miss', function() {
    $scope.multiplier = 1;
    recordHistory(false);
  });

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
    if (toState.name === 'welcome') {
      Score.setScore(0);
      $scope.multiplier = 1;
      $scope.stageMultiplier = 0;
      history = [];
    } 
  });

  $scope.$watch('stage', function(newValue, oldValue) {
    if (newValue !== oldValue && newValue > oldValue) {
      $scope.stageMultiplier += 1;
    }
  });

  $scope.$watch('multiplier', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      alert();
    }
  });

  $scope.$watch('stageMultiplier', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      alert();
    }
  });

  var alert = function() {
    if ($scope.multiplier > 1) {
      $rootScope.$broadcast('alert', 'x' + totalMultiplier(), 'teal');
    }
  }

  var recordHistory = function(match) {
    history.unshift(match);

    if (history.length > 50) {
      history.pop();
    }
  }

  var totalMultiplier = function() {
    return $scope.multiplier + $scope.stageMultiplier;
  }
}]);

