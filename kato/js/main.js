

$(window).load(function() {

	$('#find').click(function(event){
		var endpoint = $('#ep').val();
		var query = $('#query').val();

		qr = sendQuery(endpoint, query);

		qr.fail(
				function (xhr, textStatus, thrownError) {
					alert("Error: A '" + textStatus+ "' occurred.");
				}
			);
		qr.done(
			function (d) {
				viewQueryResult(d);

			}
		);

	});

	$('#findLoc').click(function(event){
		find_from_location($('#ep').val(), $('#lat').val(), $('#lng').val(), viewLocationResult, 100);
	});

	$('#findWeather').click(function(event){
		find_weather($('#lat').val(), $('#lng').val(), viewWeatherResult);
		find_geotype($('#lat').val(), $('#lng').val(), viewGeotypeResult);
	});

});


var viewQueryResult = function(d){
	var result_div = $('#result_div');

	var table = $('#result_list')[0];

	if (table == undefined){
		table = $("#" + result_div.id + '_list')[0];

		if (table == undefined){
			result_div.append(
					$('<table></table>')
					.attr({
						'id': result_div.id + '_list',
						'class': 'table'
					})
			);
			table = $("#" + result_div.id + '_list')[0];
		}
	}

	while(table.rows.length > 0){
		table.deleteRow(0);	// 行を追加
	}

	if (d.head != undefined && d.head.vars != null){
		var header = table.createTHead();	// 行を追加
		var headerRow = header.insertRow(0);

		for (var i=0; i<d.head.vars.length; i++){
			var th = document.createElement('th');
			th.innerHTML = d.head.vars[i]; // ID
			headerRow.appendChild(th);
		}
	}

	if (d.results != undefined && d.results.bindings instanceof Array){
		var data = d.results.bindings;
		result_div.show();
		// ヘッダ

		id = 1;
		for (var d=0; d<data.length; d++){
			var row1 = table.insertRow(d+1);	// 行を追加


			var i=0;
			// ID
			for (var key in data[d]) {
				var cell = row1.insertCell(i++);	// ２つ目以降のセルを追加
				var value = data[d][key].value;

				//
					 if (data[d][key]['type'] == 'literal'){
						 if (data[d][key]['xml:lang'] != undefined){
							 value = '"' + value + '"@'+data[d][key]['xml:lang'];
						 } else {
							 value = '"' + value + '"^^&lt;http://www.w3.org/2001/XMLSchema#float&gt;';
						 }
					 } else {
						 value = '&lt;'+value+'&gt;';
					 }


				//

				if (value == null){
					value = '';
				}

				var link = true;

				if (link){
					if (value != null && value.indexOf("http://") == 0){
						value = '<a href="'+value+'" target="_blank">'+value+'</a>';
					}
				}
				cell.innerHTML = value;
			}
		}
	}
};



var viewLocationResult = function(dd, lat, lng){
	 var result_div = $('#result_div');

	 var table = $('#result_list')[0];

	 if (table == undefined){
		 table = $("#" + result_div.id + '_list')[0];

		 if (table == undefined){
			 result_div.append(
					 $('<table></table>')
					 .attr({
						 'id': result_div.id + '_list',
						 'class': 'table'
					 })
			 );
			 table = $("#" + result_div.id + '_list')[0];
		 }
	 }

	 while(table.rows.length > 0){
		 table.deleteRow(0);	// 行を追加
	 }

	 if (dd.head != undefined && dd.head.vars != null){
		 var header = table.createTHead();	// 行を追加
		 var headerRow = header.insertRow(0);

		 for (var i=0; i<dd.head.vars.length; i++){
			 var th = document.createElement('th');
			 th.innerHTML = dd.head.vars[i];
			 headerRow.appendChild(th);
		 }
		 var th = document.createElement('th');
		 th.innerHTML = 'distance(km)';
		 headerRow.appendChild(th);

	 }

	 if (dd.results != undefined && dd.results.bindings instanceof Array){
		 var data = dd.results.bindings;
		 result_div.show();
		 // ヘッダ

		 id = 1;
		 for (var d=0; d<data.length; d++){
			 var row1 = table.insertRow(d+1);	// 行を追加


			 // ID
			 var i=0;
//			 for (var key in data[d]) {
			 for (var j=0; i<dd.head.vars.length; j++){
				 var value = '';
				 if (data[d][dd.head.vars[j]] != undefined){
					 value = data[d][dd.head.vars[j]].value;
				 }
				 var cell = row1.insertCell(i++);	// ２つ目以降のセルを追加
//				 var value = data[d][key].value;

				 if (value == null){
					 value = '';
				 }

				 var link = true;

				 if (link){
					 if (value != null && value.indexOf("http://") == 0){
						 value = '<a href="'+value+'" target="_blank">'+value+'</a>';
					 }
				 }
				 cell.innerHTML = value;
			 }
			 var cell = row1.insertCell(i++);	// ２つ目以降のセルを追加
			 var lat0 = data[d].lat.value;
			 var lng0 = data[d].lng.value;

			 var distance = calc_distance(lat, lng, lat0, lng0);
			 cell.innerHTML = Math.round(distance/100) / 10;

		 }
	 }
};

var viewWeatherResult = function(d, lat, lng){
	var html = '';
	var condition = d.data.current_condition[0];

	html += '<h2>' + condition.weatherDesc[0].value + '</h2>';
	html += '温度：' + condition.temp_C + '℃<br>';
	html += '湿度：' + condition.humidity + '％<br>';
	html += '雲量：' + condition.cloudcover + '％<br>';
	html += '視界：' + condition.visibility + 'km<br>';
	html += '気圧：' + condition.pressure + ' hPa<br>';
	html += '風向：' + condition.winddir16Point + ' 風速：' + condition.windspeedKmph + ' km/h<br>';

	$("#weather_div").html(html);
};

var viewGeotypeResult = function(d, lat, lng){
	var html = '';
	for (var i=0; i<d.length; i++){
		html += d[i] + '<br>';
	}

	$("#geotype_div").html(html);

};