<?php

$server_path = getcwd();
$customers_at_cash_registers = file_get_contents($server_path."/customers_at_cash_registers.json");
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
echo $customers_at_cash_registers;

