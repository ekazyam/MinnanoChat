$(document).ready(function() {
	$("#mm-menu").mmenu();
});

jQuery(function($){
	$('#links li a').click(function() {
		var href = $(this).attr('href');
		$('#content').load(href);
		return false;
	});  
});