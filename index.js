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

// Input number validation
document.getElementById("tel").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9]/g, "");
});

//toggle eye icon
const passwordInput = document.getElementById("password");
const toggleIcon = document.querySelector(".toggle-password");

// Khi click vào input password
passwordInput.addEventListener("click", function () {
  toggleIcon.style.display = "block";
});
// Chức năng ẩn/hiện mật khẩu khi nhấn icon
function togglePassword() {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  toggleIcon.textContent = isHidden ? "👁️" : "🙈";
}

// Khi Không click vào input password hoặc toggleIcon thì ẩn icon
function hideToggleIcon(e) {
  // Nếu blur từ passwordInput mà không phải sang toggleIcon thì ẩn
  if (e.relatedTarget !== toggleIcon) {
    toggleIcon.style.display = "none";
  }
}

passwordInput.addEventListener("blur", hideToggleIcon);

// Đảm bảo toggleIcon có thể nhận focus để kiểm tra blur
toggleIcon.tabIndex = 0;

// Khi blur khỏi toggleIcon thì ẩn icon
toggleIcon.addEventListener("blur", function () {
  toggleIcon.style.display = "none";
});


function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".toggle-password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.textContent = "🙈"; // hiện mật khẩu
  } else {
    passwordInput.type = "password";
    toggleIcon.textContent = "👁️"; // ẩn mật khẩu
  }
}

