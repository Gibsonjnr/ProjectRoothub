class User{
    constructor(username , password , profilePicture){
        this.username = username;
        this.password = password;
        this.friendList = [];
        this.Posts = [["Hello world!!", 1]];
        this.gitHubProfile = profilePicture;
    }

    getGitHubImage(){
        fetch(`https://api.github.com/users/${this.gitHubProfile}`).then(res => {
            return res.json()
        }).then(gitProfile => {
            return gitProfile.avatar_url;
        })
    }
}

export {User};