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

function generateProductFields() {
    const countInput = document.getElementById('productCount').value;
    const count = parseInt(countInput);
    const container = document.getElementById('productsContainer');

    container.innerHTML = '';

    if (isNaN(count) || count <= 0) {
        return;
    }

    for (let i = 0; i < count; i++) {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p>Product ${i + 1}</p>
            <label for="productName-${i}">Product Name</label>
            <input type="text" id="productName-${i}"><br>
            <label for="productPrice-${i}">Price</label>
            <input type="number" id="productPrice-${i}" step="0.01"><br>
            <label for="productQuantity-${i}">Quantity</label>
            <input type="number" id="productQuantity-${i}"><br><br>
        `;
        container.appendChild(productDiv);
    }
}

document.getElementById('productCount').addEventListener('input', generateProductFields);
document.getElementById('productCount').addEventListener('change', generateProductFields);

document.getElementById('calculateBtn').addEventListener('click', function() {
    const customerName = document.getElementById('customerName').value.trim();
    const productCountInput = document.getElementById('productCount').value;
    const productCount = parseInt(productCountInput);
    const deliveryOption = document.getElementById('deliveryOption').value;
    const validationMessage = document.getElementById('validationMessage');
    const orderSummary = document.getElementById('orderSummary');

    validationMessage.innerText = '';
    orderSummary.innerText = '';

    if (!customerName) {
        validationMessage.innerText = 'Customer Name is required.';
        return;
    }

    if (isNaN(productCount) || productCount <= 0) {
        validationMessage.innerText = 'Number of Products must be a valid positive number.';
        return;
    }

    let subtotal = 0;
    let productsText = '';

    for (let i = 0; i < productCount; i++) {
        const nameEl = document.getElementById(`productName-${i}`);
        const priceEl = document.getElementById(`productPrice-${i}`);
        const qtyEl = document.getElementById(`productQuantity-${i}`);

        if (!nameEl || !priceEl || !qtyEl) {
            validationMessage.innerText = 'Product input fields missing.';
            return;
        }

        const name = nameEl.value.trim();
        const price = parseFloat(priceEl.value);
        const qty = parseInt(qtyEl.value);

        if (!name) {
            validationMessage.innerText = 'Product Name is required.';
            return;
        }
        if (isNaN(price) || price <= 0) {
            validationMessage.innerText = 'Price must be a valid positive number.';
            return;
        }
        if (isNaN(qty) || qty <= 0) {
            validationMessage.innerText = 'Quantity must be a valid positive number.';
            return;
        }

        const itemAmount = calculateItemAmount(price, qty);
        subtotal += itemAmount;

        productsText += `${i + 1}. ${name}\n   Price: ₱${price.toFixed(2)}\n   Quantity: ${qty}\n   Amount: ₱${itemAmount.toFixed(2)}\n`;
    }

    const discountAmount = calculateDiscount(subtotal);
    const discountRatePercent = subtotal > 0 ? Math.round((discountAmount / subtotal) * 100) : 0;
    const deliveryFee = getDeliveryFee(deliveryOption);
    const finalAmount = subtotal - discountAmount + deliveryFee;

    let deliveryTypeName = '';
    switch (parseInt(deliveryOption)) {
        case 1: deliveryTypeName = 'Store Pickup'; break;
        case 2: deliveryTypeName = 'Standard Delivery'; break;
        case 3: deliveryTypeName = 'Express Delivery'; break;
    }

    orderSummary.innerText = 
`MINI STORE CHECKOUT SYSTEM
Customer: ${customerName}
${productsText}ORDER SUMMARY
Subtotal: ₱${subtotal.toFixed(2)}
Discount Rate: ${discountRatePercent}%
Discount Amount: ₱${discountAmount.toFixed(2)}
Delivery Type: ${deliveryTypeName}
Delivery Fee: ₱${deliveryFee.toFixed(2)}
Final Amount: ₱${finalAmount.toFixed(2)}`;
});