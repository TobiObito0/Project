let cartCount = 0;
let cartTotal = 0;

function addToCart(price) {
  cartCount++;
  cartTotal += price;

  document.getElementById("cart-count").innerText = cartCount;
  document.getElementById("cart-total").innerText = cartTotal.toLocaleString();
}

let cart = [];
let cartPopup = document.getElementById("cart-popup");

function addToCart(price, name) {
  cart.push({ name, price });
  alert(`${name} đã được thêm vào giỏ hàng!`);
}

function toggleCartPopup() {
  const popup = document.getElementById("cart-popup");
  const itemsList = document.getElementById("cart-items");
  const popupTotal = document.getElementById("popup-total");

  // Xóa cũ
  itemsList.innerHTML = "";

  // Thêm mới
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toLocaleString()} VND`;
    itemsList.appendChild(li);
    total += item.price;
  });

  popupTotal.innerText = total.toLocaleString();

  // Toggle hiển thị
  popup.style.display = popup.style.display === "block" ? "none" : "block";
}

function goToCheckout() {
  // Lưu giỏ hàng vào localStorage trước khi chuyển trang
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}
