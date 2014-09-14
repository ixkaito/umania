angular.module('umania')
	.config(function($stateProvider) {
		$stateProvider
			.state('collection', {
				controller: 'CollectionController',
				templateUrl: 'partials/collection.html',
				url: '/collection'
			});
	})
	.controller('CollectionController', function($scope) {
		var storage = localStorage;
		$scope.data = [];

		for (var i = 0; i < storage.length; i++) {
			var _key = storage.key(i);
			var _value = JSON.parse(storage.getItem(_key));
			var _id = _value[0];
			var _name = _value[1];
			var _completion = _value[2];
			var _s = _completion >= 100 ? '' : '_s';

			$scope.data.push({
				imageUrl: 'assets/images/uma_' + _id + _s + '.png'
			});
		}
	});
