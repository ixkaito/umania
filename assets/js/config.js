angular.module('umania')
	.value('notificationLimit', 5)
	.value('sparqlEndpoint', 'http://lodcu.cs.chubu.ac.jp/SparqlEPCU/api/umania')
	// .value('sparqlEndpoint', 'http://db.lodosaka.jp/sparql?default-graph-uri=http;//lodosaka/firefoxos/UMA')
	.value('alarmInterval', 60000);
