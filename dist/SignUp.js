const signupform=document.querySelector('#form');
signupform.addEventListener('submit',(e)=>{
e.preventDefault();
const email=document.getElementById('email').value;
const pass=document.getElementById('password').value;  
auth.createUserWithEmailAndPassword(email,pass).then(x=>{
    console.log(x);
})  
})