import { User } from "./class.js";

if(!sessionStorage.getItem('user')){
    const getBody = document.querySelector('body')
    getBody.innerHTML = `
    You are not signed in!
    <a href='signIn.html'> SignIn Here </a>
    `
}else{
    const user = sessionStorage.getItem('user');
    const users = JSON.parse(localStorage.getItem('users'));

    for(let loopUser of users){  //looping through all user
        if(loopUser.username === user){ //code block will only run if the user is signedIn
            let userimg;
            const signedIn = loopUser 
            const createDiv = document.createElement('div');
            createDiv.innerHTML = `
            Welcome User ${signedIn.username}
            <img class='userimg' src="./img_avatar.png" alt="">
            POST
            ${signedIn.Posts[signedIn.Posts.length - 1] || 'No post yet'}
            <textarea name="" id="textarea" cols="30" rows="10">
            </textarea> 
            <button class='btn'>Update Status</button>
            `

            document.body.prepend(createDiv);
            fetch(`https://api.github.com/users/${signedIn.gitHubProfile}`).then(res => {
            return res.json()
        }).then(gitProfile => {
            userimg = gitProfile.avatar_url;
            document.querySelector('.userimg').src = userimg
        })

        }
    }
    const getButton = document.querySelector('.btn');
    getButton.addEventListener('click' ,function(e){
        const getTextarea =document.querySelector('#textarea').value;
        for(let getUser of users){
            if(getUser.username === user){
                // getUser.Posts.push(getTextarea)  
                getUser.Posts.push([getTextarea , 0]);
                window.location.reload()
                localStorage.setItem('users' , JSON.stringify(users))
            }
        }

    })
    const getSearchForm =document.querySelector('#submit');
    getSearchForm.addEventListener('submit' , (e) => {
    const searchInput = document.querySelector('.searchInput').value;
    const matchedList = [];
    e.preventDefault();
    
    for (let getInput of users){
        if(getInput.username.includes(searchInput)) {
            matchedList.push(getInput);
            console.log(matchedList);
        }
    }

    showDetails(matchedList);
    })
    function showDetails(users){
        const div = document.querySelector('.appendDiv');
        div.innerHTML = '';
        for(let loopUser of users){
            let userImage;
            const signedIn = loopUser 
            const createDiv = document.createElement('div');
            createDiv.innerHTML = `
            Found: ${signedIn.username}
            <img class='${signedIn.username}' src="./img_avatar.png" alt="">
            POST
            ${signedIn.Posts[signedIn.Posts.length - 1] [0] ||  'No post yet'}
            <button class='like'>Likes</button>
            `//${signedIn.Posts[signedIn.Posts.length - 1] || 'No post yet'} 
            const div = document.querySelector('.appendDiv');
            div.append(createDiv);
            //Like button!
            const likeButton = document.querySelector('.like');
            let count = 0;
            likeButton.addEventListener('click' , (e)=> {
                const likePost = document.querySelector('div');
                likePost.innerText = `${count++} likes`
                likePost.append(likeButton);
            })
            
            fetch(`https://api.github.com/users/${signedIn.gitHubProfile}`).then(res => {
            return res.json()
        }).then(gitProfile => {
            userImage = gitProfile.avatar_url;
            const getimg = document.querySelector(`.${signedIn.username}`);
            getimg.src = userImage
            // console.log(getimg)
        })
        }
    }

}