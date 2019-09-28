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

function handleResponse(response) {
    let reverseArray = response.reverse();
    console.log(reverseArray);
    for (let i =0; i < 20; i++) {
        //let postObject = new Post(response[i].id, response[i].title, response[i].description, response[i].user.username);
        // console.log(postObject);
        //let postObject = new Post(reverseArray[i].id, reverseArray[i].title, reverseArray[i].description, reverseArray[i].user.username);
        let postObject = new Post(reverseArray[i].id, reverseArray[i].title, reverseArray[i].description, reverseArray[i].user.username);
        let newPost = document.createElement('div');
        newPost.setAttribute('class', 'postDiv');
        newPost.setAttribute('id', reverseArray[i].id)
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
    }
}

function postComment(event) {
    event.preventDefault();
    console.log(event.srcElement.previousSibling.value);
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
        if(json.httpStatus != "BAD_REQUEST"){
            alert("Comment created!")
            let newCommentDisplay = document.createElement('div');
            //newCommentDisplay.setAttribute('class', 'commentDisplay'); 
            //newCommentDisplay.innerHTML = `<h4>Comment: ${commentBoxText} </h4>`;
            //postDiv.appendChild(newCommentDisplay);
            //need to append to specific post that user created comment on
        }
        else{
            alert("Comment not created")
        }
    }).catch(function(error){
            console.error(error, "error message");
    })
}


function Post(postId, postTitle, postDescription, postUser) {
    this.postId = postId;
    this.postTitle = postTitle;
    this.postDescription = postDescription;
    this.postUser = postUser;
}

function loadUserPost(){
    console.log('you loaded the user post');
    fetch(`http://thesi.generalassemb.ly:8080/user/post`, {
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
        // window.location.replace("userPost.html");
    })
    .catch(function(error){
        console.log("Please Try Again");
    })

}

const commentPostDiv = document.getElementById('commentDiv');

function loadUserComments(){
    console.log('you loaded the user comments');
    fetch(`http://thesi.generalassemb.ly:8080/user/comment`, {
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
        //toDeleteComment(response);
    })
    .catch(function(error){
        console.log("Please Try Again");
    })
}



function onCommentResponse(response) {
    for (let i=0; i < response.length; i++) {
        let userCommentDiv = document.createElement('div');
        userCommentDiv.setAttribute('class', 'commentDiv');
        userCommentDiv.setAttribute('data-id', response[i].id);
        userCommentDiv.innerHTML = `<h2><u>Comment</u><br><br>${response[i].text}</h2> <br> <h4>User: ${response[i].user.username} </h4> <br><br><button type="button" class="deleteButtonClass" data-id="${response[i].id}">Delete</button>`
        commentPostDiv.appendChild(userCommentDiv);
        let formButton = document.getElementsByClassName('deleteButtonClass').item(i);
        formButton.addEventListener('click', deleteComment);
    } 
}


function deleteComment(event) {
    event.preventDefault();
    console.log(event);
    let commentId = event.target.dataset.id;
    fetch(`http://thesi.generalassemb.ly:8080/comment/${commentId}`, {
           method: 'DELETE',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        //    body: JSON.stringify({
        //        text: commentBoxText,
        //    })
    }).then((response )=> {
        return response.json();    
    }).then(function(json){
        console.log(json);
        if(json.httpStatus != "BAD_REQUEST"){
            alert("Comment deleted");
        }
        else{
            alert("Try again")
        }
    }).catch(function(error){
            console.error(error, "error message");
    })
}

//signOut
function signUserOut(){
    console.log('sign User Out');
    sessionStorage.setItem("userLoginStatus", false);
    console.log(sessionStorage);
    localStorage.clear();
    location.reload();
}