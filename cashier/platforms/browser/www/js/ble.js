var bleInitialized = false;

document.addEventListener("deviceready", function () {
    ble = new bluenet.BleExt();
    //console.log(ble);

    ble.init(function successCB() {
            bleInitialized = true;
        },
        function errorCB() {
            bleInitialized = false;
        }
    );

    ble.startScan();

    var devices = ble.devices;
    console.log(devices);
    //console.log(ble.readDeviceName());


    $.support.cors = true;
    $.ajax({
        dataType: "json",
        url: "http://www.jeroensteen.nl/techpopulation/get_customers_at_cash_registers.php",
        success: function(customers_at_cash_registers) {
            for (c = 0; c < customers_at_cash_registers.length; c++) {
                if(customers_at_cash_registers[c].crowded) {
                    var data = customers_at_cash_registers[c];

                    console.log(data.cash_register_id);
                    console.log(data.pay_method);
                    console.log(data.num_customers);

                    return;
                }
            }
        }
    });

    console.log(navigator.vibrate);

}, true);





