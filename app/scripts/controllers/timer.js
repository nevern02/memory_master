'use strict';

MemorizeMaster.controller('TimerCtrl', ['$rootScope', '$scope', '$state', 'Timer', function($rootScope, $scope, $state, Timer) {
  $scope.remainingSeconds = Timer.remaining();
  var history = [];

  $scope.$on('cards.match', function() { 
    if (history[0]) {
      Timer.add(2);
      $rootScope.$broadcast('alert', '+2s', 'green');
    }
    recordHistory(true) 
  });

  $scope.$on('cards.miss', function(event, pair) {
    if (pair[0].wasSeen && pair[1].wasSeen) {
      Timer.subtract(2);
      $rootScope.$broadcast('alert', '-2s', 'red');
    }
    recordHistory(false);
  });

  $scope.$on('$stateChangeSuccess', function(event, toState) {
    switch (toState.name) {
      case 'playing':
        Timer.start().then(
          function() { $state.go('gameOver') },
          null,
          function(remaining) { $scope.remainingSeconds = remaining }
        );
        break;
      case 'stageComplete':
      case 'gameOver':
        Timer.stop();
        break;
      case 'welcome':
        Timer.reset();
        $scope.remainingSeconds = Timer.remaining();
        break;
    }
  });

  var recordHistory = function(match) {
    history.unshift(match);

    if (history.length > 50) {
      history.pop();
    }
  }
}]);
