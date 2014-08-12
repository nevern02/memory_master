MemorizeMaster.controller("GameCtrl", ["$scope", "$timeout", "Card", "ImageList", function($scope, $timeout, Card, ImageList) {
  var NUMBER_OF_CARDS = 20;
  var imageList = new ImageList(NUMBER_OF_CARDS / 2);
  var images = _.shuffle(imageList.images.concat(_.clone(imageList.images)));
  $scope.cards = [];
  $scope.currentPair = [];
  $scope.enableClick = true;

  _.each(images, function(image) {
    $scope.cards.push(new Card(image));
  });

  $scope.reveal = function(card) {
    if (!$scope.enableClick) {
      return;
    }

    card.isShowing = true;
    $scope.currentPair.push(card);

    if ($scope.currentPair.length > 1) {
      $scope.enableClick = false;
      $timeout(function() {
        if ($scope.currentPair[0].image !== $scope.currentPair[1].image) {
          _.each($scope.currentPair, function(card) { card.isShowing = false });
        } 
        $scope.currentPair = [];
        $scope.enableClick = true;
      }, 1000);
    }
  };

}]);
