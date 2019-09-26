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
           .then(function(json){
            console.log(json);
            if(json.httpStatus != "BAD_REQUEST"){
             alert("New User Created");
             //    window.location.replace("file:///Users/marcus/Documents/generalAssembly/projects/redditClone/index.html");
             window.location.replace("index.html");
             userLoggedIn = true;
             //document.getElementById('createPostButton').style.visibility != "hidden";
             //    let loginButton = document.getElementById("loginButton");
             //    loginButton.innerHTML = "Sign Out"
            } else {
                alert("Failed To Create User")
                location.reload();
            }
        })
           .catch(function(error){
               console.log(error);
               alert("Failed To Create User");
           })

}
