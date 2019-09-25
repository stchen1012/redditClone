document.querySelector('.form-login').addEventListener('submit', loginUser);

// login
function loginUser(event){
    event.preventDefault();
    let logEmail = document.getElementById('inputEmail').value;
    console.log(inputEmail);
    let logPassword = document.getElementById('inputPassword').value;
    console.log(inputPassword);

        fetch("http://thesi.generalassemb.ly:8080/login", {
           method: 'post',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
           body: JSON.stringify({
               email: logEmail,
               password: logPassword,
           })
       })
           .then((response )=> {
               return response.json();
           })
           .then((json) =>{
               console.log(json);
               alert("Sign in Successful");
               window.location.replace("file:///Users/marcus/Documents/generalAssembly/projects/redditClone/index.html");
           })
           .catch(function(error){
               console.log(error);
               alert("User Failed To Sign");
           })
}