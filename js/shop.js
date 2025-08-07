// فایل js/shop.js

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");

  fetch("php/product.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("مشکلی در دریافت اطلاعات رخ داده است.");
      }
      return response.json();
    })
    .then((products) => {
      if (products.length === 0) {
        productList.innerHTML = "<p>هیچ محصولی برای نمایش وجود ندارد.</p>";
        return;
      }

      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="images/${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p><strong>${product.price} تومان</strong></p>
          <button onclick="addToCart(${product.id})">افزودن به سبد</button>
        `;

        productList.appendChild(card);
      });
    })
    .catch((error) => {
      productList.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});


function addToCart(productId) {
const userId = getUserIdFromSession(); // فرض: session ذخیره شده در localStorage

if (!userId) {
alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
return;
}

const data = {
user_id: userId,
product_id: productId,
status: "در حال پردازش"
};

fetch("php/orders_api.php", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(data)
})
.then((res) => res.json())
.then((result) => {
if (result.success) {
alert("محصول با موفقیت به سبد خرید اضافه شد.");
} else {
alert("خطا در افزودن به سبد خرید.");
}
})
.catch((err) => {
alert("مشکلی در ارتباط با سرور رخ داده است.");
console.error(err);
});
}

// توابع کمکی برای دریافت user_id (از localStorage یا sessionStorage)
function getUserIdFromSession() {
return parseInt(localStorage.getItem("user_id")) || null;
}