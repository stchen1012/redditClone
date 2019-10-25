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
        loggedInUsername.innerHTML = '';
    } else {
    loggedInUsername.innerHTML = 'Hi ' + sessionStorage.username;
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
        if (reverseArray[i].user == null) continue; // temp fix, skip if user is null
        let postObject = new Post(reverseArray[i].postId, reverseArray[i].title, reverseArray[i].description, reverseArray[i].user.username); //was using incorrect postId variable
        // console.log("THIS IS" + postObject.postTitle);
        // postObjectArray.push(postObject);
        let newPost = document.createElement('div');
        newPost.setAttribute('class', 'postDiv');
        newPost.setAttribute('id', reverseArray[i].postId);
        newPost.innerHTML = `<h2>Post Title: ${postObject.postTitle}</h2> <h5>Id: ${postObject.postId}</h5> Post Description: ${postObject.postDescription} <h5>User: ${postObject.postUser}</h5>`;
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
        createCommentButton.setAttribute('data-id', reverseArray[i].postId);
        createCommentButton.innerHTML = "comment";
        createCommentButton.type = "submit";
        commentForm.appendChild(createCommentButton);
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
                commentDiv.innerHTML = `<h3><u>Comment</u></h3> ${item.text} <h5>User: ${item.userComment.username}</h5>`;
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
    fetch(`http://localhost:8080/redditBackend/user/${sessionStorage.username}/${specificPostId}/comment`, {
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
