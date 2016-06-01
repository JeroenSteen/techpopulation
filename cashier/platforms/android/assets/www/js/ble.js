var bleInitialized = false;

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

    ble.init(function successCB() {
            bleInitialized = true;
        },
        function errorCB() {
            bleInitialized = false;
        }
    );
    //Time to init.. 20 seconds
    wait(20000);

    searchCrownstones(ble);
    //Time to search.. 20 seconds
    wait(20000);

    console.log(ble.devices.devices.length);
    //Loop all crownstones
    for (var cs = 0; cs < ble.devices.devices.length; cs++) {

        console.log(ble.devices.devices[cs]);
    }

    //console.log(ble.readDeviceName());
    //ble.writeDeviceName()

}, true);





