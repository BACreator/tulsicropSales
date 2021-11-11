/*$(document).ready(function(){
	$('#search').keyup(function(){
		$('#result').html('');
		var searchField = $('#search').val();
		var expression = new RegExp(searchField, "i");
		$.getJSON('lib/json/data.json',function(data){
			console.log(data,"data");
			$.each(data, function(key, value){
				if (value.clientId.search(expression) != -1 || value.systemId.search(expression) != -1) {
					$('#result').append('<li class="list-group-item"> '+value.clientId+' | <span class="text-muted">'+value.systemId+'</span></li>');
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

*/

/*const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event)=>{
	console.log(event,"event");
});*/



/*function fetchData(){
	fetch("https://reqres.in/api/users").then(response =>{
		console.log(response);
		if (!response.ok) {
			throw Error("Error");
		}
		return response.json();
	}).then(data =>{
		console.log(data.data);
	}).catch(error =>{
		console.log(error);
	});
}

fetchData();*/
/*

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search states.json and filter it
const  searchStates = async searchText =>{
    const res = await fetch('lib/json/data.json');
    const states = await res.json();

    // Get matches to current text input
    let matches = states.filter(state =>{
        const regex = new RegExp(`^${searchText}`, `gi`);
        return state.name.match(regex) || state.abbr.match(regex);
    });

    //Hide all results when input is empty
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
};

//Show results in HTML
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name} (${match.abbr}) <span 
                class="text-primary">${match.capital}</span></h4>
            </div>
            `).join('');
        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchStates(search.value))*/
/*async function myFetch() {
  let response = await fetch('https://reqres.in/api/users');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.blob();

}

myFetch().then((blob) => {
  console.log(blob);
}).catch(e => console.log(e)); */

const searchmed = () =>{
	const matchList = document.getElementById('match-list');
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:8000/lib/json/data.json", false); xhr.send();
	var data= JSON.parse(xhr.responseText);
	console.log(data,"data");
	console.log(data.item,"data json");

	let med = data.item;
	console.log(med,"med");
	//const med = 'item';
	//console.log(med,"med")
	//console.log(data[med]);

	let filter = document.getElementById('search').value;
	/*med.filter
	console.log(filter);*/

	let matches = med.filter(state =>{
        const regex = new RegExp(`^${filter}`, `gi`);

        console.log(regex, "regex");
        console.log(filter == state.itemName);
        if (filter == state.itemName.toLowerCase()) {
        	let elemhed = document.createElement('h4');
        	elemhed.innerHTML = state.itemName;
        	matchList.appendChild(elemhed); 
        }
        return state.itemName.match(regex) || state.itemMfrCode.match(regex);
    });

       	

}

