const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search states.json and filter it
const  searchStates = async searchText =>{
    const res = await fetch('lib/json/data.json').then(response =>{
    	//console.log(response);
    	if (!response.ok) {
    		throw Error("Error");
    	}
    	return response.json();
    }).then(data =>{
    	//console.log(data.item);
        let states = data.item;
        //console.log(states, "states");


        // Get matches to current text input
        let matches = states.filter(state =>{
            const regex = new RegExp(`^${searchText}`, `gi`);
            return state.itemName.match(regex) || state.itemMfrCode.match(regex);
        });

        //Hide all results when input is empty
        if (searchText.length === 0) {
            matches = [];
            matchList.innerHTML = '';
        }

        outputHtml(matches);

    }).catch(error =>{
    	console.log(error);
    });  

};

//Show results in HTML
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.itemName} (${match.itemMfrCode}) <span 
                class="text-primary">${match.capital}</span></h4>
            </div>
            `).join('');
        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchStates(search.value));

