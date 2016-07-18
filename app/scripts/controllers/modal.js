MemoryMaster.controller('ModalCtrl', ['$scope', '$state', '$uibModal', 'Analytics', 'HighScores', function($scope, $state, $modal, Analytics, HighScores) {
  var affiliateUrl  = 'http://rcm-na.amazon-adsystem.com/e/cm?t=blricenet-20&o=1&p=13&l=ez&f=ifr&f=ifr&linkID=PXWGEVS23BIYHTZM'
  var template      = $state.current.name + '.html';
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
      ).result.then(function(details) {
          $state.go('prepare');
      });
      break;
    case 'prepare':
      if (HighScores.getPersonalBest()) {
        $scope.personalBest = HighScores.getPersonalBest();

        HighScores.getRank().then(function(data) {
          $scope.ranking = data;
        });
      }

      var modal = $modal.open(commonOptions);

      modal.rendered.then(function() {
        $('#affiliate').css('height', 60).css('width', 468).attr('src', affiliateUrl);
      });

      modal.result.then(function() {
        Analytics.sendView('playing');
        $state.go('playing');
      });
      break;
    case 'stageComplete':
      $scope.winning = true;
    case 'gameOver':
      if ($scope.winning) {
        Analytics.sendEvent('stageComplete', $scope.stage);
      } else {
        Analytics.sendView('gameOver');
        Analytics.sendEvent('gameOver', $scope.score);
      }

      $scope.winning = $scope.winning || false;

      var customOptions = {controller: 'SummaryCtrl', templateUrl: 'summary.html'};
      var modal         = $modal.open($.extend({}, commonOptions, customOptions));

      modal.rendered.then(function() {
        $('#affiliate').css('height', 60).css('width', 468).attr('src', affiliateUrl);
      });

      modal.result.then(function() {
        $state.go('prepare');
      }, function() {
        $state.go('welcome');
      });
      break;
  }
}]);
