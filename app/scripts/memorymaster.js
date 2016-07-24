var MemoryMaster = angular.module("MemoryMaster", ['ngAnimate', 'ui.bootstrap', 'ui.router']);

MemoryMaster.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('welcome', {
    controller: 'ModalCtrl'
  }).state('prepare', {
    controller: 'ModalCtrl'
  }).state('playing', {
    controller: 'PlayingCtrl',
    templateUrl: 'playing.html'
  }).state('stageComplete', {
    controller: 'ModalCtrl'
  }).state('gameOver', {
    controller: 'ModalCtrl'
  });
}]);

MemoryMaster.run(['$window', 'Facebook', function($window, Facebook) {
  if (!window.location.protocol.match(/chrome-extension/)) {
    $window.fbAsyncInit = function() {
      Facebook.initialize();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  $('body').onload = $('#loading').hide();
}]);
