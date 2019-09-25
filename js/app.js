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
    .then((json) =>{
        console.log(json);
    })
    .catch(function(error){
        alert("Please Try Again");
    })
}

// signup
function signUpUser(){

    let email = "";
    let username = "";
    let password = "";

        fetch("http://thesi.generalassemb.ly:8080/signup", {
           method: 'post',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
           body: JSON.stringify({
               email: "mcnugget@mcnugget.com",
               username: "mcnugget",
               password: "mcnugget",
           })
       })
           .then((response )=> {
               return response.json();
           })
           .then((json) =>{
               console.log(json);
           })
           .catch(function(error){
               alert("Please Try Again");
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


const postDiv = document.getElementById('postDiv');

// for(let i = 0; i < 11; i++){
//     const newPost = document.createElement('div');
//     newPost.setAttribute('class', 'postDiv');
//     newPost.innerHTML = "Lorem ipsum dolor amet pinterest umami woke, kogi +1 flexitarian brooklyn coloring book narwhal. PBR&B marfa hell of messenger bag. Keffiyeh slow-carb messenger bag cronut. Meh affogato you probably haven't heard of them, flannel gluten-free polaroid tattooed edison bulb enamel pin. Shoreditch keffiyeh quinoa dreamcatcher, raclette la croix williamsburg succulents heirloom direct trade.";
//     postDiv.appendChild(newPost);
// }