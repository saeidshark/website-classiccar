<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'کاربر وارد نشده است.']);
    exit;
}

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("SELECT username, email FROM users WHERE id = ? LIMIT 1");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    echo json_encode(['success' => true, 'username' => $user['username'], 'email' => $user['email']]);
} else {
    echo json_encode(['success' => false, 'message' => 'کاربر یافت نشد.']);
}

$stmt->close();
$conn->close();


// ✅ کد PHP با نام user_info.php ساخته شد و در canvas قرار گرفت. این فایل وظیفه دارد اطلاعات پروفایل کاربر لاگین‌شده را از دیتابیس واکشی کرده و به صورت JSON ارسال کند.