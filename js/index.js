const loginButton = document.getElementById('loginButton');
const postButton = document.getElementById('createPostButton');
const signOutButton = document.getElementById('signOutButton');
const signUpButton = document.getElementById('signupButton');
const userPostButton = document.getElementById('userPostButton');

let loggedInUsername = document.getElementById('usernameDisplay');

let specificPostId;
var postObjectArray = [];

if (postButton && signOutButton) {
    if (sessionStorage.getItem("userLoginStatus") ==  "false" ) {
        console.log('user not logged in');
        console.log(sessionStorage);
        loginButton.style.visibility != "hidden";
        signUpButton.style.visibility != "hidden";

        postButton.style.visibility = "hidden";
        signOutButton.style.visibility = "hidden";
        userPostButton.style.visibility = "hidden";
    } else {
        console.log("logged in statement");
        console.log(sessionStorage);
        postButton.style.visibility != "hidden";
        signOutButton.style.visibility != "hidden";
        userPostButton.style.visibility != "hidden";

        loginButton.style.visibility = "hidden";
        signUpButton.style.visibility = "hidden";
    }
}

document.addEventListener('DOMContentLoaded', function(e){
    fetchPost('');
    if(localStorage.username == undefined){
        loggedInUsername.innerHTML = '';
    } else {
    loggedInUsername.innerHTML = 'Hi ' + localStorage.username;
    }
});

// function to fetch Posts
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

const postDiv = document.getElementById('postDiv');

// Handle for fetch posts which stores the data in objects and displays the posts
function handleResponse(response) {
    let reverseArray = response.reverse();
    for (let i =0; i < 20; i++) {
        let postObject = new Post(reverseArray[i].id, reverseArray[i].title, reverseArray[i].description, reverseArray[i].user.username);
        postObjectArray.push(postObject);
        let newPost = document.createElement('div');
        newPost.setAttribute('class', 'postDiv');
        newPost.setAttribute('id', reverseArray[i].id);
        newPost.innerHTML = `<h2>Id: ${postObject.postId} Post Title: ${postObject.postTitle}</h2>, Post Description: ${postObject.postDescription}, <h4>User: ${postObject.postUser}</h4>`;
        postDiv.appendChild(newPost);
        let commentForm = document.createElement('form');
        commentForm.setAttribute('method',"post");
        let commentBox = document.createElement("input");
        commentBox.name = postObject.postId;
        commentBox.setAttribute('id', "commentBoxId");
        commentBox.setAttribute('class', "commentBoxClass");
        newPost.appendChild(commentForm);
        commentForm.appendChild(commentBox);
        let createCommentButton = document.createElement('button');
        createCommentButton.setAttribute("id", "createCommentButton");
        createCommentButton.setAttribute('data-id', reverseArray[i].id);
        createCommentButton.innerHTML = "comment";
        createCommentButton.type = "submit";
        commentForm.appendChild(createCommentButton);
        createCommentButton.addEventListener('click', postComment);
        fetchComments(postObject.postId);
    }
}

function Post(postId, postTitle, postDescription, postUser) {
    this.postId = postId;
    this.postTitle = postTitle;
    this.postDescription = postDescription;
    this.postUser = postUser;
}

// Function to retrieve comments and render on page
function fetchComments(postid) {
        fetch(`http://thesi.generalassemb.ly:8080/post/${postid}/comment`, {
            method: 'GET',
        })
        .then((response)=> {
            return response.json();
        })
        .then((response) =>{
            console.log(response);
            response.forEach(item => {
                let commentDiv = document.createElement('div');
                commentDiv.setAttribute('class', 'commentPostDiv');
                commentDiv.innerHTML = `<h4><u>Comment</u><br><br> ${item.text}</h4> <h5>User: ${item.user.username}</h5>`;
                postDiv.appendChild(commentDiv);
                const post = document.getElementById(`${item.post.id}`);
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
    fetch(`http://thesi.generalassemb.ly:8080/comment/${specificPostId}`, {
           method: 'post',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
           body: JSON.stringify({
               text: commentBoxText,
           })
    }).then((response )=> {
        return response.json();    
    }).then(function(json){
        console.log(json);
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
    localStorage.clear();
    location.reload();
}
