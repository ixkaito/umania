angular.module('umania')
  .config(function($stateProvider) {
    $stateProvider
      .state('splash', {
        controller: 'SplashController',
        templateUrl: 'partials/splash.html',
        url: '/splash'
      });
  })
  .controller('SplashController', function($state, $timeout) {
    $timeout(function() {
      $state.go('home');
    }, 1000);
  });
