MemorizeMaster.controller("GameCtrl", ["$scope", "$timeout", "$interval", "Card", "ImageList", function($scope, $timeout, $interval, Card, ImageList) {
  var imageList = null;
  var imageColorMap = null;
  var images = null;
  var timer = null;
  var numberOfCards = 10;
  var colors = ['red', 'green', 'blue', 'teal', 'orange', 'purple', 'brown', 'darkcyan', 'olive', 'tan', 'violet'];
  var patterns = ['stairs', 'microbial', 'horizontal-stripes', 'rombes', 'arrows', 'zig-zag', 'weave', 'upholstery', 'stary', 'marrakesh', 'bokeh', 'carbon', 'vertical-stripes', 'carbon-fibre', 'hearts', 'argyle', 'steps', 'waves', 'cross', 'yin-yang', 'stars', 'brady-bunch', 'shippo', 'bricks', 'seigaiha', 'japanese-cube', 'polka-dot', 'houndstooth', 'checkerboard', 'diagonal-checkerboard', 'tartan', 'madras', 'lined-paper', 'blueprint-grid', 'tablecloth', 'diagonal-stripes', 'cicada-stripes'];
  var backgrounds = ['city1.jpg', 'grass1.jpg', 'car1.jpg', 'buildings1.jpg', 'beach1.jpg', 'cherries1.jpg', 'water1.jpg', 'sunset1.jpg', 'car2.jpg', 'snow1.jpg', 'river1.jpg', 'sunset2.jpg', 'blossoms1.jpg', 'tree1.jpg', 'beach2.jpg', 'sunset3.jpg', 'street1.jpg', 'building1.jpg'];

  $scope.stage = 1;
  $scope.bestScores = {};
  if (chrome && chrome.storage) {
    chrome.storage.sync.get('bestScores', function(data) {
      if (data['bestScores']) {
        $scope.bestScores = data['bestScores'];
      }
    });
  }

  var saveHighScore = function(stage, seconds) {
    var current = $scope.bestScores[stage];
    if (!current || seconds < current) {
      $scope.bestScores[stage] = seconds;
      if (chrome && chrome.storage) {
        chrome.storage.sync.set({'bestScores': $scope.bestScores}, function() { });
      }
    }
  }

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
        $timeout(function() {
          _.each($scope.currentPair, function(card) { card.isShowing = false });
          $scope.currentPair = [];
          $scope.enableClick = true;
        }, 1000);
      } else {
        if (hasWon()) {
          $interval.cancel(timer);
          $scope.modalShown = true;
          saveHighScore($scope.stage, $scope.elapsedSeconds);
        } else {
          $scope.currentPair = [];
          $scope.enableClick = true;
        }
      }
    }
  }

  $scope.cardWidth = function() {
    return Math.max(9.5 - (0.5 * $scope.stage), 2) + "em";
  }

  $scope.iconWidth = function() {
    return Math.max(6.5 - (0.5 * $scope.stage), 1) + "em";
  }

  $scope.cardHeight = function() {
    return Math.max(12.5 - (0.5 * $scope.stage), 2) + "em";
  }

  $scope.cardPattern = function() {
    var index = $scope.stage % patterns.length - 1;
    if (index < 0) {
      return patterns[patterns.length - 1];
    } else {
      return patterns[index];
    }
  }

  $scope.backgroundImage = function() {
    var index = $scope.stage % backgrounds.length - 1;
    if (index < 0) {
      return backgrounds[backgrounds.length - 1];
    } else {
      return backgrounds[index];
    }
  }

  $scope.$watch('stage', function(newValue, oldValue) {
    if (newValue === oldValue) {
      return;
    } 
    var newBackground = 'images/' + $scope.backgroundImage();
    var leaving = $scope.stage % 2 + 1;
    var entering = (leaving === 1 ? 2 : 1);
    $entering = $('#background' + entering);
    $leaving = $('#background' + leaving);

    $entering.attr('src', newBackground);
    $entering.fadeIn(1000);
    $leaving.fadeOut(1000);
  });
}]);
