angular.module('umania')
	.config(function($stateProvider) {
		$stateProvider
			.state('info', {
				controller: 'InfoController',
				templateUrl: 'partials/info.html',
				url: '/info'
			});
	})
	.controller('InfoController', function($scope, $state, Info, Master, Collection) {
		var cryptid = Info.dequeue();
		console.log(cryptid);
		if (!cryptid) {
			$state.go('home');
			return;
		}
		var sumComp = Collection.set(cryptid.key, cryptid.completion);
		var rId = Master.all()[cryptid.key].imageUrl;
		var _rS = sumComp >= 100 ? '' : '_s';

		var encountImage = '<p class="umaImage"><img src="./assets/images/uma_' + rId + _rS + '.png" alt=""></p>';
		$('#encount').append(encountImage);


		function success(pos) {
			var crd = pos.coords;

			$('#latitude').text(crd.latitude);
			$('#longitude').text(crd.longitude);
		}

		function error(err) {
			console.warn('ERROR(' + err.code + '): ' + err.message);
		}

		navigator.geolocation.getCurrentPosition(success, error);

	});
