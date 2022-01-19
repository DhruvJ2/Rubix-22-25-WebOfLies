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

// invoice processing
const submit = document.querySelector('#uploadBtn');
const done = document.querySelector('.progress');

  realButton.addEventListener("change",function(){
    var file = this.files[0];
  
    if (file) {
        if ((file.type == 'image/png') ||
            (file.type == 'image/jpg') ||          
            (file.type == 'image/jpeg')){
          
           var reader = new FileReader();
  
            reader.onload = function (evt) {
                var imgTag = evt.target.result;
                submit.addEventListener('click', () => {
                    done.innerText = "Scannig....";
                    Tesseract.recognize(
                        imgTag,
                        'eng',
                        { logger: m => console.log(m) }
                    ).then(({ data: { text } }) => {
                        console.log(text);
                        done.innerText = "Done!";
                    });
                });
            alert("Image succefully loaded");
        };
  
        reader.onerror = function (evt) {
          console.error("An error ocurred reading the file",evt);
        };
  
        reader.readAsDataURL(file);
          
        }else{
          alert("Please provide a png or jpg image.");
          return false;
        }
      }
  },false);