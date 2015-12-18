'use strict';

// アプリケーションをコントロールするモジュール
var app = require('app');
// ウィンドウを作成するモジュール
var BrowserWindow = require('browser-window');

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
		"resizable": false,
		"show": true,
		"skip-taskbar": true,
		"icon": (__dirname + '/img/icon.png'),
		"web-prefeences": {
			"web-security": false,
			"allowDisplayingInsecureContent": true,
			"allowRunningInsecureContent":true 
		}
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
		return trayIcon;
	}

	// ウインドウ用のイベントハンドラーを設定する。
	function set_window_event_handler()
	{
		// 閉じた後のイベント時にリソースを解放
		mainWindow.on('closed', function() {
			mainWindow = null;
		});		
	}

	// メニューバー作成。
	function create_menubar()
	{
		mainWindow.setMenu(null);
	}
});