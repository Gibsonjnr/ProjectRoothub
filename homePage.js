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
            <h2>Welcome ${signedIn.username}</h2>
            <img class='userimg' src="./img_avatar.png" alt="">
            <p>POST: 
            ${signedIn.Posts[signedIn.Posts.length - 1][0] || 'No post yet'}
            <span>${signedIn.Posts[signedIn.Posts.length - 1][1]} LIKES</span> </p>
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
                // Added by Sam

                    // Store each status as an array. at undex 0 is the status
                    // at index 1 is the no of likes which defaults to 1
                    getUser.Posts.push([getTextarea , 1]);
                // End of added by Sam

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
            <h3>
            Found: ${signedIn.username}
            </h3>
            <img class='${signedIn.username}' src="./img_avatar.png" alt="">
            <p>POST
            ${signedIn.Posts[signedIn.Posts.length - 1] [0] ||  'No post yet'}
            </p>
            <button class='like' id=${signedIn.username}>${signedIn.Posts[signedIn.Posts.length - 1][1]} LIKES</button>
            `//${signedIn.Posts[signedIn.Posts.length - 1][1] || 'No post yet'} 
            const div = document.querySelector('.appendDiv');
            div.append(createDiv);
            //Like button!

            // Added by SAMUEL
            const likeButtons = document.querySelectorAll('.like');
            
            likeButtons.forEach(btn => {
                btn.addEventListener("click", updateLikes)
            })

            function updateLikes(e){
                // get friend's username
                const friendName = e.target.id

                // get friend from friends list and increase his likes by one
                for(let loopUser of users){
                    if(loopUser.username === friendName){
                        // get no of likes for friends most recent post and increase by one
                        let recent = loopUser.Posts.length - 1
                        let likes = loopUser.Posts[recent][1]
                        likes += 1

                        // Update likes to reflect recent increase
                        loopUser.Posts[recent][1] = likes

                        // update database of users to reflect likes globally
                        localStorage.setItem("users", JSON.stringify(users))

                        // update likes by one locally
                        const clickedBtn = e.target
                        clickedBtn.innerHTML = `${likes} LIKES`

                        // disable button to prevent it from being clicked
                        clickedBtn.disabled = true;
                    }
                }
            
            }

            // End of added by Sam
            
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