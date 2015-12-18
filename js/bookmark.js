function write_bookmark()
{
    writeToLocal("bookmark.txt", get_url());
}
function read_bookmark()
{
    alert('OK');
}

function writeToLocal(filename, content) {
    // chrome以外は弾く
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('chrome') == -1) {
        alert("This Page is Google Chrome only!");
    }

    function errorCallback(e) {
        alert("Error: " + e.name);
    }

    function fsCallback(fs) {
        fs.root.getFile(filename, {create: true}, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {

                fileWriter.onwriteend = function(e) {
                    alert("Success! : " + fileEntry.fullPath);
                };

                fileWriter.onerror = function(e) {
                    alert("Failed: " + e);
                };

                var output = new Blob([content], {type: "text/plain"});
                fileWriter.write(output);
            }, errorCallback);
        }, errorCallback);
    }
    // クオータを要求する。PERSISTENTでなくTEMPORARYの場合は
    // 直接 webkitRequestFileSystem を呼んでよい
    webkitStorageInfo.requestQuota(PERSISTENT, 1024,
        webkitRequestFileSystem(PERSISTENT, 1024, fsCallback, errorCallback),
    errorCallback);
}

function url_store(moved_url) {
    if (typeof url_store.url === 'undefined') {
        url_store.url = './index.html';
    }
    else
    {
        url_store.url = moved_url;
    }
}

function get_url()
{
    return url_store.url;
}