'use strict';

MemorizeMaster.controller('PlayingCtrl', ['$scope', '$rootScope', '$state', '$timeout', 'Card', function($scope, $rootScope, $state, $timeout, Card) {
  $scope.currentPair = [];
  $scope.cards = Card.newSet($scope.stage, $scope.numberOfCards);
  $scope.enableClick = true;

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
        if (hasWon()) {
          $state.go('stageComplete');
        } else {
          $scope.currentPair = [];
          $scope.enableClick = true;
        }
      }
    }
  }

  var hasWon = function() {
    return !_.any($scope.cards, function(i) { return !i.isShowing });
  }

  var matchingCards = function() {
    return $scope.currentPair[0].image === $scope.currentPair[1].image
  }
}]);
