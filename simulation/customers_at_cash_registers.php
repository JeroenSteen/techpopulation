<?php
error_reporting(E_ALL);

$server_path = getcwd();

//Data of all cash registers
$cash_registers = [];
//Number of cash registers
$num_cash_registers = 9;
//All paymethods
$pay_methods = ["payCash", "payMobile", "payPin"];
//Maximum allowed waiting customers at cash register
$max_allowed_customers = 5;

//Minimum chance of waiting customers at cash register
$min_customers = 0;
//Maximum chance of waiting customers at cash register
$max_customers = 15;

function sum($numbers) {
    $total = 0;
    foreach($numbers as $number) $total += $number;
    return $total;
}

//Simulate cash registers
for($c = 1; $c <= $num_cash_registers; $c++) {
    //First paymethod cash register
    if (in_array($c, [1,4,7])) {
        $num_customers = rand($min_customers, $max_customers);
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
        $num_customers = rand($min_customers,sum([$max_customers, rand(0,5)]) );
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
        $num_customers = rand($min_customers, $max_customers);
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

?>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <style>
        body {
            background-color: red;
        }
        .btn-circle {
            width: 30px;
            height: 30px;
            text-align: center;
            padding: 6px 0;
            font-size: 12px;
            line-height: 1.428571429;
            border-radius: 15px;
        }
        .btn-circle.btn-lg {
            width: 50px;
            height: 50px;
            padding: 10px 16px;
            font-size: 18px;
            line-height: 1.33;
            border-radius: 25px;
        }
        .btn-circle.btn-xl {
            width: 100px;
            height: 100px;
            padding: 10px 16px;
            font-size: 24px;
            line-height: 1.33;
            border-radius: 55px;
        }
    </style>
<?php

foreach($cash_registers as $cash_register) {
    $cash_register_id = $cash_register["cash_register_id"];
    $pay_method = $cash_register["pay_method"];
    $num_customers = $cash_register["num_customers"];
    $crowded = $cash_register["crowded"];

    if($pay_method == "payCash") $pay_icon = "cash.jpg";
    if($pay_method == "payMobile") $pay_icon = "mobile.jpg";
    if($pay_method == "payPin") $pay_icon = "pin.gif";

    $crowd_style = ($crowded) ? "background-color: red !important; background-image: none;" : "background-color: green !important; background-image: none;";
    $waiting_line = "";

    for ($nc = 1; $nc <= $num_customers; $nc++) {
        if($nc == 1) {
            //First person in line
            $waiting_line .= '<img src="person_win.png" alt="" height="70" width="auto">';
        } else if($num_customers == $nc) {
            //Last person in line
            $waiting_line .= '<img src="person_wondering.png" alt="" height="70" width="auto">';
        } else {
            //Normal person in line
            $waiting_line .= '<img src="person_standing.png" alt="" height="70" width="auto">';
        }
    }

    echo '
    <div class="well" style="margin: 0; '.$crowd_style.'">

        <button type="button" class="btn btn-default btn-circle btn-xl">
            <img src="'.$pay_icon.'" alt="" width="70" height="auto">
        </button>

        <button type="button" class="btn btn-primary">
            <strong>KASSA '.$cash_register_id.'</strong><br>
            Aantal klanten: '.$num_customers.'
        </button>

        '.$waiting_line.'

    </div>';
}