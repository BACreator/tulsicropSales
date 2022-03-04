//Input form message
function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form_message");

    messageElement.textContent = message;
    messageElement.classList.remove("form_message_success","form_message_error");
    messageElement.classList.add(`form_message_${type}`);
}
//setFormMessage(loginForm,"success","You're logged in!");
//Input form error message
function setInputError(inputElement, message){
    inputElement.classList.add("form_input_error");
    inputElement.parentElement.querySelector(".form_input_error_message").textContent = message;
}
//Remove Input error message
function clearInputError(inputElement){
    inputElement.classList.remove("form_input_error");
    inputElement.parentElement.querySelector(".form_input_error_message").textContent = "";
}


//Sign in and Sign up Layout
document.addEventListener("DOMContentLoaded",()=>{//once DOM content is lodede
    const loginForm = document.querySelector("#login");//Initiate form signIn layout Id
    const createAccountForm = document.querySelector("#createAccount");//Initiate form signUp layout Id

    //Toggle between signIn and signUp Layout
    document.querySelector("#linkCreateAccount").addEventListener("click",e =>{
        e.preventDefault();
        loginForm.classList.add("form_hidden");
        createAccountForm.classList.remove("form_hidden");
    });
    document.querySelector("#linklogin").addEventListener("click",e =>{
        e.preventDefault();
        loginForm.classList.remove("form_hidden");
        createAccountForm.classList.add("form_hidden");
    });

    //Form validation
    document.querySelectorAll(".form_input").forEach(inputElement =>{
        inputElement.addEventListener("blur", e =>{
            if(e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 4){
                setInputError(inputElement, "Username must be at least 4 characters in length.");
            };
            if(e.target.id === "signuppassword" && e.target.value.length > 0 && e.target.value.length < 8){
                setInputError(inputElement, "Username must be at least 8 characters in length.");
            };
        });

        //Clear Input field
        inputElement.addEventListener("input", e =>{clearInputError(inputElement);});
    });



    //On submit event
    loginForm.addEventListener("submit", e =>{
        e.preventDefault();//prevents submit on refresh
        //Preform AJAX/Fetch login
        setFormMessage(loginForm,"error","Invalid username/password combination");
    });
});