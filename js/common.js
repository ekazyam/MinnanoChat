jQuery(function($){
	$('#links li a').click(function() {
		var href = $(this).attr('href');

		// index.htmlのobject要素にURLを読み込む
		$('#content').load(href);

		// 遷移したURLを保持
		url_store(href);
		return false;
	});

	var timer = false;
	var WAIT_TIME = 100;
	$(window).resize(function() {
	    if (timer !== false) {
	        clearTimeout(timer);
	    }
	    // リサイズが終わってからCSSを変更する。
	    timer = setTimeout(function() {

	  	// ウインドウサイズのりサイズ
	    window_resize();
	    }, WAIT_TIME);
	});
});

function window_resize()
{
   	// リサイズ後のウインドウサイズ-50pxぐらいがちょうど良い様子。
   	var new_height = $(window).height() - 50;
   	// 新しい高さを設定する。
   	$('.container_chat').height(new_height);
}