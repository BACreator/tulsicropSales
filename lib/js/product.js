const searchLayout = document.getElementById('search_layout');
const cartButton = document.getElementById('cart_button');
//var selectedprod = localStorage.getItem('products');
//const newprod = JSON.parse(selectedprod);

//Get all the selected product info from local storage
    function getProductFromStorage(){
    	console.log("I'm in getProductFromStorage");
    	var selectedprod = localStorage.getItem('products');
    	const newprod = JSON.parse(selectedprod);
    	console.log(newprod,"newprod");
    	var index;
    	var html = "<table class='table table-bordered table-striped' id = 'dsTable'>"
    	html+='<thead>'
    	html+='<tr>';
    	html+='<th scope="col">'+'M.F.R.'+'</th>';
    	html+='<th>'+'Name'+'</th>';
    	html+='<th>'+'Quantity'+'</th>';
    	html+='<th>'+'Rate'+'</th>';
    	html+='</tr>';
    	html+='</thead>';
    	for (var i = 0; i < newprod.length; i++) {
    		html+='<tr>';
            html+='<td>'+'<input type="checkbox" id="" name="" value="">'+'</td>';
    		html+='<td>'+newprod[i].proId+'</td>';
    		html+='<td>'+newprod[i].proName+'</td>';
    		html+='<td>'+ '<input onkeydown="searchqnty(this)" style="width: 50%; height: auto; text-align: center;" type="text" value="'+newprod[i].proQuant+'" />' +'</td>';         
    		html+='<td>'+''+newprod[i].proRate+'</td>';//<!--span>&#8377;</span-->
            html+='<td onclick="tableclick(event)">'+ '<input type="button" value="Delete" />' +'</td>';
    		html+='</tr>';



    	}document.getElementById("table").innerHTML = html
    	//Cart Buttons
    	cartButton.style.display = 'block';//Display cart buttons.
    	searchLayout.style.display = 'none';//Hide search bar.
    	productLayout.style.display = 'none';//Hide product layout.
    	divhide.style.display = 'none';//Hide login layout.

    	

    		/*document.getElementById('removeFromCart').onclick = function(e){
    			alert("Row index is: " + e.rowIndex);
    		console.log("remove button is clicked");
    	}*/

        
        
    }

    function searchqnty(ele) {
        var newqty = ele.value;
        ele.stopPropagation();
            console.log(newqty);
        if(event.target === 'input') {
            var newqty = ele.value;
            console.log(newqty);       
        }
    }

    //Empty cart toast message
    function emptyCart() {
      var x = document.getElementById("emptyCart");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    document.getElementById('cart_btn').onclick = function(product){
    	if ((localStorage.getItem("products") === null) || (localStorage.getItem("products") === '')) {
    		emptyCart();
    	}else{getProductFromStorage();}
    }
    //Cart Continue Shopping Button
    function continueShopping(){
    	location.href="index.html";
    }
    //Cart Check Out Button
    function checkOut(){
    	alert("Clearing localStorage");
        localStorage.clear();
        location.href="index.html";
        //tableToJson(table);
    }

    function deleteRow(row) {
        //alert(row);
        // var d = row.parentNode.parentNode.rowIndex;
        document.getElementById('dsTable').deleteRow(row);
    }

    function tableclick(e) {
        if(!e)
         e = window.event;
        
        if(e.target.value == "Delete"){
            let rowId = e.target.closest('tr').rowIndex;
            console.log(rowId,"rowId");
           deleteRow( e.target.parentNode.parentNode.rowIndex );
           let devicesArray = rowId - 1 ;
           console.log(devicesArray,"devicesArray");
           var storedNames = JSON.parse(localStorage.getItem("products"));
           console.log(storedNames,"storedNames");
           storedNames.splice(devicesArray, 1);
           localStorage.setItem('products', JSON.stringify(storedNames));
       //console.log(e.target.parentNode.parentNode.rowIndex,"deletedRow");
       //console.log(newprod,"newprod");
       }
       if (document.querySelectorAll("#table tr").length == 0) {
        console.log("table is empty");
       }
       //const isEmpty = document.querySelectorAll("#table tr").length <= 1;
       //console.log(isEmpty);
       //localStorage.clear();
    }
    /*function tableToJson(table) { 
        var data = [];
        for (var i=1; i<table.rows.length; i++) { 
            var tableRow = table.rows[i]; 
            var rowData = []; 
            for (var j=0; j<tableRow.cells.length; j++) { 
                rowData.push(tableRow.cells[j].innerHTML);; 
            } 
            data.push(rowData); 
            console.log(rowData,"rowData");
        } 
        return data; 
        console.log(data,"data");
    }*/


   /* function deleteRow(e) {
        if(!e)
             e = window.event;
            console.log("deleteWindow");

            if(e.target.value == "Delete")
               deleteRow( e.target.parentNode.parentNode.rowIndex );
           console.log("deleteEtarget");
    }

	function myFunction(x) {

    	  console.log("Row index is: " + x.rowIndex);
    	  let index = x.rowIndex;
    	  console.log(index,"index");
    	  //localStorage.removeItem("products[index]");    	  
    	  var selectedprod = localStorage.getItem('products');
    	  const newprod = JSON.parse(selectedprod);
    	  console.log(newprod,"newindex");
    	  //delete newprod[index];
    	  let removedprod = newprod.splice("index");
    	  console.log(removedprod,"removedprod");
    	  console.log(newprod,"newprod");

    	}*/


//Cart toatal
function cartTotal(){
    alert(document.getElementById("dsTable").rows[1].cells.item(2).innerHTML);
    alert(document.getElementById("dsTable").rows[1].cells.item(3).innerHTML);
}

//Expiry fetch
let expirydetails = document.getElementById('expirydetails');
const expiryList = document.getElementById('expirylist');
expirydetails.addEventListener("click", (e)=>{
    e.preventDefault();
    let expiryurl = "https://raw.githubusercontent.com/BACreator/tulsicorp/main/lib/json/custexpiryresponse.json";
    //Fetch customerurl
    fetch(expiryurl, /*{
        method: 'POSTJSON.stringify(clientdata',
        headers:    {
                'Content-Type': 'application/json',
               },
                body: JSON.stringify(data),
            }*/).then((response)=>{
                return response.json();
                }).then((data)=>{
                    console.log(data,"data");
                    data.expiryDetails.forEach(function(element){
                        expiryList.insertAdjacentHTML( 'beforeend',"<li>" + element.expiryNumber +  " </li>");
                    });
                    //let expiryDetail = data.expiryDetails;
                    //console.log(expiryDetail,"expiryDetail");
                    /*for (var i = 0; i < expiryDetail.length; i++) {
                        let expiryNumber = expiryDetail[i].expiryNumber;
                        console.log(expiryNumber,"expiryNumber")
                        document.getElementById('customerExpiry').innerHTML = expiryNumber;
                    }*/
                    if (data.error) {
                    alert("Error password or username");
                    }else{

                    }
                    }).catch((err)=>{
                    console.log(err);});
    });
expiryList.addEventListener('click', function(e){
    var target = e.target.innerText;
    //console.log("target",target);
    //Store in localstorage
    localStorage.setItem('expiryNumber',target);
    var targetExpiry = localStorage.getItem('expiryNumber');
    expirydetails.innerText = targetExpiry;
});














/*

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
            //addToCartList(productInfo);
            saveProductInStorage(productInfo);
            
        }

        //Save selected product in localstorage
           function saveProductInStorage(item){
               let products = getProductFromStorage();
               console.log(selectedId,"selectedId");
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