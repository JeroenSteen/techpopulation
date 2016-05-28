<?php
error_reporting(E_ALL);

$server_path = getcwd();

//Data of all cash registers
$cash_registers = [];
//Number of cash registers
$num_cash_registers = 9;
//All paymethods
$pay_methods = ["cash", "mobile", "pin"];
//Maximum allowed waiting customers at cash register
$max_allowed_customers = 5;

//Minimum chance of waiting customers at cash register
$min_customers = 0;
//Maximum chance of waiting customers at cash register
$max_customers = 15;

//Simulate cash registers
for($c = 1; $c <= $num_cash_registers; $c++) {
    //First paymethod cash register
    if (in_array($c, [1,4,7])) {
        $num_customers = rand($min_customers,$max_customers);
        $is_crowded = ($num_customers >= $max_allowed_customers) ? true : false;

        $cash_registers[] = [
            "cash_register_id" => $c,
            "pay_method" => $pay_methods[0],
            "num_customers" => $num_customers,
            "crowded" => $is_crowded
        ];
    }
    //Second paymethod cash register
    if (in_array($c, [2,5,8])) {
        $num_customers = rand($min_customers,$max_customers);
        $is_crowded = ($num_customers >= $max_allowed_customers) ? true : false;

        $cash_registers[] = [
            "cash_register_id" => $c,
            "pay_method" => $pay_methods[1],
            "num_customers" => $num_customers,
            "crowded" => $is_crowded
        ];
    }
    //Third paymethod cash register
    if (in_array($c, [3,6,9])) {
        $num_customers = rand($min_customers,$max_customers);
        $is_crowded = ($num_customers >= $max_allowed_customers) ? true : false;

        $cash_registers[] = [
            "cash_register_id" => $c,
            "pay_method" => $pay_methods[2],
            "num_customers" => $num_customers,
            "crowded" => $is_crowded
        ];
    }
}

$json = json_encode($cash_registers);
$path = $server_path."/customers_at_cash_registers.json";
file_put_contents($path, $json);

//var_dump($cash_registers);