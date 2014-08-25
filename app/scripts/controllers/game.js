MemorizeMaster.controller("GameCtrl", ["$scope", "$timeout", "$interval", "Card", "ImageList", function($scope, $timeout, $interval, Card, ImageList) {
  var imageList = null;
  var imageColorMap = null;
  var images = null;
  var timer = null;
  var numberOfCards = 10;
  var colors = ['red', 'green', 'blue', 'teal', 'orange', 'purple'];

  $scope.stage = 1;
  $scope.bestScores = {};

  var initializeStage = function() {
    $scope.currentPair = [];
    $scope.cards = [];
    $scope.elapsedSeconds = 0;

    imageList = new ImageList(numberOfCards / 2);
    imageColorMap = _.map(imageList.images, function(image) {
      var color = _.shuffle(colors).shift();
      return {image: image, color: color};
    });
    images = _.shuffle(imageColorMap.concat(_.clone(imageColorMap)));

    timer = $interval(function() {
      $scope.elapsedSeconds += 1;
    }, 1000);

    _.each(images, function(image) {
      $scope.cards.push(new Card(image));
    });

    $scope.enableClick = true;
  }
  initializeStage();

  var hasWon = function() {
    return !_.any($scope.cards, function(i) { return !i.isShowing });
  }

  $scope.nextStage = function() {
    $scope.stage += 1;
    numberOfCards += 2;
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
        $timeout(function() {
          _.each($scope.currentPair, function(card) { card.isShowing = false });
          $scope.currentPair = [];
          $scope.enableClick = true;
        }, 1000);
      } else {
        if (hasWon()) {
          $interval.cancel(timer);
          $scope.modalShown = true;
        } else {
          $scope.currentPair = [];
          $scope.enableClick = true;
        }
      }
    }
  };

}]);
