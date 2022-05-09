var orderRecords = [];

function saveData() {
    var orderNumber = document.getElementById('txtOrderNumber').value;
    var expiryDate = document.getElementById('txtDate').value;
    var AccountName = document.getElementById('txtAccountName').value;
    var phone = document.getElementById('txtPhone').value;
    var shipAdd = document.getElementById('txtShipAddress').value;

    var orderObj = {
        orderNumber,
        expiryDate,
        AccountName,
        phone,
        shipAdd
    }
    orderRecords.push(orderObj);
    localStorage.setItem('orderRecord', JSON.stringify(orderRecords));
    localStorage.setItem('orderNumber', JSON.stringify(orderNumber));
    document.getElementById('orderForm').reset();
    window.open("./orderdetail.html", false);
}

document.getElementById('body').onload = function() {
    now = new Date();
    randomNum = '';
    randomNum += Math.round(Math.random() * 9);
    randomNum += Math.round(Math.random() * 9);
    randomNum += now.getTime();
    document.getElementById('txtOrderNumber').value = randomNum;
    loadTableData();
}

var accountObj = [{
        "id": 1,
        "name": "Tata Consultancy",
        "address": "Versatile Uniform Flexibility",
        "phone": "12-8258291"
    },
    {
        "id": 2,
        "name": "Infosys",
        "address": "Profit-Focused Bottom-Line Application",
        "phone": "43-5279271"
    },
    {
        "id": 3,
        "name": "Tech Mahindra",
        "address": "Grass-Roots Reciprocal Moderator",
        "phone": "33-1321261"
    },
    {
        "id": 4,
        "name": "Cognizant",
        "address": "Ameliorated Web-Enabled Opensystem",
        "phone": "50-7590003"
    },
    {
        "id": 5,
        "name": "Delloite",
        "address": "Enhanced Tangible Knowledgeuser",
        "phone": "25-9125794"
    },
    {
        "id": 6,
        "name": "Capegimini",
        "address": "Open-Architected Bi-Directional Customerloyalty",
        "phone": "77-4072073"
    },
    {
        "id": 7,
        "name": "Wipro",
        "address": "Inverse Global Securedline",
        "phone": "33-9199265"
    },
    {
        "id": 8,
        "name": "Wallmart",
        "address": "Pre-Emptive Reciprocal Strategy",
        "phone": "65-4996520"
    },
    {
        "id": 9,
        "name": "Happiest Minds",
        "address": "Grass-Roots Actuating Model",
        "phone": "71-1471050"
    },
    {
        "id": 10,
        "name": "LTI",
        "address": "Balanced 5Thgeneration Neural-Net",
        "phone": "63-7515918"
    }
]


/*list of available options*/
var n = accountObj.length; //length of datalist accountObj   
var phoneNo = '';

function getAccountName(value) {
    document.getElementById('datalist').innerHTML = '';
    //setting datalist empty at the start of function
    //if we skip this step, same name will be repeated

   
    for (var i = 0; i < n; i++) {
        if (((accountObj[i]['name'].toLowerCase()).indexOf(value.toLowerCase())) > -1) {
            //comparing if input string is existing in accountObj[i] string

            var node = document.createElement("option");
            var val = document.createTextNode(accountObj[i]['name']);
            node.value = accountObj[i]['name'];
            node.id = accountObj[i]['id'];
            node.appendChild(val);
            document.getElementById("datalist").appendChild(node);
            //creating and appending new elements in data list
        } else {
            document.getElementById('txtShipAddress').value = '';
            document.getElementById('txtPhone').value = '';
        }
    }
    fillDetails(value ? node.value : '');
}

function fillDetails(accName) {

    var accountName = accName;

    if (accName != '') {
        document.getElementById('txtPhone').value = accountObj.filter(item => {
            return accountName == item['name'];
        })[0]['phone'];

        document.getElementById('txtShipAddress').value = accountObj.filter(item => {
            return accountName == item['name'];
        })[0]['address'];
    }
}

function loadTableData() {

    var tblOrderList = document.getElementById('table');
    var orderData = JSON.parse(localStorage.getItem('orderRecord')) || [];
    orderRecords = orderData;
    var headers = ['Order No.', 'Close Date', 'Account Name', 'Phone No', 'Address', 'Action'];
    var headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        var header = document.createElement('th');
        var textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);
    orderRecords.forEach(items => {
        var row = document.createElement('tr');
        Object.values(items).forEach(text => {
            var cell = document.createElement('td');
            var textNode = document.createTextNode(text);
            cell.appendChild(textNode);             
            row.appendChild(cell);
        });
        var cell = document.createElement('td')
        row.appendChild(cell);
        var lastCell = row.cells[row.cells.length - 1];
        lastCell.innerHTML = "<button type='button' class='btn btn-primary' onclick='navigateToOrderDetails()'> View Details</button>"

        //  table.appendChild(button);
        table.appendChild(row);
    })
    tblOrderList.appendChild(table);
}

function navigateToOrderDetails() {
    location.href ="orderdetail.html";
}