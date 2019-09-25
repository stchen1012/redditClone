console.log('hello world');

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
        newPost.innerHTML = `<h2>Post Title: ${postObject.postTitle}</h2> Description: ${postObject.postDescription} <br> <h4 id="usernamePost">Username: ${postObject.postUser}</h4>`
        postDiv.appendChild(newPost);
    }
}

function Post(postId, postTitle, postDescription, postUser) {
    this.postId = postId;
    this.postTitle = postTitle;
    this.postDescription = postDescription;
    this.postUser = postUser;
<<<<<<< HEAD
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
=======
<<<<<<< HEAD
}

// list of user posts
const usernameTextElement = document.getElementById('usernamePost');

usernameTextElement.addEventListener('click', onUsernameClick);

function onUsernameClick(event) {
    event.preventDefault();
    console.log('click');
    let userId = document.getElementById('usernamePost').value;
    //need to retrieve the generated token from password creation
    fetch(`http://thesi.generalassemb.ly:8080/user/post`)
    .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        removeGifs();
        handleResponse(response);
      })
      .catch((err) => {
        console.log(err);
      })
}


// signup
function signUpUser(){
    let userEmail = document.getElementById('inputEmail').value;
    let userInputName = document.getElementById('inputUsername').value;
    let userPassword = document.getElementById('inputPassword').value;

        fetch("http://thesi.generalassemb.ly:8080/signup", {
>>>>>>> b1cb4d94e297827a995d4a3426979aef15b13a16
           method: 'post',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
           body: JSON.stringify({
<<<<<<< HEAD
               email: logEmail,
               password: logPassword,
=======
               email: userEmail,
               username: userInputName,
               password: userPassword,
>>>>>>> b1cb4d94e297827a995d4a3426979aef15b13a16
           })
       })
           .then((response )=> {
               return response.json();
           })
           .then((json) =>{
               console.log(json);
               alert("Sign in Successful");
<<<<<<< HEAD
               window.location.replace("file:///Users/marcus/Documents/generalAssembly/projects/redditClone/index.html");
           })
           .catch(function(error){
               console.log(error);
=======
           })
           .catch(function(error){
>>>>>>> b1cb4d94e297827a995d4a3426979aef15b13a16
               alert("User Failed To Sign");
           })
}

<<<<<<< HEAD
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
=======

//  login
// fetch("http://thesi.generalassemb.ly:8080/login", {
//            method: 'post',
//            headers:{
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//            body: JSON.stringify({
//                email: "grabber@grabber.com",
//                password: "grab",
//            })
//        })
//            .then((response )=> {
//                return response.json();
//            })
//            .then((json) =>{
//                console.log(json);
//            })
//            .catch(function(error){
//                alert("Please Try Again");
//            })

=======
}
>>>>>>> 1186c6fb42323748e8052219f2f0a5c8a15160df
>>>>>>> b1cb4d94e297827a995d4a3426979aef15b13a16
