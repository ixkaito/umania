
/**
 * 座標を指定して、その位置の気象情報をコールバック関数に返す
 * @param lat
 * @param lng
 * @param cb	処理完了後のコールバック func(result, lat, lng)
 */
function find_weather(lat, lng, cb){

	qr = sendWeatherQuery(lat, lng);

	qr.fail(
			function (xhr, textStatus, thrownError) {
				alert("Error: A '" + textStatus+ "' occurred.");
			}
		);
	qr.done(
		function (d) {
			if (cb != undefined){
				cb(d, lat, lng);
			}
		}
	);


	function sendWeatherQuery(lat, lng){

		var api_addr = 'http://api.worldweatheronline.com/free/v1/weather.ashx';
		var key = '724b4ec1186468d3e2fb18e9dbcee471b0b921b2';


	    if (window.XDomainRequest) {
	        // special query function for IE. Hiding variables in inner function.
	        // TODO See: https://gist.github.com/1114981 for inspiration.
	        promise = (
				function () {
	    			/*global XDomainRequest */
	    			var qx = $.Deferred(),
	        		xdr = new XDomainRequest(),
	        		url = api_addr +
					"?key=" + key +
					"&q=" + lat + "," + lng +
					"&fx=no&format=json";
	    			xdr.open("GET", url);
					xdr.onload = function () {
						var data;
	        			if (myEndpointOutput === qfXML) {
							data = $.parseXML(xdr.responseText);
	        			} else {
							data = $.parseJSON(xdr.responseText);
	        			}
	        			qx.resolve(data);
					};
	    			xdr.send();
	    			return qx.promise();
				}()
	        );
	    } else {
	        promise = $.ajax({
				url: api_addr,
				headers: {
					"Accept": "application/sparql-results+json"
				},
				data: {
					key: key,
					q: lat + "," + lng,
					fx: 'no',
					format: 'json'
				},
				dataType: 'json'
	        });
	    }

	    return promise;
	};
}
