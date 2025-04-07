<?php
// Obtener los datos del cuerpo de la solicitud
$data = file_get_contents("php://input");
$order = json_decode($data, true);

// Validar que se hayan recibido los datos necesarios (puedes ampliar esta validación)
if (!$order || !isset($order['customer']) || !isset($order['cart'])) {
    echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
    exit;
}

// Definir la ruta del archivo donde se guardarán las órdenes
$file = 'orders.txt';

// Preparar el contenido a guardar (en formato JSON por ejemplo)
$orderData = json_encode($order) . PHP_EOL;

// Guardar la orden en el archivo (se añade al final)
if (file_put_contents($file, $orderData, FILE_APPEND | LOCK_EX)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No se pudo guardar la orden']);
}
?>
