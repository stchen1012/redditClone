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

        fetch("http://thesi.generalassemb.ly:8080/login", {
           method: 'post',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
           body: JSON.stringify({
               email: logEmail,
               password: logPassword,
           })
       })
           .then((response)=> {
               return response.json();
           })
           .then(function(json){
               console.log(json);
               
               if(json.httpStatus != "BAD_REQUEST"){
                localStorage.setItem("userToken", json.token); 
                sessionStorage.setItem("userLoginStatus", true);
                localStorage.setItem('username', json.username);
                window.location.replace("index.html");
               } else {
                   location.reload();//error msg
               }
           })
           .catch(function(error){
               console.log('.catch')
               console.log(error);
           })
}