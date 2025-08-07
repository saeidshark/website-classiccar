document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch("php/user_register.php", {
        method: "POST",
        body: formData
      });

      const message = await res.text();
      alert(message);

      if (message.includes("ثبت‌نام موفق")) {
        window.location.href = "login.html";
      }
    } catch (err) {
      alert("خطا در ارسال اطلاعات.");
    }
  });
});
