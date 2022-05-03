let users = [
    {
        "email": "sonu@gmail.com",
        "password": "sonu^%$ert"
    },
    {
        "email": "himanshu@gmail.com",
        "password": "himanshu"
    },
    {
        "email": "aashna@gmail.com",
        "password": "aashna^%$ert"
    },
    {
        "email": "vishnu@gmail.com",
        "password": "vishnu^%$ert"
    },

    {
        "email": "umesh@gmail.com",
        "password": "umesh^%$ert"
    }
]

document.getElementById('registerBtn').onclick = function (e) {
    var newUsername = document.getElementById('registerEmail').value;
    var newPassword = document.getElementById('registerPass').value;
    users.push({ email: newUsername, pass: newPassword });
    console.log(users);

    e.preventDefault();
}


function checkValidation() {
    var emailVal = document.getElementById('email_validate').value
    var pwdVal = document.getElementById('pass_validate').value
    let error = document.getElementById("validationError");
    for (var i = 0; i < users.length; i++) {
        if (emailVal == users[i].email && emailVal != null) {
            if (pwdVal == users[i].password && pwdVal != null) {
                error.innerHTML = 'Success!'
                return;
            } else {
                error.innerHTML = 'Please fill the Correct Password'
                return false;
            }
        }
    }
    error.innerHTML = 'Please fill the Correct Email'
    return false;
}


// function validateForm() {
//     let txtEmailVal = document.getElementById("email_validate").value;
//     let txtPwdVal = document.getElementById("pass_validate").value;
//     // let error = document.getElementById("validationError")

//     let registeredUsers = [
//         {
//             "email": "sonu@gmail.com",
//             "password": "sonu^%$ert"
//         },
//         {
//             "email": "himanshu@gmail.com",
//             "password": "himanshu^%$ert"
//         },
//         {
//             "email": "aashna@gmail.com",
//             "password": "aashna^%$ert"
//         },
//         {
//             "email": "vishnu@gmail.com",
//             "password": "vishnu^%$ert"
//         },

//         {
//             "email": "umesh@gmail.com",
//             "password": "umesh^%$ert"
//         }
//     ]

// let object = registeredUsers.find(obj => obj.email == txtEmailVal && obj.password == txtPwdVal);
// console.log('testobject', object);
// if (object == null) {
//     alert('Pls validate your form')
//     // error.innerHTML = "Email Address is Not Valid."
//     return false;
// }
// else if (txtPwdVal.length < 6) {
//     alert('testing password')
//     return false;
// }
// }












// function checkValidation() {
//     let emailVal = document.getElementById("email_validate").value;
//     let pwdVal = document.getElementById("pass_validate").value;
//     // let error = document.getElementById("validationError");
//     let object = registeredUsers.find(obj => obj.email == emailVal && obj.password == pwdVal);
//     if (object != null)
//         console.log('Login successfull!');
//     else {
//         let findObject = registeredUsers.find(obj => obj.email == emailVal);
//         if (findObject != null)
//             pwdValidate();
//         else
//             emailValidate();
//     }
// }

// function emailValidate() {

//     let error = document.getElementById("validationError");
//     let object = registeredUsers.find(obj => obj.email == emailVal);
//     if (object) {
//         error.innerHTML = "Email Address is Valid."
//     } else if (emailVal == null) {
//         error.innerHTML = "Please fill the email."
//     }
// }

// function pwdValidate() {

//     let error = document.getElementById("validationError");
//     let object = registeredUsers.find(obj => obj.password == pwdVal);
//     if (object) {
//         error.innerHTML = "Email Address is Valid."
//     } else if (emailVal == null) {
//         error.innerHTML = "Please fill the email."
//     }
// }







// let checkValidation = (txtEmailVal, txtPwdVal) => {
//     txtEmailVal = document.getElementById("email_validate");
//     txtPwdVal = document.getElementById("pass_validate")
//     let object = registeredUsers.find(obj => obj.email == txtEmailVal && obj.password == txtPwdVal);

//     if (object != null)
//         console.log('Login successfull!!');
//     else {
//         let findObject = registeredUsers.find(obj => obj.email == txtEmailVal);
//         if (findObject != null)
//             console.log('Incorrect Password!!');
//         else
//             console.log('User does not exist!!');
//     }
// }



















// let emailValidate = [{
//     email: "himanshukathuria1997@gmail.com",
//     password: "Himanshu123"
// },
// {
//     email: "himanshu.kathuria@rstartec.com",
//     password: "Himanshu1234"
// }]

// // emailValidate.forEach((e) => {
// //     console.log(e.email);
// // })
// function validateForm() {
//     let email = document.getElementById("email_validate").value;
//     let pass = document.getElementById("pass_validate").value;
//     let email1 = emailValidate[0].email;
//     let pass1 = emailValidate[0].password;
//     let error = document.getElementById("validationError")


//     if (email == null || email != email1) {
//         error.innerHTML = "Email Address is Not Valid."
//         return false;
//     }
//     else if (pass.length < 6 || pass != emailValidate[i].password) {
//         error.innerHTML = "Password is Not Valid."
//         return false;
//     }
// }
