'use strict';

MemoryMaster.controller('SummaryCtrl', ['$scope', '$uibModalInstance', 'Score', 'HighScores', 'Timer', function($scope, $modalInstance, Score, HighScores, Timer) {
  $scope.score = Score.getScore();
  $scope.remainingTime = Timer.remaining();
  $scope.highScore = HighScores.current();
  $scope.newHighScore = false;

  if ($scope.score > $scope.highScore) {
    $scope.newHighScore = true;
    HighScores.save($scope.score);
  }

  $scope.close = function() {
    $modalInstance.close();
  }

  $scope.dismiss = function() {
    $modalInstance.dismiss();
  }
}]);
