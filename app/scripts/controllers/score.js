'use strict';

MemorizeMaster.controller('ScoreCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.score = 0;
  $scope.multiplier = 1;
  $scope.stageMultiplier = 0;
  var history = [];

  $scope.$on('cards.match', function() {
    $scope.score += 10 * ($scope.multiplier + $scope.stageMultiplier);

    if (history[0]) {
      $scope.multiplier += 1;
    }

    recordHistory(true);
  });

  $scope.$on('cards.miss', function() {
    $scope.multiplier = 1;
    recordHistory(false);
  });

  $scope.$on('$stateChangeSuccess', function(event, toState) {
    if (toState.name === 'welcome') {
      $scope.score = 0;
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
    var totalMultiplier = $scope.multiplier + $scope.stageMultiplier
    if (totalMultiplier > 1) {
      $rootScope.$broadcast('alert', 'x' + totalMultiplier, 'teal');
    }
  }

  var recordHistory = function(match) {
    history.unshift(match);

    if (history.length > 50) {
      history.pop();
    }
  }
}]);

