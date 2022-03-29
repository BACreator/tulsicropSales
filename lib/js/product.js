/*window.addEventListener('load',() =>{

	//Retrive local storage value before it dies.
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

	//console.log(window.location.pathname,"productJslocationlocation");

})*/
const searchLayout = document.getElementById('search_layout');
//const productLayout = document.getElementById('product_layout');
//const divhide = document.getElementById('viewhide');

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
    	//Cart Continue Shopping Button
    	let btn = document.createElement("button");
    	btn.innerHTML = "Continue Shopping";
    	btn.className ="btn btn-warning mb-2 mt-";
    	btn.addEventListener("click", function () {
    		location.href="index.html";
    	});
    	document.getElementById("cart_button").appendChild(btn); 

    	//Cart Check Out Button
    	let button = document.createElement("button");
    	button.innerHTML = "Check Out";
    	button.className ="btn btn-success mb-2 mt-";
    	button.addEventListener("click", function () {
    	  alert("Check Out is clicked");
    	});
    	document.getElementById("cart_button").appendChild(button); 

    	searchLayout.style.display = 'none';
    	productLayout.style.display = 'none';
    	divhide.style.display = 'none';

    	

    		/*document.getElementById('removeFromCart').onclick = function(e){
    			alert("Row index is: " + e.rowIndex);
    		console.log("remove button is clicked");
    	}*/
    }
    function emptyCart() {
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    document.getElementById('cart_btn').onclick = function(product){
    	if (localStorage.getItem("products") === null) {
    		emptyCart();
    	}else{getProductFromStorage();}
    	

    
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