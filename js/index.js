// all global variables that are used in multiple functions and pages
const loginButton = document.getElementById('loginButton');
const postButton = document.getElementById('createPostButton');
const signOutButton = document.getElementById('signOutButton');
const signUpButton = document.getElementById('signupButton');
const userPostButton = document.getElementById('userPostButton');

let loggedInUsername = document.getElementById('usernameDisplay');

let specificPostId;
var postObjectArray = [];


document.addEventListener('DOMContentLoaded', function(e){
    fetchPost();
    if(sessionStorage.username == undefined){
        loggedInUsername.innerHTML = "Hi Guest";
        signOutButton.style.visibility = "hidden";
    } else {
    loggedInUsername.innerHTML = 'Welcome, ' + sessionStorage.username;
    }
    if (sessionStorage.getItem("userLoginStatus") ===  "true" ) {
        //logged in
        loginButton.style.visibility = "hidden";
        signUpButton.style.visibility = "hidden";
        signOutButton.style.visibility = "visible";
        createPostButton.style.visibility = "visible";
        userPostButton.style.visibility = "visible";
    } else {
        userPostButton.style.visibility = "hidden";
        createPostButton.style.visibility = "hidden";
        signOutButton.style.visibility = "hidden";
    }
});

// function to fetch Posts
function fetchPost(){
    fetch("http://localhost:8080/redditBackend/post/list", {
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

const postDiv = document.getElementById('postDiv');

// Handle for fetch posts which stores the data in objects and displays the posts
function handleResponse(response) {
    let reverseArray = response.reverse();

    for (let i =0; i < reverseArray.length; i++) {
        if (reverseArray[i].user == null) continue;
        let postObject = new Post(reverseArray[i].postId, reverseArray[i].title, reverseArray[i].description, reverseArray[i].user.username);
        let newPost = document.createElement('div');
        newPost.setAttribute('class', 'postDiv');
        newPost.setAttribute('class', "card border-light mb-3");
        newPost.setAttribute('id', reverseArray[i].postId);
        newPost.innerHTML = `<div class="card-body" id="postCard"><h3 class="card-header"> ${postObject.postTitle}</h3><div class='card-body'><p class="card-text" id="postIdStyle">Post id: ${postObject.postId}</p> <p class="card-text" id="postedByStyle">Posted by: ${postObject.postUser}</p><p class ="card-text" id="postDesc">${postObject.postDescription}</p></div></div>`;
        postDiv.appendChild(newPost);
        let commentForm = document.createElement('form');
        commentForm.setAttribute('method',"post");
        commentForm.setAttribute('class', 'card-body');
        let commentBox = document.createElement("input");
        commentBox.name = postObject.postId;
        commentBox.setAttribute('id', "commentBoxId");
        commentBox.setAttribute('class', "commentBoxClass");
        commentForm.appendChild(commentBox);
        let createCommentButton = document.createElement('button');
        createCommentButton.setAttribute("id", "createCommentButton");
        createCommentButton.setAttribute('data-id', reverseArray[i].postId);
        createCommentButton.innerHTML = "comment";
        createCommentButton.setAttribute("class", "btn btn-primary");
        createCommentButton.type = "submit";
        commentForm.appendChild(createCommentButton);
        newPost.appendChild(commentForm);
        createCommentButton.addEventListener('click', postComment);
        fetchComments(postObject.postId);

    }
    
}


function Post(postId, postTitle, postDescription, postUser) {
    this.postUser = postUser;
    this.postId = postId;
    this.postTitle = postTitle;
    this.postDescription = postDescription;

}

// Function to retrieve comments and render on page
function fetchComments(postid) {
        fetch(`http://localhost:8080/redditBackend/post/${postid}/comments`, {
            method: 'GET',
        })
        .then((response)=> {
            return response.json();
        })
        .then((response) =>{
            response.forEach(item => {
                // if(item.postId == null) continue;
                let commentDiv = document.createElement('div');
                commentDiv.setAttribute('class', 'commentPostDiv');
                commentDiv.innerHTML = `<div class="card-body"><p class="card-header" id="commentBoxLabel">Comment </p> <p class="card-text" id="commentBy">Comment by: ${item.userComment.username}</p><div class='card-body'><p class="card-text">${item.text} </p></div></div>`;
                // commentDiv.innerHTML = `<h3><u>Comment</u></h3> ${item.text}`;
                postDiv.appendChild(commentDiv);
                const post = document.getElementById(`${postid}`);
                post.appendChild(commentDiv);
            });
        })
        .catch(function(error){
            console.log(error, "error message");
        })
    }

// Function to post a comment
function postComment(event) {
    event.preventDefault();
    let specificPostId = event.target.dataset.id;
    let commentBoxText = event.srcElement.previousSibling.value;
    fetch(`http://localhost:8080/redditBackend/user/${specificPostId}/comment`, {
           method: 'post',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
        },
           body: JSON.stringify({
               text: commentBoxText,
           })
    }).then((response )=> {
        return response.json();    
    }).then(function(json){
        // console.log(json);
        if(json.status != 500){
            alert("Comment created!");
        }
        else{
            alert("Comment not created. Please log in or sign up")
        }
    }).catch(function(error){
            console.error(error, "error message");
    })
}

// function for signout
function signUserOut(){
    console.log('sign User Out');
    sessionStorage.setItem("userLoginStatus", false);
    console.log(sessionStorage);
    sessionStorage.clear();
    location.assign("/index.html");
}
