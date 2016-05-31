var bleInitialized = false;

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function searchCrownstones(ble) {
    ble.startScan();
    searchInterval = setInterval(
        function() {
            ble.stopScan(function() {
                ble.startScan(function(){

                    if(ble.devices.devices.length == 0) {
                        console.log("No devices");
                        //searchCrownstones(ble);
                    } else {
                        console.log("Devices found");
                        clearInterval(searchInterval);
                        ble.stopScan();
                    }

                })
            })
        }, 1000);
}

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

    //Time to init.. 20 seconds
    wait(20000);

    //5 seconds
    //var searchCrownstonesInterval = setInterval(searchCrownstones(ble), 1000);
    searchCrownstones(ble);
    console.log(ble.devices.devices.length);

    //console.log(ble.readDeviceName());
    //ble.writeDeviceName()

    $.support.cors = true;
    $.ajax({
        dataType: "json",
        url: "http://www.jeroensteen.nl/techpopulation/get_customers_at_cash_registers.php",
        success: function(customers_at_cash_registers) {
            for (c = 0; c < customers_at_cash_registers.length; c++) {

                //Crowded
                if(customers_at_cash_registers[c].crowded) {
                    var data = customers_at_cash_registers[c];

                    console.log(data.cash_register_id);
                    console.log(data.pay_method);
                    console.log(data.num_customers);

                    navigator.vibrate(3000);

                    return;
                }
            }
        }
    });

}, true);





