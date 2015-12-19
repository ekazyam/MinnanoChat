$(document).ready(function(e) {
	$("#mm-menu").mmenu({
		classes: "my-custom-width"
	});

	// ブックマークが存在した場合にロード。
	read_bookmark();
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
