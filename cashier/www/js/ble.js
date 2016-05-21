var bleInitialized = false;

document.addEventListener("deviceready", function () {
    ble = new bluenet.BleExt();
    console.log(ble);

    ble.init(function successCB() {
            bleInitialized = true;
        },
        function errorCB() {
            bleInitialized = false;
        }
    );

    console.log(bleInitialized);
    console.log(ble.devices);

}, true);



