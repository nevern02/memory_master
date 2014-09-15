MemorizeMaster.controller('ModalCtrl', ['$scope', '$state', '$modal', function($scope, $state, $modal) {
  var modalInstanceCtlr = function($scope, $modalInstance, Score, Timer) {
    $scope.close = function() {
      $modalInstance.close();
    }

    $scope.dismiss = function() {
      $modalInstance.dismiss();
    }

    $scope.getScore = function() {
      return Score.getScore();
    }

    $scope.getRemainingTime = function() {
      return Timer.remaining();
    }
  }
  var template = $state.current.name + '.html';
  var commonOptions = {
    templateUrl: template, 
    backdrop: 'static', 
    controller: modalInstanceCtlr, 
    scope: $scope
  };

  switch($state.current.name) {
    case 'welcome':
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
      $scope.winning = $scope.winning || false;
      var customOptions = {templateUrl: 'summary.html'};
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
