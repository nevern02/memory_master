'use strict';

MemorizeMaster.controller('TimerCtrl', ['$rootScope', '$scope', '$interval',  function($rootScope, $scope, $interval) {
  $scope.startingSeconds = 300;
  $scope.currentSeconds = $scope.startingSeconds;
  var promise = null;
  var history = [];

  $scope.$watch('state', function(newValue) {
    switch(newValue) {
      case 'playing':
        start();
        break;
      case 'welcome':
        reset();
        break;
      case 'summary':
        stop();
        break;
    }
  });

  $scope.$on('cards.match', function() { 
    if (history[0]) {
      $scope.currentSeconds += 2;
      $rootScope.$broadcast('alert', '+2s', 'green');
    }
    recordHistory(true) 
  });

  $scope.$on('cards.miss', function(event, pair) {
    if (pair[0].wasSeen && pair[1].wasSeen) {
      $scope.currentSeconds -= 2;
      $rootScope.$broadcast('alert', '-2s', 'red');
    }
    recordHistory(false);
  });

  var recordHistory = function(match) {
    history.unshift(match);

    if (history.length > 50) {
      history.pop();
    }
  }

  var tick = function() {
    $scope.currentSeconds -= 1;

    if ($scope.currentSeconds === 0) {
      stop();
      $rootScope.$broadcast('timer.finish');
    }
  }

  var start = function() {
    promise = $interval(function() { tick(); }, 1000);
  }

  var stop = function() {
    $interval.cancel(promise);
  }

  var reset = function() {
    $scope.currentSeconds = $scope.startingSeconds;
  }

}]);
