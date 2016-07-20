'use strict';

MemoryMaster.controller('SummaryCtrl', ['$scope', '$uibModalInstance', 'Score', 'HighScores', 'Timer', function($scope, $modalInstance, Score, HighScores, Timer) {
  $scope.score           = Score.getScore();
  $scope.remainingTime   = Timer.remaining();
  $scope.personalBest    = HighScores.getPersonalBest();
  $scope.newPersonalBest = false;

  if ($scope.score > $scope.personalBest) {
    $scope.newPersonalBest = true;
    HighScores.setPersonalBest($scope.score);
  }

  HighScores.getRank().then(function(data) {
    $scope.ranking = data;
  });

  $scope.close = function() {
    $modalInstance.close();
  }

  $scope.dismiss = function() {
    $modalInstance.dismiss();
  }
}]);
