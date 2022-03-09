const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const productLayout = document.getElementById('product_layout');
const divhide = document.getElementById('viewhide');

// Search states.json and filter it
const  searchStates = async searchText =>{
    const res = await fetch('https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/data.json').then(response =>{
        console.log(searchText,"searchText");
    	//console.log(response);
    	if (!response.ok) {
    		throw Error("Error");
    	}
    	return response.json();
    }).then(data =>{
    	//console.log(data.item);
        let states = data.item;
        console.log(states, "states");
        matchList.style.display = 'block';

        // Get matches to current text input
        let matches = states.filter(state =>{
            const regex = new RegExp(`^${searchText}`, `gi`);
            return state.itemName.match(regex) || state.itemMfrCode.match(regex);
        });

		//let divhide = document.getElementById('viewhide');
		if(searchText.length !== 0){
			divhide.style.display = "none";
		}else{
			divhide.style.display = "flex";
		}

        //Hide all results when input is empty
        if (searchText.length === 0) {
            matches = [];
            matchList.innerHTML = '';
        }

		//Hide if no results are found
        if (searchText !== states) {
            match = [];
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

          <li id="${match.itemMfrCode}">${match.itemName}
          <span style="display: none;">${match.qnty}</span>
          <span style="display: none;"> ${match.ratePerUnit}</span></li>
            `).join('');
        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchStates(search.value));

/*OnClick filtered items*/
matchList.addEventListener('click', function(e){
    var target = e.target;
    while(target && target.parentNode !== matchList){
        target = target.parentNode;
        if (!target) {return;}
    }
    if (e.target.tagName === 'LI') {
        //console.log(states, "states");
        let liId = e.target.id;//Get selected product Id
        let liInnerText = e.target.innerText;//Get selected product name 
        let qunt = e.target.children[0].innerText;//Get selected product quantity
        //console.log(qunt,"qunt");
        let rate = e.target.children[1].innerText;//Get selected product rate
        //console.log(rate,"rate");

        console.log(liId,"liId");
        console.log(liInnerText,"liText");
        //Store values in local storage
        localStorage.setItem('liId',liId);//Store prod ID
        localStorage.setItem('liText',liInnerText);//Store prod name
        localStorage.setItem('spanQunt',qunt);//Store prod quantity
        localStorage.setItem('spanRate',rate);//Store prod rate

        //Insert selected item in input text field
        search.value = liInnerText;

        //Hide search dropdown after click event
        matchList.style.display = 'none';

        /*View product layout*/
        productLayout.style.display = 'block';

        //Retrive product details from local storage
        var selectedId = localStorage.getItem('liId');
        var selectedName = localStorage.getItem('liText');
        var selectedQuant = localStorage.getItem('spanQunt');
        var selectedRate = localStorage.getItem('spanRate');

        console.log(selectedId,"selectedId");
        console.log(selectedName,"selectedName");

        document.getElementById('prod_name').innerHTML = selectedName;//Prod Name
        document.getElementById('prod_id').innerHTML = selectedId;//Prod Id
        document.getElementById('prod_quant').innerHTML = selectedQuant;//Prod Id
        document.getElementById('prod_rate').innerHTML = selectedRate;//Prod Id
    }
});

//Close product layout
const closeModalButton = document.querySelectorAll('[data-close-button]');
closeModalButton.forEach(button =>{
    button.addEventListener('click',() =>{
        productLayout.style.display = 'none';
        divhide.style.display = "flex";
        search.value ='';
    });
});

//Quantity onclick event
function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('number').value = value;
}