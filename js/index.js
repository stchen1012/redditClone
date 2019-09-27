const loginButton = document.getElementById('loginButton');
const postButton = document.getElementById('createPostButton');
const signOutButton = document.getElementById('signOutButton');
const signUpButton = document.getElementById('signupButton');
const userPostButton = document.getElementById('userPostButton');

let loggedInUsername = document.getElementById('usernameDisplay');


let specificPostId;

var postObjectArray = [];
var commentsObjectArray = [];

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
        //fetchComments();
        //checkPostForComments();
    })
    .catch(function(error){
        console.log("Please Try Again");
    })
}

const postDiv = document.getElementById('postDiv');

function handleResponse(response) {
    let reverseArray = response.reverse();
    console.log(reverseArray);
    for (let i =0; i < 20; i++) {
        //let postObject = new Post(response[i].id, response[i].title, response[i].description, response[i].user.username);
        // console.log(postObject);
        //let postObject = new Post(reverseArray[i].id, reverseArray[i].title, reverseArray[i].description, reverseArray[i].user.username);
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
        console.log(fetchComments(postObject.postId));
        let createCommentButton = document.createElement('button');
        createCommentButton.setAttribute("id", "createCommentButton");
        createCommentButton.setAttribute('data-id', reverseArray[i].id);
        createCommentButton.innerHTML = "comment";
        createCommentButton.type = "submit";
        commentForm.appendChild(createCommentButton);
        createCommentButton.addEventListener('click', postComment);
        // let a = fetchComments(postObject.postId).then(res=>res);
       
        //console.log(postObject.postId);
        //var postIdValue = postObject.postId;
        //console.log(fetchComments(postObject.postId));
    }
}

function fetchComments(postid) {
    let thing;
        fetch(`http://thesi.generalassemb.ly:8080/post/${postid}/comment`, {
            method: 'GET',
        })
        .then((response)=> {
            return response.json();
        })
        .then((response) =>{
            response.forEach(item => {
                let commentDiv = document.createElement('div');
                commentDiv.setAttribute('class', 'commentPostDiv');
                // commentDiv.setAttribute('id', item.post.id);
                commentDiv.innerHTML = `<h4>Comment Text: ${item.text}</h4> <h5>User:${item.user.username}</h5>`;
                postDiv.appendChild(commentDiv);
                //thing = commentDiv;
                const post = document.getElementById(`${item.post.id}`);
                post.appendChild(commentDiv);
            });
        })
        .catch(function(error){
            console.log(error, "error message");
        })
    }

//function to check if comments match to post

// function checkPostForComments() {
//     console.log(`THIS IS THE COMMENTSOBJECTARRAY: ${commentsObjectArray}`);
//     console.log(`THIS IS THE POSTOBJECTARRAY: ${postObjectArray}`);
//     if (commentsObjectArray.length === 0) {
//         console.log('HI NOTHING HERE');
//     } else {
//         for (let i =0; i < postObjectArray.length; i++) {
//             for (let i =0; i < commentsObjectArray.length; i++) {
//                 if (commentsObjectArray[i].postId === postObjectArray[i].postId) {
//                     console.log(`this is a match here is the comment text ${commentsObjectArray[i].commentText}`)
//                 }
//             }
//         }
//     }
    // if (commentsObjectArray[i].postId === postObjectArray[i].postId) {
    //         console.log(`this is a match here is the comment text ${commentsObjectArray[i].commentText}`)
    //     }
// }

/* to delete
function fetchComments() {
    for (let i=0; i < postObjectArray.length; i++) {
        fetch(`http://thesi.generalassemb.ly:8080/post/${postObjectArray[i].postId}/comment`, {
            method: 'GET',
        })
        .then((response )=> {
            return response.json();
        })
        .then((response) =>{
            console.log(response);
            if (response.length === 0) {
                console.log('nothing here')
            } else {
                for (let i =0; i < response.length; i++) {
                    let commentObject = new Comments(response[i].id, response[i].text, response[i].user.username, response[i].post.id);
                    console.log("THIS IS THE OBJECT" + commentObject.commentId);
                    commentsObjectArray.push(commentObject);
                    console.log(commentObject.postId);
            }
        }
        })
        .catch(function(error){
            console.log(error, "error message");
        })
    }
}
*/

// console.log(`THIS IS THE COMMENTSOBJECTARRAY: ${commentsObjectArray}`);

// function Comments(commentId, commentText, commentUsername, postId) {
//     this.commentId= commentId;
//     this.commentText = commentText;
//     this.commentUsername = commentUsername;
//     this.postId = postId;
// }



//let postDivClass = document.getElementsByClassName('postDiv');

function postComment(event) {
    event.preventDefault();
    //console.log(event.srcElement.previousSibling.value);
    let specificPostId = event.target.dataset.id;
    // console.log(specificPostId);
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
            alert("Comment created!");
            // let newCommentDisplay = document.createElement('div');
            // newCommentDisplay.setAttribute('class', 'commentDisplay'); 
            // newCommentDisplay.innerHTML = `<h4>Comment: ${commentBoxText} </h4>`;
            // postDivClass.appendChild(newCommentDisplay);
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


//signOut
function signUserOut(){
    console.log('sign User Out');
    sessionStorage.setItem("userLoginStatus", false);
    console.log(sessionStorage);
    localStorage.clear();
    location.reload();
}

console.log(localStorage);