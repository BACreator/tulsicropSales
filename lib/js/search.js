const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const productLayout = document.getElementById('product_layout');
//const divhide = document.getElementById('viewhide');
const carod = document.getElementById('carouselExampleControls');
let freequt = document.getElementById('prod_freeQty');

const cartContainer = document.querySelector('.cart_container');
const cartCountInfo = document.getElementById('cart_count_info');
const cartTotalValue = document.getElementById('cart_total_value');


let logoutbutton = document.getElementById("logoutuser");
let nvalogbutton = document.getElementById("loginNav");
let logouttext = document.getElementById("navlogout");

let cartItemId = 1;
let orderJson = [];

function send(){
  console.log("sned clicked");
  var selectedprod = localStorage.getItem('products');
  const newprod = JSON.parse(selectedprod);
  const jsonString = JSON.stringify(selectedprod);
  console.log(newprod,"newprod");

  const xhr = new XMLHttpRequest();
  xhr.open("POST","../../tulsicorp/db_conn.php");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(jsonString);
}


// Search states.json and filter it https://tulsicorp.com/data.json
const  searchStates = async searchText =>
{
  const res = await fetch('https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/data.json?n=1').then(response =>{
    //const res = await fetch('../../data.json?n=1').then(response =>{
    if (!response.ok)
    {
    	throw Error("Error");
    }
    	return response.json();
    }).then(data =>{
    	console.log(data.item);
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
        if(freequt.innerHTML !== null){
          freequt.innerHTML = "";
          console.log(freequt.innerHTML,"freequt");
        }
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
        if (cartQuantityValue == ''|| cartQuantityValue == 0) {
          emptyQuant();
        }else{
          console.log("cartValue",cartQuantityValue);
          localStorage.setItem('cartQuantityValue',cartQuantityValue);
          var prodFree = (selectedschemeoffqty * cartQuantityValue);
          console.log(prodFree,"prodFree");
          var freeQunt = (prodFree)/(selectedschemerange);
          //var selectedFreeQunt = freeQunt.toFixed(2);
          var selectedFreeQunt = Math.floor(freeQunt);;
          console.log("selectedFreeQunt",selectedFreeQunt);
          //Display FreeQunt in product page
          freequt.innerHTML = selectedFreeQunt;
          console.log("freequt",freequt);
          //document.getElementById("prod_freeQty").innerHTML = selectedFreeQunt;
          //document.getElementById('prod_quant').innerHTML = cartQuantityValue;//Prod quantity
          let orderlist = {
            "mfrCode":selectedId, 
            "qty":cartQuantityValue, 
            "freeQty":selectedFreeQunt,
            "schemeRange":selectedschemerange,
            "schemeOffer":selectedschemeoffqty,
            "schemeHalfPerc":selectedschemeHalfValue
          }
          if ((localStorage.getItem("order") === null)) {
            //alert("No order key");
            orderJson.push(orderlist);
            console.log(orderJson,"orderJson");
            localStorage.setItem('order',JSON.stringify(orderJson));
          }else{
            //alert("order present");
            console.log(orderJson,"orderJson");
            //let rorderjson = localStorage.getItem('order');
            //rorderjson.push(orderlist);
            
            orderJson.push(orderlist); 
            let orderdetails = JSON.parse(localStorage.getItem('order'));
            let orderlength = orderdetails.length;
            console.log(orderlength,"orderlength");
            
            if(orderlength == 45){
              console.log("length is 5");
            }else{
              orderdetails.push(orderlist);
              localStorage.setItem('order', JSON.stringify(orderdetails));
              console.log(orderdetails,"rorderson");
              console.log("length is less 5");
            }
            
          }

          let productInfo = {
              mfrCode : selectedId,
              proName : selectedName,
              qty : cartQuantityValue,
              proRate : selectedRate,
              proUnitPk : selectedUnitpk,
              schemeRange : selectedschemerange,
              schemeOffer : selectedschemeoffqty,
              schemeHalfPerc : selectedschemeHalfValue,
              freeQty : selectedFreeQunt,
              finalOrder :orderlist
          }

          
          cartItemId++;
          console.log(productInfo,"productInfo");
          console.log(productInfo.mfrCode,"productInfo.mfrCode");
          console.log(orderlist,"productInfo");
          //addToCartList(productInfo);
          saveProductInStorage(productInfo);
          //saveOrderlist(orderlist);
        }

    }

   
          function saveProductInStorage(item){
              let products = getProductFromStorage();
              console.log(item,"item");
              console.log(selectedId,"selectedId");
              let localstorageJson = JSON.parse(localStorage.getItem('products'));              
              console.log(`localstorage is cleared`,localstorageJson);
              pushlocalstorage();

             /*// console.log(localstorageJson[i].mfrCode,"localstorageJson[i].mfrCode");
              if (localStorage.getItem('products') !== null) {
                  console.log(localstorageJson,"localstorageJson");
                    localstorageJson.forEach(function(element){
                      console.log(element.mfrCode,"elemfrCode");
                      console.log(element.qty,"elemfrCode");
                      console.log(selectedId,"selectedId");
                      if (element.mfrCode == selectedId) {
                        duplicateItems();
                      }else{
                          //alert('inside else');
                          console.log("No item");
                         // pushlocalstorage();
                          //addedCart();
                              } 
                    });
                 /* for (var i = 0; i < localstorageJson.length; i++) {
                    //selectedId == (localstorageJson[i].mfrCode;
                       // duplicateItems();
                      //console.log(localstorageJson[i].mfrCode);
                      if (selectedId == (localstorageJson[i].mfrCode)) {
                              console.log("Item exists");
                              console.log(selectedId,"selectedId");
                              console.log(localstorageJson[i].mfrCode,"localstorageJson[i].mfrCode");
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
                            let localprod = JSON.parse(localStorage.getItem('products'));
                            if ((localStorage.getItem("products") === null)) {
                              products.push(item);
                              localStorage.setItem('products', JSON.stringify(products));
                              console.log("length is more than 2");
                              addedCart();
                            }
                            else{
                              console.log(localprod,"localprod");
                              let prodlength = localprod.length;
                              console.log(prodlength,"prodlength");
                              if(prodlength == 45){
                                console.log("length is 5");
                                fullCart();
                              }else{
                                products.push(item);
                                localStorage.setItem('products', JSON.stringify(products));
                                console.log("length is more less than 5");
                                addedCart();
                              }
                            }
                            
                          }
          }

          function saveOrderlist(item){
           /* let orderJson = [];
              localStorage.getItem('order')? JSON.parse
              (localStorage.getItem('order')) : [];   
              let localstorJson = JSON.parse(localStorage.getItem('order')); 
              orderJson.concat(item);
              console.log(orderJson,"orderJson");
              localStorage.setItem('order', JSON.stringify(orderJson));
              console.log(orderJson,"orderJson");*/
            
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
      //document.getElementById('prod_freeQty').innerHTML = "";

    }
    //Add to cart toast message
    function fullCart() {
      var x = document.getElementById("fullCart");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      document.getElementById('number').value = "";
      //document.getElementById('prod_freeQty').innerHTML = "";

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
//Nav login
//let navLoginButton = document.getElementById("loginNav");
//navLoginButton.addEventListener("click", (e)=>{/*divhide.style.display = "flex";carod.style.display = 'none';*/});

//Login click
let continuelogin = document.getElementById("logincontinue");
continuelogin.addEventListener("click", (e)=>{
    e.preventDefault();
    let salescheck = document.getElementById("sales").checked; 
    //generates random id;
    if (salescheck == true) {
      alert("Sales logged in");
      //alert("Customer logged in")
      /*let guid = () => {
          let s4 = () => {
              return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
          }
          return s4() + s4();
      }
      let refnum = guid();*/
      const array = new Uint32Array(10);
      self.crypto.getRandomValues(array);

      console.log("Your lucky numbers:");
      for (const refnum of array) {
        console.log(refnum);
      }

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
                    const customerurl = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/salesloginresponse.json";
                    //const customerurl = "https://www.tulsicorp.com/mobile-order-entry-service/saleslogin";
                    //Fetch customerurl
                    fetch(customerurl, /*{
                      headers: {
                      Authorization: 'Basic ' + btoa('tulsi' + ":" + 'FdBNaYWfjpWN9eYghMpbRA=='),
                      'Content-Type': 'application/json' 
                                },
                      credentials: 'include', 
                      method:'POST',  
                      body: JSON.stringify(clientdata)
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
                                      //orderFailInfo();
                                      localStorage.setItem('username',clientdata.userName);
                                      if(cartContainer.style.display !== null){

                                        nvalogbutton.style.display = "none";
                                        logouttext.style.display = "block";
                                        document.getElementById('navlogout').innerHTML = "User :" + localStorage.getItem('username') + "Rep Code :" + localStorage.getItem('repCode');
                                        logoutbutton.style.display = "block";
                                        
                                      }else{carod.style.display = 'block';}
                                    }else{alert("User not exisiting");}                
                                    }
                                    }).catch((err)=>{
                                    console.log(err);});
                  }
    }else{
      //alert("Customer logged in")
      /*let guid = () => {
          let s4 = () => {
              return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
          }
          return s4() + s4();
      }
      let refnum = guid();*/
      const array = new Uint32Array(1);
      self.crypto.getRandomValues(array);

      console.log("Your lucky numbers:");
      for (const refnum of array) {
        console.log(refnum);
        localStorage.setItem('refnum',refnum);
      }
       //console.log(refnum,"refnum");
       //localStorage.setItem('refnum',refnum);
      //Get UserName and Password from input tag
      let refnum = localStorage.getItem('refnum');
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
                    //const customerurl = "https://www.tulsicorp.com/mobile-order-entry-service/customerlogin";
                    const customerurl = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/custloginresponse.json";
                    //Fetch customerurl
                    fetch(customerurl, /*{
                    headers: {
                    Authorization: 'Basic ' + btoa('tulsi' + ":" + 'FdBNaYWfjpWN9eYghMpbRA=='),
                    'Content-Type': 'application/json' 
                              },
                    credentials: 'include', 
                    method:'POST',  
                    body: JSON.stringify(clientdata)
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
                                      //orderFailInfo();
                                      localStorage.setItem('username',clientdata.userName);
                                      if(cartContainer.style.display !== null){

                                        nvalogbutton.style.display = "none";
                                        logouttext.style.display = "block";
                                        document.getElementById('navlogout').innerHTML = "User :" + localStorage.getItem('username') + "Rep Code :" + localStorage.getItem('repCode');
                                        logoutbutton.style.display = "block";
                                        
                                      }else{carod.style.display = 'block';}
                                    }else{alert("User not exisiting");}                
                                    }
                                    }).catch((err)=>{
                                    console.log(err);});
                  }
                  console.log(username,"username");
                  console.log(password,"password");
                  let httpr = new XMLHttpRequest();
                  httpr.open("POST","../../tulsicorp/connect.php",true);
                  httpr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                  httpr.onreadystatechange = function(){
                    if (httpr.readyState==4 && httpr.status==200) {
                      document.getElementById("response").innerHTML = httpr.responseText;
                    }
                  }
                  httpr.send("username = "+username+ "password"+password);
    }

    
    });
//document.getElementById('navlogout').innerHTML = "";
if (((localStorage.getItem('username') === null) || (localStorage.getItem('username') === ''))) {
  document.getElementById('navlogout').style.display = "none";
  logoutbutton.style.display = "none";
}else{
  document.getElementById('navlogout').innerHTML = "User :" + localStorage.getItem('username') +" "+ "Rep Code :" + localStorage.getItem('repCode');
  logoutbutton.style.display = "block";
}

logoutbutton.addEventListener("click", (e)=>{
            if(logouttext.innerHTML = ""){
                alert("field is empty");
            }else{
                    localStorage.removeItem('username');
                    localStorage.removeItem('repCode');
                    document.getElementById('navlogout').style.display = "none";
                    //document.getElementById('exampleModal').style.display = "none";
                    //document.getElementById("overlay").style.opacity = 0;
                    location.reload();
                }
    });









/*/Sales functinalities
// Search states.json and filter it https://tulsicorp.com/data.json
const searchCustm = document.getElementById('searchCustmer');
const matchCustList = document.getElementById('matchCustomer-list');
const  searchCustomer = async searchCust =>
{
  const res = await fetch('lib/json/customerList.json').then(response =>{
    if (!response.ok)
    {
      throw Error("Error");
    }
      return response.json();
    }).then(data =>{
      console.log(data);
      console.log(data.cust);
        let states = data.cust;
        //console.log(states, "states");
        matchCustList.style.display = 'block';

        // Get matches to current text input
        let matcheCust = states.filter(state =>{
            const regex = new RegExp(`^${searchCust}`, `gi`);
            return state.custIdName.match(regex) || state.custPin.match(regex);
        });

    //let divhide = document.getElementById('viewhide');
    if(searchCust.length !== 0){
      //divhide.style.display = "none";
            productLayout.style.display = 'none';
            carod.style.display = 'none';
            console.log('searchCust',searchCust);
            console.log('matcheCust',matcheCust);
    }else{
      //divhide.style.display = "flex";
          carod.style.display = 'block';
            productLayout.style.display = 'block';
    }

        //Hide all results when input is empty
        if (searchCust.length === 0) {
            matcheCust = [];
            matchCustList.innerHTML = '';
            matchCustList.style.display = 'none';
            productLayout.style.display = 'none';
            console.log('searchCust',searchCust);
            console.log('matcheCust',matcheCust);
        }

    //Hide if no results are found
        /*if (searchCust !== states) {
            matcheCust = [];
            matchCustList.innerHTML = '';
            console.log('searchCust',searchCust);
            console.log('matcheCust',matcheCust);
        }*/

       /* outputCustHtml(matcheCust);

    }).catch(error =>{
      console.log(error);
    });  

};

//Show results in HTML
const outputCustHtml = matcheCust => {
    if (matcheCust.length > 0) {
        const html = matcheCust.map(match => `

          <li id="${match.custId}">${match.custIdName} : ${match.custPhone} : ${match.custPin}
          <!--span style="display: none;">${match.schemeHalfValuePerc}</span>
          <span style="display: none;"> ${match.ratePerUnit}</span>
          <span style="display: none;"> ${match.unitPk}</span>
          <span style="display: none;"> ${match.schemeRange}</span>
          <span style="display: none;"> ${match.schemeOffeQty}</span>
          <span style="display: none;"> ${match.qnty}</span--></li>
            `).join('');
        //console.log(html,"html");
        matchCustList.innerHTML = html;
    }
}

searchCustm.addEventListener('input', () => searchCustomer(searchCustm.value));


matchCustList.addEventListener('click', function(e){
    var target = e.target;
    while(target && target.parentNode !== matchCustList){
        target = target.parentNode;
        if (!target) {return;}
        console.log(target,'target');
    }
    if (e.target.tagName === 'LI') {
      let liId = e.target.id;//Get selected customer Id
      let liInnerText = e.target.innerText;//Get selected customer name 
      console.log(liInnerText,'liInnerText');
      //searchCustm.value = liInnerText;
      localStorage.setItem('SelectedCustomer',liInnerText);
      document.getElementById('searchCustmer').value = localStorage.getItem('SelectedCustomer');
      matchCustList.style.display = 'none';
    }
  });*/
