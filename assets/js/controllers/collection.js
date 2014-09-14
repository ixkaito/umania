angular.module('umania')
	.config(function($stateProvider) {
		$stateProvider
			.state('collection', {
				controller: 'CollectionController',
				templateUrl: 'partials/collection.html',
				url: '/collection'
			});
	})
	.controller('CollectionController', function($scope, Master, Collection) {
		var master = Master.all();
		var collection = Collection.all();
		$scope.data = Object.keys(collection).map(function(key) {
			var _s = collection[key] >= 100 ? '': '_s';
			var _id = master[key].imageUrl;
			return {
				imageUrl: 'assets/images/uma_' + _id + _s + '.png'
			};
		});
	});
