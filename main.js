/**
 * For User Data
 */
let userhtmlList = "<option>-Select-</option>";
const userElement = document.getElementById("_accounts");
users.map(user => {
    userhtmlList += "<option value=" + user._id + ">" + user.name + "</option>";
});
userElement.innerHTML = userhtmlList;



/**
 * Events
 */
   // change event allows user to choose   
 userElement.addEventListener("change", function () {

    // to make the date editable
    document.getElementById("datepicker").readOnly = false;
   
    //   gives value to the other fields 
    users.find((val, index) => {
        if (val._id == this.value) {
            document.getElementById("_invoice").value = val.invoice_number;
            document.getElementById("_address").value = val.address;
            document.getElementById("_email").value = val.email;
            document.getElementById("datepicker").value = val.date;
            document.getElementById("_email").value = val.email;
            document.getElementById("_status").value = val.status;
            document.getElementById("_phone").value = val.phone;
            document.getElementById("_vat").value = val.vat;
            document.getElementById("_fax").value = val.fax;
            document.getElementById("_swiftcode").value = val.swift_code;
        }
    });

});



// fills in the modal details in table 
function print_invoice_list() {
    let invoicehtmlList = "";
    const invoiceElement = document.getElementById("invoicelist");
    
    invoicelist = JSON.parse(localStorage.getItem("records"));
    invoicelist && invoicelist.map(invoice => { 
        let total= invoice.total ? invoice.total : 0
        invoicehtmlList += `<tr>
                            <td>` + invoice.srno + `</td>
                            <td>` + invoice.invoice_number + `</td>
                            <td class="txt-oflo">` + invoice.account_name + `</td>
                            <td>` + invoice.date + `</td>
                            <td scope="row">` + invoice.status + `</th>
                            <td>$` + total + `</td>
                            <td><a href="viewdetails.html?pid=` + invoice.srno + `" class="btn"
                                    style="padding: 2%; color: white; background-color: #1d487b;"
                                    role="button">View
                                    Details</a></td>
                        </tr>`;
    });
    invoiceElement.innerHTML = invoicehtmlList;
}
// used to store table content in the local browser storage
function SaveDataToLocalStorage(data) {
    var a = [];
    a = JSON.parse(localStorage.getItem('records')) || [];
    a.push(data);
    localStorage.setItem('records', JSON.stringify(a));
    console.log(a);
}

let srno = 0;

document.getElementById("_btnsave").addEventListener("click", function () {

a = JSON.parse(localStorage.getItem('records')) || [];
if (a.length)
srno = (a[a.length - 1])['srno'];


// let pArray = [];
// let productRef = document.getElementById("_products").value;
// products.find((val, index) => {
// if (val._id == productRef) {

// pArray.push({

// "name": val.name,
// "qty": val.qty,
// "description": val.description,
// "unitcost": val.unitcost,
// "price": val.price,
// "discount": val.discount,
// "vat": val.vat,
// "subtotal": val.subtotal,
// "total": val.total

// });

// }
// });

SaveDataToLocalStorage({
srno: ++srno,
invoice_number: document.getElementById("_invoice").value,
account_name: document.getElementById("_accounts").options[document.getElementById("_accounts").value].text,
date: document.getElementById("datepicker").value,
status: document.getElementById("_status").value,
vat: document.getElementById("_vat").value,
fax: document.getElementById("_fax").value,
email:  document.getElementById("_email").value,
phone: document.getElementById("_phone").value,
swift_code: document.getElementById("_swiftcode").value,
address:  document.getElementById("_address").value,
// total_cost: document.getElementById("_total").value,
// product_ref: JSON.stringify(pArray),
});
print_invoice_list();
++srno;
});
print_invoice_list();