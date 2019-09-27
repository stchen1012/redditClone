let loggedInUsername = document.getElementById('usernameDisplay');

document.addEventListener('DOMContentLoaded', function(e){
    if(sessionStorage.userLoginStatus != 'true'){
        window.location.replace('index.html')
    } else {
        if(localStorage.username == undefined){
            loggedInUsername.innerHTML = 'Hi Guest';
        } else {
            loggedInUsername.innerHTML = 'Hi ' + localStorage.username;
        }
    }
});

let createPostButton = document.getElementById('createPostButton');
console.log('post');
createPostButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    let titleOfPost = document.getElementById('titleOfPost').value;
    let descriptionOfPost = document.getElementById('descriptionOfPost').value;
    userToken = localStorage.getItem('userToken');

    fetch("http://thesi.generalassemb.ly:8080/post", {
           method: 'post',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
           body: JSON.stringify({
               title: titleOfPost,
               description: descriptionOfPost,
           })
    }).then((response )=> {
        return response.json();    
    }).then(function(json){
        console.log(json);
        if(json.httpStatus != "BAD_REQUEST"){
            alert("Post created!")
            window.location.replace("index.html");
        }
        else{
            alert("Post not created")
        }
    }).catch(function(error){
            console.error(error, "error message");
    })
})

//signOut
function signUserOut(){
    console.log('sign User Out');
    sessionStorage.setItem("userLoginStatus", false);
    console.log(sessionStorage);
    localStorage.clear();
    location.reload();
}