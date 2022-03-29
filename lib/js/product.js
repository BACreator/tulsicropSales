const searchLayout = document.getElementById('search_layout');
const cartButton = document.getElementById('cart_button');

//Get all the selected product info from local storage
    function getProductFromStorage(){
    	console.log("I'm in getProductFromStorage");
    	var selectedprod = localStorage.getItem('products');
    	const newprod = JSON.parse(selectedprod);
    	console.log(newprod,"newprod");
    	var index;
    	var html = "<table class='table table-bordered table-striped'>"
    	html+='<thead>'
    	html+='<tr>';
    	html+='<th scope="col">'+'M.R.P.'+'</th>';
    	html+='<th>'+'Name'+'</th>';
    	html+='<th>'+'Quantity'+'</th>';
    	html+='<th>'+'Rate'+'</th>';
    	html+='</tr>';
    	html+='</thead>';
    	for (var i = 0; i < newprod.length; i++) {
    		html+='<tr onclick="myFunction(this)">';
    		html+='<td>'+newprod[i].proId+'</td>';
    		html+='<td>'+newprod[i].proName+'</td>';
    		html+='<td>'+newprod[i].proQuant+'</td>';
    		html+='<td>'+'<span>&#8377;</span>'+newprod[i].proRate+'</td>';
    		html+='<td>'+'<span>&#10005;</span>'+'</td>';
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
    //Empty cart toast message
    function emptyCart() {
      var x = document.getElementById("emptyCart");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    document.getElementById('cart_btn').onclick = function(product){
    	if (localStorage.getItem("products") === null) {
    		emptyCart();
    	}else{getProductFromStorage();}
    }
    //Cart Continue Shopping Button
    function continueShopping(){
    	location.href="index.html";
    }
    //Cart Check Out Button
    function checkOut(){
    	alert("Check Out is clicked");
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

    	}