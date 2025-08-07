<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'db.php';
header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {

    // 📦 دریافت آدرس‌ها (GET)
    case 'GET':
        $user_id = intval($_GET['user_id'] ?? 0);

        if ($user_id) {
            $sql = "SELECT * FROM addresses WHERE user_id = $user_id";
            $result = $conn->query($sql);
            $addresses = [];

            while ($row = $result->fetch_assoc()) {
                $addresses[] = $row;
            }

            echo json_encode($addresses);
        } else {
            echo json_encode(['error' => 'user_id is required']);
        }
        break;

    // ➕ افزودن آدرس جدید (POST)
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            echo json_encode(['error' => 'Invalid JSON']);
            exit;
        }

        $user_id = intval($data['user_id']);
        $recipient_name = $conn->real_escape_string($data['recipient_name']);
        $phone = $conn->real_escape_string($data['phone']);
        $full_address = $conn->real_escape_string($data['full_address']);
        $city = $conn->real_escape_string($data['city']);
        $province = $conn->real_escape_string($data['province']);

        $sql = "INSERT INTO addresses (user_id, recipient_name, phone, full_address, city, province)
                VALUES ($user_id, '$recipient_name', '$phone', '$full_address', '$city', '$province')";

        $success = $conn->query($sql);
        echo json_encode(['success' => $success, 'id' => $conn->insert_id]);
        break;

    // ✏️ ویرایش آدرس (PUT)
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            echo json_encode(['error' => 'Invalid JSON']);
            exit;
        }

        $id = intval($data['id']);
        $recipient_name = $conn->real_escape_string($data['recipient_name']);
        $phone = $conn->real_escape_string($data['phone']);
        $full_address = $conn->real_escape_string($data['full_address']);
        $city = $conn->real_escape_string($data['city']);
        $province = $conn->real_escape_string($data['province']);

        $sql = "UPDATE addresses SET recipient_name = '$recipient_name', phone = '$phone', full_address = '$full_address',
                city = '$city', province = '$province' WHERE id = $id";

        $success = $conn->query($sql);
        echo json_encode(['success' => $success]);
        break;

    // ❌ حذف آدرس (DELETE)
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['id'])) {
            echo json_encode(['error' => 'Invalid request body']);
            exit;
        }

        $id = intval($data['id']);
        $sql = "DELETE FROM addresses WHERE id = $id";
        $success = $conn->query($sql);

        echo json_encode(['success' => $success]);
        break;

    default:
        echo json_encode(['error' => 'Unsupported method']);
        break;
}
?>
