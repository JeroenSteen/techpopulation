var bleInitialized = false;

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function countDevices(devices) {
    var count = 0;
    for(var i = 0; i < devices.length; ++i){
        if(devices[i] == 2)
            count++;
    }
    return count;
}

function searchCrownstones(ble) {
    ble.startScan();
    wait(10000); //Wait 10 seconds
    ble.stopScan();

    if(countDevices(ble.devices) == 0) {
        console.log("No devices");
        //searchCrownstones(ble);
    } else {
        console.log("Devices found");
    }
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

    searchCrownstones(ble);

    var devices = ble.devices;
    console.log(devices);
    //console.log(ble.readDeviceName());

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

                    navigator.vibrate(6000);

                    return;
                }
            }
        }
    });

}, true);





