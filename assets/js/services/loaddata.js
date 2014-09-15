angular.module('umania')
	.factory('loaddata', function(sparqlEndpoint) {
		var query = 'select distinct ?s ?name ?description ?lat ?lon ?category ?popularity ?imageUrl {\n'+
		'  ?s <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat;\n'+
		'  <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?lon;\n'+
		'  <http://www.w3.org/2000/01/rdf-schema#label> ?name;\n'+
		'  <http://purl.org/dc/terms/description> ?description;\n'+
		'  <http://umania.kiteretz.com/category> ?category;\n'+
		'  <http://umania.kiteretz.com/popularity> ?popularity;\n'+
		'  <http://umania.kiteretz.com/imageUrl> ?imageUrl.\n'+
		'}';

		return function(callback) {
			var master = localStorage.getItem('master');
			if (master) {
				callback(JSON.parse(master));
			} else {
				sendQuery(sparqlEndpoint, query)
					.done(function(result) {
						var data = result.results.bindings.map(function(d) {
							return {
								s: d.s.value,
								name: d.name.value,
								description: d.description.value,
								lat: +d.lat.value,
								lon: +d.lon.value,
								category: d.category.value,
								popularity: +d.popularity.value,
								imageUrl: d.imageUrl.value.match(/http:\/\/umania\.kiteretz\.com\/(\w+)\.png/)[1]
							};
						});
						localStorage.setItem('master', JSON.stringify(data));
						callback(data);
					});
			}
		};
	});
