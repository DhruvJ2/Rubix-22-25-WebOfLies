firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace('./login.html');
    }else {
        document.querySelector(".header").innerHTML = "Hello" + user.email;
    }
});

const logout = document.querySelector("#logout");

logout.addEventListener('click', ()=>{
    firebase.auth().signOut().then(()=>{
        
    });
});