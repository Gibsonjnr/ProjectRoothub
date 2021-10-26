import { User } from "./class.js";

const getForm = document.querySelector('form')
getForm.addEventListener('submit' , createUser)



function createUser(e) {
    e.preventDefault();
    const getUsername = document.querySelector('#username').value;
    const getPassword = document.querySelector('#password').value;
    const getImage = document.querySelector('#profileImage').value
    
    if(!localStorage.getItem('users')){
        localStorage.setItem('users' , '[]');
    }

    const users = JSON.parse(localStorage.getItem('users'));

        // ensures user has a unique username
    for(let user of users){
        if(user.username === getUsername || user.gitHubProfile === getImage){
            alert('user already exist!')
            return;
        }
    }

    // creates new user if username is unique
    const newUser = new User(getUsername , getPassword , getImage)
    users.push(newUser);

    // add user to database
    localStorage.setItem('users' , JSON.stringify(users));

    console.log("User have been created!")
    console.log(users)
}



