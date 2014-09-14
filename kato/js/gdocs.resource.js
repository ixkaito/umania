/**
 *
 */

var sparql_ns = 'http://umania.kiteretz.com';

//var gdocs_url = 'https://docs.google.com/spreadsheet/ccc?key=1PeJXocWTGSoqWOESPscsvE9GZ5UxDjYmH5ZxgGbdrbM&usp=drive_web';
var gdocs_url = 'https://docs.google.com/spreadsheet/ccc?key=1luZzXczcVW7sIWqEAABRua41hnTQw6v4zS6dW6TDMt8&usp=drive_web';

//付加情報（必須ではないもの）の名前とgoogledocsのカラム名を記述
var resource = [];
resource['discoveredYear'] = '年月日開始'; // 発見年
resource['popularity'] = 'googleヒット'; // 人気度
resource['category'] = 'カテゴリ'; // カテゴリ
resource['weather'] = '天気'; // 出現する天気
resource['time'] = '時間'; // 出現する時間帯


var gdocs_resources;

$(window).load(function() {

	recline.Backend.GDocs.fetch({
	  url: gdocs_url
	})
	  .done(function(result) {
	    // structure of result is below
	    console.log(result);
	    init_gdocs(result);
	  });

	function init_gdocs(result){
		gdocs_resources = [];
		result = result.records;
		for (var i=0; i<result.length; i++){
			var res = {};
			res['name'] = result[i]['名前'];
			res['lat'] = result[i]['場所緯度'];
			res['lng'] = result[i]['場所経度'];
			for (var key in resource){
				res[key] = result[i][resource[key]];
			}
			gdocs_resources.push(res);
		}
	}
});

/**
 * すべてのリソースをコールバック関数に返す
 * @param endpoint sparql版とのIF統一のために用意（利用しない）
 * @param cb	処理完了後のコールバック func(result, lat, lng)
 * @param maxCount	結果最大数(未指定の場合は全て)
 */
var find_all = function(endpoint, cb, maxCount){

	var ret =  gdocs_resources.concat();

	ret = makeDummyResultFromArray(ret, maxCount);

	cb(ret);// lat, lngは常にnull

	return ret;

 };


/**
 * 名前が部分一致したリソースをコールバック関数に返す
 * @param endpoint sparql版とのIF統一のために用意（利用しない）
 * @param name リソース名
 * @param cb	処理完了後のコールバック func(result, lat, lng)
 * @param maxCount	結果最大数(未指定の場合は全て)
 * @param lang	取得言語（現バージョン未実装（常に日本語））
 */
var find_from_name = function(endpoint, name, cb, maxCount, lang){
/*
	var ret = [];

	for (var i=0; i<gdocs_resources.length; i++){
		var res = gdocs_resources[i];
		if (res.indexOf(name) >= 0){
			ret.push(res);
		}
	}

	ret = makeDummyResultFromArray(ret, maxCount);

	cb(ret); // lat, lngは常にnull

	return ret;
*/
	return find_from_conditions(endpoint, [{'name':'name', 'value':name, 'hitEmpty':false}], cb, maxCount, lang);
 };

 /**
  * 検索条件が部分一致したリソースをコールバック関数に返す
  * 条件を複数指定した場合はand検索とする
  * @param endpoint sparql版とのIF統一のために用意（利用しない）
  * @param conditions 検索条件
  * @param cb	処理完了後のコールバック func(result, lat, lng)
  * @param maxCount	結果最大数(未指定の場合は全て)
  * @param lang	取得言語（現バージョン未実装（常に日本語））
  */
 var find_from_conditions = function(endpoint, conditions, cb, maxCount, lang, lat, lng){

 	var ret = [];

	var tmp = gdocs_resources.concat();

	if ((lat != null && lat != '') && (lng != null && lng != '')){

		for (var i=0; i<tmp.length; i++){
			var res = tmp[i];
			var distance = calc_distance(lat, lng, res.lat, res.lng);
			res.distance = distance;
		}

		tmp.sort(function(a, b){
			return ( a.distance > b.distance ? 1 : -1);
		});

//		tmp = makeDummyResultFromArray(tmp, maxCount);
	}


 	for (var i=0; i<tmp.length; i++){
 		var res = tmp[i];
 		var hit = true;
 		for (var j=0; j<conditions.length; j++){
 			var condition = conditions[j];
 			if (condition['hitEmpty'] && res[condition.name] == ''){
 				// 空白をヒットとする、かつ、該当項目が空白の場合はチェックしない
 				continue;
 			}
 	 		if (res[condition.name].indexOf(condition.value) < 0){
 	 			// 該当項目の文字列が指定文字列に部分一致しなかった場合は該当しない
 	 			hit = false;
 	 			break;
 	 		}
 		}
 		if (hit){
 			ret.push(res);
 		}
 	}

 	ret = makeDummyResultFromArray(ret, maxCount);

 	cb(ret, lat, lng); // lat, lngは常にnull

 	return ret;
  };


/**
 * 座標を指定して、その位置から近い順にリソースをコールバック関数に返す
 * @param endpoint sparql版とのIF統一のために用意（利用しない）
 * @param lat	lat
 * @param lng	long
 * @param cb	処理完了後のコールバック func(result, lat, lng)
 * @param maxCount	結果最大数(未指定の場合は全て)
 */
var find_from_location = function(endpoint, lat, lng, cb, maxCount){

	var ret = gdocs_resources.concat();

	for (var i=0; i<gdocs_resources.length; i++){
		var res = ret[i];
		var distance = calc_distance(lat, lng, res.lat, res.lng);
		res.distance = distance;
	}

	ret.sort(function(a, b){
		return ( a.distance > b.distance ? 1 : -1);
	});

	ret = makeDummyResultFromArray(ret, maxCount);

	cb(ret, lat, lng);

 };

 /**
  * リソースを条件にヒットした順に並び替えてコールバック関数に返す
  * @param endpoint sparql版とのIF統一のために用意（利用しない）
  * @param cb	処理完了後のコールバック func(result, lat, lng)
  * @param condition 検索（並び替え）条件
  * @param maxCount	結果最大数(未指定の場合は全て)
  */
 var find_by_condition = function(endpoint, cb, condition, maxCount){

 	var ret =  gdocs_resources.concat();

 	ret = makeDummyResultFromArray(ret, maxCount);

 	cb(ret);// lat, lngは常にnull

 	return ret;

  };

 function makeDummyResultFromArray(ary, count){
	var ret ={};
	ret.head = {};
	ret.head.vars = [];
	ret.head.vars.push('name');
	ret.head.vars.push('lat');
	ret.head.vars.push('lng');
	for (var key in resource){
		ret.head.vars.push(key);
	}
	ret.results = {};
	ret.results.bindings = [];

	if (count == null){
		count = ary.length;
	}
	if (ary.length < count){
		count = ary.length;
	}

	for (var i=0; i<count; i++){
		var elm = {};
		elm.name = {};
		elm.name.value = ary[i].name;

		elm.lat = {};
		elm.lat.value = ary[i].lat;

		elm.lng = {};
		elm.lng.value = ary[i].lng;

		for (var key in resource){
			elm[key] = {};
			elm[key].value = ary[i][key];
		}
		ret.results.bindings.push(elm);

	}
	return ret;
 }

