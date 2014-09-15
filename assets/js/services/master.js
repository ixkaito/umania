angular.module('umania')
	.factory('Master', function($window) {
		//付加情報（必須ではないもの）の名前とgoogledocsのカラム名を記述
		var resource = {};
		resource.discoveredYear = '年月日開始'; // 発見年
		resource.popularity = 'googleヒット'; // 人気度
		resource.category = 'カテゴリ'; // カテゴリ
		resource.weather = '天気'; // 出現する天気
		resource.time = '時間'; // 出現する時間帯

		return {
			all: function() {
				return this.allRaw()
					.filter(function(cryptid) {
						return cryptid.imageUrl;
					});
			},
			allRaw: function() {
				return JSON.parse(localStorage.getItem('master') || '[]');
			},
			query: function(lat, lon) {
				return find_from_conditions(this.allRaw(), [], 100, 'ja', lat, lon);
			}
		};

		 function find_from_conditions(data, conditions, maxCount, lang, lat, lon){
			var i, res;
			var ret = [];
			var tmp = data;

			if ((lat !== null && lat !== '') && (lon !== null && lon !== '')){

				for (i=0; i<tmp.length; i++){
					res = tmp[i];
					var distance = calc_distance(lat, lon, res.lat, res.lon);
					res.distance = distance;
				}

				tmp.sort(function(a, b){
					return ( a.distance > b.distance ? 1 : -1);
				});
			}


			for (i=0; i<tmp.length; i++){
				res = tmp[i];
				var hit = true;
				for (var j=0; j<conditions.length; j++){
					var condition = conditions[j];
					if (condition.hitEmpty && res[condition.name] === ''){
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

			return ret;
		}

		function calc_distance(lat1, lon1, lat2, lon2){
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
	 }

		function makeDummyResultFromArray(ary, count){
			var i, key;
			var ret ={};
			ret.head = {};
			ret.head.vars = [];
			ret.head.vars.push('name');
			ret.head.vars.push('lat');
			ret.head.vars.push('lon');
			for (key in resource){
				ret.head.vars.push(key);
			}
			ret.results = {};
			ret.results.bindings = [];

			if (count === null){
				count = ary.length;
			}
			if (ary.length < count){
				count = ary.length;
			}

			for (i=0; i<count; i++){
				var elm = {};
				elm.name = {};
				elm.name.value = ary[i].name;

				elm.lat = {};
				elm.lat.value = ary[i].lat;

				elm.lon = {};
				elm.lon.value = ary[i].lon;

				for (key in resource){
					elm[key] = {};
					elm[key].value = ary[i][key];
				}
				ret.results.bindings.push(elm);

			}
			return ret;
		}
	});
