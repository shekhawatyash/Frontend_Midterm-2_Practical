
let cartItems = [
    { name: "Notebook", price: 120, qty: 1 },
    { name: "Pen Pack", price: 60, qty: 1 },
    { name: "Water Bottle", price: 350, qty: 1 }
];

function renderCart() {

    let cartContent = document.getElementById("cart-content");
    let summary = document.getElementById("summary");

    if (cartItems.length === 0) {
        cartContent.innerHTML =
            '<p class="empty">Your cart is empty.</p>';

        summary.innerHTML = "";
        return;
    }

    let subtotal = 0;

    let html = `
        <table>
            <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
    `;

    cartItems.forEach((item, index) => {

        let total = item.price * item.qty;
        subtotal += total;

        html += `
            <tr>
                <td>${item.name}</td>
                <td>Rs. ${item.price}</td>

                <td>
                    <div class="quantity">
                        <button onclick="decreaseQty(${index})"
                        ${item.qty === 1 ? "disabled" : ""}>-</button>

                        ${item.qty}

                        <button onclick="increaseQty(${index})">+</button>
                    </div>
                </td>

                <td>Rs. ${total}</td>

                <td>
                    <button class="remove-btn"
                    onclick="removeItem(${index})">
                    Remove
                    </button>
                </td>
            </tr>
        `;
    });

    html += "</table>";

    cartContent.innerHTML = html;

    let discount = 0;

    if (subtotal >= 1000) {
        discount = subtotal * 0.10;
    }

    let payable = subtotal - discount;

    summary.innerHTML = `
        <div class="summary">
            Subtotal: Rs. ${subtotal.toFixed(2)}<br>

            Discount (10% on Rs. 1000+):
            Rs. ${discount.toFixed(2)}<br>

            <div class="payable">
                Amount payable: Rs. ${payable.toFixed(2)}
            </div>
        </div>
    `;
}

function increaseQty(index) {
    cartItems[index].qty++;
    renderCart();
}

function decreaseQty(index) {

    if (cartItems[index].qty > 1) {
        cartItems[index].qty--;
        renderCart();
    }
}

function removeItem(index) {
    cartItems.splice(index, 1);
    renderCart();
}


renderCart();