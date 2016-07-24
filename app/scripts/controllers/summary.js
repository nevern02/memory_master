'use strict';

MemoryMaster.controller('SummaryCtrl', ['$scope', '$uibModalInstance', 'Score', 'HighScores', 'Timer', 'Facebook', function($scope, $modalInstance, Score, HighScores, Timer, Facebook) {
  $scope.score           = Score.getScore();
  $scope.remainingTime   = Timer.remaining();
  $scope.personalBest    = HighScores.getPersonalBest();
  $scope.newPersonalBest = false;

  if ($scope.score > $scope.personalBest) {
    $scope.newPersonalBest = true;
    HighScores.setPersonalBest(Facebook.getEmail(), $scope.score);
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
