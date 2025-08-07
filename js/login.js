// login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // جلوگیری از reload شدن صفحه

    const formData = new FormData(form);

    try {
      const res = await fetch("php/user_login.php", {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("username", data.username);
        alert(data.message);
        window.location.href = "index.html"; // انتقال موفق
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("خطا در ارتباط با سرور");
    }
  });
});
