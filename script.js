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
    switch (option) {
        case '1':
            return 0;
        case '2':
            return 80;
        case '3':
            return 150;
        default:
            return 0;
    }
}

document.getElementById('productCount').addEventListener('input', function() {
    const count = parseInt(this.value);
    const container = document.getElementById('productsContainer');
    container.innerHTML = ''; 
    
    if (count > 0) {
        for (let i = 0; i < count; i++) {
            const productDiv = document.createElement('div');
            productDiv.style.marginBottom = '10px';
            productDiv.innerHTML = `
                <h4>Product ${i + 1}</h4>
                <label for="productName-${i}">Product Name</label>
                <input type="text" id="productName-${i}">
                
                <label for="productPrice-${i}">Price</label>
                <input type="number" id="productPrice-${i}" min="0" step="0.01">
                
                <label for="productQuantity-${i}">Quantity</label>
                <input type="number" id="productQuantity-${i}" min="1">
            `;
            container.appendChild(productDiv);
        }
    }
});

document.getElementById('calculateBtn').addEventListener('click', function() {
    const customerName = document.getElementById('customerName').value.trim();
    const productCount = parseInt(document.getElementById('productCount').value);
    const validationMessage = document.getElementById('validationMessage');
    const orderSummary = document.getElementById('orderSummary');
    
    validationMessage.innerHTML = '';
    orderSummary.innerHTML = '';
    
    if (!customerName) {
        validationMessage.innerText = 'Customer name cannot be empty.';
        return;
    }
    
    if (isNaN(productCount) || productCount <= 0) {
        validationMessage.innerText = 'Please enter a valid positive number for Number of Products.';
        return;
    }

    let subtotal = 0;
    let summaryHTML = `<h3>MINI STORE CHECKOUT SYSTEM</h3><p>Customer: ${customerName}</p>`;
    
    for (let i = 0; i < productCount; i++) {
        const nameInput = document.getElementById(`productName-${i}`);
        const priceInput = document.getElementById(`productPrice-${i}`);
        const qtyInput = document.getElementById(`productQuantity-${i}`);
        
        if (!nameInput || !priceInput || !qtyInput) {
            validationMessage.innerText = 'Product fields are missing. Please re-enter the number of products.';
            return;
        }
        
        const name = nameInput.value.trim();
        const price = parseFloat(priceInput.value);
        const quantity = parseInt(qtyInput.value);
        
        if (!name || isNaN(price) || price < 0 || isNaN(quantity) || quantity <= 0) {
            validationMessage.innerText = `Please ensure product ${i + 1} has a valid name, and positive numbers for price and quantity.`;
            return;
        }
        
        const amount = calculateItemAmount(price, quantity);
        subtotal += amount;
        
        summaryHTML += `
            <p>
                ${i + 1}. ${name}<br>
                Price: ₱${price.toFixed(2)}<br>
                Quantity: ${quantity}<br>
                Amount: ₱${amount.toFixed(2)}
            </p>
        `;
    }
    
    const discount = calculateDiscount(subtotal);
    const deliveryOptionSelect = document.getElementById('deliveryOption');
    const deliveryOptionValue = deliveryOptionSelect.value;
    const deliveryFee = getDeliveryFee(deliveryOptionValue);
    const deliveryTypeText = deliveryOptionSelect.options[deliveryOptionSelect.selectedIndex].text;
    
    let discountRateStr = "0%";
    if (subtotal >= 5000) discountRateStr = "10%";
    else if (subtotal >= 3000) discountRateStr = "7%";
    else if (subtotal >= 1000) discountRateStr = "5%";

    const finalAmount = subtotal - discount + deliveryFee;
    
    summaryHTML += `
        <h4>ORDER SUMMARY</h4>
        <p>Subtotal: ₱${subtotal.toFixed(2)}</p>
        <p>Discount Rate: ${discountRateStr}</p>
        <p>Discount Amount: ₱${discount.toFixed(2)}</p>
        <p>Delivery Type: ${deliveryTypeText}</p>
        <p>Delivery Fee: ₱${deliveryFee.toFixed(2)}</p>
        <p><strong>Final Amount: ₱${finalAmount.toFixed(2)}</strong></p>
    `;
    
    orderSummary.innerHTML = summaryHTML;
});