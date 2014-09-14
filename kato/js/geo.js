





/**
 * 座標を指定して、地形種別を取得・結果をコールバック関数に返す
 * @param lat
 * @param lng
 * @param cb	処理完了後のコールバック func(result, lat, lng)
 */
 var find_geotype = function(lat, lng, cb) {

 	  var elevator = new google.maps.ElevationService();

 	  // Create a new chart in the elevation_chart DIV.
 	  chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));

 	//  var path = [ whitney, lonepine, owenslake, panamintsprings, beattyjunction, badwater];
 	  var path = [];
 	  for (var i=0; i<10; i+=2){
 		  path.push(new google.maps.LatLng(lat - 0.005 , lng - 0.001 * i + 0.005));
 		  path.push(new google.maps.LatLng(lat + 0.005 , lng - 0.001 * i + 0.005));
 		  path.push(new google.maps.LatLng(lat + 0.005 , lng - 0.001 * (i+1) + 0.005));
 		  path.push(new google.maps.LatLng(lat - 0.005 , lng - 0.001 * (i+1) + 0.005));
 	  }

 	  // Create a PathElevationRequest object using this array.
 	  // Ask for 256 samples along that path.
 	  var pathRequest = {
 	    'path': path,
 	    'samples': 100
 	  };

 	  // Initiate the path request.
 	  elevator.getElevationAlongPath(pathRequest, function(results, status){
 		  if (cb != undefined){
 			  return cb(getElevations(results, status), lat, lng);
 		  }
 	  });

 	 var getElevations = function(results, status, cb) {
 	 	var types = [];

 	 	if (status == google.maps.ElevationStatus.OK) {
 	 		elevations = results;

 	 		// Extract the elevation samples from the returned results
 	 		// and store them in an array of LatLngs.
 	 		var elevationPath = [];
 	 		var max = -10000;
 	 		var min = 10000;
 	 		var eles = [];

 	 		for (var i = 0; i < results.length; i++) {
 	 			elevationPath.push(elevations[i].location);
 	 			eles.push(elevations[i].elevation);
 	 		}

 	 		eles.sort(
 	 				function(a,b){
 	 					if( a < b ) return -1;
 	 					if( a > b ) return 1;
 	 					return 0;
 	 				}
 	 		);

 	 		var uniques = eles.filter(function (x, i, self) {
 	 			return self.indexOf(x) === i;
 	 		});


 	 		max = eles[eles.length - 1];
 	 		min = eles[0];

 	 		if (min <= -1 || (max - min < 2) || uniques.length < 95){
 	 			types.push('水辺');
 	 		}
 	 		if (max > 500){
 	 			types.push('高地');
 	 		}
 	 	}

 	 	return types;
 	 };
 };





 /*
  * 二点の座標を指定して距離を算出する
  * from http://emiyou3-tools.appspot.com/geocoding/distance.html
  */
 var calc_distance = function(lat1, lon1, lat2, lon2){
	 //ラジアンに変換
	 var a_lat = lat1 * Math.PI / 180;
	 var a_lon = lon1 * Math.PI / 180;
	 var b_lat = lat2 * Math.PI / 180;
	 var b_lon = lon2 * Math.PI / 180;

	 // 緯度の平均、緯度間の差、経度間の差
	 var latave = (a_lat + b_lat) / 2;
	 var latidiff = a_lat - b_lat;
	 var longdiff = a_lon - b_lon;

	 //子午線曲率半径
	 //半径を6335439m、離心率を0.006694で設定
	 var meridian = 6335439 / Math.sqrt(Math.pow(1 - 0.006694 * Math.sin(latave) * Math.sin(latave), 3));

	 //卯酉線曲率半径
	 //半径を6378137m、離心率を0.006694で設定
	 var primevertical = 6378137 / Math.sqrt(1 - 0.006694 * Math.sin(latave) * Math.sin(latave));

	 //Hubenyの簡易式
	 var x = meridian * latidiff;
	 var y = primevertical * Math.cos(latave) * longdiff;

	 return Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
 };

