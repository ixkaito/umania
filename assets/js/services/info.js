angular.module('umania')
	.factory('Info', function($window) {
		return {
			enqueue: function(key, completion) {
				var info = JSON.parse($window.localStorage.getItem('info') || '[]');
				info.push({
					key: key,
					completion: completion
				});
				$window.localStorage.setItem('info', JSON.stringify(info));
			},
			dequeue: function() {
				var info = JSON.parse($window.localStorage.getItem('info') || '[]');
				var result = info.shift();
				$window.localStorage.setItem('info', JSON.stringify(info));
				return result;
			}
		};
	});
