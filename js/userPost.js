console.log('userPost Page')

document.addEventListener('DOMContentLoaded', function(e){
    if(sessionStorage.userLoginStatus != 'true'){
        window.location.replace('index.html')
    } else {
        loadUserPost('');
        loadUserComments();
        if(sessionStorage.username == undefined){
            loggedInUsername.innerHTML = 'Hi Guest';
        } else {
            loggedInUsername.innerHTML = 'Welcome, ' + sessionStorage.username;
        }
    }

    const toggle = document.getElementById("post-comment-toggle");
    toggle.addEventListener('click', ()=>{
        const postDiv = document.getElementById("postDiv");
        const commentDiv = document.getElementById("commentDiv");
        if(toggle.innerText === "See my Posts"){
            toggle.innerText = "See my Comments";
            postDiv.hidden = false;
            commentDiv.hidden = true;
        } else {
            toggle.innerText = "See my Posts";
            postDiv.hidden = true;
            commentDiv.hidden = false;
        }
    } )
    
});

const postButton = document.getElementById('createPostButton');
const signUpButton = document.getElementById('signupButton');

let loggedInUsername = document.getElementById('usernameDisplay');


const postDiv = document.getElementById('postDiv');

// function to load in User Posts
function loadUserPost(){
    console.log('you loaded the user post');

    //http://thesi.generalassemb.ly:8080/user/post
    console.log(`http://localhost:8080/redditBackend/post/list/${sessionStorage.username}`)
    fetch(`http://localhost:8080/redditBackend/post/list/${sessionStorage.username}`, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${sessionStorage.userToken}`
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
        let postObject = new Post(reverseArray[i].postId, reverseArray[i].title, reverseArray[i].description, reverseArray[i].user.username);
        let newPost = document.createElement('div');

        newPost.setAttribute('class', 'postDiv');
        newPost.setAttribute('class', "card border-light mb-3");
        newPost.setAttribute('data-id', reverseArray[i].postId);
        newPost.innerHTML = `<div class="card-body" id="postCard"><h3 class="card-header"> ${postObject.postTitle}</h3><div class='card-body'><p class="card-text" id="postIdStyle">Post id: ${postObject.postId}</p> <p class="card-text" id="postedByStyle">Posted by: ${postObject.postUser}</p><p class="card-text"id="postDesc">${postObject.postDescription}</p> <br><button type="submit" class="deletePostClass btn btn-primary" data-id="${response[i].postId}">Delete</button></div></div>`;
        postDiv.appendChild(newPost);
        //adding below lines of code for future use when delete Post API is functional
        let deletePostButton = document.getElementsByClassName('deletePostClass').item(i);
        // deletePostButton.setAttribute("class", "btn btn-primary");
        deletePostButton.addEventListener('click', deletePost);
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
    fetch(`http://localhost:8080/redditBackend/comment/list/${sessionStorage.username}`, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${sessionStorage.userToken}`
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
        userCommentDiv.setAttribute('data-id', response[i].commentId);
        userCommentDiv.innerHTML = `<div class="card-body"><p class="card-header" id="commentBoxLabel">Comment </p> <p class="card-text" id="commentBy">Comment by: ${sessionStorage.username}</p><div class='card-body'><p class="card-text">${response[i].text}</p><button type="button" class="deleteButtonClass btn btn-primary" data-id="${response[i].commentId}">Delete</button></div></div>`;
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
    fetch(`http://localhost:8080/redditBackend/comment/remove/${commentId}`, {
           method: 'DELETE',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
        },
    }).then((response )=> {
        return response.json();
    }).then(function(response){
        console.log(response);
        if(response.httpStatus != "BAD_REQUEST"){
            alert("Comment deleted");
            location.reload();
        }
        else{
            alert("Try again")
        }
    }).catch(function(error){
            console.error(error, "error message");
    })
}


// function to delete Posts - API not working but adding in for later use
function deletePost(event) {
    event.preventDefault();
    let specificIdForPost = event.target.dataset.id;
    fetch(`http://localhost:8080/redditBackend/post/remove/${specificIdForPost}`, {
        method: 'DELETE',
        headers:{
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
     },
 }).then((response )=> {
     return response.json();    
 }).then(function(json){
     console.log(json);
     if(json.httpStatus != "BAD_REQUEST"){
         alert("Post deleted");
         location.reload();
     }
     else{
         alert("Try again")
     }
 }).catch(function(error){
         console.error(error, "error message");
 })
}

// function to handle sign out
function signUserOut(){
    console.log('sign User Out');
    sessionStorage.setItem("userLoginStatus", false);
    console.log(sessionStorage);
    sessionStorage.clear();
    location.reload();
}