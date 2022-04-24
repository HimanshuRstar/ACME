const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

const searchProducts = async searchText => {
    const res = await fetch('../products.json');
    const products = await res.json();

    // console.log(products);

    let matches = products.filter(product => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return product.name.match(regex);
    });
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    outputHtml(matches);
};

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
       <div class = "form-control matchedItems">
       <p>${match.name}</p>
       </div>   
     `).join('');
        matchList.innerHTML = html;
    }
}
search.addEventListener('input', () => searchProducts(search.value));



// Constructor 
function Product(name, description, quantity) {
    this.name = name;
    this.description = description;
    this.quantity = quantity;
}

function Display() {

}

Display.prototype.add = function (product) {
    console.log("add")
    tableBody = document.getElementById('tableBody');
    let tableString = `<tr>
                                <td scope="row">${product.name}</th>
                                <td>${product.description}</td>
                                <td>${product.quantity}</td>
                                <td>${product.quantity * 100}</td>
                        </tr>`;

    tableBody.innerHTML += tableString;
}


Display.prototype.clear = function () {
    let productForm = document.getElementById('productForm');
    productForm.reset()
}



let productForm = document.getElementById("productForm");
productForm.addEventListener('submit', productFormSubmit);

function productFormSubmit(p) {
    console.log("Submitted");

    let name = document.getElementById('productName').value;
    let description = document.getElementById('description').value;
    let quantity = document.getElementById('quantity').value;

    let product = new Product(name, description, quantity);
    console.log(product);

    let display = new Display();
    display.add(product);
    display.clear();

    p.preventDefault();

}

