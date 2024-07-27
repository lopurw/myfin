<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $creditName = htmlspecialchars($_POST['creditName']);

    $data = array(
        'name' => $name,
        'email' => $email,
        'creditName' => $creditName
    );

    $filePath = 'applications.json';
    $existingData = file_exists($filePath) ? json_decode(file_get_contents($filePath), true) : array();

    $existingData[] = $data;

    file_put_contents($filePath, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo "Данные успешно получены!";
} else {
    echo "Неправильный метод запроса.";
}
?>
