<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'ایمیل و رمز عبور الزامی هستند.']);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ? LIMIT 1");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            echo json_encode([
                'success' => true,
                'message' => 'ورود موفق ✅',
                'user_id' => $user['id'],
                'username' => $user['username']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'رمز عبور اشتباه است.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'کاربری با این ایمیل یافت نشد.']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'درخواست نامعتبر.']);
}
?>
