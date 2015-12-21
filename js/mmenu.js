$(document).ready(function(e) {
	$("#mm-menu").mmenu({
		classes: "my-custom-width",
		navbar: {
			title:'',
			titleLink:"none"
		}
	});

	// ブックマークが存在した場合にロード。
	read_bookmark();
});
