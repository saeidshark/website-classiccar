<?php
include 'db.php';

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

// هش کردن رمز عبور
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// بررسی تکراری نبودن ایمیل
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo "ایمیل قبلاً ثبت شده است.";
} else {
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashed_password);
    
    if ($stmt->execute()) {
        echo "ثبت‌نام موفق بود.";
    } else {
        echo "خطا در ثبت‌نام.";
    }

    $stmt->close();
}

$check->close();
$conn->close();
?>
