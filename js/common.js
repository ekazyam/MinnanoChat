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
	});

	var side = $("#side");
    // #sideのオブジェクトをsideへ
    var main = $("#main");
    // #mainのオブジェクトをmainへ
    var min_move = main.offset().top;
    // #side が動ける最初の地点（main要素のtopの位置）
    var max_move = main.offset().top + main.height() - side.height() - 2*parseInt(side.css("top") );
    // max_move は トップから #side が動ける最終地点までの長さ → #main 要素の内側の高さ内
    // max_move ←（ #mainボックスのトップの位置の値　＋　#mainボックスの高さ　ー　#sideの高さ　ー　サイドのトップ値✕２）
    var margin_bottom = max_move - min_move    ;
    // side要素の一番下にいる時のmargin-top値の計算
     
    // スクロールした時に以下の処理        
    $(window).bind("scroll", function() {
             
        var wst =  $(window).scrollTop();
        // スクロール値が wst に入る
             
        // スクロール値が main 要素の高さ内にいる時以下
        if( wst > min_move && wst < max_move ){
            var margin_top = wst - min_move ;
            // スクロールした値から min_move（#mainのtopの表示位置）を引いたのを margin_top へ
            side.animate({"margin-top": margin_top},{duration:0,queue:false});
            // サイド CSSの margin-top の値を、変数の margin_top にする
                 
        // スクロールした値が min_move（main要素の高さより小さい）以下の場合はCSSのマージントップ値を0にする
        }else if( wst < min_move ){
            side.animate({"margin-top":0},{duration:0,queue:false});
         
        // スクロールした値が max_move （main要素の高さより大きい）以上の場合以下
        }else if( wst > max_move ){
            side.animate({"margin-top":margin_bottom},{duration:0,queue:false});
        }
    });
});

function window_resize()
{
   	// リサイズ後のウインドウサイズ-50pxぐらいがちょうど良い様子。
   	var new_height = $(window).height();
   	// 新しい高さを設定する。
   	$('webview').height(new_height);
   	$('.web_dock').height(new_height);
}

function rewrite_title(select_data)
{
	// htmlのタイトルを更新
	$('title').text(select_data.text());
}