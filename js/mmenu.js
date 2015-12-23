$(document).ready(function(e) {
	$("#mm-menu").mmenu({
		classes: "my-custom-width",
		extensions: [
			"pageshadow",
			"border-full"
		],
		navbar: {
			add:false,
		}
	});

	// ブックマークが存在した場合にロード。
	read_bookmark();
});
