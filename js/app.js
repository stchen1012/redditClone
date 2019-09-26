console.log('hello world');

//document.getElementById('createPostButton').style.visibility = "hidden";

document.addEventListener('DOMContentLoaded', function(e){
    fetchPost('');
});


//  get all post
function fetchPost(){
    fetch("http://thesi.generalassemb.ly:8080/post/list", {
        method: 'GET',
    })
    .then((response )=> {
        return response.json();
    })
    .then((response) =>{
        console.log(response);
        handleResponse(response);
        onUserClick();
    })
    .catch(function(error){
        console.log("Please Try Again");
    })
}

//Listing posts for homepage
const postDiv = document.getElementById('postDiv');

function handleResponse(response) {
    for (let i =0; i < 11; i++) {
        let postObject = new Post(response[i].id, response[i].title, response[i].description, response[i].user.username);
        console.log(postObject);
        let newPost = document.createElement('div');
        newPost.setAttribute('class', 'postDiv');
        newPost.innerHTML = `<h2>Post Title: ${postObject.postTitle}</h2>, Post Description: ${postObject.postDescription}, <h4 id="usernamePost">User: ${postObject.postUser}</h4>`
        postDiv.appendChild(newPost);
    }
}

function Post(postId, postTitle, postDescription, postUser) {
    this.postId = postId;
    this.postTitle = postTitle;
    this.postDescription = postDescription;
    this.postUser = postUser;
}

// list of user posts
function onUserClick() {
    const usernameTextElement = document.querySelectorAll('h4');
    console.log(document.querySelectorAll('h4'), 'entire query selector');
    // const usernameTextElement = document.getElementById('usernamePost')
    console.log(usernameTextElement, 'from variable name');
    for (let i=0; i < usernameTextElement.length; i++) {
        console.log(i);
        usernameTextElement[i].addEventListener('click', onUsernameClick);
    }
}



function onUsernameClick(event) {
    //event.preventDefault();
    console.log('click');
    //let userId = document.getElementById('usernamePost').value;
    //need to retrieve the generated token from password creation
    //does the backend expect the bearer token is stored in cookie or in post body
    // fetch(`http://thesi.generalassemb.ly:8080/user/post`)
    // .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     handleResponse(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
}


//Attempt to get the element using document.getElementById
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
    console.log('none');
}

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
               if (json.httpStatus != "BAD_REQUEST") {
                alert("Sign in Successful");
                //    window.location.replace("file:///Users/marcus/Documents/generalAssembly/projects/redditClone/index.html");
                window.location.replace("index.html");
                //document.getElementById('createPostButton').style.visibility != "hidden";
                //    let loginButton = document.getElementById("loginButton");
                //    loginButton.innerHTML = "Sign Out"
               } else {
                   alert("Please try again. Your username or password may be incorrect")
               }
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
            //    window.location.replace("file:///Users/marcus/Documents/generalAssembly/projects/redditClone/index.html");
            window.location.replace("index.html");
           })
           .catch(function(error){
               console.log(error);
               alert("Failed To Create User");
           })
}