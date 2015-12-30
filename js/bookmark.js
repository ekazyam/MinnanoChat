// ブックマークを登録する。
function write_bookmark()
{
	writeToLocal("bookmark.txt", get_url());
}

// ブックマークを読みだし移動する。
function read_bookmark()
{
	onloadInit();
}

// ブックマークのファイル出力。
function writeToLocal(filename, content) {

	function errorCallback(e) {
		alert("Error: " + e.name);
	}

	function fsCallback(fs) {
		fs.root.getFile(filename, {create: true}, function(fileEntry) {
			fileEntry.createWriter(function(fileWriter) {

				fileWriter.onwriteend = function(e) {
					alertify.success("いつもの部屋に登録しました。");
				};

				fileWriter.onerror = function(e) {
					console.log("File Write Error:" + e);
				};

				var output = new Blob([content], {type: "text/plain"});
				fileWriter.write(output);
			}, errorCallback);
		}, errorCallback);
	}

	webkitStorageInfo.requestQuota(PERSISTENT, 1024,
		webkitRequestFileSystem(PERSISTENT, 1024, fsCallback, errorCallback),
	errorCallback);
}

// ブックマークのファイル読み出し。
function onloadInit() {
	navigator.webkitPersistentStorage.requestQuota(1024*1024*5, function(bytes) {
		window.webkitRequestFileSystem(window.PERSISTENT, bytes, function(fs) {
		   // ファイル取得
		   fs.root.getFile('bookmark.txt', {create: true}, function(fileEntry) {
				fileEntry.file(
					function(file) {
						var reader = new FileReader();
						reader.onloadend = function(e) {
							var url_bookmark = e.target.result.replace(/\.html.*$/g, '.html');

							// ブックマークの未登録チェック
							if(url_bookmark.length == 0)return;

							$('#content').load(url_bookmark);
                            url_store(url_bookmark);
						};
						reader.readAsText(file);
					});
				});
			});
		}
	);
}

// 画面遷移時のURLをstaticとして保持する。
function url_store(moved_url) {
	if (typeof url_store.url === 'undefined') {
		// トップページをデフォルトで追加する。
		url_store.url = './index.html';
	}
	else
	{
		// 遷移時にurlを保存する。
		url_store.url = moved_url;
	}
}

// 画面遷移時に保持したURLを取得するgetter関数。
function get_url()
{
	return url_store.url;
}