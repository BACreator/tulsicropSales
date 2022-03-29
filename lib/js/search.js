const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const productLayout = document.getElementById('product_layout');
const divhide = document.getElementById('viewhide');

const cartContainer = document.querySelector('.cart_container');
const cartCountInfo = document.getElementById('cart_count_info');
const cartTotalValue = document.getElementById('cart_total_value');
//const cartList = document.querySelector('.cart_list');

let cartItemId = 1;

//const url = 'https://github.com/BACreator/tulsicorp/blob/main/lib/json/data.json';
/*const url = 'https://tulsicorp.com/data.json';
const hearder = new Headers();
    hearder.setHeader
const request = new Request(url,{
    origin:'*',
    method: 'GET',
    mode: 'no-cors',
});*/

// Search states.json and filter it https://tulsicorp.com/data.json
const  searchStates = async searchText =>{
    const res = await fetch('https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/data.json').then(response =>{
       // console.log(searchText,"searchText");
        //response.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,POST,PUT,DELETE');
    	//console.log(response);
    	if (!response.ok) {
    		throw Error("Error");
    	}
    	return response.json();
    }).then(data =>{
    	//console.log(data.item);
        let states = data.item;
        //console.log(states, "states");
        matchList.style.display = 'block';

        // Get matches to current text input
        let matches = states.filter(state =>{
            const regex = new RegExp(`^${searchText}`, `gi`);
            return state.itemName.match(regex) || state.itemMfrCode.match(regex);
        });

		//let divhide = document.getElementById('viewhide');
		if(searchText.length !== 0){
			divhide.style.display = "none";
            productLayout.style.display = 'none';
		}else{
			divhide.style.display = "flex";
            productLayout.style.display = 'block';
		}

        //Hide all results when input is empty
        if (searchText.length === 0) {
            matches = [];
            matchList.innerHTML = '';
            matchList.style.display = 'none';
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

          <li id="${match.itemMfrCode}">${match.itemName} : ${match.unitPk}
          <span style="display: none;">${match.qnty}</span>
          <span style="display: none;"> ${match.ratePerUnit}</span>
          <span style="display: none;"> ${match.unitPk}</span>
          <span style="display: none;"> ${match.schemeRange}</span>
          <span style="display: none;"> ${match.schemeOffeQty}</span></li>
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
        let unitPk = e.target.children[2].innerText;//Get selected product rate
        let schemeRange= e.target.children[3].innerText;//Get selected product rate
        let schemeOffeQty = e.target.children[4].innerText;//Get selected product rate
        //console.log(rate,"rate");

        console.log(liId,"liId");
        console.log(liInnerText,"liText");
        //Store values in local storage
        localStorage.setItem('liId',liId);//Store prod ID
        localStorage.setItem('liText',liInnerText);//Store prod name
        localStorage.setItem('spanQunt',qunt);//Store prod quantity
        localStorage.setItem('spanRate',rate);//Store prod rate
        localStorage.setItem('spanUnitpk',unitPk);
        localStorage.setItem('spanschemeRange',schemeRange);
        localStorage.setItem('spanschemeOffeQty',schemeOffeQty);

        //Insert selected item in input text field
        search.value = liInnerText;

        //Hide search dropdown after click event
        matchList.style.display = 'none';

        /*View product layout*/
        productLayout.style.display = 'block';

        //Retrive product details from local storage
        var selectedId = localStorage.getItem('liId');//M.F.R.
        var selectedName = localStorage.getItem('liText');//Name
        var selectedQuant = localStorage.getItem('spanQunt');
        var selectedRate = localStorage.getItem('spanRate');//M.R.P
        var selectedUnitpk = localStorage.getItem('spanUnitpk');
        var selectedschemerange = localStorage.getItem('spanschemeRange');
        var selectedschemeoffqty = localStorage.getItem('spanschemeOffeQty');

        console.log(selectedId,"selectedId");
        console.log(selectedName,"selectedName");

        document.getElementById('prod_name').innerHTML = selectedName;//Prod Name
        document.getElementById('prod_id').innerHTML = selectedId;//Prod Id:M.F.R.
        document.getElementById('prod_quant').innerHTML = selectedQuant;//Prod quantity
        document.getElementById('prod_rate').innerHTML = selectedRate;//Prod rate:M.R.P
        document.getElementById('prod_unitPk').innerHTML = selectedUnitpk;//Prod unitPk
        document.getElementById('prod_schemeRange').innerHTML = selectedschemerange;//Prod range
        document.getElementById('prod_schemeOffQty').innerHTML = selectedschemeoffqty;//Prod offqty
    }
    //Get selected products info
    document.getElementById('add_cart').onclick = function(product){
        let productInfo = {
            proId : selectedId,
            proName : selectedName,
            proQuant : selectedQuant,
            proRate : selectedRate,
            proUnitPk : selectedUnitpk
        }
        cartItemId++;
        console.log(productInfo,"productInfo");
        //addToCartList(productInfo);
        saveProductInStorage(productInfo);
        
    }
    /*function addToCartList(product){
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart_item');
        cartItem.setAttribute('data_id',`${product.proId}`);
        cartItem.innerHTML = `<div class="cart_item_info">
                    <h3 class="cart_item_name">${product.proName}</h3>
                    <span class="cart_item_category">Chair</span>
                    <span class="cart_item_price">${product.proQuant}</span>
                    <span class="cart_item_quantity">${product.proUnitPk}</span>
                </div>
            <button type="button" class="cart_item_del_btn">
                <i class="bi-trash"></i>
            </button>`;
        //cartItem.innerHTML = `<div class="cart_item_info">
        //<h3 class="cart_item_name">Hello</h3></div>`
        cartList.appendChild(cartItem);
    }*/

    //Save selected product in localstorage
    function saveProductInStorage(item){
        let products = getProductFromStorage();
        products.push(item);
        localStorage.setItem('products', JSON.stringify(products));
        addedCart();
    }

    //Get all the selected product info from local storage
    function getProductFromStorage(){
        return localStorage.getItem('products')? JSON.parse
        (localStorage.getItem('products')) : [];        
        console.log(products);
    }
    //Added to cart
    function addedCart() {
      var x = document.getElementById("addedCart");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    //Load carts products
    /*function loadCart(){
        let products = getProductFromStorage();
        if (products.length < 1) {
            cartItemId = 1;//If there is no any product in the local storage
        }else{
            cartItemId = products[products.length - 1].id;
            cartItemId++;
            //else get the id of the last product and increase it by 1
        }
        console.log(cartItemId,"cartItemId");
    }*/
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

//Quantity onclick event increaseValue
function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}
//Quantity onclick event decreaseValue
function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('number').value = value;
}
// Header cart icon click event
/*eventListeners();
function eventListeners(){
    //loadCart();
    //View/hide cart
    document.getElementById('cart_btn').addEventListener('click',() => {
        //location.href="../cart.html";
       // alert("I'm cart button");
       //cartContainer.classList.toggle('show-cart_container');
        console.log("cart button clicked");
        getProductFromStorage();
    })
}

function eventListeners(){
    window.addEventListener('DOMContentLoaded',()=>{loadCart();});
}*/
