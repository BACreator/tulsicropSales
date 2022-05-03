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
            productLayout.style.display = 'none';
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
          <span style="display: none;">${match.schemeHalfValuePerc}</span>
          <span style="display: none;"> ${match.ratePerUnit}</span>
          <span style="display: none;"> ${match.unitPk}</span>
          <span style="display: none;"> ${match.schemeRange}</span>
          <span style="display: none;"> ${match.schemeOffeQty}</span>
          <span style="display: none;"> ${match.qnty}</span></li>
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
        let schemeHalfValue = e.target.children[0].innerText;//Get selected product schemeHalfValuePerc
        console.log(schemeHalfValue,"schemeHalfValue");
        let rate = e.target.children[1].innerText;//Get selected product rate
        let unitPk = e.target.children[2].innerText;//Get selected product unitpk
        let schemeRange= e.target.children[3].innerText;//Get selected product schemeRange
        let schemeOffeQty = e.target.children[4].innerText;//Get selected product schemeOffeQty
        let totalqty = e.target.children[5].innerText;//Get selected product totalqty
        //console.log(rate,"rate");
        console.log(liId,"liId");
        console.log(liInnerText,"liText");
        //Store values in local storage
        localStorage.setItem('liId',liId);//Store prod ID
        localStorage.setItem('liText',liInnerText);//Store prod name
        localStorage.setItem('spanschemeHalfValuePerc',schemeHalfValue);//Store prod quantity
        localStorage.setItem('spanRate',rate);//Store prod rate
        localStorage.setItem('spanUnitpk',unitPk);
        localStorage.setItem('spanschemeRange',schemeRange);
        localStorage.setItem('spanschemeOffeQty',schemeOffeQty);
        localStorage.setItem('spantotalqty',totalqty);

        //Insert selected item in input text field
        search.value = liInnerText;

        //Hide search dropdown after click event
        matchList.style.display = 'none';

        /*View product layout*/
        productLayout.style.display = 'block';

        //Retrive product details from local storage
        var selectedId = localStorage.getItem('liId');//M.F.R.
        var selectedName = localStorage.getItem('liText');//Name
        var selectedschemeHalfValue = localStorage.getItem('spanschemeHalfValuePerc');
        var selectedRate = localStorage.getItem('spanRate');//M.R.P
        var selectedUnitpk = localStorage.getItem('spanUnitpk');
        var selectedschemerange = localStorage.getItem('spanschemeRange');
        var selectedschemeoffqty = localStorage.getItem('spanschemeOffeQty');
        var selectedtotalqty = localStorage.getItem('spantotalqty');

        console.log(selectedId,"selectedId");
        console.log(selectedName,"selectedName");

        document.getElementById('prod_name').innerHTML = selectedName;//Prod Name
        document.getElementById('prod_id').innerHTML = selectedId;//Prod Id:M.F.R.
        document.getElementById('prod_schemeValue').innerHTML = selectedschemeHalfValue;//Prod quantity
        document.getElementById('prod_rate').innerHTML = selectedRate;//Prod rate:M.R.P
        document.getElementById('prod_unitPk').innerHTML = selectedUnitpk;//Prod unitPk
        document.getElementById('prod_schemeRange').innerHTML = selectedschemerange;//Prod range
        document.getElementById('prod_schemeOffQty').innerHTML = selectedschemeoffqty;//Prod offqty
        document.getElementById('prod_quant').innerHTML = selectedtotalqty;//Prod offqty
    }
    //Get selected products info
    document.getElementById('add_cart').onclick = function(product){

        //Cart add quantity value
        let cartQuantityValue = document.getElementById('number').value;
        console.log("cartValue",cartQuantityValue);
        localStorage.setItem('cartQuantityValue',cartQuantityValue);
        //document.getElementById('prod_quant').innerHTML = cartQuantityValue;//Prod quantity

        let productInfo = {
            proId : selectedId,
            proName : selectedName,
            proQuant : cartQuantityValue,
            proRate : selectedRate,
            proUnitPk : selectedUnitpk,
            proschemeValue : selectedschemeHalfValue
        }
        cartItemId++;
        console.log(productInfo,"productInfo");
        console.log(productInfo.proId,"productInfo.proId");
        //addToCartList(productInfo);
        saveProductInStorage(productInfo);
        }

       //Save selected product in localstorage
          /*function saveProductInStorage(item){
              let products = getProductFromStorage();
              console.log(selectedId,"selectedId");
              console.log(products,"products");
              for (var i = 0; i < products.length; i++) {
                let productId = products[i].proId;
                console.log(productId,"productId");

              }
              //console.log(productId,"productId");
              products.push(item);
              localStorage.setItem('products', JSON.stringify(products));
              addedCart();
              //console.log(JSON.parse(localStorage.getItem('products','proId')),"products.proId");
              /*if ((selectedId) === (JSON.parse(localStorage.getItem('products','proId')))) {
                  console.log("Item exists");
              }else{
                  console.log("No item");            
                  products.push(item);
                  localStorage.setItem('products', JSON.stringify(products));
                  addedCart();
              }
          }*/

          function saveProductInStorage(item){
              let products = getProductFromStorage();
              console.log(selectedId,"selectedId");
              let localstorageJson = JSON.parse(localStorage.getItem('products'));

             /* //console.log(localstorageJson[i].proId);
              for (var i = 0; i < localstorageJson.length; i++) {
              if (selectedId !== (localstorageJson[i].proId)) {
                  console.log("No item");
                  pushlocalstorage();
                  addedCart();
                  
                  }else{
                      console.log("Item exists");
                      console.log(selectedId,"selectedId");
                      console.log(localstorageJson[i].proId,"localstorageJson[i].proId");
                      duplicateItems();
                      }
              }*/

             // console.log(localstorageJson[i].proId,"localstorageJson[i].proId");
              if (localStorage.getItem('products') !== null) {
                  console.log(`products address exists`);
                  for (var i = 0; i < localstorageJson.length; i++) {
                    //selectedId == (localstorageJson[i].proId;
                       // duplicateItems();
                      //console.log(localstorageJson[i].proId);
                     /* if (selectedId == (localstorageJson[i].proId)) {
                              console.log("Item exists");
                              console.log(selectedId,"selectedId");
                              console.log(localstorageJson[i].proId,"localstorageJson[i].proId");
                              duplicateItems();
                          
                          }/*else{
                          console.log("No item");
                          pushlocalstorage();
                          addedCart();
                              } */
                  }
                //console.log("No item");
                //pushlocalstorage();
                //addedCart();
              }else {
                  console.log(`localstorage is cleared`);
                  pushlocalstorage();
                  addedCart();
              }
              /*for (var i = 0; i < localstorageJson.length; i++) {
                  //console.log(localstorageJson[i].proId);
                  if ((selectedId) === (localstorageJson[i].proId)) {
                                  console.log("Item exists");
                      }else{
                              console.log("No item"); 
                              products.push(item);
                              localStorage.setItem('products', JSON.stringify(products));
                              addedCart();
                          } 
              }*/
              //let jsonValue = {localstorageJson}    
             // console.log(JSON.parse(localStorage.getItem('products')));
              //var index = localStorage.indexOf("0001109"); // 1        
              //console.log(jsonValue,"jsonValue");
              //console.log(localstorageJson[8].proId);
              //console.log(index,"index");
             /* if ((selectedId) === (localstorageJson.proId)) {
                  console.log("Item exists");
              }else{
                  console.log("No item");            
                  products.push(item);
                  localStorage.setItem('products', JSON.stringify(products));
                  addedCart();
              }*/

                          function pushlocalstorage(){
                              products.push(item);
                              localStorage.setItem('products', JSON.stringify(products));
                          }
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
    /*function saveProductInStorage(item){
        let products = getProductFromStorage();
        console.log(selectedId,"selectedId");
        console.log(productInfo,"productInfo");
        console.log(JSON.parse(localStorage.getItem('products','proId')),"products.proId");
        if ((selectedId) === (JSON.parse(localStorage.getItem('products','proId')))) {
            console.log("Item exists");
        }else{
            console.log("No item");            
            products.push(item);
            localStorage.setItem('products', JSON.stringify(products));
            addedCart();
        }
    }*/

    //Get all the selected product info from local storage
    function getProductFromStorage(){
        return localStorage.getItem('products')? JSON.parse
        (localStorage.getItem('products')) : [];        
        console.log(products);
    }
    //Add to cart toast message
    function addedCart() {
      var x = document.getElementById("addedCart");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      document.getElementById('number').value = "";
    }

    //Add to cart toast message
    function duplicateItems() {
      var x = document.getElementById("duplicate");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      document.getElementById('number').value = "";
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
//Login click
let continuelogin = document.getElementById("logincontinue");
continuelogin.addEventListener("click", (e)=>{
    e.preventDefault();
    //generates random id;
    let guid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4();
    }
    let refnum = guid();
     console.log(refnum,"refnum");
    //Get UserName and Password
    let username = document.getElementById('loginusername').value;
    let password = document.getElementById('loginpassword').value;
    console.log(username,"username");
    console.log(password,"password");
    const clientdata = 
                {
                    "clientId":"1234",
                    "systemId":"2010",
                    "orderReferenceNo":"",
                    "password": "", 
                    "userName": "",
                    "userType": "customer",
                }
                //Inserting UserName and Password in json object
                console.log(clientdata.userName,"clientdata");
                clientdata.userName = username;
                clientdata.password = password;
                clientdata.orderReferenceNo = refnum;
                console.log(clientdata.userName,"clientdata");
    const customerurl = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/custloginresponse.json";
    //Fetch customerurl
    fetch(customerurl, /*{
        method: 'POST',
        headers:    {
                'Content-Type': 'application/json',
               },
                body: JSON.stringify(data),
            }*/console.log(clientdata,"data")).then((response)=>{
                return response.json();
                }).then((data)=>{
                    console.log(data,"data");
                    if (data.error) {
                    alert("Error password or username");
                    }else{
                    //window.open("target.html")
                    divhide.style.display = "none";
                    }
                    }).catch((err)=>{
                    console.log(err);});
    });


/*/User login
const form = {
    username : document.querySelector("#loginusername"),
    username : document.querySelector("#loginpassword"),
    submit : document.querySelector("#logincontinue"),
};
let button = form.submit.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Login button is clicked");
    //const login = "https://www.tulsicorp.com/mobile-order-entry-service/customerlogin";
    const login = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/custloginresponse.json";
    //let response;
    fetch(login,{
        method: "POST",
        //mode:'no-cors',
        hearders: {
            'Authorization': 'Basic '+btoa('tulsi' + ":" + 'FdBNaYWfjpWN9eYghMpbRA=='),
            'Content-Type': 'application/json'
            /*'Access-Control-Allow-Origin': '*'
            'Access-Control-Allow-Methods':'GET,POST,PUT,PATCH,DELETE',
            'Access-Contorl-Allow-Methods':'Content-Type',
            'Access-Contorl-Allow-Methods':'Authorization'
        },
        credentials: 'include',
        method:'POST',  
        body: JSON.stringify(
          {
          "clientId":"1234",
          "systemId":"2010",
          "orderReferenceNo":42344345,//generate
          "password": "2748",//dy  
            "userName": "2748",//dy
            "userType": "customer"
          })
    }).then((response)=>
    //response.setHeader('Acces-Control-Allow-Origin','*'),
    //response.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE'),
    //response.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization'),
    response.json())
    .then((data)=>{
        console.log(data);
        if (data.error) {
            alert("Error password or username");
        }else{
            //window.open("target.html")
            alert("Login successful");
        }
    }).catch((err)=>{
        console.log(err);
    });
});*/
