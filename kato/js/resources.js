
var sparql_ns = 'http://umania.kiteretz.com';

// 付加情報（必須ではないもの）の名前とpredicateを記述
var resource = [];
resource['discoveredYear'] = sparql_ns + '/discoveredYear'; // 発見年
resource['popularity'] = sparql_ns + '/popularity'; // 人気度
resource['category'] = sparql_ns + '/category'; // カテゴリ

/**
 * すべてのリソースをコールバック関数に返す
 * @param cb	処理完了後のコールバック func(result, lat, lng)
 * @param maxCount	結果最大数(未指定の場合は全て)
 */
var find_all = function(endpoint, cb, maxCount){

	var query =
		'select * {\n'+
' ?s <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat;\n'+
' <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?lng;\n'+
'  <http://www.w3.org/2000/01/rdf-schema#label> ?name.\n';

	for (var key in resource){
		query += 'optional {?s <' + resource[key] + '> ?'+key + '.}\n';
	}

	query +=
' }\n';
	if (maxCount != undefined){
		query += '  LIMIT '+ maxCount;
	}

	find_from_query(endpoint, lat, lng, cb, query);

 };

 /**
  * 名前が部分一致したリソースをコールバック関数に返す
  * @param cb	処理完了後のコールバック func(result, lat, lng)
  * @param maxCount	結果最大数(未指定の場合は全て)
  */
 var find_from_name = function(endpoint, name, cb, maxCount, lang){

 	var query =
 		'select * {\n'+
 ' ?s <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat;\n'+
 ' <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?lng;\n'+
 '  <http://www.w3.org/2000/01/rdf-schema#label> ?name.\n';
	for (var key in resource){
		query += 'optional {?s <' + resource[key] + '> ?'+key + '.}\n';
	}

	query +=
 ' }\n';
 	if (maxCount != undefined){
 		query += '  LIMIT '+ maxCount;
 	}

 	// lat, lngは未指定
 	find_from_query(endpoint, null, null, cb, query);

  };



/**
 * 座標を指定して、その位置から近い順にリソースをコールバック関数に返す
 * @param endpoint	エンドポイント
 * @param lat	lat
 * @param lng	long
 * @param cb	処理完了後のコールバック func(result, lat, lng)
 * @param maxCount	結果最大数(未指定の場合は全て)
 */
var find_from_location = function(endpoint, lat, lng, cb, maxCount){

	var query =
		'select * {\n'+
' ?s <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat;\n'+
' <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?lng;\n'+
'  <http://www.w3.org/2000/01/rdf-schema#label> ?name.\n';
		for (var key in resource){
			query += 'optional {?s <' + resource[key] + '> ?'+key + '.}\n';
		}

	query +=
' }\n';
//	' ORDER BY (((?lat - ' + lat + ') * (?lat - ' + lat + ')) + ((?lng - ' + lng + ') * (?lng - ' + lng + '))) \n';

	if (maxCount != undefined){
		query += '  LIMIT '+ maxCount;
	}


	find_from_query(endpoint, lat, lng, cb, query);

 };


 var find_from_query = function(endpoint, lat, lng, cb, query){

	 var qr = sendQuery(endpoint, query);

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
 };
