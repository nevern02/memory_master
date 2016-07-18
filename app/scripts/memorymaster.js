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

$('body').onload = $('#loading').hide();
