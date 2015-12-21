$(document).ready(function(e) {
	$("#mm-menu").mmenu({
		classes: "my-custom-width",
		navbar: {
			add:false,
		}
	});

	// ブックマークが存在した場合にロード。
	read_bookmark();
});
