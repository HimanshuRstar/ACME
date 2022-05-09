
// function onloadClear() {
//     localStorage.clear();
// }
// window.onload = onloadClear();


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
            "api-token": "AfBhlqD5H67zSC2O6x8ii1BWf6aKhiT7ulAPD90Y4Z7jIRO1NsZRpEKfRb_4tyvm98I",
            "user-email": "himanshukathuria1997@gmail.com"
        }
    })

    $('#country').change(function () {
        stateData();
    })
    // $('#state').change(function () {
    //     cityData();
    // })
});


function countryData(auth_token) {
    $.ajax({
        type: 'get',
        url: 'https://www.universal-tutorial.com/api/countries/',
        success: function (data) {
            data.forEach(element => {
                $('#country').append('<option value = "' + element.country_name + '">' + element.country_name + '</option>')
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
    let countryName = $('#country').val();
    $.ajax({
        type: 'get',
        url: 'https://www.universal-tutorial.com/api/states/' + countryName,
        success: function (data) {
            $('#state').empty();
            data.forEach(element => {
                $('#state').append('<option value = "' + element.state_name + '">' + element.state_name + '</option>')
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

let quotesArr = [];

let myKeysValues = window.location.search;
// console.log("Keys & Values:", myKeysValues);

let urlParam = new URLSearchParams(myKeysValues);
let param = urlParam.get('quoteId');
console.log(param);


function Quote(id, name, createdDate, status, createdBy) {
    this.id = id;
    this.name = name;
    this.createdDate = createdDate;
    this.status = status;
    this.createdBy = createdBy;
    return this;
}

function Display() {

};


let viewBtnClick = function (itemId) {
    // let obj = quotesArr.find(o => o.id === itemId)
    location.href = 'Quotes2.html?quoteId=' + itemId;
}

Display.prototype.addTable = function (quote) {
    tableBodyQuotes = document.getElementById("tableBodyQuotes");
    tableBodyQuotes.innerHTML = "";

    for (let i = 0; i < quotesArr.length; i++) {

        let tableString = `<tr>
                            <td scope="row">${quotesArr[i].name}</th>
                            <td>${quotesArr[i].createdDate}</td>
                            <td>${quotesArr[i].status}</td>
                            <td>${quotesArr[i].createdBy}</td>
                            <td><button type="button" id = quotesViewBtn_${quotesArr[i].id} class="btn btn-primary quotes_details"
                                    onclick="viewBtnClick(${quotesArr[i].id});" >View
                                    Details</button></td>
                        </tr>`;
        tableBodyQuotes.innerHTML += tableString;
    }
}

Display.prototype.clear = function () {
    let quotesForm = document.getElementById("quotesForm");
    quotesForm.reset();
}


function quotesFormSubmit() {
    // console.log('you have submitted quotes form');
    let name = document.getElementById("quoteName").value;
    let createdDate = document.getElementById("createdDate").value;
    let status = document.getElementById("status");
    let displayStatus = status.options[status.selectedIndex].text;
    let createdBy = document.getElementById("createdBy").value;
    let quote = new Quote(quotesArr.length + 0, name, createdDate, displayStatus, createdBy);


    //Saving to local storage
    let quotes = localStorage.getItem("Quotes");

    if (quotes == null) {
        quotesArr = [];
    } else {
        quotesArr = JSON.parse(quotes);
    }

    quotesArr.push(quote);

    localStorage.setItem("Quotes", JSON.stringify(quotesArr));
    console.log(quotesArr);

    let display = new Display();
    display.addTable(quote);
    display.clear();

    return false;
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
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    // showData()
                    quotesFormSubmit()
                    $('#exampleModal').modal('hide')
                }

                // form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();



// window.onload = function () {

//     let localQuotes = localStorage.getItem("Quotes");
//     testArr.push(JSON.parse(localQuotes));

//     console.log("test", testArr);

//     // console.log("abcd", localQuotes);

// }

function showQuoteCred() {
    let quoteCredName = document.getElementById("quoteCredName");
    let quoteCreated = document.getElementById("quoteCreated");
    let quoteStatus = document.getElementById("quoteStatus");
    let quotedCreatedDate = document.getElementById("quotedCreatedDate");

    let displayData = localStorage.getItem("Quotes", JSON.stringify(quotesArr));
    // console.log("abcde", displayData);

    let displayAllData = JSON.parse(displayData);

    quoteCredName.textContent = displayAllData[param].name;
    quoteCreated.textContent = displayAllData[param].createdDate;
    quoteStatus.textContent = displayAllData[param].status;
    quotedCreatedDate.textContent = displayAllData[param].createdBy;
}


let products =
    [
        {
            "id": 1,
            "name": "Iphone",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "700$"
        },
        {
            "id": 2,
            "name": "MI",
            "description": "5gb RAM, 128gb ROM. Retina Display",
            "unitprice": "300$"
        },
        {
            "id": 3,
            "name": "Realme",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "400$"
        },
        {
            "id": 4,
            "name": "Samsung",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "600$"
        },
        {
            "id": 5,
            "name": "LG",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "500$"
        },
        {
            "id": 6,
            "name": "Huawei",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "600$"
        },
        {
            "id": 7,
            "name": "Oppo",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "200$"
        },
        {
            "id": 8,
            "name": "Motorola",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "200$"
        },
        {
            "id": 9,
            "name": "Microsoft",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "200$"
        },
        {
            "id": 10,
            "name": "Micromax",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "200$"
        },
        {
            "id": 11,
            "name": "Maxon",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "200$"
        },
        {
            "id": 12,
            "name": "Oneplus",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "200$"
        },
        {
            "id": 13,
            "name": "Orange",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "200$"
        },
        {
            "id": 14,
            "name": "O2",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "200$"
        },
        {
            "id": 15,
            "name": "Panasonic",
            "description": "4gb RAM, 128gb ROM. Retina Display",
            "unitprice": "200$"
        }
    ]


products.forEach((product) => {
    let option = document.createElement("option");

    option.text = product.name;
    option.value = product.description;

    document.getElementById("slctProducts").appendChild(option);
});

slctProducts.onchange = function () {
    document.getElementById("description").placeholder = slctProducts.value;
};

//Constructor
function Product(name, description, quantity) {
    this.name = name;
    this.description = description;
    this.quantity = quantity;
}

function Display() {

}


Display.prototype.add = function (product) {
    // console.log("add")
    tableBody = document.getElementById('tableBody');
    let tableString = `<tr>
                                <td scope="row">${product.name}</th>
                                <td>${product.description}</td>
                                <td>${product.quantity}</td>
                                <td>${product.quantity * 100}</td>
                        </tr>`;
    // console.log("product Name", product.name);
    // console.log("descriptionnnn", product.description);
    tableBody.innerHTML += tableString;
}


Display.prototype.clear = function () {
    let productForm = document.getElementById('productForm');
    productForm.reset()
}

let productForm = document.getElementById("productForm");
productForm.addEventListener('submit', productFormSubmit);


function productFormSubmit() {
    // console.log("Submitted");
    let name = document.getElementById('slctProducts').options[slctProducts.selectedIndex].text;
    let description = document.getElementById('slctProducts').value;
    let quantity = document.getElementById('quantity').value;

    let product = new Product(name, description, quantity);
    // console.log(product);

    let display = new Display();
    display.add(product);
    display.clear();
    return false;
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
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    productFormSubmit();
                    $('#exampleModal').modal('hide')
                }

                // form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


//API call


// function cityData() {
//     let stateName = $('#state').val();
//     $.ajax({
//         type: 'get',
//         url: 'https://www.universal-tutorial.com/api/cities/' + stateName,
//         success: function (data) {
//             $('#city').empty();
//             data.forEach(element => {
//                 $('#city').append('<option value = "' + element.city_name + '">' + element.city_name + '</option>')
//             });
//         },
//         error: function (error) {
//             console.log('Page does not exist', error);
//         },
//         headers: {
//             "Authorization": "Bearer " + auth_token,
//             "Accept": "application/json"
//         }
//     })
// }

