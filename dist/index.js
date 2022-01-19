firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace('login.html');
    }else {
        // document.querySelector(".header").innerHTML = "Hello" + user.email;
    }
});

const logout = document.querySelector("#logout");

logout.addEventListener('click', ()=>{
    firebase.auth().signOut();
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var custombutton = document.querySelector("#Button");
var realButton = document.querySelector("#myfile");

custombutton.addEventListener('click', function(){
    realButton.click();
});

realButton.addEventListener('change', ()=>{
    console.log("xxxxx");
});