$(document).ready(function(e) {
	$("#mm-menu").mmenu({
		classes: "my-custom-width"
	});

	// ブックマークが存在した場合にロード。
	read_bookmark();
});
