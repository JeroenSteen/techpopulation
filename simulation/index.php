<?php

$visitors = [];
$cash_registers = [
    1 => "mobile",
    2 => "cash",
    3 => "cash"
];
$max_visitors = 1000;
$max_customer_queue = 10;

//Visitor enters the store
function add_visitor() {
    $visitors[] = [
      "methods" => "mobile", "cash"
    ];
}
//Visitor leaves the store
function remove_visitor() {
    array_pop($visitors);
}

while(true) {
    add_visitor();

    $data = [
        "visitors" => count($visitors)
    ];

    //header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}