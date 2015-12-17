'use strict';

// アプリケーションをコントロールするモジュール
var app = require('app');
// ウィンドウを作成するモジュール
const BrowserWindow = require('electron').BrowserWindow;

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
	});

	// index.html を開く
	mainWindow.loadUrl("file://" + __dirname + "/index.html");

	// タスクトレイに格納
	var Menu = require("menu");
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
		var menu = Menu.buildFromTemplate([
		{
			label: '部屋一覧',
			submenu: [
				{label: 'パソコンの部屋',click: select_room},
			]
			},
		]);
		mainWindow.setMenu(menu);
	}

	//部屋移動
	function select_room()
	{
		mainWindow.loadURL('http://chat.firebird.jp/pc/index.html');
	}
});