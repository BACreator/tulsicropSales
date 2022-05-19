const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const productLayout = document.getElementById('product_layout');
//const divhide = document.getElementById('viewhide');
const carod = document.getElementById('carouselExampleControls');

const cartContainer = document.querySelector('.cart_container');
const cartCountInfo = document.getElementById('cart_count_info');
const cartTotalValue = document.getElementById('cart_total_value');


let logoutbutton = document.getElementById("logoutuser");
let nvalogbutton = document.getElementById("loginNav");
let logouttext = document.getElementById("navlogout");

let cartItemId = 1;

// Search states.json and filter it https://tulsicorp.com/data.json
const  searchStates = async searchText =>{
    const res = await fetch('https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/data.json').then(response =>{
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
			//divhide.style.display = "none";
            productLayout.style.display = 'none';
            carod.style.display = 'none';
		}else{
			//divhide.style.display = "flex";
          carod.style.display = 'block';
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
        var prodFree = (selectedschemeoffqty * cartQuantityValue);
        console.log(prodFree,"prodFree");
        var freeQunt = (prodFree)/(selectedschemerange);
        var selectedFreeQunt = freeQunt.toFixed(2);
        console.log("selectedFreeQunt",selectedFreeQunt);
        //Display FreeQunt in product page
        document.getElementById("prod_freeQty").innerHTML = selectedFreeQunt;
        //document.getElementById('prod_quant').innerHTML = cartQuantityValue;//Prod quantity

        let productInfo = {
            proId : selectedId,
            proName : selectedName,
            proQuant : cartQuantityValue,
            proRate : selectedRate,
            proUnitPk : selectedUnitpk,
            proSchemerange : selectedschemerange,
            proSchemeoffqty : selectedschemeoffqty,
            proschemeValue : selectedschemeHalfValue,
            proFix : selectedFreeQunt
        }
        cartItemId++;
        console.log(productInfo,"productInfo");
        console.log(productInfo.proId,"productInfo.proId");
        //addToCartList(productInfo);
        saveProductInStorage(productInfo);
        }

   
          function saveProductInStorage(item){
              let products = getProductFromStorage();
              console.log(selectedId,"selectedId");
              let localstorageJson = JSON.parse(localStorage.getItem('products'));              
              console.log(`localstorage is cleared`,localstorageJson);
              pushlocalstorage();
              addedCart();

             /*// console.log(localstorageJson[i].proId,"localstorageJson[i].proId");
              if (localStorage.getItem('products') !== null) {
                  console.log(localstorageJson,"localstorageJson");
                    localstorageJson.forEach(function(element){
                      console.log(element.proId,"eleproId");
                      console.log(element.proQuant,"eleproId");
                      console.log(selectedId,"selectedId");
                      if (element.proId == selectedId) {
                        duplicateItems();
                      }else{
                          //alert('inside else');
                          console.log("No item");
                         // pushlocalstorage();
                          //addedCart();
                              } 
                    });
                 /* for (var i = 0; i < localstorageJson.length; i++) {
                    //selectedId == (localstorageJson[i].proId;
                       // duplicateItems();
                      //console.log(localstorageJson[i].proId);
                      if (selectedId == (localstorageJson[i].proId)) {
                              console.log("Item exists");
                              console.log(selectedId,"selectedId");
                              console.log(localstorageJson[i].proId,"localstorageJson[i].proId");
                              duplicateItems();
                          
                          }else{
                          console.log("No item");
                          pushlocalstorage();
                          addedCart();
                              } 
                  }
                //console.log("No item");
                //pushlocalstorage();
                //addedCart();
              }else {
                 // alert('inside main else');
                  console.log(`localstorage is cleared`);
                  pushlocalstorage();
                  addedCart();
              }*/
              

                          function pushlocalstorage(){
                              products.push(item);
                              localStorage.setItem('products', JSON.stringify(products));
                          }
          }



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
    
});

//Close product layout
const closeModalButton = document.querySelectorAll('[data-close-button]');
closeModalButton.forEach(button =>{
    button.addEventListener('click',() =>{
        productLayout.style.display = 'none';
        carod.style.display = 'block';
        //divhide.style.display = "flex";
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
//Success toast message
function orderFailInfo() {
  var x = document.getElementById("loginSuccess");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  document.getElementById('number').value = "";
}
//Nav login
//let navLoginButton = document.getElementById("loginNav");
//navLoginButton.addEventListener("click", (e)=>{/*divhide.style.display = "flex";carod.style.display = 'none';*/});

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
     localStorage.setItem('refnum',refnum);
    //Get UserName and Password from input tag
    let username = document.getElementById('defaultForm-user').value;
    let password = document.getElementById('defaultForm-pass').value;
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
                if (((clientdata.userName === null) || (clientdata.password === '')) && ((clientdata.userName === null) || (clientdata.password === ''))) {
                    alert("Enter User name and Password");
                }else{
                  //alert("Login Successful.");
                  const customerurl = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/custloginresponse.json";
                  //Fetch customerurl
                  fetch(customerurl, /*{
                      method: 'POSTJSON.stringify(clientdata',
                      headers:    {
                              'Content-Type': 'application/json',
                             },
                              body: JSON.stringify(data),
                          }*/console.log(clientdata,"data")).then((response)=>{
                              return response.json();
                              }).then((data)=>{
                                  console.log(data,"data");
                                  console.log(data.repCode,"repCode");
                                  localStorage.setItem('repCode',data.repCode);
                                  if (data.error) {
                                  alert("Error password or username");
                                  }else{
                                  if (data.responseCode == '0000') {
                                    console.log("User exists");
                                    orderFailInfo();
                                    localStorage.setItem('username',clientdata.userName);
                                    //divhide.style.display = "none";
                                    //userCerdin();
                                    if(cartContainer.style.display !== null){

                                      nvalogbutton.style.display = "none";
                                      logouttext.style.display = "block";
                                      document.getElementById('navlogout').innerHTML = "User :" + localStorage.getItem('username') + "Rep Code :" + localStorage.getItem('repCode');
                                      
                                    }else{carod.style.display = 'block';}
                                    //carod.style.display = 'block';
                                    //nvalogbutton.style.display = "none";
                                    //logouttext.style.display = "block";
                                    //document.getElementById('navlogout').innerHTML = "User :" + localStorage.getItem('username') + "Rep Code :" + localStorage.getItem('repCode');
                                  }else{
                                    alert("User not exisiting");
                                  }                
                                  }
                                  }).catch((err)=>{
                                  console.log(err);});
                }
    
    });
document.getElementById('navlogout').innerHTML = localStorage.getItem('username');
logoutbutton.addEventListener("click", (e)=>{
            if(logouttext.innerHTML = ""){
                alert("field is empty");
            }else{
                    localStorage.removeItem('username');
                    localStorage.removeItem('repCode');
                    document.getElementById('navlogout').innerHTML =  localStorage.getItem('username');
                    document.getElementById('exampleModalCenter').style.display = "none";
                    location.reload();
                }
    });


