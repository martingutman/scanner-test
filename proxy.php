<?php
// Set the target URL for the internal HTTP request
$targetUrl = 'http://192.168.101.1/connect';

// Create a stream context with options for the HTTP request
$contextOptions = array(
    'http' => array(
        'method' => 'GET',
    ),
);

$context = stream_context_create($contextOptions);

// Make the internal HTTP request
$response = file_get_contents($targetUrl, false, $context);

// Set headers to allow cross-origin resource sharing (CORS)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); // Adjust content type if needed

// Output the response to the client
echo $response;
?>