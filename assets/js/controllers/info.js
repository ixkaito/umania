// TODO local scope
var database = [
	['%E3%82%B1%E3%82%B5%E3%83%A9%E3%83%B3%E3%83%91%E3%82%B5%E3%83%A9%E3%83%B3', 'kesalanpatharan', 'ケサランパサラン', 'ケサランパサランの説明ケサランパサランの説明ケサランパサランの説明ケサランパサランの説明ケサランパサランの説明ケサランパサランの説明ケサランパサランの説明ケサランパサランの説明ケサランパサランの説明ケサランパサランの説明ケサランパサランの説明'],
	['%E3%83%8D%E3%83%83%E3%82%B7%E3%83%BC', 'nessie', 'ネッシー', 'ネッシーの説明ネッシーの説明ネッシーの説明ネッシーの説明ネッシーの説明ネッシーの説明ネッシーの説明ネッシーの説明ネッシーの説明ネッシーの説明ネッシーの説明'],
	['%E7%8B%BC%E7%94%B7', 'werewolf', '狼男', '狼男の説明狼男の説明狼男の説明狼男の説明狼男の説明狼男の説明狼男の説明狼男の説明狼男の説明狼男の説明狼男の説明'],
	['%E3%83%81%E3%83%A5%E3%83%91%E3%82%AB%E3%83%96%E3%83%A9', 'chupacabra', 'チュパカブラ', 'チュパカブラの説明チュパカブラの説明チュパカブラの説明チュパカブラの説明チュパカブラの説明チュパカブラの説明チュパカブラの説明チュパカブラの説明チュパカブラの説明チュパカブラの説明チュパカブラの説明'],
	['%E3%83%A8%E3%83%BC%E3%82%A6%E3%82%A3', 'yowie', 'ヨーウィ', 'ヨーウィの説明ヨーウィの説明ヨーウィの説明ヨーウィの説明ヨーウィの説明ヨーウィの説明ヨーウィの説明ヨーウィの説明ヨーウィの説明ヨーウィの説明ヨーウィの説明'],
	['%E3%83%93%E3%83%83%E3%82%B0%E3%83%95%E3%83%83%E3%83%88', 'bigfoot', 'ビッグフット', 'ビッグフットの説明ビッグフットの説明ビッグフットの説明ビッグフットの説明ビッグフットの説明ビッグフットの説明ビッグフットの説明ビッグフットの説明ビッグフットの説明ビッグフットの説明ビッグフットの説明'],
	['%E3%83%A2%E3%82%B1%E3%83%BC%E3%83%AC%E3%83%BB%E3%83%A0%E3%83%99%E3%83%B3%E3%83%99', 'mokelembembe', 'モケーレ・ムベンベ', 'モケーレ・ムベンベの説明モケーレ・ムベンベの説明モケーレ・ムベンベの説明モケーレ・ムベンベの説明モケーレ・ムベンベの説明モケーレ・ムベンベの説明モケーレ・ムベンベの説明モケーレ・ムベンベの説明モケーレ・ムベンベの説明モケーレ・ムベンベの説明モケーレ・ムベンベの説明'],
	['%E6%B2%B3%E7%AB%A5', 'kappa', '河童', '河童の説明河童の説明河童の説明河童の説明河童の説明河童の説明河童の説明河童の説明河童の説明河童の説明河童の説明'],
	['%E5%90%B8%E8%A1%80%E9%AC%B', 'vampire', 'ヴァンパイア', 'ヴァンパイアの説明ヴァンパイアの説明ヴァンパイアの説明ヴァンパイアの説明ヴァンパイアの説明ヴァンパイアの説明ヴァンパイアの説明ヴァンパイアの説明ヴァンパイアの説明ヴァンパイアの説明ヴァンパイアの説明'],
	['%E3%83%84%E3%83%81%E3%83%8E%E3%82%B3', 'tsuchinoko', 'ツチノコ', 'ツチノコの説明ツチノコの説明ツチノコの説明ツチノコの説明ツチノコの説明ツチノコの説明ツチノコの説明ツチノコの説明ツチノコの説明ツチノコの説明ツチノコの説明'],
	['%E9%AC%BC', 'oni', '鬼', '鬼の説明鬼の説明鬼の説明鬼の説明鬼の説明鬼の説明鬼の説明鬼の説明鬼の説明鬼の説明鬼の説明'],
	['%E4%B8%80%E3%81%A4%E7%9B%AE%E5%B0%8F%E5%83%A7', 'hitotsumekozo', '一つ目小僧', '一つ目小僧の説明一つ目小僧の説明一つ目小僧の説明一つ目小僧の説明一つ目小僧の説明一つ目小僧の説明一つ目小僧の説明一つ目小僧の説明一つ目小僧の説明一つ目小僧の説明一つ目小僧の説明'],
	['%E3%82%8D%E3%81%8F%E3%82%8D%E9%A6%96', 'rokurokubi', 'ろくろ首', 'ろくろ首の説明ろくろ首の説明ろくろ首の説明ろくろ首の説明ろくろ首の説明ろくろ首の説明ろくろ首の説明ろくろ首の説明ろくろ首の説明ろくろ首の説明ろくろ首の説明'],
	['%E3%82%A4%E3%82%A8%E3%83%86%E3%82%A3', 'yeti', 'イエティ', 'イエティの説明イエティの説明イエティの説明イエティの説明イエティの説明イエティの説明イエティの説明イエティの説明イエティの説明イエティの説明イエティの説明']
];

angular.module('umania')
	.config(function($stateProvider) {
		$stateProvider
			.state('info', {
				controller: 'InfoController',
				templateUrl: 'partials/info.html',
				url: '/info'
			});
	})
	.controller('InfoController', function($scope) {
		var storage = localStorage;
		var rNum = Math.floor(Math.random() * database.length);
		var rComp = Math.floor(Math.random() * 100);
		var rKey = database[rNum][0];
		var rValue = JSON.parse(storage.getItem(rKey));
		var rId = database[rNum][1];
		var rName = database[rNum][2];
		var rText = database[rNum][3];
		console.log(rValue);
		var sumComp;
		if(rValue){
			console.log(rValue[3]);
			console.log(rComp);
			sumComp = rValue[3] + rComp;
			sumComp = sumComp > 100 ? 100 : sumComp;
		}else{
			sumComp = rComp;
		}
		var _rS = sumComp >= 100 ? '' : '_s';
		var encountImage = '<p class="umaImage"><img src="./assets/images/uma_' + rId + _rS + '.png" alt=""></p>';
		$('#encount').append(encountImage);

		setLocalStorage(rKey, rId, rName, rText, rComp);

		function setLocalStorage(key, id, name, text, completion) {

			var value = JSON.parse(storage.getItem(key));

			if(value){
				completion = value[3] + completion;
				completion = completion > 100 ? 100 : completion;
			}

			value = [id, name, text, completion];

			if (key && value) {
				storage.setItem(key, JSON.stringify(value));
			}

			key = '';
			id = '';
			name = '';
			text = '';
			completion = '';
			value = [];
		}

		function success(pos) {
			var crd = pos.coords;

			$('#latitude').text(crd.latitude);
			$('#longitude').text(crd.longitude);
		}

		function error(err) {
			console.warn('ERROR(' + err.code + '): ' + err.message);
		}

		navigator.geolocation.getCurrentPosition(success, error);

	});
