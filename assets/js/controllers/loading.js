angular.module('umania')
	.config(function($stateProvider) {
		$stateProvider
			.state('loading', {
				controller: 'LoadingController',
				templateUrl: 'partials/loading.html',
				url: '/loading'
			});
	})
	.controller('LoadingController', function($state, $timeout) {
		$timeout(function() {
			$state.go('home');
		}, 500);
	});
