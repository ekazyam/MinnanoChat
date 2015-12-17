$(document).ready(function() {
	$("#my-menu").mmenu();
});

jQuery(function($){
	$('#links li a').click(function() {
		var href = $(this).attr('href');
        $.ajax({
            url: href,
            type: "GET",
            dataType:"html",
            success: function(data)
            {
            	$('#content').html(data);
            	console.log(data);
            },
            error: function(data)
            {
            	console.log(data);
            }
        });
		return false;
	});  
});