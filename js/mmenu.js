$(document).ready(function() {
	$("#mm-menu").mmenu();
});

jQuery(function($){
	$('#links li a').click(function() {
		var href = $(this).attr('href');

		// index.htmlのobject要素にURLを読み込む
		$('#content').load(href);

		// 遷移したURLを保持
		url_store(href);
		return false;
	});
});
