'use strict';

MemoryMaster.controller('HighScoresCtrl', ['$scope', '$uibModalInstance', 'HighScores', function($scope, $modalInstance, HighScores) {
  $scope.close = function() {
    $modalInstance.close();
  }

  $scope.dismiss = function() {
    $modalInstance.dismiss();
  }

  HighScores.getScores().then(function(scoreData) {
    $scope.leaders = scoreData.scores;
  });
}]);
