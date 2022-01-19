firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace('login.html');
    }else {
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

  const database = firebase.database()
  const category = document.querySelector("#category");
  const productName = document.querySelector("#productName");
  const amount = document.querySelector("#amount");
  const addBtn = document.querySelector("#modal-Button");
  var counter = 0;
  var totalExpense = 0;

  function dataInsert(uid){  
    
    // product adding and total expense logic
    addBtn.addEventListener('click', ()=>{
      database.ref('/Expense/'+uid+'/'+counter).set({
        Category: category.value,
        Product: productName.value,
        Amount: amount.value,
      });      
      productName.value = "";
      amount.value = "";
      counter++;
      database.ref('/Expense/'+uid).once("value", (snapshot)=>{
        var itemCategory, amt;
        var data = snapshot.val();
        totalExpense = 0;
        for(let i in data){
          itemCategory = data[i].Category;
          amt = data[i].Amount;
          totalExpense += parseInt(amt);
        }
        database.ref('/Total/'+uid).set({
          TotalExpense:totalExpense,
        });
      });
    });
  }



