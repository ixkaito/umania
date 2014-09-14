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
	.config(function($compileProvider) {
		$compileProvider.imgSrcSanitizationWhitelist(/^.*/);
	})
	.run(function($rootScope) {
		$rootScope.loading = false;

		$rootScope.$on('$stateChangeStart', function() {
			$rootScope.loading = true;
		});

		$rootScope.$on('$viewContentLoaded', function() {
			$rootScope.loading = false;
		});
	});
