<?php

//All cash registers
$cash_registers = [];
//Number of cash registers
$num_cash_registers = 10;
//All paymethods
$pay_methods = ["cash", "mobile", "pin"];
//Maximum allowed waiting customers at cash register
$max_allowed_customers = 5;

//Minimum chance of waiting customers at cash register
$min_customers = 0;
//Maximum chance of waiting customers at cash register
$max_customers = 15;

//Simulate cash registers
for($c = 0; $c < $num_cash_registers; $c++) {
    //First paymethod cash register
    if ($c % 1 == 0) {
        $num_customers = rand($min_customers,$max_customers);
        $is_crowded = ($num_customers >= $max_allowed_customers) ? true : false;

        $cash_registers[] = [
            "pay_method" => $pay_methods[0],
            "num_customers" => $num_customers,
            "crowded" => $is_crowded
        ];
    }
    //Second paymethod cash register
    if ($c % 2 == 0) {
        $num_customers = rand($min_customers,$max_customers);
        $is_crowded = ($num_customers >= $max_allowed_customers) ? true : false;

        $cash_registers[] = [
            "pay_method" => $pay_methods[1],
            "num_customers" => $num_customers,
            "crowded" => $is_crowded
        ];
    }
    //Third paymethod cash register
    if ($c % 3 == 0) {
        $num_customers = rand($min_customers,$max_customers);
        $is_crowded = ($num_customers >= $max_allowed_customers) ? true : false;

        $cash_registers[] = [
            "pay_method" => $pay_methods[2],
            "num_customers" => $num_customers,
            "crowded" => $is_crowded
        ];
    }
}

var_dump($cash_registers);
