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


let myKeysValues = window.location.search;
// console.log("Keys & Values:", myKeysValues);

let urlParam = new URLSearchParams(myKeysValues);
let param = urlParam.get('quoteId');
console.log(param);

// let testArr = [];

window.onload = function () {

    let localQuotes = localStorage.getItem("Quotes");
    console.log(localQuotes);
}



// let option = "";

// for (let i = 0; i < products.length; i++) {
//     option += '<option value="' + products[i].id + '">' + products[i].name + "</option"
//     console.log(products[i].id);
// }
// document.getElementById("slctProducts").innerHTML = option;


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
