jQuery(function($){
	$('#links li a').click(function() {
		var href = $(this).attr('href');

		// index.htmlのwebview要素にURLを読み込む
		document.getElementById("content").src = href;

		// タイトルを更新
		rewrite_title($(this));

		// 遷移したURLを保持
		url_store(href);

		// 画面リサイズイベントを発火
		$(window).trigger('resize');

		return false;
	});

	$('#do_refresh').click(function() {
		// 現在表示しているURLを読み込む
		document.getElementById("content").src = get_url();

		// 画面リサイズイベントを発火
		$(window).trigger('resize');

		return false;
	});	

	$('#go_home').click(function() {
		// ブックマーク登録したホームURLを読み込む
		read_bookmark();

		// 画面リサイズイベントを発火
		$(window).trigger('resize');

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
			window_resize();
	    }, WAIT_TIME);
	});

});

function window_resize()
{
   	// リサイズ後のウインドウサイズ-50pxぐらいがちょうど良い様子。
   	var new_height = $(window).height() - 50;
   	// 新しい高さを設定する。
   	// $('.container_chat').height(new_height);
   	$('webview').height(1000);
   	alert( $(window).height() );
}

function rewrite_title(select_data)
{
	// htmlのタイトルを更新
	$('title').text('チャット > ' + select_data.text());
}