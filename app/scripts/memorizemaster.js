var MemorizeMaster = angular.module("MemorizeMaster", ['ngAnimate', 'ui.bootstrap', 'ui.router']);

MemorizeMaster.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
  });;
}]);
