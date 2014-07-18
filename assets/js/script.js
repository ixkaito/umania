$(function(){

	setTimeout(function(){
		$('#start').fadeOut(1000, function() {
			location.href='home.html';
		});
	}, 1000);

	// loading
	$loading = $('#loading');
	$(window).on('load', function(){
		setTimeout(function(){
			$loading.fadeOut('normal', function() {
				// do something awesome here
			});
		}, 500);
	});

	// has new info
	var $hasNew		= $('#nav .hasNew'),
		$infoNum	= $hasNew.data('info-num');
	$hasNew.each(function(){
		$(this).find('[class^="icon-"], [class*=" icon-"]').append('<i class="infoNum">' + $infoNum + '</i>');
	});

});