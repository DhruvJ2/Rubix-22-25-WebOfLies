
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
      location.replace('login.html');
  } else {
      dataInsert(user.uid);

  }
});

const logout = document.querySelector("#logout");

logout.addEventListener('click', () => {
  firebase.auth().signOut();
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

var custombutton = document.querySelector("#Button");
var realButton = document.querySelector("#myfile");

custombutton.addEventListener('click', function () {
  realButton.click();
});

realButton.addEventListener('change', () => {
  console.log("xxxxx");
});

let database = firebase.database();



function dataInsert(uid){
  let expense,budget;
  let inputamt;
  let modalbtn=document.getElementById()
  console.log(uid);
  let database1 = firebase.database().ref("/users/"+uid);
  database1.once("value",function(snapshot){
      let flag=0;
      var data =snapshot.val();
      console.log(data)
      budget=data.Budget;
      expense=data.Expense;
      console.log(budget,expense)
  })
 
}