<?php
require 'db.php';
header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM products");
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        echo json_encode($products);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $name = $conn->real_escape_string($data['name']);
        $description = $conn->real_escape_string($data['description']);
        $price = floatval($data['price']);
        $image = $conn->real_escape_string($data['image']);

        $sql = "INSERT INTO products (name, description, price, image) VALUES ('$name', '$description', '$price', '$image')";
        echo json_encode(['success' => $conn->query($sql)]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id']);
        $name = $conn->real_escape_string($data['name']);
        $description = $conn->real_escape_string($data['description']);
        $price = floatval($data['price']);
        $image = $conn->real_escape_string($data['image']);

        $sql = "UPDATE products SET name='$name', description='$description', price='$price', image='$image' WHERE id=$id";
        echo json_encode(['success' => $conn->query($sql)]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id']);
        $sql = "DELETE FROM products WHERE id=$id";
        echo json_encode(['success' => $conn->query($sql)]);
        break;
}
?>
