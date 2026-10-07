"use strict";

const STORAGE_KEY = "mini-pos-cart";
let cart = [];
let totalAkhir = 0;

const form = document.getElementById("item-form");
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");
const itemQtyInput = document.getElementById("item-quantity");

const itemErrorName = document.getElementById("item-name-error");
const itemErrorPrice = document.getElementById("item-price-error");
const itemErrorQty = document.getElementById("item-quantity-error");

const cartBody = document.getElementById("cart-body");
const subtotalTotal = document.getElementById("subtotal-total");
const discountTotal = document.getElementById("discount-total");
const finalTotal = document.getElementById("final-total");

const paymentInput = document.getElementById("payment-amount");
const paymentMessage = document.getElementById("payment-message");
const newTransactionButton = document.getElementById("new-transaction");

form.addEventListener("submit", handleAddItem);
paymentInput.addEventListener("input", calculateChange);
newTransactionButton.addEventListener("click", startNewTransaction);


function validateItem(name, price, qty) {
    let valid = true;

    itemErrorName.textContent = "";
    itemErrorPrice.textContent = "";
    itemErrorQty.textContent = "";

    if (name.length < 3) {
        itemErrorName.textContent = "Nama barang minimal 3 karakter.";
        valid = false;
    }
    if (!Number.isFinite(price) || price < 500) {
        itemErrorPrice.textContent = "Harga barang minimal Rp500.";
        valid = false;
    }
    if (!Number.isInteger(qty) || qty < 1) {
        itemErrorQty.textContent = "Jumlah barang minimal 1.";
        valid = false;
    }

    return valid;
}

function handleAddItem(event) {
    event.preventDefault();
    console.log("Data berhasil disubmit:", {
        name: itemNameInput.value,
        price: itemPriceInput.value,
        quantity: itemQtyInput.value,
    });

    const name = itemNameInput.value.trim();
    const price = Number(itemPriceInput.value);
    const qty = Number(itemQtyInput.value);

    if (!validateItem(name, price, qty)) {
        return;
    }

    const item = {
        id: Date.now(),
        name: name,
        price: price,
        quantity: qty,
    }

    cart.push(item);
    saveCart();
    renderCart();
    calculateTotals();
    form.reset();
}

function renderCart() {
    cartBody.innerHTML = "";

    if (cart.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 6;
        cell.textContent = "Keranjang kosong.";
        row.appendChild(cell);
        cartBody.appendChild(row);
        return;
    }

    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = index + 1;
        row.appendChild(numberCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = item.price;
        row.appendChild(priceCell);

        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        const subtotalCell = document.createElement("td");
        subtotalCell.textContent = item.price * item.quantity;
        row.appendChild(subtotalCell);

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Hapus";
        deleteButton.addEventListener("click", function () {
            handleRemoveItem(item.id);
        });
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        cartBody.appendChild(row);
    });
}

function handleRemoveItem(id) {
    cart = cart.filter(function (item) {
        return item.id !== id;
    });
    saveCart();
    renderCart();
    calculateTotals();
}

function rupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(angka)
}

function calculateTotals() {
    let totalBelanja = 0;

    for (const item of cart) {
        totalBelanja += item.price * item.quantity;
    }

    let diskon = 0;
    if (totalBelanja >= 50000) {
        diskon = totalBelanja * 0.1;
    }

    totalAkhir = totalBelanja - diskon;

    subtotalTotal.textContent = rupiah(totalBelanja);
    discountTotal.textContent = rupiah(diskon);
    finalTotal.textContent = rupiah(totalAkhir);
    calculateChange();
}

function calculateChange() {
    if (cart.length === 0) {
        paymentMessage.textContent = "Tambahkan barang terlebih dahulu.";
        return;
    }

    if (paymentInput.value === "") {
        paymentMessage.textContent = "Masukkan jumlah uang pembayaran.";
        return;
    }

    const uangBayar = Number(paymentInput.value);
    if (uangBayar < totalAkhir) {
        paymentMessage.textContent = "Uang pembayaran belum cukup.";
    } else {
        const kembalian = uangBayar - totalAkhir;
        paymentMessage.textContent = `Kembalian: ${rupiah(kembalian)}`;
    }
}

function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (savedCart === null) {
        cart = [];
    } else {
        cart = JSON.parse(savedCart);
    }
    renderCart();
    calculateTotals();
}

function startNewTransaction() {
    cart = [];
    localStorage.removeItem(STORAGE_KEY);

    form.reset();
    paymentInput.value = "";
    itemErrorName.textContent = "";
    itemErrorPrice.textContent = "";
    itemErrorQty.textContent = "";

    renderCart();
    calculateTotals();
}

loadCart();
