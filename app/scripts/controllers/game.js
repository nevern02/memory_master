'use strict'; 

MemorizeMaster.controller("GameCtrl", ["$scope", "$timeout", "$modal", "Card", "Timer", function($scope, $timeout, $modal, Card, Timer) {
  $scope.numberOfCards = 10;
  $scope.timer = new Timer();
  $scope.stage = 1;
  $scope.state = 'welcome';

  $scope.hasWon = function() {
    return !_.any($scope.cards, function(i) { return !i.isShowing });
  }

  $scope.reveal = function(card) {
    if (!$scope.enableClick || card.isShowing) {
      return;
    }

    card.isShowing = true;
    $scope.currentPair.push(card);

    if ($scope.currentPair.length > 1) {
      $scope.enableClick = false;
      if ($scope.currentPair[0].image !== $scope.currentPair[1].image) {
        if ($scope.currentPair[0].wasSeen && $scope.currentPair[1].wasSeen) {
          $scope.alert = "+2s";
          $scope.isAlerting = true;
          $timeout(function() { $scope.isAlerting = false }, 10);
          $scope.elapsedSeconds += 2;
        }
        $timeout(function() {
          _.each($scope.currentPair, function(card) { 
            card.isShowing = false 
            card.wasSeen = true;
          });
          $scope.currentPair = [];
          $scope.enableClick = true;
        }, 1000);
      } else {
        if ($scope.hasWon()) {
          $scope.state = 'summary';
        } else {
          $scope.currentPair = [];
          $scope.enableClick = true;
        }
      }
    }
  }

  var initializeStage = function() {
    $scope.currentPair = [];
    $scope.cards = [];
    $scope.startingSeconds = $scope.timer.remaining();
    $scope.cards = Card.newSet($scope.stage, $scope.numberOfCards);
    $scope.enableClick = true;
  }

  var welcomeState = function() {
    $modal.open({
      size: 'lg',
      templateUrl: 'welcome.html',
      backdrop: 'static',
      controller: 'MenuCtrl'
    }).result.then(function() {
      $scope.timer.reset();
      $scope.state = 'prepare';
    });
  }

  var playingState = function() {
    $scope.timer.start().then(function() {
      $scope.state = 'summary';
    });
  }

  var summaryState = function() {
    $scope.enableClick = false;
    $scope.timer.stop();
    $modal.open({
      templateUrl: 'summary.html',
      backdrop: 'static',
      controller: 'MenuCtrl',
      scope: $scope
    }).result.then(function(data) {
      $scope.stage = data.newStage;
      $scope.numberOfCards = data.cardCount;
      initializeStage();
      $scope.state = 'playing';
    }, function () {
      $scope.stage = 1;
      $scope.numberOfCards = 10;
      $scope.timer.reset();
      initializeStage();
      $scope.state = 'playing';
    });
  }

  var prepareState = function() {
    $modal.open({
      templateUrl: 'prepare.html',
      backdrop: 'static',
      controller: 'MenuCtrl',
      scope: $scope
    }).result.then(function() {
      initializeStage();
      $scope.state = 'playing';
    });
  }

  $scope.$watch('state', function(newValue, oldValue) {
    switch(newValue) {
      case 'welcome':
        welcomeState();
        break;
      case 'playing':
        playingState();
        break;
      case 'summary':
        summaryState();
        break;
      case 'prepare':
        prepareState();
        break;
    }
  });
}]);
