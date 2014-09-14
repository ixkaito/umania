
//
// 現在時刻をもとに、「朝／昼／夜」のいずれかを返す
function getCurrentTimeZone(){
	var date = new Date();
	var month = date.getMonth();
	var hour = date.getHours();

	var morningTT = 6;
	var eveningTT = 12;
	var nightTT = 18;

	if (5 <= month && month <= 7){
		// 6-8月は夏として昼を長くする
		morningTT -= 1;
		nightTT += 1;
	}

	if (month >= 11 || 1 >= month){
		// 12-2月は冬として夜を長くする
		morningTT += 1;
		nightTT -= 1;
	}


	if (morningTT <= hour && hour < eveningTT){
		return '朝';
	}

	if (eveningTT <= hour && hour < nightTT){
		return '昼';
	}

	return '夜';

}

function getCurrentWeatherFromWeatherDesc(wd){
	wd = wd.toLowerCase();

	if (wd.indexOf('sunny') >= 0 || wd.indexOf('clear') >= 0){
		return '晴';
	}

	if (wd.indexOf('cloud') >= 0){
		return '曇';
	}

	return '雨';
}