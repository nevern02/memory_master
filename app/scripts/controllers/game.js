MemorizeMaster.controller("GameCtrl", ["$scope", "$timeout", "$interval", "Card", "Timer", function($scope, $timeout, $interval, Card, Timer) {
  var numberOfCards = 10;
  var stageBeginSeconds = null;

  $scope.timer = new Timer(10);
  $scope.stage = 1;

  var initializeStage = function() {
    $scope.currentPair = [];
    $scope.cards = [];
    stageBeginSeconds = $scope.timer.remaining();
    $scope.cards = Card.newSet($scope.stage, numberOfCards);
    $scope.enableClick = true;

    $scope.timer.start().then(function() {
      $scope.modalShown = true;
    });
  }
  initializeStage();

  var hasWon = function() {
    return !_.any($scope.cards, function(i) { return !i.isShowing });
  }

  $scope.nextStage = function() {
    $scope.stage += 1;
    numberOfCards = Math.min(50, numberOfCards + 2);
    initializeStage();
    $scope.modalShown = false;
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
        if (hasWon()) {
          $scope.timer.stop();
          $scope.modalShown = true;
          saveHighScore($scope.stage, stageBeginSeconds - $scope.timer.currentSeconds);
        } else {
          $scope.currentPair = [];
          $scope.enableClick = true;
        }
      }
    }
  }

}]);
