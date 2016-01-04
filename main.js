'use strict';

// アプリケーションをコントロールするモジュール
var app = require('app');
// ウィンドウを作成するモジュール
var BrowserWindow = require('browser-window');

// タスクトレイのメニューを構成するモジュール
var Menu = require("menu");

// 意図的なクローズを判定するフラグ
var close_flag = false;

// クラッシュレポート
require('crash-reporter').start();

// コンフィグ書き出し用モジュール
var fs = require('fs');

// メインウィンドウはGCされないようにグローバル宣言
var mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

// Electronの初期化完了後に実行
app.on("ready", function() {


	// 画面サイズを取得する。
	const Screen = require('screen')
	const size = Screen.getPrimaryDisplay().size

	// 保存した画面サイズ/ポジションを取得する。
	var window_info;
	try
	{
	    window_info = JSON.parse(fs.readFileSync('mincha.conf', 'utf8'));
	}
	catch(e)
	{
	    window_info = JSON.parse('{"width":700,"height":512}');
	}
	mainWindow = new BrowserWindow({
		// 画面の右下(タスクバー欄)をデフォルト表示欄として固定する。
		"x":size["width"] - window_info["width"],
		"y":size["height"] - window_info["height"],
		"width":window_info["width"],
		"height":window_info["height"],
		"skip-taskbar": true,
		"icon": (__dirname + '/img/icon.png'),
		"web-prefeences": {
			"web-security": false,
			"allowDisplayingInsecureContent": true,
			"allowRunningInsecureContent":true,
		},
	});

    // 最小化で起動する。
    mainWindow.minimize();
    
	// index.html を開く
	mainWindow.loadUrl("file://" + __dirname + "/index.html");

	// タスクトレイに格納
	var Tray = require("tray");
	var nativeImage = require("native-image");

	var tray = new Tray(nativeImage.createFromPath(__dirname + "/img/icon.png"));

	// タスクトレイのツールチップをアプリ名にする。
	tray.setToolTip(app.getName());

	// メニューバーを作成
	create_menubar();

	// イベントハンドラー設定
	tray = set_tray_event_handler(tray)
	set_window_event_handler()

	tray.displayBalloon({
        title: "みんなのチャット",
        content: "起動しました。"
    });


	// タスクトレイ用のイベントハンドラーを設定する。
	function set_tray_event_handler(tray)
	{
		// タスクトレイアイコンをクリックで表示/非表示をトグルする。
		tray.on("clicked", function () {
			if(mainWindow.isVisible())
			{
				mainWindow.hide();
			}
			else
			{
				// 表示しつつ、フォーカスを移す。
				mainWindow.show();
				mainWindow.focus();
			}
		});
		// タスクトレイのメニューを定義
		var contextMenu = Menu.buildFromTemplate([
    	{
    		label: "終了", click: function ()
    	    { 
    	    	close_flag = true;
    	    	mainWindow.close();
    	 	}
    	}]);

    	tray.setContextMenu(contextMenu);

    	tray.setToolTip('みんなのチャット');

		return tray;
	}

	// ウインドウ用のイベントハンドラーを設定する。
	function set_window_event_handler()
	{
		// 閉じた後のイベント時にリソースを解放
		mainWindow.on('closed', function() {
			mainWindow = null;
		});

		// 閉じるボタン選択時にイベントを最小化として処理する。
	    mainWindow.on('close', function(e){
	    	if(close_flag)
	    	{
	    		// 閉じる直前のサイズと座標を保持する。
	    		fs.writeFileSync('mincha.conf', JSON.stringify(mainWindow.getBounds()));
	    		// タスクトレイから終了時にアプリケーションを終了する。
	    		mainWindow.destroy();
	    		mainWindow = null;
	    	}
	    	else
	    	{
	    		// ウインドウのバツを選択時はタスクトレイに最小化する。
	            e.preventDefault();
	            mainWindow.minimize();
	    	}
	    });

		// 閉じるボタン選択時にイベントを最小化として処理する。
	    app.on('before-quit', function (e) {
            e.preventDefault();
            mainWindow.minimize();
	    });
	}

	// メニューバー作成。
	function create_menubar()
	{
		mainWindow.setMenu(null);
	}
});
