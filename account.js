let  accountUser=[];



let myKeysValues = window.location.search;

let urlParam = new URLSearchParams(myKeysValues);

let param = urlParam.get('accountId');

console.log(param);




//Constructor
function AccountData(id,accountName, accountNumber, email, phone, address, city, state, country, zip) {
    this.id = id;
    this.accountName = accountName;
    this.accountNumber = accountNumber;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zip = zip;
}

//Display Constructor
function Display() {

}

let viewBtnClick = function(itemId){
    location.href='NewAccountDetailPage.html?accountId='+itemId;
}

// Add methods to display prototype
Display.prototype.addGrid = function() {
    tableBody = document.getElementById('tableBody');
    tableBody.innerHTML =" ";

    for(let i=0; i<accountUser.length; i++){
    let uiString = `<tr> 
                        <td>${accountUser[i].accountName}</td>
                        <td>${accountUser[i].accountNumber}</td>
                        <td> <div>${accountUser[i].country}
                            <button class ="btn btn-primary viewbtn" id=viewbtn_${accountUser[i].id} onclick="viewBtnClick(${accountUser[i].id});">View</button> </div>
                        </td>                
                    </tr>`;
                
    tableBody.innerHTML += uiString;
   }
}


Display.prototype.clear = function () {
    let form = document.getElementById('accountForm');
    form.reset();

}


// function to call on button


function creat() {



    let accountName = document.getElementById('getAccountName').value;
    let accountNumber = document.getElementById('getAccountNumber').value;
    let email = document.getElementById('getEmail').value;
    let phone = document.getElementById('getPhone').value;
    let address = document.getElementById('getAddress').value;
    let city = document.getElementById('getCity').value;
    let state = document.getElementById('getState').value;
    let country = document.getElementById('getCountry').value;
    let zip = document.getElementById('getZip').value;
    
    let accountData = new AccountData(accountUser.length+0,accountName, accountNumber, email, phone, address, city, state, country, zip)



    let accountUserData=localStorage.getItem("accountUserData");
    if(accountUserData==null){
        accountUser=[];
    }

    else{
        accountUser=JSON.parse(accountUserData);
    }

    accountUser.push(accountData);
    localStorage.setItem("accountUserData", JSON.stringify(accountUser));
    console.log('testing',accountUser);

    
    let display = new Display();
    display.addGrid(accountData);
    display.clear();


    return false
    // let displayName=document.getElementById('displayName');
    // displayName.innerHTML=accountName.value;

}




(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        // @ts-ignore
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    // event.preventDefault();
                    // event.stopPropagation();
                } else {
                    creat()
                    $('#exampleModal').modal('hide')
                    
                }

                // form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();




//Transfer data one page to another page
function DisplayonDiv(){

    let displayName = document.getElementById("displayName");
    let displayAccountNo = document.getElementById("displayAccountNo"); 
    let displayEmail  = document.getElementById("displayEmail"); 
    let displayPhone = document.getElementById("displayPhone"); 
    let displayAddress = document.getElementById("displayAddress");
    let displayCity = document.getElementById("displayCity");
    let displayState = document.getElementById("displayState");
    let displayCountry = document.getElementById("displayCountry");
    let displayZip = document.getElementById("displayZip");
   

    let displayData = localStorage.getItem("accountUserData", JSON.stringify(accountUser));

   let alldisplayData=JSON.parse(displayData);

   //for(let i=0; i<AlldisplayData.length;i++)
    console.log('testiing for Display',alldisplayData);

    displayName.textContent = alldisplayData[param].accountName;
    displayAccountNo.textContent = alldisplayData[param].accountNumber;
    displayEmail.textContent = alldisplayData[param].email;
    displayPhone.textContent = alldisplayData[param].phone;
    displayAddress.textContent = alldisplayData[param].address;
    displayCity.textContent = alldisplayData[param].city;
    displayState.textContent = alldisplayData[param].state;
    displayCountry.textContent = alldisplayData[param].country;
    displayZip.textContent = alldisplayData[param].zip;
   
    

    }

   function clearStorage(){
    localStorage.clear();
   } ;







// Code for Account Detai Page


function ContactData(firstName, lastName, contactEmail, contactPhone, title) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.contactEmail = contactEmail
    this.contactPhone = contactPhone;
    this.title = title;

}

//contactDisplay Constructor
function ContactDisplay() {

}


// Add methods to display prototype
ContactDisplay.prototype.add = function (contactData) {
    contactDiv = document.getElementById('contactDiv');
    let html =

        `<div class="col-md-5 detailpage m-3 p-2">
                            <span><span>Name: </span>${contactData.firstName + " " + contactData.lastName}</span><br>
                            <span><span>Title: </span>${contactData.title}</span><br>
                            <span><span>Email: </span>${contactData.contactEmail}</span><br>
                            <span><span>Phone: </span>${contactData.contactPhone}</span><br>
                    </div>`;

    contactDiv.innerHTML += html;

}

ContactDisplay.prototype.clear2 = function () {
    let form = document.getElementById('contactForm');
    form.reset();
}


// function to call on button
function creatContact() {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let contactEmail = document.getElementById('contactEmail').value;
    let contactPhone = document.getElementById('contactPhone').value;
    let title = document.getElementById('title').value;


    let contactData = new ContactData(firstName, lastName, contactEmail, contactPhone, title)
    console.log(contactData);

    let contactdisplay = new ContactDisplay();
    contactdisplay.add(contactData);
    contactdisplay.clear2();

};


(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var contactForms = document.getElementsByClassName('contact-form');
        // Loop over them and prevent submission
        // @ts-ignore
        var validation = Array.prototype.filter.call(contactForms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    // event.preventDefault();
                    // event.stopPropagation();
                } else {
                    creatContact()
                    $('#exampleModal').modal('hide')
                    
                }

                // form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();






// Code for State Dropdown

// function stateDrop() {
//     let country = document.getElementById('getCountry').value;

//     if (country === "India") {
//         var array = ["Choose...", "Delhi", "Goa", "UP", "Maharashtra"];
//     }

//     else if (country === "U.S.A") {
//         var array = ["Choose...", "Chicago", "Washington"];
//     }

//     else {
//         var array = ["Choose..."];
//     }
//     let String = "";
//     for (i = 0; i < array.length; i++) {
//         String = String + "<option>" + array[i] + "</option>";
//     }

//     document.getElementById('getState').innerHTML = String;

// }



//code for api state and country


let auth_token;

$(document).ready(function () {
  $.ajax({
    type: 'get',
    url: 'https://www.universal-tutorial.com/api/getaccesstoken',
    success: function (data) {
      auth_token = data.auth_token;
      countryData(data.auth_token);
    },
    error: function (error) {
      console.log('Page does not exist', error);
    },
    headers: {
      "Accept": "application/json",
      "api-token": "NTuTNxH234F1bxcXlUI5u3U5U6MkHntJCdwnktJ3GChzQx3qmDZfJf7Ra6rJgJolDpM",
      "user-email": "sonukumar99.iimtgn@gmail.com"
    }
  })

  $('#getCountry').change(function () {
    stateData();
  })
  $('#getState').change(function () {
    cityData();
  })
});


function countryData(auth_token) {
  $.ajax({
    type: 'get',
    url: 'https://www.universal-tutorial.com/api/countries/',
    success: function (data) {
      data.forEach(element => {
        $('#getCountry').append('<option value = "' + element.country_name + '">' + element.country_name + '</option>')
      });
      // stateData(auth_token);
    },
    error: function (error) {
      console.log('Page does not exist', error);
    },
    headers: {
      "Authorization": "Bearer " + auth_token,
      "Accept": "application/json"
    }
  })
}


function stateData() {
  let countryName = $('#getCountry').val();
  $.ajax({
    type: 'get',
    url: 'https://www.universal-tutorial.com/api/states/' + countryName,
    success: function (data) {
      $('#getState').empty();
      data.forEach(element => {
        $('#getState').append('<option value = "' + element.state_name + '">' + element.state_name + '</option>')
      });
      // cityData(auth_token);
    },
    error: function (error) {
      console.log('Page does not exist', error);
    },
    headers: {
      "Authorization": "Bearer " + auth_token,
      "Accept": "application/json"
    }
  })
}


function cityData() {
  let stateName = $('#state').val();
  $.ajax({
    type: 'get',
    url: 'https://www.universal-tutorial.com/api/cities/' + stateName,
    success: function (data) {
      $('#city').empty();
      data.forEach(element => {
        $('#city').append('<option value = "' + element.city_name + '">' + element.city_name + '</option>')
      });
    },
    error: function (error) {
      console.log('Page does not exist', error);
    },
    headers: {
      "Authorization": "Bearer " + auth_token,
      "Accept": "application/json"
    }
  })
}

