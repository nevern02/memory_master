'use strict';

MemoryMaster.controller('BackgroundCtrl', ['$scope', function($scope) {
  var BACKGROUNDS = ['city1.jpg', 'grass1.jpg', 'car1.jpg', 'buildings1.jpg', 'beach1.jpg', 
                     'cherries1.jpg', 'water1.jpg', 'sunset1.jpg', 'car2.jpg', 'snow1.jpg', 
                     'river1.jpg', 'sunset2.jpg', 'blossoms1.jpg', 'tree1.jpg', 'beach2.jpg', 
                     'sunset3.jpg', 'street1.jpg', 'building1.jpg'];

  var nextBackground = function() {
    var index = $scope.stage % BACKGROUNDS.length - 1;
    if (index < 0) {
      return BACKGROUNDS[BACKGROUNDS.length - 1];
    } else {
      return BACKGROUNDS[index];
    }
  }

  $scope.$watch('stage', function(newValue, oldValue) {
    if (newValue === oldValue) {
      return; // in case we're initializing
    } 

    var newBackground = 'images/' + nextBackground();
    var leaving = $scope.stage % 2 + 1;
    var entering = (leaving === 1 ? 2 : 1);
    var $leaving = $('#background' + leaving);
    var $entering = $('#background' + entering);

    // Do it this way due to ng-src violating CSP in chrome apps
    $entering.attr('src', newBackground);
    $entering.fadeIn(1000);
    $leaving.fadeOut(1000);
  });
}]);
