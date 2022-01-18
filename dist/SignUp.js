const signupform=document.querySelector('#form');
signupform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;  

    firebase.auth().createUserWithEmailAndPassword(email,password).then(x=>{
        console.log(x);
    }); 
});