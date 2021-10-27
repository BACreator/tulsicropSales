$(document).ready(function(){
	$('#search').keyup(function(){
		$('#result').html('');
		var searchField = $('#search').val();
		var expression = new RegExp(searchField, "i");
		$.getJSON('lib/json/data.json',function(data){
			$.each(data, function(key, value){
				if (value.itemName.search(expression) != -1 || value.itemMfrCode.search(expression) != -1) {
					$('#result').append('<li class="list-group-item"> '+value.itemName+' | <span class="text-muted">'+value.itemMfrCode+'</span></li>');
				}
			});
		});
	});
	$('#result').on('click', 'li', function() {
	  	var click_text = $(this).text().split('|');
	  	$('#search').val($.trim(click_text[0]));
	  	$("#result").html('');
	});
});

//// Close the dropdown menu if the user clicks outside of it
$(document).click(function (e) {
        if ($(e.target).closest("#result").length == 0) {
        	//$("#result").hide();
        }
    });

