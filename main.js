'use strict';

// アプリケーションをコントロールするモジュール
var app = require('app');
// ウィンドウを作成するモジュール
var BrowserWindow = require('browser-window');

// タスクトレイのメニューを構成するモジュール
var Menu = require("menu");

// クラッシュレポート
require('crash-reporter').start();

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
	mainWindow = new BrowserWindow({
		// ウィンドウ作成時のオプション
		"show": true,
		"skip-taskbar": true,
		"icon": (__dirname + '/img/icon.png'),
	});

	// index.html を開く
	mainWindow.loadUrl("file://" + __dirname + "/index.html");

	// タスクトレイに格納
	var Tray = require("tray");
	var nativeImage = require("native-image");

	var trayIcon = new Tray(nativeImage.createFromPath(__dirname + "/img/icon.png"));

	// タスクトレイのツールチップをアプリ名にする。
	trayIcon.setToolTip(app.getName());

	// メニューバーを作成
	create_menubar();

	// イベントハンドラー設定
	trayIcon = set_tray_event_handler(trayIcon)
	set_window_event_handler()

	// タスクトレイ用のイベントハンドラーを設定する。
	function set_tray_event_handler(trayIcon)
	{
		// タスクトレイアイコンをクリックで表示/非表示をトグルする。
		trayIcon.on("clicked", function () {
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
    	    { label: "終了", click: function () { mainWindow.close(); } }
    	]);

    	trayIcon.setContextMenu(contextMenu);

    	trayIcon.setToolTip('みんなのチャット');

		return trayIcon;
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
            e.preventDefault();
            mainWindow.hide();
	    });

		// 閉じるボタン選択時にイベントを最小化として処理する。
	    app.on('before-quit', function (e) {
            e.preventDefault();
            mainWindow.hide();
	    });
	}

	// メニューバー作成。
	function create_menubar()
	{
		mainWindow.setMenu(null);
	}
});
