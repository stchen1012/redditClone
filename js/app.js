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
        alert("Please Try Again");
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
        newPost.innerHTML = `<h2>Post Title: ${postObject.postTitle}</h2>, Post Description: ${postObject.postDescription}, User: ${postObject.postUser}`
        postDiv.appendChild(newPost);
    }
}

function Post(postId, postTitle, postDescription, postUser) {
    this.postId = postId;
    this.postTitle = postTitle;
    this.postDescription = postDescription;
    this.postUser = postUser;
}

// signup
function signUpUser(){
    let userEmail = document.getElementById('inputEmail').value;
    let userInputName = document.getElementById('inputUsername').value;
    let userPassword = document.getElementById('inputPassword').value;

        fetch("http://thesi.generalassemb.ly:8080/signup", {
           method: 'post',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
           body: JSON.stringify({
               email: userEmail,
               username: userInputName,
               password: userPassword,
           })
       })
           .then((response )=> {
               return response.json();
           })
           .then((json) =>{
               console.log(json);
               alert("Sign in Successful");
           })
           .catch(function(error){
               alert("User Failed To Sign");
           })
}


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

