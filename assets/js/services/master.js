angular.module('umania')
	.factory('Master', function($window) {
		return {
			all: function() {
				return JSON.parse(localStorage.getItem('master') || '[]');
			}
		};
	});
