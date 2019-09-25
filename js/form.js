// document.querySelector('.form-login').addEventListener('submit', loginUser);
document.querySelector('.form-signup').addEventListener('submit', signupUser);

// login
function loginUser(event){
    event.preventDefault();
    let logEmail = document.getElementById('inputEmail').value;
    console.log(inputEmail);
    let logPassword = document.getElementById('inputPassword').value;
    console.log(inputPassword);

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
           .then((response )=> {
               return response.json();
           })
           .then((json) =>{
               console.log(json);
               alert("Sign in Successful");
               window.location.replace("file:///Users/marcus/Documents/generalAssembly/projects/redditClone/index.html");
           })
           .catch(function(error){
               console.log(error);
               alert("User Failed To Sign");
           })
}


//  signup
function signupUser(event){
    console.log('signupUser called');
    event.preventDefault();
    let inputEmail = document.getElementById('inputEmail').value;
    console.log(inputEmail);
    let inputUsername = document.getElementById('inputUsername').value;
    console.log(inputUsername);
    let inputPassword = document.getElementById('inputPassword').value;
    console.log(inputPassword);

        fetch("http://thesi.generalassemb.ly:8080/signup", {
           method: 'post',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
           body: JSON.stringify({
               email: inputEmail,
               username: inputUsername,
               password: inputPassword,
           })
       })
           .then((response )=> {
               return response.json();
           })
           .then((json) =>{
               console.log(json);
               alert("New User Created");
               window.location.replace("file:///Users/marcus/Documents/generalAssembly/projects/redditClone/index.html");
           })
           .catch(function(error){
               console.log(error);
               alert("Failed To Create User");
           })
}