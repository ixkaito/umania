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
	.run(function($state, $rootScope, $window, Master, Info, alarmInterval) {
		$rootScope.loading = false;
		$rootScope.infoCount = function() {
			return Info.length();
		};

		$rootScope.$on('$stateChangeStart', function() {
			$rootScope.loading = true;
		});

		$rootScope.$on('$viewContentLoaded', function() {
			$rootScope.loading = false;
		});

		if ($window.navigator.mozAlarms) {
			setAlarm();

			$window.navigator.mozSetMessageHandler('alarm', function (mozAlarm) {
				$rootScope.$apply(function() {
					var master = Master.all();
					Info.enqueue((Math.random() * master.length).toFixed(), (Math.random() * 100).toFixed());
				});

				var notification = new Notification('Umania', {
					body: 'UMAに遭遇しました',
					icon: 'app://53f82159-2c63-ce47-b284-f4302a984232/assets/images/icon-128.png'
				});
				notification.onclick = function() {
					 $window.navigator.mozApps.getSelf().onsuccess = function(evt) {
						 notification.close();
						 var app = evt.target.result;
						 app.launch();
						 $state.go('info');
					 };
				};

				setAlarm();
			});
		}

		function setAlarm() {
			var alarmDate = new Date(Date.now() + alarmInterval); // 60秒後
			$window.navigator.mozAlarms.add(alarmDate, 'honorTimezone', {});
		}
	});
