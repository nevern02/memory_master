MemoryMaster.controller('ModalCtrl', ['$scope', '$state', '$modal', 'Analytics', function($scope, $state, $modal, Analytics) {
  var template = $state.current.name + '.html';
  var commonOptions = {
    templateUrl: template, 
    backdrop: 'static', 
    controller: 'ModalInstanceCtlr', 
    scope: $scope
  };

  switch($state.current.name) {
    case 'welcome':
      Analytics.sendView('welcome');

      var customOptions = {size: 'lg'};
      $modal.open(
        $.extend({}, customOptions, commonOptions)
      ).result.then(function() {
        $state.go('prepare');
      });
      break;
    case 'prepare':
      $modal.open(commonOptions).result.then(function() {
        $state.go('playing');
      });
      break;
    case 'stageComplete':
      $scope.winning = true;
    case 'gameOver':
      if ($scope.winning) {
        Analytics.sendView('stageComplete');
        Analytics.sendEvent('stageComplete', $scope.stage);
      } else {
        Analytics.sendView('gameOver');
        Analytics.sendEvent('gameOver', $scope.score);
      }

      $scope.winning = $scope.winning || false;
      var customOptions = {controller: 'SummaryCtrl', templateUrl: 'summary.html'};
      $modal.open(
        $.extend({}, commonOptions, customOptions)
      ).result.then(function() {
        $state.go('prepare');
      }, function() {
        $state.go('welcome');
      });
      break;
  }
}]);
