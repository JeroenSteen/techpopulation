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


}, true);



