angular.module('umania')
	.factory('Collection', function($window) {
		return {
			all: function() {
				return JSON.parse(localStorage.getItem('collection') || '{}');
			},
			set: function(key, completion) {
				var collection = JSON.parse(localStorage.getItem('collection') || '{}');
				var sumComp = Math.min(100, (collection[key] || 0) + completion);
				collection[key] = sumComp;
				localStorage.setItem('collection', JSON.stringify(collection));
				return sumComp;
			}
		};
	});
