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
				name: master[key].name,
				description: master[key].description,
				imageUrl: 'assets/images/uma_' + _id + _s + '.png'
			};
		});

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
			},
			afterShow: function() {
				console.log(this, arguments);
				var key = $.fancybox.current.index;
				console.log($scope.data[key].description);
			}
		});
	});
