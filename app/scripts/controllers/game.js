'use strict'; 

MemorizeMaster.controller("GameCtrl", ["$scope", "$rootScope", "$timeout", "$modal", "Card", "HighScores", function($scope, $rootScope, $timeout, $modal, Card, HighScores) {
  $scope.numberOfCards = 10;
  $scope.stage = 1;
  $scope.state = 'welcome';
  var matchHistory = [];

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

  $scope.$on('timer.finish', function() {
    $scope.state = 'summary';
  });

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
      if (!matchingCards()) {
        $rootScope.$broadcast('cards.miss', $scope.currentPair);
        $timeout(function() {
          _.each($scope.currentPair, function(card) { 
            card.isShowing = false 
            card.wasSeen = true;
          });
          $scope.currentPair = [];
          $scope.enableClick = true;
        }, 1000);
      } else {
        $rootScope.$broadcast('cards.match', $scope.currentPair);
        if ($scope.hasWon()) {
          $scope.state = 'summary';
        } else {
          $scope.currentPair = [];
          $scope.enableClick = true;
        }
      }
    }
  }

  var matchingCards = function() {
    return $scope.currentPair[0].image === $scope.currentPair[1].image
  }

  var initializeStage = function() {
    $scope.currentPair = [];
    $scope.cards = [];
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
      $scope.state = 'prepare';
    });
  }

  var playingState = function() {
  }

  var summaryState = function() {
    $scope.enableClick = false;
    //HighScores.save($scope.stage, startingSeconds - $scope.timer.remaining());
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
      $scope.$broadcast('game.reset');
      $scope.stage = 1;
      $scope.numberOfCards = 10;
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
}]);
