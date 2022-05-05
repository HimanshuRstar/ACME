document.querySelector('.select-field').addEventListener('click', () => {
    document.querySelector('.list_products').classList.toggle('show');
    document.querySelector('.down-arrow').classList.toggle('rotate180');
});



let quotesArr = [];

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
    let quote = new Quote(quotesArr.length + 1, name, createdDate, displayStatus, createdBy);


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


//local storage saving

// let addBtn = document.getElementById('save');
// addBtn.addEventListener("click", function (e) {

//     let name = document.getElementById("quoteName").value;
//     let createdDate = document.getElementById("createdDate").value;
//     let status = document.getElementById("status");
//     let displayStatus = status.options[status.selectedIndex].text;
//     let createdBy = document.getElementById("createdBy").value;

//     let quote = new Quote(name, createdDate, displayStatus, createdBy);



// let quotes = localStorage.getItem("Quotes");

// if (quotes == null) {
//     quotesArr = [];
// } else {
//     quotesArr = JSON.parse(quotes);
// }

// quotesArr.push(quote);

// localStorage.setItem("Quotes", JSON.stringify(quotesArr));

// console.log(quotesArr);

// });
