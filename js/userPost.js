console.log('userPost Page')

document.addEventListener('DOMContentLoaded', function(e){
    if(sessionStorage.userLoginStatus != 'true'){
        window.location.replace('index.html')
    } else {
        loadUserPost('');
        loadUserComments();
        if(localStorage.username == undefined){
            loggedInUsername.innerHTML = 'Hi Guest';
        } else {
            loggedInUsername.innerHTML = 'Hi ' + localStorage.username;
        }
    }
});

const postButton = document.getElementById('createPostButton');
const signUpButton = document.getElementById('signupButton');

let loggedInUsername = document.getElementById('usernameDisplay');


const postDiv = document.getElementById('postDiv');

// function to load in User Posts
function loadUserPost(){
    console.log('you loaded the user post');

    //http://thesi.generalassemb.ly:8080/user/post
    fetch(`http://localhost:8080/redditBackend/post/list/${localStorage.username}`, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.userToken}`
        },
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

function handleResponse(response) {
    let reverseArray = response.reverse();
    for (let i =0; i < 20; i++) {
        let postObject = new Post(reverseArray[i].id, reverseArray[i].title, reverseArray[i].description, reverseArray[i].user.username);
        let newPost = document.createElement('div');
        newPost.setAttribute('class', 'postDiv');
        newPost.setAttribute('data-id', reverseArray[i].id)
        newPost.innerHTML = `<h2>Post Title: ${postObject.postTitle}</h2> <h5>Id: ${postObject.postId}</h5> Post Description: ${postObject.postDescription} <h5>User: ${postObject.postUser}</h5> <button type="button" class="deletePostClass" onclick="alert('This post will be removed when API works')">Delete</button>`;
        postDiv.appendChild(newPost);
        //adding below lines of code for future use when delete Post API is functional
        //let deletePostButton = document.getElementsByClassName('deletePostClass').item(i);
        //deletePostButton.addEventListener('click', deletePost);
    }
}

function Post(postId, postTitle, postDescription, postUser) {
    this.postId = postId;
    this.postTitle = postTitle;
    this.postDescription = postDescription;
    this.postUser = postUser;
}


const commentPostDiv = document.getElementById('commentDiv');

// function to load in User Comments
function loadUserComments(){
    console.log('you loaded the user comments');
    fetch(`http://localhost:8080/redditBackend/comment/list/${localStorage.username}`, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.userToken}`
        },
    })
    .then((response )=> {
        return response.json();
    })
    .then((response) => {
        console.log(response);
        onCommentResponse(response);
    })
    .catch(function(error){
        console.log("Please Try Again");
    })
}

// function to render DOM for comments
function onCommentResponse(response) {
    for (let i=0; i < response.length; i++) {
        let userCommentDiv = document.createElement('div');
        userCommentDiv.setAttribute('class', 'commentDiv');
        userCommentDiv.setAttribute('data-id', response[i].id);
        userCommentDiv.innerHTML = `<h3><u>Comment</u></h3> ${response[i].text} <h4>User: ${response[i].user.username} </h4> <button type="button" class="deleteButtonClass" data-id="${response[i].id}">Delete</button>`
        commentPostDiv.appendChild(userCommentDiv);
        let formButton = document.getElementsByClassName('deleteButtonClass').item(i);
        formButton.addEventListener('click', deleteComment);
    } 
}

// function to delete comments
function deleteComment(event) {
    event.preventDefault();
    console.log(event);
    let commentId = event.target.dataset.id;
    fetch(`http://localhost:8080/redditBackend/comment/${commentId}`, {
           method: 'DELETE',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
    }).then((response )=> {
        return response.json();
    }).then(function(response){
        console.log(response);
        if(response.httpStatus != "BAD_REQUEST"){
            alert("Comment deleted");
        }
        else{
            alert("Try again")
        }
    }).catch(function(error){
            console.error(error, "error message");
    })
}


// function to delete Posts - API not working but adding in for later use
// function deletePost(event) {
//     event.preventDefault();
//     let specificIdForPost = event.target.dataset.id;
//     fetch(`http://localhost:8080/redditBackend/post/${specificIdForPost}`, {
//         method: 'DELETE',
//         headers:{
//          'Accept': 'application/json',
//          'Content-Type': 'application/json',
//          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
//      },
//  }).then((response )=> {
//      return response.json();    
//  }).then(function(json){
//      console.log(json);
//      if(json.httpStatus != "BAD_REQUEST"){
//          alert("Post deleted");
//      }
//      else{
//          alert("Try again")
//      }
//  }).catch(function(error){
//          console.error(error, "error message");
//  })
// }

// function to handle sign out
function signUserOut(){
    console.log('sign User Out');
    sessionStorage.setItem("userLoginStatus", false);
    console.log(sessionStorage);
    localStorage.clear();
    location.reload();
}