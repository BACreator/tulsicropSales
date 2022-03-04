window.addEventListener('load',() =>{

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

})