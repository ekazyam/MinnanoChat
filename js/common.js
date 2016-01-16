jQuery(function($){
	// チャットログ表示タグ
	var web_page = document.getElementById("content");

	$('#links li a').click(function() {
		var href = $(this).attr('href');

		// index.htmlのwebview要素にURLを読み込む
		document.getElementById("content").src = href;

		// 遷移したURLを保持
		url_store(href);

		// 画面リサイズイベントを発火
		$(window).trigger('resize');

		return false;
	});

	$('#do_refresh').click(function() {
		// 現在表示しているURLを読み込む
		document.getElementById("content").src = web_page.getUrl();

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
	// webviewに対するハンドラを作る
	web_page.addEventListener('did-stop-loading', function(e){
		$('title').text(web_page.getTitle());

		// 画面リサイズイベントを発火
		$(window).trigger('resize');
	});
});

function window_resize()
{
   	var new_height = $(window).height();
   	// 新しい高さを設定する。
   	$('#web_dock').height(new_height - 50);
}

function rewrite_title(select_data)
{
	// htmlのタイトルを更新
	$('title').text(select_data.text());
}