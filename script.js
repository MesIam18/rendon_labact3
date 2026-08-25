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

document.getElementById('calculateBtn').addEventListener('click', function() {
    const customerName = document.getElementById('customerName').value.trim();
    const productCountInput = document.getElementById('productCount').value;
    const productCount = parseInt(productCountInput);
    const deliveryOption = document.getElementById('deliveryOption').value;
    const validationMessage = document.getElementById('validationMessage');
    const orderSummary = document.getElementById('orderSummary');

    validationMessage.innerText = '';
    orderSummary.innerHTML = '';

    if (!customerName) {
        validationMessage.innerText = 'Customer Name is required.';
        return;
    }

    if (isNaN(productCount) || productCount <= 0) {
        validationMessage.innerText = 'Number of Products must be a valid positive number.';
        return;
    }

    let subtotal = 0;
    let productsListHTML = '';

    for (let i = 0; i < productCount; i++) {
        const nameEl = document.getElementById(`productName-${i}`);
        const priceEl = document.getElementById(`productPrice-${i}`);
        const qtyEl = document.getElementById(`productQuantity-${i}`);

        if (!nameEl || !priceEl || !qtyEl) {
            validationMessage.innerText = 'Please click "Set Products" to generate product fields first.';
            return;
        }

        const name = nameEl.value.trim();
        const price = parseFloat(priceEl.value);
        const qty = parseInt(qtyEl.value);

        if (!name) {
            validationMessage.innerText = `Product Name for item ${i + 1} is required.`;
            return;
        }
        if (isNaN(price) || price <= 0) {
            validationMessage.innerText = `Price for item ${i + 1} must be a valid positive number.`;
            return;
        }
        if (isNaN(qty) || qty <= 0) {
            validationMessage.innerText = `Quantity for item ${i + 1} must be a valid positive number.`;
            return;
        }

        const itemAmount = calculateItemAmount(price, qty);
        subtotal += itemAmount;

        productsListHTML += `
            <p>
                ${i + 1}. ${name}<br>
                &nbsp;&nbsp;&nbsp;Price: ₱${price.toFixed(2)}<br>
                &nbsp;&nbsp;&nbsp;Quantity: ${qty}<br>
                &nbsp;&nbsp;&nbsp;Amount: ₱${itemAmount.toFixed(2)}
            </p>
        `;
    }

    const discountAmount = calculateDiscount(subtotal);
    const discountRatePercent = subtotal > 0 ? ((discountAmount / subtotal) * 100).toFixed(0) : 0;
    const deliveryFee = getDeliveryFee(deliveryOption);
    const finalAmount = subtotal - discountAmount + deliveryFee;

    let deliveryTypeName = '';
    switch (parseInt(deliveryOption)) {
        case 1: deliveryTypeName = 'Store Pickup'; break;
        case 2: deliveryTypeName = 'Standard Delivery'; break;
        case 3: deliveryTypeName = 'Express Delivery'; break;
    }

    orderSummary.innerHTML = `
        <h2>ORDER SUMMARY</h2>
        <p><strong>Customer:</strong> ${customerName}</p>
        ${productsListHTML}
        <hr>
        <p><strong>Subtotal:</strong> ₱${subtotal.toFixed(2)}</p>
        <p><strong>Discount Rate:</strong> ${discountRatePercent}%</p>
        <p><strong>Discount Amount:</strong> ₱${discountAmount.toFixed(2)}</p>
        <p><strong>Delivery Type:</strong> ${deliveryTypeName}</p>
        <p><strong>Delivery Fee:</strong> ₱${deliveryFee.toFixed(2)}</p>
        <p><strong>Final Amount:</strong> ₱${finalAmount.toFixed(2)}</p>
    `;
});