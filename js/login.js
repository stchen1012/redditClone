var loginForm = document.querySelector('.form-login');
var signupForm = document.querySelector('.form-signup');
 
//If it isn't "undefined" and it isn't "null", then it exists.
if(typeof(loginForm) != 'undefined' && loginForm != null){
    loginForm.addEventListener('submit', loginUser);
    console.log('login page');
} else if(typeof(signupForm) != 'undefined' && signupForm != null) {
    document.querySelector('.form-signup').addEventListener('submit', signupUser);
    console.log('signup page');
} else {
    // console.log('none');
}

// login function
function loginUser(event){
    event.preventDefault();
    let logEmail = document.getElementById('inputEmail').value;
    let logPassword = document.getElementById('inputPassword').value;

        fetch("http://localhost:8080/redditBackend/user/login", {
           method: 'post',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
           body: JSON.stringify({
               username: logEmail,
               password: logPassword,
           })
       })
           .then((response)=> {
               return response.json();
           })
           .then(function(json){
               console.log("REACHED???")
               console.log(">>>>>>" + json);
               
            //    if(json.httpStatus != "BAD_REQUEST"){
                if(json.token != null){
                   console.log(json.token);
                sessionStorage.setItem("userToken", json.token); 
                sessionStorage.setItem("userLoginStatus", true);
                sessionStorage.setItem('username', logEmail); //json object won't return a username since its just a token, updated it to set username to user defined value
                window.location.replace("index.html");
               } else {
                alert("incorrect credentials");
                   location.reload();//error msg  
               }
           })
           .catch(function(error){
               console.log('.catch')
               console.log(error);
           })
}