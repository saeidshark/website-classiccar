<?php
require 'db.php';
header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {

    // 📦 دریافت سفارش‌ها (GET)
    case 'GET':
        $user_id = intval($_GET['user_id'] ?? 0);

        if ($user_id) {
            // دریافت سفارش‌های یک کاربر با اطلاعات محصول
            $sql = "SELECT o.id AS order_id, p.name, p.price, p.image, o.status, o.order_date
                    FROM orders o
                    JOIN products p ON o.product_id = p.id
                    WHERE o.user_id = $user_id";
        } else {
            // دریافت تمام سفارش‌ها (مثلاً برای ادمین)
            $sql = "SELECT o.id AS order_id, o.user_id, p.name, p.price, p.image, o.status, o.order_date
                    FROM orders o
                    JOIN products p ON o.product_id = p.id";
        }

        $result = $conn->query($sql);
        $orders = [];

        while ($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }

        echo json_encode($orders);
        break;

    // ➕ افزودن سفارش جدید (POST)
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $user_id = intval($data['user_id']);
        $product_id = intval($data['product_id']);
        $status = $conn->real_escape_string($data['status']);
        $order_date = date("Y-m-d");

        $sql = "INSERT INTO orders (user_id, product_id, order_date, status)
                VALUES ($user_id, $product_id, '$order_date', '$status')";

        echo json_encode(['success' => $conn->query($sql)]);
        break;

    // ✏️ ویرایش وضعیت سفارش (PUT)
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $order_id = intval($data['id']);
        $status = $conn->real_escape_string($data['status']);

        $sql = "UPDATE orders SET status = '$status' WHERE id = $order_id";
        echo json_encode(['success' => $conn->query($sql)]);
        break;

    // ❌ حذف سفارش (DELETE)
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $order_id = intval($data['id']);

        $sql = "DELETE FROM orders WHERE id = $order_id";
        echo json_encode(['success' => $conn->query($sql)]);
        break;
}
?>
