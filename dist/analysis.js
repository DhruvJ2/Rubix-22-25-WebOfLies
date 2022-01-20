firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        location.replace('login.html')
    }
    else {
        dataInsert(user.uid);
    }
})
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

var database = firebase.database();
const category = document.querySelector("#category");
const productName = document.querySelector("#productName");
const amount = document.querySelector("#amount");
const addBtn = document.querySelector("#modal-Button");
var totalExpense = 0;

function dataInsert(uid) {
    let categoryamt = {
        Food: 0,
        Fashion: 0,
        Electronics: 0,
        Entertainment: 0,
        Fuel: 0,
        Grocery: 0,
        Pharmacy: 0,
        Lifestyle: 0,
        Others: 0,
    }
    let userData={
        Budget:0,
        Expense:0,
        FixedExpense:0,
        Income:10,
        Balance:0
    }
    database.ref('/Expense/' + uid).once("value", (snapshot) => {
        var data = snapshot.val();
        
        console.log(data, categoryamt.Food);
        console.log(categoryamt.Food);
        for (let i in data) {
            switch (data[i].Category) {
                case 'Food':
                    categoryamt.Food +=parseInt(data[i].Amount);

                    break;
                case 'Fashion':
                    categoryamt.Fashion += parseInt(data[i].Amount);
                    break;
                case 'Electronics':
                    categoryamt.Electronics += parseInt(data[i].Amount);
                    break;
                case 'Entertainment':
                    categoryamt.Entertainment += parseInt(data[i].Amount);
                    break;
                case 'Fuel':
                    categoryamt.Fuel += parseInt(data[i].Amount);
                    break;
                case 'Grocery':
                    categoryamt.Grocery += parseInt(data[i].Amount);
                    break;
                case 'Pharmacy':
                    categoryamt.Pharmacy += parseInt(data[i].Amount);
                    break;
                case 'Lifestyle':
                    categoryamt.Lifestyle += parseInt(data[i].Amount);
                case 'Others':
            }
        }
        var food=document.querySelector('#Food');
        var fashion=document.querySelector('#Fashion');
        var electronics=document.querySelector('#Electronics');
        var entertainment=document.querySelector('#Entertainment');
        var fuel=document.querySelector('#Fuel');
        var grocery=document.querySelector('#Grocery');
        var pharmacy=document.querySelector('#Pharmacy');
        var lifestyle=document.querySelector('#Lifestyle');
        var others=document.querySelector('#Others');
console.log("Hemlo",lifestyle)
        food.innerHTML='Rs'+categoryamt.Food;
        fashion.innerHTML='Rs'+categoryamt.Fashion;
        electronics.innerHTML='Rs'+categoryamt.Electronics;
        entertainment.innerHTML='Rs'+categoryamt.Entertainment;
        fuel.innerHTML='Rs'+categoryamt.Fuel;
        grocery.innerHTML='Rs'+categoryamt.Grocery;
        pharmacy.innerHTML='Rs'+categoryamt.Pharmacy;
        lifestyle.innerHTML='Rs'+categoryamt.Lifestyle;
        others.innerHTML='Rs'+categoryamt.Others;
        chartInsert(categoryamt,uid)
    });
    database.ref("/users/" + uid).once("value", function (snapshot) {
        var data = snapshot.val();
        console.log(data);  
        userData.Budget=parseInt(data.Budget);
        console.log("hey",userData.Budget)
        userData.Expense=parseInt(data.Expense)+parseInt(data.FixedExpense);
        userData.FixedExpense=parseInt(data.FixedExpense);
        userData.Balance=userData.Budget-userData.Expense;

        

        var bud=document.querySelector('.budget');
        var TE=document.querySelector('.expense');
        var Bal=document.querySelector('.balance');
        
        console.log(bud,userData);
        bud.innerHTML='Rs'+userData.Budget;
        TE.innerHTML='Rs'+userData.Expense;
        Bal.innerHTML='Rs'+userData.Balance;
        
        var counter = 0;
        database.ref('/Expense/' + uid).once("value", (snapshot) => {
          var data = snapshot.val();
          if (data.length > counter || data.value == null) {
            counter = data.length;
          } else {
            counter = 0;
          }
        });
        var totalExpense = 0;
     // product adding and total expense logic
    
  addBtn.addEventListener('click', () => {
    database.ref('/Expense/' + uid + '/' + counter).set({
      Category: category.value,
      Product: productName.value,
      Amount: amount.value,
    });
    
    productName.value = "";
    amount.value = "";
    
    
    database.ref('/Expense/' + uid).once("value", (snapshot) => {
      var itemCategory, amt;
      var data = snapshot.val();
      totalExpense = 0;
      for (let i in data) {
        itemCategory = data[i].Category;
        amt = data[i].Amount;
        totalExpense += parseInt(amt);
      }
      database.ref('/Total/' + uid).set({
        TotalExpense: totalExpense,
      });
      database.ref('/users/' + uid).update({
        Expense: totalExpense,
      });
    });
    location.reload();
    counter++;
  });

  database.ref('/users/'+uid).once("value",(snapshot)=>{
    var data=snapshot.val();
    console.log("heyyyyyyy",data)
    if(data.Expense==data.Budget)
    {
      alert("You have reached Your limit!!")
    }
    if(data.Expense>data.Budget)
    {
      alert("You have exceeded your limit")
    }
  })
      });  

}
function chartInsert(categoryamt,uid)
{
    database.ref('/Total/'+uid).once("value", function (snapshot) {
    let data=snapshot.val();
    let total=parseInt(data.TotalExpense);
    console.log(categoryamt,total)
    let charpercentage={
        Food:(categoryamt.Food/total)*100,
        Fashion:(categoryamt.Fashion/total)*100,
        Electronics:(categoryamt.Electronics/total)*100,
        Entertainment:(categoryamt.Entertainment/total)*100,
        Fuel:(categoryamt.Fuel/total)*100,
        Grocery:(categoryamt.Grocery/total)*100,
        Pharmacy:(categoryamt.Pharmacy/total)*100,
        Lifestyle:(categoryamt.Lifestyle/total)*100,
        Others:(categoryamt.Others/total)*100

    }
    console.log("percentage",charpercentage)
    $(document).ready(function () {
        var chart = {
           type: 'pie',
           options3d: {
              enabled: true,
              alpha: 45,
              beta: 0
           }
        };
    
    
        var title = {
           text: 'Graphical Analysis of Expenses'
        };
        var tooltip = {
           pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        };
        var plotOptions = {
           pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 35,
    
              dataLabels: {
                 enabled: true,
                 format: '{point.name}'
              }
           }
        };
        var series = [{
           type: 'pie',
           name: 'Browser share',
           data: [
              ['Food', charpercentage.Food],
              ['Fashion', charpercentage.Fashion],
              {
                 name: 'Electronics',
                 y: charpercentage.Electronics,
                 sliced: true,
                 selected: true
              },
              ['Entertainment', charpercentage.Entertainment],
              ['Fuel', charpercentage.Fuel],
              {
                 name: 'Grocery',
                 y: charpercentage.Grocery,
                 sliced: true,
                 selected: true
              },
              {
                 name: 'Pharmacy',
                 y: charpercentage.Pharmacy,
                 sliced: true,
                 selected: true
              },
              {
                 name: 'Lifestyle',
                 y: charpercentage.Lifestyle,
                 sliced: true,
                 selected: true
              },
    
              {
                 name: 'Others',
                 y: charpercentage.Others,
                 sliced: true,
                 selected: true
              },
    
           ]
        }];
        var json = {};
        json.chart = chart;
        json.title = title;
        json.tooltip = tooltip;
        json.plotOptions = plotOptions;
        json.series = series;
        $('#container').highcharts(json);
     });
    });
}