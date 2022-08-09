const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const productLayout = document.getElementById('product_layout');
const carod = document.getElementById('carouselExampleControls');
let freequt = document.getElementById('prod_freeQty');
const searchLayouts = document.getElementById('search_layout');
const searchCustmerLayout = document.getElementById('searchCustmerLayout');
const searchCustmer = document.getElementById('searchCustmer');
const matchCustomerList = document.getElementById('matchCustomer-list');

let custValue = document.getElementById('searchCustmer').value;

const cartContainer = document.querySelector('.cart_container');
const cartCountInfo = document.getElementById('cart_count_info');
const cartTotalValue = document.getElementById('cart_total_value');


let logoutbutton = document.getElementById("logoutuser");
let nvalogbutton = document.getElementById("loginNav");
let logouttext = document.getElementById("navlogout");

let cartItemId = 1;
let orderJson = [];
let cartorderJson = [];



// Search states.json and filter it https://tulsicorp.com/data.json
const  searchStates = async searchText =>
{
  /*if (custValue == null || custValue == "") {
    alert("Please select customer name");
  }else{*/
      const res = await fetch('https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/data.json?n=1').then(response =>{
        //const res = await fetch('../../data.json?n=1').then(response =>{
        if (!response.ok)
        {
          throw Error("Error");
        }
          return response.json();
        }).then(data =>{
            let states = data.item;
            matchList.style.display = 'block';

            // Get matches to current text input
            let matches = states.filter(state =>{
                const regex = new RegExp(`^${searchText}`, `gi`);
                return state.itemName.match(regex) || state.itemMfrCode.match(regex);
            });

        if(searchText.length !== 0){
                productLayout.style.display = 'none';
                carod.style.display = 'none';
        }else{
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
        });  

  //}


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
        let liId = e.target.id;//Get selected product Id
        let liInnerText = e.target.innerText;//Get selected product name 
        let schemeHalfValue = e.target.children[0].innerText;//Get selected product schemeHalfValuePerc
        let rate = e.target.children[1].innerText;//Get selected product rate
        let unitPk = e.target.children[2].innerText;//Get selected product unitpk
        let schemeRange= e.target.children[3].innerText;//Get selected product schemeRange
        let schemeOffeQty = e.target.children[4].innerText;//Get selected product schemeOffeQty
        let totalqty = e.target.children[5].innerText;//Get selected product totalqty
        if(freequt.innerHTML !== null){
          freequt.innerHTML = "";
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
     // function orderget(product){
        //Cart add quantity value
        let cartQuantityValue = document.getElementById('number').value;
        if (cartQuantityValue == ''|| cartQuantityValue == 0) {
          emptyQuant();
        }else{
          localStorage.setItem('cartQuantityValue',cartQuantityValue);
          var prodFree = (selectedschemeoffqty * cartQuantityValue);
          var freeQunt = (prodFree)/(selectedschemerange);
          var selectedFreeQunt = Math.floor(freeQunt);


          //Display FreeQunt in product page
          freequt.innerHTML = selectedFreeQunt;


           var selectedCust = localStorage.getItem('custLiText');
           var selectedCustCode = localStorage.getItem('custCode');
           var selectedCustArea = localStorage.getItem('areaCode');
           var selectedCustAdd1 = localStorage.getItem('address1');
           var selectedCustAdd2 = localStorage.getItem('address2');

          let orderlist = {
            "mfrCode":selectedId, 
            "qty":cartQuantityValue, 
            "freeQty":selectedFreeQunt,
            "proName" :selectedName,
            "proRate" :selectedRate,
            "schemeRange":selectedschemerange,
            "schemeOffer":selectedschemeoffqty,
            "schemeHalfPerc":selectedschemeHalfValue,
              custName :selectedCust,
              custCode:selectedCustCode,
              areaCode:selectedCustArea,
              address1:selectedCustAdd1,
              address2:selectedCustAdd2
          }
          if ((localStorage.getItem("order") === null)) {
            orderJson.push(orderlist);
            localStorage.setItem('order',JSON.stringify(orderJson));
          }else{
            
            orderJson.push(orderlist); 

            let orderdetails = JSON.parse(localStorage.getItem('order'));
            let orderlength = orderdetails.length;
            
            if(orderlength == 45){
            }else{
              orderdetails.push(orderlist);
              localStorage.setItem('order', JSON.stringify(orderdetails));
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

          
          //cartItemId++;
          saveProductInStorage(productInfo);
        }

        let localproductJson = JSON.parse(localStorage.getItem('products'));
        let localorderJson = JSON.parse(localStorage.getItem('order'));
        console.log(localproductJson,"localproductJson");
        console.log(localorderJson,"localorderJson");
        //orderupdate();

    }

   
          function saveProductInStorage(item){
              let products = getProductFromStorage();
              let localstorageJson = JSON.parse(localStorage.getItem('products'));
              pushlocalstorage();

             
              

                          function pushlocalstorage(){
                            let localprod = JSON.parse(localStorage.getItem('products'));
                            if ((localStorage.getItem("products") === null)) {
                              products.push(item);
                              localStorage.setItem('products', JSON.stringify(products));
                              addedCustlist();
                            }
                            else{
                              let prodlength = localprod.length;
                              if(prodlength == 45){
                                fullCart();
                              }else{
                                products.push(item);
                                localStorage.setItem('products', JSON.stringify(products));
                                addedCustlist();
                              }
                            }
                            
                          }
          }

          function saveOrderlist(item){
            
          }


    //Get all the selected product info from local storage
    function getProductFromStorage(){
        return localStorage.getItem('products')? JSON.parse
        (localStorage.getItem('products')) : [];   
    }
    //Add to cart toast message
    function addedCart() {
      var x = document.getElementById("addedCart");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      document.getElementById('number').value = "";

    }
    //Add to cart toast message
    function addedCustlist() {
      var x = document.getElementById("addedCustlist");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      document.getElementById('number').value = "";

    }
    //Add to cart toast message
    function fullCart() {
      var x = document.getElementById("fullCart");
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
    
});//end of matchlist

//Close product layout
const closeModalButton = document.querySelectorAll('[data-close-button]');
closeModalButton.forEach(button =>{
    button.addEventListener('click',() =>{
        productLayout.style.display = 'none';
        searchLayouts.style.display = 'none';
        carod.style.display = 'block';
        search.value ='';
        searchCustmer.value = '';
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
//Login click
let continuelogin = document.getElementById("logincontinue");
continuelogin.addEventListener("click", (e)=>{
        //const array = new Uint32Array(10);
        //self.crypto.getRandomValues(array);

        e.preventDefault();
        
        const array = new Uint32Array(1);
        self.crypto.getRandomValues(array);
        document.getElementById('searchCustmerLayout').style.display = 'block';
        //document.getElementById('custsendbtn').style.display = 'block';
        
        for (const refnum of array) {
          localStorage.setItem('refnum',refnum);
        }
        //Get UserName and Password from input tag
        let refnum = localStorage.getItem('refnum');
        let username = document.getElementById('defaultForm-user').value;
        let password = document.getElementById('defaultForm-pass').value;
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
                    clientdata.userName = username;
                    clientdata.password = password;
                    clientdata.orderReferenceNo = refnum;
                    if (((clientdata.userName === null) || (clientdata.password === '')) && ((clientdata.userName === null) || (clientdata.password === ''))) {
                        alert("Enter User name and Password");
                    }else{
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
                }*//*console.log(clientdata,"data")*/).then((response)=>{
                                  return response.json();
                                  }).then((data)=>{
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
                                          searchLayouts.style.display = "none";
                                          document.getElementById('navlogout').innerHTML = "User :" + localStorage.getItem('username') + "Rep Code :" + localStorage.getItem('repCode');
                                          logoutbutton.style.display = "block";
                                          
                                        }else{carod.style.display = 'block';}
                                      }else{alert("User not exisiting");}                
                                      }
                                      }).catch((err)=>{
                                      console.log(err);});
                    }
       

    });

if (((localStorage.getItem('username') === null) || (localStorage.getItem('username') === ''))) {
  document.getElementById('navlogout').style.display = "none";
  //searchLayouts.style.display = "none";
  logoutbutton.style.display = "none";
}else{
  document.getElementById('navlogout').innerHTML = "User :" + localStorage.getItem('username') +" "+ "Rep Code :" + localStorage.getItem('repCode');
  logoutbutton.style.display = "block";
  //searchLayouts.style.display = "block";  
  document.getElementById('searchCustmerLayout').style.display = 'block';
  //document.getElementById('custsendbtn').style.display = 'block';
  
}

logoutbutton.addEventListener("click", (e)=>{
            if(logouttext.innerHTML = ""){
                alert("field is empty");
            }else{
                    localStorage.removeItem('username');
                    localStorage.removeItem('repCode');
                    document.getElementById('navlogout').style.display = "none";
                    searchLayouts.style.display = "none";                    
                    document.getElementById('searchCustmerLayout').style.display = 'none';
                    //document.getElementById('custsendbtn').style.display = 'none';
                    
                    location.reload();
                }
    });





// Search states.json and filter it https://tulsicorp.com/data.json
const  searchCust = async searchText =>
{
  const res = await fetch('https://raw.githubusercontent.com/BACreator/tulsicropSales/main/lib/json/customerdata.json?n=1').then(response =>{
    //const res = await fetch('lib/json/data1.json?n=1').then(response =>{
    if (!response.ok)
    {
      throw Error("Error");
    }
      return response.json();}).then(data =>{
        console.log(data,"data");
      console.log(data.customer,"data");
        let states = data.customer;
        matchCustomerList.style.display = 'block';

        // Get matches to current text input
        let matches = states.filter(state =>{
            const regex = new RegExp(`^${searchText}`, `gi`);
            //console.log(state.capital,"state");
            return state.custName.match(regex) || state.custCode.match(regex) || state.areaCode.match(regex);
        });
//console.log(matches,"matches");
    if(searchText.length !== 0){
            productLayout.style.display = 'none';
            carod.style.display = 'none';
            searchLayouts.style.display = 'block'
            //document.getElementById('search').disabled = false;
    }else{
          carod.style.display = 'block';
            productLayout.style.display = 'block';
            //document.getElementById('search').disabled = true;
    }

        //Hide all results when input is empty
        if (searchText.length === 0) {
            matches = [];
            matchCustomerList.innerHTML = '';
            matchCustomerList.style.display = 'none';
            productLayout.style.display = 'none';
            searchLayouts.style.display = 'none';
           // document.getElementById('search').disabled = true;
        }

    //Hide if no results are found
        if (searchText !== states) {
            match = [];
            matchCustomerList.innerHTML = '';
        }


       /* if (searchText.length > 0 || searchText.length === 0) {
          document.getElementById('search').disabled = false;
          alert("false");
        } else{
          document.getElementById('search').disabled = true;
          alert("true");
        }*/


        outputCustHtml(matches);

    }).catch(error =>{
    });  

};


//Show results in HTML
const outputCustHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `

          <li id="${match.abbr}">${match.custName} : ${match.custCode} : ${match.areaCode}
          <span style="display: none;"> ${match.custName}</span>
          <span style="display: none;"> ${match.custCode}</span>
          <span style="display: none;"> ${match.areaCode}</span>
          <span style="display: none;"> ${match.address1}</span>
          <span style="display: none;"> ${match.address2}</span>
          <span style="display: none;"> ${match.qnty}</span></li>
            `).join('');
        matchCustomerList.innerHTML = html;
    }
}

searchCustmer.addEventListener('input', () => searchCust(searchCustmer.value));

matchCustomerList.addEventListener('click', function(e){
    var target = e.target;
    console.log("target",target);
    while(target && target.parentNode !== matchCustomerList){
        target = target.parentNode;
        console.log("target",target);
        if (!target) {return;}
    }
    if (e.target.tagName === 'LI') {
        let liId = e.target.id;//Get selected product Id
      console.log("liId",liId);
        let liInnerText = e.target.innerText;//Get selected product name 
        console.log("liInnerText",liInnerText);
        let schemeHalfValue = e.target.children[0].innerText;//Get selected product schemeHalfValuePerc
        let rate = e.target.children[1].innerText;//Get selected product rate
        let unitPk = e.target.children[2].innerText;//Get selected product unitpk
        let schemeRange= e.target.children[3].innerText;//Get selected product schemeRange
        let schemeOffeQty = e.target.children[4].innerText;//Get selected product schemeOffeQty
        let totalqty = e.target.children[5].innerText;//Get selected product totalqty
        console.log("custName",schemeHalfValue);
        console.log("custCode",rate);
        console.log("areaCode",unitPk);
        console.log("address1",schemeRange);
        console.log("address2",schemeOffeQty);
        if(freequt.innerHTML !== null){
          freequt.innerHTML = "";
        }
        //Store values in local storage
        localStorage.setItem('custLiId',liId);//Store prod ID
        localStorage.setItem('custLiText',liInnerText);//Store prod name
        localStorage.setItem('custCode',rate);//Store prod name
        localStorage.setItem('areaCode',unitPk);//Store prod name
        localStorage.setItem('address1',schemeRange);//Store prod name
        localStorage.setItem('address2',schemeOffeQty);//Store prod name

        //Insert selected item in input text field
        searchCustmer.value = liInnerText;

        //Hide search dropdown after click event
        matchCustomerList.style.display = 'none';


        //Retrive product details from local storage
        var selectedId = localStorage.getItem('custLiId');
        var selectedText = localStorage.getItem('custLiText');
        console.log("selectedId",selectedId);
        console.log("selectedText",selectedText);



    }

    document.getElementById('custsendbtn').onclick = function(cartProduct){
      //function cartcastadd(cartProduct){
        orderget();
      let custCart = 
              {
                  "custName":"",
                  "custCode":"",
                  "areaCode":"",
                  "address1":"",
                  "address2":"",
                  "lineItems":"" 
              }
              var selectedCust = localStorage.getItem('custLiText');
              var selectedCustCode = localStorage.getItem('custCode');
              var selectedprod = localStorage.getItem('order');
              var selectedCustArea = localStorage.getItem('areaCode');
              var selectedCustAdd1 = localStorage.getItem('address1');
              var selectedCustAdd2 = localStorage.getItem('address2');
              const newprod = JSON.parse(selectedprod);
              custCart.custName = selectedCust;
              custCart.custCode = selectedCustCode;
              custCart.areaCode = selectedCustArea;
              custCart.address1 = selectedCustAdd1;
              custCart.address2 = selectedCustAdd2;
              custCart.lineItems = newprod;
              saveCartProductInStorage(custCart);
              //addedCart();
              alert("Item added to cart.");
    }
    let localproductJson = JSON.parse(localStorage.getItem('custCartList'));
    console.log(localproductJson,"localproductJson");

    function saveCartProductInStorage(item){
        let cartproducts = getCartProductFromStorage();
        let localstorageJson = JSON.parse(localStorage.getItem('custCartList'));
        pushCartlocalstorage();

       
        

                    function pushCartlocalstorage(){
                      let localprod = JSON.parse(localStorage.getItem('custCartList'));
                      if ((localStorage.getItem("custCartList") === null)) {
                        cartproducts.push(item);
                        localStorage.setItem('custCartList', JSON.stringify(cartproducts));

                        //Clear order and product
                        //console.log(JSON.parse(localStorage.getItem('products')),"products");
                        localStorage.removeItem("products"); 
                        localStorage.removeItem("order");  
                        location.reload();
                        //console.log(newprod,"newprod");
                        console.log(JSON.parse(localStorage.getItem('products')),"products");
                        console.log(JSON.parse(localStorage.getItem('order')),"order");


                        //addedCart();
                      }
                      else{
                        let prodlength = localprod.length;
                        if(prodlength == 45){
                          fullCart();
                        }else{
                          cartproducts.push(item);
                          localStorage.setItem('custCartList', JSON.stringify(cartproducts));

                          //Clear order and product
                          //console.log(JSON.parse(localStorage.getItem('products')),"products");
                          localStorage.removeItem("products"); 
                          localStorage.removeItem("order"); 
                          location.reload(); 
                          //console.log(newprod,"newprod");
                          console.log(JSON.parse(localStorage.getItem('products')),"products");
                          console.log(JSON.parse(localStorage.getItem('order')),"order");


                          //addedCart();
                        }
                      }
                      
                    }
    }


    //Get all the selected product info from local storage
    function getCartProductFromStorage(){
        return localStorage.getItem('custCartList')? JSON.parse
        (localStorage.getItem('custCartList')) : [];   
    }

 /*   let custValues = document.getElementById('searchCustmer').value;
    console.log(custValues,"custValue");
    if (custValues.value.length > 0) {
      document.getElementById('search').disabled = false;
    } else{
      document.getElementById('search').disabled = true;
    }
*/
  });






/*function send(){
  //get customer name
  var selectedCust = localStorage.getItem('custLiText');
  
  //create new custlist
  const custCart = 
              {
                  "custName":"",
                  "lineItems":"" 
              }
  custCart.custName = selectedCust;
  
  console.log(custCart,"custCart");
  //get order
  var selectedprod = localStorage.getItem('products');
  const newprod = JSON.parse(selectedprod);
  console.log(newprod,"newprod");
  console.log(custCart,"custCart");

  //set newprod order to custcart
  custCart.lineItems = newprod;

  if ((localStorage.getItem("custCartList") === null)) {
    
    //push to custcart
    cartorderJson.push(custCart);
    console.log(cartorderJson,"cartorderJson");
    localStorage.setItem('custCartList',JSON.stringify(cartorderJson));

    
  }else{
    
    //push to custcart
    cartorderJson.push(custCart);
    console.log(cartorderJson,"cartorderJson");
    //localStorage.setItem('custCartList',JSON.stringify(cartorderJson));
    console.log(cartorderJson,"cartorderJson");
  }

  //Clear order and product
  console.log(JSON.parse(localStorage.getItem('products')),"products");
  localStorage.removeItem("products"); 
  localStorage.removeItem("order");  
  //console.log(newprod,"newprod");
  console.log(JSON.parse(localStorage.getItem('products')),"products");
  console.log(JSON.parse(localStorage.getItem('order')),"order");

  var finalCust = localStorage.getItem('custCartList');
  const finalCustprod = JSON.parse(finalCust);
  console.log(finalCustprod,"finalCust");


/*var selectedCust = localStorage.getItem('custLiText');
var selectedCartList = localStorage.getItem('custCartList'); 
const newcartprod = JSON.parse(selectedCartList);
for (var i = 0; i < newcartprod.length; i++) {
    if (selectedCust === newcartprod[i].custName) {
      alert("name is there")
    }else{alert("name is not there")}
}

  
}
*/

/*let custValues = document.getElementById('searchCustmer').value;
console.log(custValues,"custValue");
if (custValues === '') {
  document.getElementById('search').disabled = true;
} else{
  document.getElementById('search').disabled = false;
}*/
