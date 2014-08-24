MemorizeMaster.controller("GameCtrl", ["$scope", "$timeout", "$interval", "Card", "ImageList", function($scope, $timeout, $interval, Card, ImageList) {
  var colors = ['red', 'green', 'blue', 'teal', 'orange', 'purple'];
  var NUMBER_OF_CARDS = 20;
  var imageList = new ImageList(NUMBER_OF_CARDS / 2);
  var imageColorMap = _.map(imageList.images, function(image) {
    var color = _.shuffle(colors).shift();
    return {image: image, color: color};
  });
  var images = _.shuffle(imageColorMap.concat(_.clone(imageColorMap)));

  $scope.modalShown = false;
  $scope.cards = [];
  $scope.currentPair = [];
  $scope.enableClick = true;
  $scope.elapsedSeconds = 0;

  var hasWon = function() {
    return !_.any($scope.cards, function(i) { return !i.isShowing });
  }

  var timer = $interval(function() {
    $scope.elapsedSeconds += 1;
  }, 1000);

  _.each(images, function(image) {
    $scope.cards.push(new Card(image));
  });

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
