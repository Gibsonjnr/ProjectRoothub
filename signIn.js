import { User } from "./class.js";

const getForm = document.querySelector('form');
getForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    const getUsername = document.querySelector('#username').value;
    const getPassword = document.querySelector('#password').value;

    const users = JSON.parse(localStorage.getItem('users'));

    for(let user of users){
        if(user.username === getUsername || user.gitHubProfile === getUsername){
            if(user.password === getPassword){
                return signedInUser(user);
            }else{
                alert("Wrong password!")
                return;
            }
        }
    }
    alert("User not found!")
})


function signedInUser(user){
    sessionStorage.setItem('user' , user.username);
    window.location.href = "./homePage.html";
}
