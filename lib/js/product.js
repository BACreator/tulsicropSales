const searchLayout = document.getElementById('search_layout');
const cartButton = document.getElementById('cart_button');
const carodLayout = document.getElementById('carouselExampleControls');
let logoutbtn = document.getElementById("navlogout");
let custDetail = document.getElementById('custDetails');
let tableContent = document.getElementById('table');
let cartTable = document.getElementById('cartTable');

//Get all the selected product info from local storage
    function getProductFromStorage(){
        var today = new Date()
		var curHr = today.getHours()
		var time = null;

		if (curHr < 12) {
		  var time = "M";
		} else {
		  var time = "M"; // Intentionally added M. They want always M
		}
		
            var catOptions = "";
            if (time == 'M') {
				catOptions += "<option selected>M</option>";
            }
			else{
				catOptions += "<option>M</option>";
			}
			if (time == 'E') {
				  catOptions += "<option selected>E</option>";
            }
			else{
				catOptions += "<option>E</option>";
			}
            document.getElementById("sessiontype").innerHTML = catOptions;
        
    	
    	var selectedprod = localStorage.getItem('custCartList');
    	const newprod = JSON.parse(selectedprod);
      console.log(newprod,"newprod");

    	          var index;
                var htmltable = "<table class='table table-bordered table-striped' id = 'dsTable'>"
                htmltable+='<thead>'
                htmltable+='<tr>';
                htmltable+='<th scope="col">'+'custName'+'</th>';
                htmltable+='<th>'+'Name'+'</th>';
                htmltable+='<th>'+'Quantity'+'</th>';
                htmltable+='<th scope="col">'+'Free quantity'+'</th>';
                htmltable+='<th>'+'Rate'+'</th>';
                htmltable+='</tr>';
                htmltable+='</thead>';
                for (var i = 0; i < newprod.length; i++) {
                  console.log(newprod[i].lineItems,"lineItems");
                    htmltable+='<tr>';
                    htmltable+='<td>'+newprod[i].custName+'</td>';
                    /*for (var i = 0; i < newprod[i].lineItems.length; i++) {
                      console.log(newprod[i].lineItems,"lineItems");
                    }*/
                    htmltable+='<td class="prodName">'+newprod[i].lineItems[0].finalOrder.proName+'</td>';
                    htmltable+='<td>'+ '<input name="cartQuant" id="cartUpdate" autocomplete="off" onclick="update(event)" style="width: 50%; height: auto; text-align: center;" type="text" value="'+newprod[i].qty+'" />'+'</td>';
                    htmltable+='<td>'+newprod[i].freeQty+'</td>';
                    htmltable+='<td>'+'<span>&#8377;</span>'+newprod[i].proRate+'</td>';
                    //htmltable+='<td>'+'<span>&#10005;</span>'+'</td>';
                    htmltable+='<td>'+ '<input type="button" value="Delete" onclick="tableclick(event)"/>' +'</td>';
                    htmltable+='</tr>';

                }document.getElementById("tableItems").innerHTML = htmltable

    	//Cart Buttons
    	cartButton.style.display = 'block';//Display cart buttons.
    	searchLayout.style.display = 'none';//Hide search bar.
    	productLayout.style.display = 'none';//Hide product layout.
        //Onclick card close
         $('.closebtn').click(function(){
           var $target = $(this).parents('span');

           let rowId = $(this).parents('span').index();
           let rowjson = rowId -1;
           $target.hide('slow', function(){ $target.remove(); });

            var storedNames = JSON.parse(localStorage.getItem("products"));
            var storedOrder = JSON.parse(localStorage.getItem("order"));

            if (storedNames == 0) {
             localStorage.removeItem("products"); 
             localStorage.removeItem("order");  
             cartTotal(); 
            }else{
                storedNames.splice(rowjson, 1);
                storedOrder.splice(rowjson, 1);
                localStorage.setItem('products', JSON.stringify(storedNames));
                localStorage.setItem('order', JSON.stringify(storedOrder));
                cartTotal();
            }
         });
        
        
    }

     function tableclick(e){
        /*if(!e)
         e = window.event;
          if(e.target.value == "Delete"){
              let rowId = e.target.closest('tr').rowIndex;
             deleteRow( e.target.parentNode.parentNode.rowIndex );
             let devicesArray = rowId - 1 ;
             console.log(rowId,"rowId");
             console.log(devicesArray,"devicesArray");
             var storedNames = JSON.parse(localStorage.getItem("products"));
             var storedOrder = JSON.parse(localStorage.getItem("order"));
             storedNames.splice(devicesArray, 1);
             storedOrder.splice(devicesArray, 1);
             cartTotal(); 
             localStorage.setItem('products', JSON.stringify(storedNames));
             localStorage.setItem('order', JSON.stringify(storedOrder));
             cartTotal(); 
             orderupdate();
         }*/
         if(!e)
          e = window.event;

             cartTable.style.display = 'block'
             document.getElementById('custBack').style.display = 'block';

              /* let rowId = e.target.closest('tr').rowIndex;
              //deleteRow( e.target.parentNode.parentNode.rowIndex );
              let devicesArray = rowId - 1 ;
              console.log(rowId,"rowId");
              console.log(devicesArray,"devicesArray");
              custDetail.style.display = 'block';
              tableContent.style.display = 'none';
              var selectedprod = localStorage.getItem('custCartList');
              const newprod = JSON.parse(selectedprod);
              console.log(newprod,"newprod");*/
              //console.log(newprod[devicesArray].lineItems,"newprod");
              

              if(e.target.value == "Delete"){
                  let detrowId = e.target.closest('tr').rowIndex;
                  let cartArray = detrowId - 1;
                  console.log(detrowId,"rowId");
                  console.log(cartArray,"cartArray");
                  var selectedprod = localStorage.getItem('custCartList');
                  const newprod = JSON.parse(selectedprod);
                  let devicesArray = localStorage.getItem('devicesArray');
                  let cartLineitem = newprod[devicesArray].lineItems;
                 deleteRow( e.target.parentNode.parentNode.rowIndex );
                 
                 cartLineitem.splice(cartArray, 1);
                 console.log(newprod,"newprod");
                 localStorage.setItem('custCartList', JSON.stringify(newprod));
                 console.log(newprod[cartArray].lineItems,"newprod[rowId].lineItems");
               }
               //console.log(cartLineitem,"cartLineitem");
               //console.log(newprod,"newprod");
               //console.log(newprod[devicesArray].lineItems,"newprod");
              // newprod[rowId].lineItems = newprod[devicesArray].lineItems;
               //let newlineitem = newprod[rowId].lineItems;
               
               //console.log(localStorage.getItem('custCartList'));
     }

     function deleteRow(row) {
                    document.getElementById('cartdsTable').deleteRow(row);
                }

    function update(event){
      
        $('input[name="cartQuant"]').on('focusin', function(){
            $(this).data('val', $(this).val());
        });  
        $('input[name="cartQuant"]').on('change', function(){
            var prev = $(this).data('val');
            var current = $(this).val();
            if (current == ''|| current == 0) {
              emptyQuant();
            }else{
              let val = $(this).closest('tr').find('.prodName').text();
              console.log(val,"val");

              var selectedprod = localStorage.getItem('custCartList');
              const newprod = JSON.parse(selectedprod);
              let devicesArray = localStorage.getItem('devicesArray');
              let cartLineitem = newprod[devicesArray].lineItems;
              console.log(cartLineitem,"cartLineitem");

              //var selectedprod = localStorage.getItem('products'); 
              //const newprod = JSON.parse(selectedprod);
              for (var i = 0; i < cartLineitem.length; i++) {
                  if (val === cartLineitem[i].proName) {
                      cartLineitem[i].qty = current;
                      cartLineitem[i].qty = current;
                      console.log(newprod,"newprodchange");
                      localStorage.setItem('custCartList',JSON.stringify(newprod));
                      //localStorage.setItem('products',JSON.stringify(newprod));
                      cartTotal();
                      }
                      console.log(cartLineitem,"cartLineitem");
                      let selectedschemeoffqty = cartLineitem[i].schemeOffer;
                      let selectedschemerange = cartLineitem[i].schemeRange;
                      console.log(selectedschemeoffqty,"selectedschemeoffqty");
                      console.log(selectedschemerange,"selectedschemerange");
                      let prodFree = (selectedschemeoffqty * current);
                      var freeQunt = (prodFree)/(selectedschemerange);
                      var selectedFreeQunt = Math.floor(freeQunt);
                      cartLineitem[i].freeQty = selectedFreeQunt;
                      console.log(selectedFreeQunt,"selectedFreeQunt");
                      //cartLineitem[i].freeQty = selectedFreeQunt;

                      localStorage.setItem('custCartList',JSON.stringify(newprod));
                      //localStorage.setItem('products',JSON.stringify(newprod));
                     // orderupdate();
              }
            }
        });
    }

    function orderupdate(){
      let updatecart = JSON.parse(localStorage.getItem('order'));
      const cartData = 
                  {
                      "userName":"",
                      "lineItems":"" 
                  }
              //Inserting data in json object
              cartData.userName = localStorage.getItem('username');
              cartData.lineItems = updatecart;
              console.log(cartData,"cartData");
              console.log(cartData.lineItems,"cartData.lineItems");
                const addcarturl = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/orderresponsefromdb.json?n=1";
              //const addcarturl = "lib/json/orderresponsefromdb.json?n=1";
              //const orderurl = "https://www.tulsicorp.com/mobile-order-entry-service/createmobileorder/";
              fetch(addcarturl, {cache: "no-store"} /*{
                   headers: {
                   Authorization: 'Basic ' + btoa('tulsi' + ":" + 'FdBNaYWfjpWN9eYghMpbRA=='),
                   'Content-Type': 'application/json' 
                   },
                   credentials: 'include', 
                   method:'POST',  
                   body: JSON.stringify(cartData)
                    }*/).then((response)=>{
                      
                          return response.json();
                          }).then((data)=>{
                            console.log(data,"respond data");
                              if (data.error) {
                              alert("Something went wrong...!");
                              }else{
                              if (data.userName !== cartData.userName) {
                                console.log("user is not same, cart item for this user is empty");
                              }else{
                                console.log("user is same");
                                let dbcartlist = data.lineItems;
                                console.log(dbcartlist,"cartlist");
                                localStorage.setItem('order', JSON.stringify(dbcartlist));
                                localStorage.setItem('products', JSON.stringify(dbcartlist));
                                console.log(JSON.parse(localStorage.getItem('order')),"neworder");
                                console.log(JSON.parse(localStorage.getItem('products')),"newproducts");

                                carodLayout.style.display = 'none';
                                //cartTotal();
                              }                
                              }
                              }).catch((err)=>{
                              console.log(err);}); 
                              console.log("updated cartlist");
    }

    function getCustomerFromStorage(){
      var selectedprod = localStorage.getItem('custCartList');
      const newprod = JSON.parse(selectedprod);
      console.log(newprod,"newprod");


                  var index;
                  var htmltable = "<table class='table table-bordered table-striped' id = 'dsTable'>"
                  htmltable+='<thead>'
                  htmltable+='<tr>';
                  /*htmltable+='<th scope="col">'+'custName'+'</th>';
                  htmltable+='<th>'+'Name'+'</th>';
                  htmltable+='<th>'+'Quantity'+'</th>';
                  htmltable+='<th scope="col">'+'Free quantity'+'</th>';
                  htmltable+='<th>'+'Rate'+'</th>';*/
                  htmltable+='</tr>';
                  htmltable+='</thead>';
                  for (var i = 0; i < newprod.length; i++) {
                    let cartLineitem = newprod[i].lineItems;
                    console.log(cartLineitem,"cartLineitem");
                      htmltable+='<tr  onclick="custclick(event)">';
                      htmltable+='<td>'+newprod[i].custName+'</td>';


                      /*for (var i = 0; i < newprod[i].lineItems.length; i++) {
                        console.log(newprod[i].lineItems,"lineItems");
                      }
                      htmltable+='<td class="prodName">'+newprod[i].lineItems[0].finalOrder.proName+'</td>';
                      htmltable+='<td>'+ '<input name="cartQuant" id="cartUpdate" autocomplete="off" onclick="update(event)" style="width: 50%; height: auto; text-align: center;" type="text" value="'+newprod[i].qty+'" />'+'</td>';
                      htmltable+='<td>'+newprod[i].freeQty+'</td>';
                      htmltable+='<td>'+'<span>&#8377;</span>'+newprod[i].proRate+'</td>';
                      //htmltable+='<td>'+'<span>&#10005;</span>'+'</td>';
                      htmltable+='<td>'+ '<input type="button" value="Delete" onclick="tableclick(event)"/>' +'</td>';*/
                      htmltable+='</tr>';

                  }document.getElementById("table").innerHTML = htmltable

        //Cart Buttons
        cartButton.style.display = 'block';//Display cart buttons.
        searchLayout.style.display = 'none';//Hide search bar.
        productLayout.style.display = 'none';//Hide product layout.
          //Onclick card close
           $('.closebtn').click(function(){
             var $target = $(this).parents('span');

             let rowId = $(this).parents('span').index();
             let rowjson = rowId -1;
             $target.hide('slow', function(){ $target.remove(); });

              var storedNames = JSON.parse(localStorage.getItem("products"));
              var storedOrder = JSON.parse(localStorage.getItem("order"));

              if (storedNames == 0) {
               localStorage.removeItem("products"); 
               localStorage.removeItem("order");  
               cartTotal(); 
              }else{
                  storedNames.splice(rowjson, 1);
                  storedOrder.splice(rowjson, 1);
                  localStorage.setItem('products', JSON.stringify(storedNames));
                  localStorage.setItem('order', JSON.stringify(storedOrder));
                  cartTotal();
              }
           });
         

    }

    function custclick(e){
      if(!e)
       e = window.event;

          cartTable.style.display = 'block'
          document.getElementById('custBack').style.display = 'block';

            let rowId = e.target.closest('tr').rowIndex;
           //deleteRow( e.target.parentNode.parentNode.rowIndex );
           let devicesArray = rowId - 1 ;
           console.log(rowId,"rowId");
           console.log(devicesArray,"devicesArray");
           localStorage.setItem('devicesArray',devicesArray);
           custDetail.style.display = 'block';
           tableContent.style.display = 'none';
           var selectedprod = localStorage.getItem('custCartList');
           const newprod = JSON.parse(selectedprod);
           console.log(newprod,"newprod");
           console.log(newprod[devicesArray].lineItems,"newprod");

           let cartLineitem = newprod[devicesArray].lineItems;

           var carttable = "<table class='table table-bordered table-striped' id = 'cartdsTable'>"
           carttable+='<thead>'
           carttable+='<tr>';
           carttable+='<th>'+'Name'+'</th>';
           carttable+='<th>'+'Quantity'+'</th>';
           carttable+='<th scope="col">'+'Free quantity'+'</th>';
           carttable+='<th>'+'Rate'+'</th>';
           carttable+='</tr>';
           carttable+='</thead>';

           for (var i = 0; i < cartLineitem.length; i++) {
             carttable+='<tr>';
             carttable+='<td class="prodName">'+cartLineitem[i].proName+'</td>';
             carttable+='<td>'+ '<input name="cartQuant" id="cartUpdate" autocomplete="off" onclick="update(event)" style="width: 50%; height: auto; text-align: center;" type="text" value="'+cartLineitem[i].qty+'" />'+'</td>';
             carttable+='<td>'+cartLineitem[i].freeQty+'</td>';
             carttable+='<td>'+'<span>&#8377;</span>'+cartLineitem[i].proRate+'</td>';
             //htmltable+='<td>'+'<span>&#10005;</span>'+'</td>';
             carttable+='<td>'+ '<input type="button" value="Delete" onclick="tableclick(event)"/>' +'</td>';
             carttable+='</tr>';
           }

           document.getElementById("cartTable").innerHTML = carttable;

             /*if(e.target.value == "Delete"){
                 let rowId = e.target.closest('tr').rowIndex;
                deleteRow( e.target.parentNode.parentNode.rowIndex );
                let cartArray = rowId - 1 ;
                console.log(rowId,"rowId");
                console.log(cartArray,"cartArray");
                cartLineitem.splice(cartArray, 1);
              }console.log(cartLineitem,"cartLineitem");*/
    }



    function cstomerlist(){

      custDetail.style.display = 'block';
      tableContent.style.display = 'block';
      cartTable.style.display = 'none'
      document.getElementById('custBack').style.display = 'none';
    }

    //Success order toast message
    function orderSuccessInfo() {
      var x = document.getElementById("orderSuccess");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 8000);
      document.getElementById('number').value = "";
    }
    //Failed order toast message
    function orderFailInfo() {
      var x = document.getElementById("orderFail");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      document.getElementById('number').value = "";
    }
    //Failed order toast message
    function orderLoginInfo() {
      var x = document.getElementById("orderLogin");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      document.getElementById('number').value = "";
    }
    function orderCheckLoginInfo() {
      var x = document.getElementById("checkLogin");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      document.getElementById('number').value = "";
    }
    //Failed order toast message
    function orderExpiryInfo() {
      var x = document.getElementById("orderExpiry");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      document.getElementById('number').value = "";
    }
    //Empty cart toast message
    function emptyCart() {
      var x = document.getElementById("emptyCart");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    //Empty qunt toast message
    function emptyQuant() {
      var x = document.getElementById("addqunt");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }



    document.getElementById('cart_btn').onclick = function(product){
      if ((localStorage.getItem("custCartList") === null) || (localStorage.getItem("custCartList") === '')) {
        emptyCart();
      }else{carodLayout.style.display = 'none';getCustomerFromStorage();
      //getProductFromStorage();      
      document.getElementById('searchCustmerLayout').style.display = 'none';
      document.getElementById('custsendbtn').style.display = 'none';
      
      cartTotal();}
    }








/*

//Cart click with API respond
    document.getElementById('cart_btn').onclick = function(product){


      if ((localStorage.getItem("username") === null) || (localStorage.getItem("username") === '')) {
        orderLoginInfo();
      }else{

        let finalProd = JSON.parse(localStorage.getItem('order'));

        const cartData = 
                    {
                        "clientId":"",
                        "lineItems":"" 
                    }
                //Inserting data in json object
                cartData.clientId = localStorage.getItem('username');
                cartData.lineItems = finalProd;
                console.log(cartData,"cartData");
                const carturl = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/orderresponsefromdb.json?n=1";
                //const carturl = "lib/json/orderresponsefromdb.json?n=1";
                //const orderurl = "https://www.tulsicorp.com/mobile-order-entry-service/createmobileorder/";
                fetch(carturl, {cache: "no-store"} /*{
                     headers: {
                     Authorization: 'Basic ' + btoa('tulsi' + ":" + 'FdBNaYWfjpWN9eYghMpbRA=='),
                     'Content-Type': 'application/json' 
                     },
                     credentials: 'include', 
                     method:'GET',  
                     body: JSON.stringify(get data from database)
                      }).then((response)=>{
                        
                            return response.json();
                            }).then((data)=>{
                              console.log(data,"respond data");
                                if (data.error) {
                                alert("Something went wrong...!");
                                }else{
                                  //console.log(data.userName,"userName");
                                  //console.log(cartData.clientId,"clientId");
                                if (data.userName !== cartData.clientId) {
                                  orderCheckLoginInfo();
                                }else{
                                  console.log("user is same");
                                  let dbcartlist = data.lineItems;
                                  console.log(dbcartlist,"cartlist");
                                  //let localproductJson = JSON.parse(localStorage.getItem('products'));
                                  //let localorderJson = JSON.parse(localStorage.getItem('order'));
                                  //console.log(localproductJson,"localstorageJson");
                                  //console.log(localorderJson,"localorderJson");
                                  //localStorage.setItem('order', JSON.stringify(storedOrder));


                                  localStorage.setItem('order', JSON.stringify(dbcartlist));
                                  localStorage.setItem('products', JSON.stringify(dbcartlist));
                                  console.log(JSON.parse(localStorage.getItem('order')),"neworder");
                                  console.log(JSON.parse(localStorage.getItem('products')),"newproducts");

                                  carodLayout.style.display = 'none';
                                  getProductFromStorage();cartTotal();
                                }                
                                }
                                }).catch((err)=>{
                                console.log(err);}); 


      }


    	/*if ((localStorage.getItem("products") === null) || (localStorage.getItem("products") === '')) {
    		emptyCart();
    	}else{carodLayout.style.display = 'none';getProductFromStorage();cartTotal();}
    }

*/
//End of cart API click 


















    document.getElementById('cart_btn1').onclick = function(product){

      if ((localStorage.getItem("username") === null) || (localStorage.getItem("username") === '')) {
        orderLoginInfo();
      }else{

        let finalProd = JSON.parse(localStorage.getItem('order'));

        const cartData = 
                    {
                        "clientId":"",
                        "lineItems":"" 
                    }
                //Inserting data in json object
                cartData.clientId = localStorage.getItem('username');
                cartData.lineItems = finalProd;
                console.log(cartData,"cartData");
                //const orderurl = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/orderresponse.json";
                const carturl = "lib/json/orderresponsefromdb.json?n=1";
                //const orderurl = "https://www.tulsicorp.com/mobile-order-entry-service/createmobileorder/";
                fetch(carturl, {cache: "no-store"} /*{
                     headers: {
                     Authorization: 'Basic ' + btoa('tulsi' + ":" + 'FdBNaYWfjpWN9eYghMpbRA=='),
                     'Content-Type': 'application/json' 
                     },
                     credentials: 'include', 
                     method:'GET',  
                     body: JSON.stringify(get data from database)
                      }*/).then((response)=>{
                        
                            return response.json();
                            }).then((data)=>{
                              console.log(data,"respond data");
                                if (data.error) {
                                alert("Something went wrong...!");
                                }else{
                                  //console.log(data.userName,"userName");
                                  //console.log(cartData.clientId,"clientId");
                                if (data.userName !== cartData.clientId) {
                                  orderLoginInfo();
                                }else{
                                  console.log("user is same");
                                  let dbcartlist = data.lineItems;
                                  console.log(dbcartlist,"cartlist");
                                  //let localproductJson = JSON.parse(localStorage.getItem('products'));
                                  //let localorderJson = JSON.parse(localStorage.getItem('order'));
                                  //console.log(localproductJson,"localstorageJson");
                                  //console.log(localorderJson,"localorderJson");
                                  localStorage.setItem('order', JSON.stringify(dbcartlist));
                                  localStorage.setItem('products', JSON.stringify(dbcartlist));
                                  //localStorage.setItem('order', JSON.stringify(storedOrder));
                                  console.log(JSON.parse(localStorage.getItem('order')),"neworder");
                                  console.log(JSON.parse(localStorage.getItem('products')),"newproducts");

                                  carodLayout.style.display = 'none';
                                  getProductFromStorage();cartTotal();
                                }                
                                }
                                }).catch((err)=>{
                                console.log(err);}); 


      }



    	/*if ((localStorage.getItem("products") === null) || (localStorage.getItem("products") === '')) {
    		emptyCart();
    	}else{carodLayout.style.display = 'none';getProductFromStorage();cartTotal();}*/
    }
    //Checkbox
  /*  function onSelect(){
        var checkBox = document.getElementById("cartCheck");
        var checkboxesChecked = [];
        //var text = document.getElementById("text");
          if (checkBox.checked == true){
            //Get rowID and slice for card 
            var html = document.querySelector(".checkPag");
            for (var i=0; i<html.length; i++) {
                console.log("html",html);
                checkboxesChecked.push(html);
            }
            console.log("html",html);
          } else {
             //text.style.display = "none";
          }
    }*/
    //Date
    let now = new Date();
    
       if (now.getDay() == 0) {
        var nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);        
        let day = ("0" + nextDay.getDate()).slice(-2);
        let month = ("0" + (nextDay.getMonth() + 1)).slice(-2);

        let monday = (day)+"-"+(month)+"-"+ nextDay.getFullYear(); 
        document.getElementById("datePickers").defaultValue = monday;
    }else{

        
        let day = ("0" + now.getDate()).slice(-2);
        let month = ("0" + (now.getMonth() + 1)).slice(-2);

        let today = (day)+"-"+(month)+"-"+ now.getFullYear(); 
        document.getElementById("datePickers").defaultValue = today;
    }
        

    //Cart Continue Shopping Button
    function continueShopping(){
    	location.href="index.html";
    }
    //Cart Check Out Button
    function checkOut(){
       let user = document.getElementById('navlogout').innerHTML;
        let finalProd = JSON.parse(localStorage.getItem('order'));
        for (var i = 0; i < finalProd.length; i++) {
            let selectedorder = finalProd[i].finalOrder;
                let somearry = [];
                somearry.push(selectedorder);
        }
        /*/check box
         let cartcheck = document.getElementById("cartCheck").checked; 
        if (cartcheck == true) {

        }*/
        //let dateinfo = document.getElementById('dateValue').innerHTML;
        //console.log(dateinfo,"dateinfo");
        //console.log("user",user);

        const shopdata = 
                    {
                        "clientId":"1234",
                        "systemId":"2010",
                        "orderReferenceNo":"",
                        "orderDate":"",
                        "customerCode":"", 
                        "expiryDate": "",
                        "expiryNumber": "",
                        "repCode":"",
                        "sessionType":"",
                        "lineItems":"" 
                    }
                //Inserting data in json object
                shopdata.orderReferenceNo = localStorage.getItem('refnum');
                shopdata.orderDate = document.getElementById('datePickers').value;
                shopdata.sessionType = document.getElementById('sessiontype').value;

                if ((localStorage.getItem("username") === null)) {
                    orderLoginInfo();
                }else{
                    shopdata.customerCode = localStorage.getItem('username');
                }

                if ((localStorage.getItem("expiryNumber") !== null)) {
                    var targetExpiry = localStorage.getItem('expiryNumber');
                    let eDate = targetExpiry.substring(0, 10);
                    let eNum = targetExpiry.substring(12,19);
                    shopdata.expiryDate = eDate;
                    shopdata.expiryNumber = eNum;
                }
                shopdata.repCode = localStorage.getItem('repCode');
                shopdata.lineItems = finalProd;
                if (((shopdata.lineItems == null) || (shopdata.lineItems == ''))) {
                    emptyCart();
                }
                else{

                    if (((shopdata.customerCode === null) || (shopdata.customerCode === ''))) {orderFailInfo();}
                    else{
                        ////////////////////////////////////////////////////////////
                        ////////////////////////////////////////////////////////////
                        
                        
                        //shopdata.customerCode = "9500"; // Till we finish testing
                        
                        
                        ////////////////////////////////////////////////////////////
                        ////////////////////////////////////////////////////////////
                        const orderurl = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/orderresponse.json";
                        //const orderurl = "../tulsicorp/lib/json/orderresponse.json";
                        //const orderurl = "https://www.tulsicorp.com/mobile-order-entry-service/createmobileorder/";
                        fetch(orderurl, /*{
                             headers: {
                             Authorization: 'Basic ' + btoa('tulsi' + ":" + 'FdBNaYWfjpWN9eYghMpbRA=='),
                             'Content-Type': 'application/json' 
                             },
                             credentials: 'include', 
                             method:'POST',  
                             body: JSON.stringify(shopdata)
                              }*/console.log(orderurl,"data")).then((response)=>{
                                
                                    return response.json();
                                    }).then((data)=>{
                                        if (data.error) {
                                        alert("Something went wrong...!");
                                        }else{
                                        if (data.responseCode == '0000') {
                                          orderSuccessInfo();
                                          console.log(shopdata,"shopdata");
                                            alert("Order Number : " + data.orderNo);
                                                localStorage.removeItem("products");
                                                localStorage.removeItem("order");
                                                localStorage.removeItem("expiryNumber");
                                            cartTotal();
                                               document.getElementById('newrow').innerHTML = "";
                                               document.getElementById('table').innerHTML = "";
                                               document.getElementById('quantinput').innerHTML = "";
                                        }else{
                                          orderFailInfo();

                                        }                
                                        }
                                        }).catch((err)=>{
                                        console.log(err);});                                        
                    }
                }
                
                
    	
    }




//Cart toatal
function cartTotal(){
    var selectedqunt = localStorage.getItem('products');
    const proddetails = JSON.parse(selectedqunt);
    let sum = [];
    var tot=0;

    if ((localStorage.getItem('products') === null) || (localStorage.getItem('products') === '')) {
        document.getElementById("prodTotal").innerHTML = "Total Order Value : "  +'<span> &#8377; </span>' + "00.00";
        document.getElementById("prodTotalTable").innerHTML = "Total Order Value : "  +'<span> &#8377; </span>' +"00.00";
    }else{
        if ((proddetails == null) || (proddetails == '')) {
            document.getElementById("prodTotal").innerHTML = "Total Order Value : "  +'<span> &#8377; </span>' + "00.00";
            document.getElementById("prodTotalTable").innerHTML = "Total Order Value : "  +'<span> &#8377; </span>' +"00.00";
        }else{
            for (var i = 0; i < proddetails.length; i++) {
                var prodtotal = proddetails[i].qty * proddetails[i].proRate;
                sum.push(prodtotal);
                let total = sum.reduce((a, b) => a + b, 0)
                document.getElementById("prodTotal").innerHTML = "Items: "+proddetails.length+" Total Value : "  +'<span> &#8377; </span>' +total.toFixed(2);
                document.getElementById("prodTotalTable").innerHTML = "Items: "+proddetails.length+" Total Value : "  +'<span> &#8377; </span>' +total.toFixed(2);                
            }
        }
    
    }
}




//Expiry fetch
let expirydetails = document.getElementById('expirydetails');
const expiryList = document.getElementById('expirylist');
expirydetails.addEventListener("click", (e)=>{
    e.preventDefault();
    if (((localStorage.getItem('username') === null) || (localStorage.getItem('username') === ''))) {orderLoginInfo();}
    else{

        let expiryurl = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/custexpiryresponse.json";
        //let expiryurl = "https://www.tulsicorp.com/mobile-order-entry-service/getmobilecustomerdetailspercustomer/";
        //Fetch customerurl
        fetch(expiryurl, /* + localStorage.getItem('username'),{
            method: 'POSTJSON.stringify(clientdata',
            headers:    {
                    'Content-Type': 'application/json',
                   },
                    body: JSON.stringify(data),
                }*/).then((response)=>{
                    return response.json();
                    }).then((data)=>{
                        data.expiryDetails.forEach(function(element){
                            expiryList.insertAdjacentHTML( 'beforeend',"<li>" + element.expiryDate + ' - '  + element.expiryNumber + ' - '  + element.amount +  " </li>");
                        });
                        if (data.error) {
                        alert("Error password or username");
                        }else{

                        }
                        }).catch((err)=>{
                        console.log(err);});
    }
    });
expiryList.addEventListener('click', function(e){
    var target = e.target.innerText;
    //Store in localstorage
    localStorage.setItem('expiryNumber',target);
    var targetExpiry = localStorage.getItem('expiryNumber');
    expirydetails.innerText = targetExpiry;
});
