/**
 * For Product Data
 */
let producthtmlList = "<option>-Select-</option>";
const productElement = document.getElementById("statusId");
products.map(product => {
    producthtmlList += "<option value=" + product._id + ">" + product.name + "</option>";
});
productElement.innerHTML = producthtmlList;


// change event allows user to choose   
productElement.addEventListener("change", function () {

    // to make the date editable
    //  document.getElementById("_qty").readOnly = false;

    //   gives value to the other fields 
    products.find((val, index) => {
        console.log(val)
        if (val._id == this.value) {
            console.log(this.value)
            // document.getElementById("_qty").value = val.qty;
            document.getElementById("description").value = val.description;
            document.getElementById("unitcost").value = val.unitcost;
            // document.getElementById("_price").value = val.price;
            // document.getElementById("_subtotal").value = val.subtotal;
            // document.getElementById("_discount").value = val.discount;
            // document.getElementById("_vat").value = val.vat;
            // document.getElementById("_total").value = val.total;
        }
    });

});



// fills in the modal details in table 
function print_detailed_list() {
    let detailedhtmlList = "";
    let detailedElement = document.getElementById("detailedlist");

    detailedlist = JSON.parse(localStorage.getItem("prod"));
    // filters prod based on userID
    let data = detailedlist.filter(item => item.userId === parseInt(window.location.search.split("=")[1]))
    if(data.length){
        data && data.map(detailed => {
            detailedhtmlList += `<tr>
                                <td>` + detailed.srno + `</td>
                                <td>` + detailed.product_name + `</td>
                                <td class="txt-oflo">` + detailed.description + `</td>
                                <td>` + detailed.quantity + `</td>
                                <td scope="row"> $ `  + detailed.unit_cost + `</td>
                                <td scope="row" > $`  + detailed.total + `</td>
                            </tr>`;
            
        });
        detailedElement.innerHTML = detailedhtmlList;

    }
    
}


// used to store table content in the local browser storage
function SaveDataToLocalStorage(data) {
    var a = [];
    a = JSON.parse(localStorage.getItem('prod')) || [];
    a.push(data);
    localStorage.setItem('prod', JSON.stringify(a));
    console.log(a);
}

let srno = 0;

document.getElementById("_addproduct").addEventListener("click", function () {

    a = JSON.parse(localStorage.getItem('prod')) || [];
    if (a.length)
        srno = (a[a.length - 1])['srno'];


    let pArray = [];
    let productRef = document.getElementById("statusId").value;
    products.find((val, index) => {
        if (val._id == productRef) {
            // gets item from local storage
            let detailedlist = JSON.parse(localStorage.getItem("prod")) ? JSON.parse(localStorage.getItem("prod")) : [];
            // filters data based on userId and returns array of the same user
            let items = detailedlist.filter(item => item.userId === parseInt(window.location.search.split("=")[1]))
            let subtotal = document.getElementById("unitcost").value*document.getElementById("quantity").value;
            // loop adds up the subtotal
            for(let i=0; i<items.length; i++){
                subtotal += items[i].total
            } 
            
            document.getElementById("subtotal").innerHTML  = "$"+ subtotal
            let userId = parseInt(window.location.search.split("=")[1])
            // used spread operator to make copy of records array
            let invoicelist = [...JSON.parse(localStorage.getItem("records"))];
            
            //   find index based on userID
            let total = invoicelist.findIndex(item=> item.srno === userId)
            // added new key to records to show total amount
            invoicelist[total] = {...invoicelist[total],"total": subtotal}
            
            localStorage.setItem('records', JSON.stringify(invoicelist));

            console.log(total)

            
            // pArray.push({

            //     "name": val.name,
            //     "qty": val.qty,
            //     "description": val.description,
            //     "unitcost": val.unitcost,
            //     "price": val.price,
            //     "discount": val.discount,
            //     "vat": val.vat,
            //     "subtotal": val.subtotal,
            //     "total": val.total

            // });

        }
    });
    

   

    SaveDataToLocalStorage({
        srno: ++srno,
        // invoice_number: document.getElementById("_invoice").value,
        // account_name: document.getElementById("_accounts").options[document.getElementById("_accounts").value].text,
        // date: document.getElementById("datepicker").value,
        // status: document.getElementById("_status").value,
        // vat: document.getElementById("_vat").value,
        // fax: document.getElementById("_fax").value,
        // email:  document.getElementById("_email").value,
        // phone: document.getElementById("_phone").value,
        // swift_code: document.getElementById("_swiftcode").value,
        // address:  document.getElementById("_address").value,
        // total_cost: document.getElementById("_total").value,

        srno: document.getElementById("statusId").value,
        product_name: products[document.getElementById("statusId").value - 1].name,
        description: document.getElementById("description").value,
        quantity: document.getElementById("quantity").value,
        unit_cost: document.getElementById("unitcost").value,
        user_id: parseInt(window.location.search.split("=")[1]),
        total: document.getElementById("unitcost").value*document.getElementById("quantity").value,
        userId: parseInt(window.location.search.split("=")[1]),

        product_ref: JSON.stringify(pArray),
    });
    print_detailed_list();
    ++srno;
});
print_detailed_list();

function subtotal(){
    let detailedlist = JSON.parse(localStorage.getItem("records")) ? JSON.parse(localStorage.getItem("records")) : [];
     
     let subtotal = 0;
    //  for(let i=0; i<detailedlist.length; i++){
    //      subtotal += detailedlist[i].total
    //  } 
     document.getElementById("subtotal").innerHTML  = "$" + detailedlist[parseInt(window.location.search.split("=")[1])-1].total
 
    }
subtotal();