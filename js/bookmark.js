function write_bookmark()
{
	writeToLocal("bookmark.txt", get_url());
}
function read_bookmark()
{
	onloadInit();
}

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

function onloadInit() {
	navigator.webkitPersistentStorage.requestQuota(1024*1024*5, function(bytes) {
		 window.webkitRequestFileSystem(window.PERSISTENT, bytes, function(fs) {
		   // ファイル取得
		   fs.root.getFile('bookmark.txt', {create: true}, function(fileEntry) {
				 fileEntry.file(
					function(file) {
						var reader = new FileReader();
						reader.onloadend = function(e) {
							url_bookmark = e.target.result;
							$('#content').load(url_bookmark.replace(/\.html.*$/g, '.html'));
						};
						reader.readAsText(file);
					});
				});
			});
		}
	);
}

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

function get_url()
{
	return url_store.url;
}