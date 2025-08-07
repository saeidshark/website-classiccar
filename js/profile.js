// 📁 profile.js

// بررسی وجود کاربر در localStorage
const username = localStorage.getItem("username");
const userId = localStorage.getItem("user_id");

if (!username || !userId) {
  alert("لطفاً ابتدا وارد شوید.");
  window.location.href = "login.html";
} else {
  document.getElementById("username").textContent = username;

  // اگر لازم است ایمیل را هم از سرور بگیریم
  fetch(`php/user_info.php?user_id=${userId}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("email").textContent = data.email || "--";
    });

  // بارگذاری سفارش‌ها
  fetch(`php/orders_api.php?user_id=${userId}`)
    .then((res) => res.json())
    .then((orders) => {
      const tbody = document.getElementById("orders-body");
      tbody.innerHTML = "";

      if (orders.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5'>سفارشی یافت نشد.</td></tr>";
      } else {
        orders.forEach((o) => {
          tbody.innerHTML += `
            <tr>
              <td>${o.order_id}</td>
              <td>${o.name}</td>
              <td>${o.price}</td>
              <td>${o.order_date}</td>
              <td>${o.status}</td>
            </tr>
          `;
        });
      }
    });
}
