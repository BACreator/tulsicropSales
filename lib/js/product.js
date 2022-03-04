window.addEventListener('load',() =>{

	//Retrive local storage value before it dies.
	var selectedId = localStorage.getItem('liId');
	var selectedName = localStorage.getItem('liText');

	console.log(selectedId,"selectedId");
	console.log(selectedName,"selectedName");

	document.getElementById('prod_name').innerHTML = selectedName;
	document.getElementById('prod_id').innerHTML = selectedId;

})