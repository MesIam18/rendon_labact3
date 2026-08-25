function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    if (subtotal >= 5000) {
        return subtotal * 0.10;
    } else if (subtotal >= 3000) {
        return subtotal * 0.07;
    } else if (subtotal >= 1000) {
        return subtotal * 0.05;
    } else {
        return 0;
    }
}

function getDeliveryFee(option) {
    switch (parseInt(option)) {
        case 1:
            return 0;
        case 2:
            return 80;
        case 3:
            return 150;
        default:
            return 0;
    }
}

document.getElementById('generateProductsBtn').addEventListener('click', function() {
    const countInput = document.getElementById('productCount').value;
    const count = parseInt(countInput);
    const container = document.getElementById('productsContainer');
    const validationMessage = document.getElementById('validationMessage');

    container.innerHTML = '';
    validationMessage.innerText = '';

    if (isNaN(count) || count <= 0) {
        validationMessage.innerText = 'Please enter a valid positive number for products.';
        return;
    }

    for (let i = 0; i < count; i++) {
        const productDiv = document.createElement('div');
        productDiv.style.marginBottom = '10px';
        productDiv.innerHTML = `
            <h4>Product ${i + 1}</h4>
            <label for="productName-${i}">Product Name</label>
            <input type="text" id="productName-${i}" name="productName-${i}"><br>

            <label for="productPrice-${i}">Price</label>
            <input type="number" id="productPrice-${i}" name="productPrice-${i}" step="0.01"><br>

            <label for="productQuantity-${i}">Quantity</label>
            <input type="number" id="productQuantity-${i}" name="productQuantity-${i}"><br>
        `;
        container.appendChild(productDiv);
    }
});