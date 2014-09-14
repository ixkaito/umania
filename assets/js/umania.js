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
	.run(function($rootScope, $window) {
		$rootScope.loading = false;

		$rootScope.$on('$stateChangeStart', function() {
			$rootScope.loading = true;
		});

		$rootScope.$on('$viewContentLoaded', function() {
			$rootScope.loading = false;
		});

		if ($window.navigator.mozAlarms) {
			var req;
			var alarmDate = new Date(Date.now() + 10000); // 10秒後
			req = $window.navigator.mozAlarms.add(alarmDate, 'honorTimezone', {});

			$window.navigator.mozSetMessageHandler("alarm", function (mozAlarm) {
				var notification = new Notification('Umania', {
					body: 'UMAに遭遇しました',
					icon: 'app://53f82159-2c63-ce47-b284-f4302a984232/assets/images/icon-128.png'
				});
				notification.onclick = function() {
					 $window.navigator.mozApps.getSelf().onsuccess = function(evt) {
						 var app = evt.target.result;
						 app.launch();
					 };
				};
			});
		}
	});
