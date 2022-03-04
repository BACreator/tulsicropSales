const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search states.json and filter it
const  searchStates = async searchText =>{
    const res = await fetch('lib/json/data.json').then(response =>{
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


        // Get matches to current text input
        let matches = states.filter(state =>{
            const regex = new RegExp(`^${searchText}`, `gi`);
            return state.itemName.match(regex) || state.itemMfrCode.match(regex);
        });

		let divhide = document.getElementById('viewhide');
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


//On clcik search result function
/*function getproduct(){
    var items = document.querySelectorAll("#match-list li");
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function(){
            document.getElementById("search").value = this.innerHTML;
            //window.open('pages/product.html', 'Product Details', 'width=800, height=500');
            const select_name = this.innerHTML;
            //location.href = "pages/product.html";
            const product_name = document.getElementById("prod_name");

            console.log(select_name,"select_name");

            //product_name.appendChild(select_name);
           product_name.innerHTML += select_name;
           /*if(document.getElementById("prod_name") != null){
               select_name =document.getElementById("prod_name").innerHTML;
           }

            console.log(product_name,"product_name");
            //
        };
    }
    console.log(items,"text");
}
*/

///

//dist/tulsicorp

matchList.addEventListener('click', function(e){
    var target = e.target;
    while(target && target.parentNode !== matchList){
        target = target.parentNode;
        if (!target) {return;}
    }
    if (e.target.tagName === 'LI') {
        //console.log(states, "states");
        let liId = e.target.id;
        let liInnerText = e.target.innerText;
        let qunt = e.target.children[0].innerText;
        //console.log(qunt,"qunt");
        let rate = e.target.children[1].innerText;
        //console.log(rate,"rate");

        console.log(liId,"liId");
        console.log(liInnerText,"liText");
        //store values in local storage
        localStorage.setItem('liId',liId);//prod ID
        localStorage.setItem('liText',liInnerText);//prod name
        localStorage.setItem('spanQunt',qunt);//prod quantity
        localStorage.setItem('spanRate',rate);//prod rate


        //Navigate to product page
        window.location.href = "pages/product.html";
        //Set value to html element
        //document.getElementById('prod_name').textContent = "Hello World";

        //productName.textContent = "liInnerText";
    }
});