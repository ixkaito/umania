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
			var _text = _value[2];
			var _completion = _value[3];
			var _s = _completion >= 100 ? '' : '_s';

			$scope.data.push({
				imageUrl: 'assets/images/uma_' + _id + _s + '.png'
			});
		}

		$(".fancybox").fancybox({
			padding:   0,
			margin:    [20, 20, 70, 20],
			maxWidth:  280,
			maxHeight: 280,
			helpers: {
				overlay: {
					css: {
						'background' : 'rgba(0, 0, 0, 0.85)'
					}
				}
			}
		});
	});
