angular.module('umania', ['ui.router'])
	.directive('umaniaHeader', function() {
		return {
			restrict: 'AE',
			templateUrl: 'partials/directive/header.html'
		};
	})
	.directive('umaniaFooter', function() {
		return {
			restrict: 'AE',
			templateUrl: 'partials/directive/footer.html'
		};
	})
	.config(function($urlRouterProvider) {
		$urlRouterProvider.otherwise('/splash');
	})
	.run(function($rootScope) {
	});
