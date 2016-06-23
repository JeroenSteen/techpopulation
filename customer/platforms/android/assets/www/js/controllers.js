//Pay methods
var payMethods = ["payCash", "payMobile", "payPin"];
var paySettings = {};
function getPaySetting(payMethod) {
    if (payMethod == "payCash") {
        return paySettings.payCash;
    } else if (payMethod == "payMobile") {
        return paySettings.payMobile;
    } else if (payMethod == "payPin") {
        return paySettings.payPin;
    }
}

angular.module('starter.controllers', [])

    .controller('DeskCtrl', function ($scope, $cordovaPreferences) {
        var desk = 1;
        var method = "mobile";

        $scope.desk = desk;
        //cash, mobile, pin
        $scope.method = method;
        $scope.num_customers = 999;

        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {

            if (typeof Promise === "undefined") console.error("this code snippet require Promise, WinJS.Promise or $.defered");

            setInterval(function () {

                //Fetch/Store default pay method settings
                for (var pm = 0; pm < payMethods.length; pm++) {
                    console.log(pm);
                    //$cordovaPreferences.remove(payMethods[pm]);
                    $cordovaPreferences.fetch(payMethods[pm])
                        .success(function (value) {
                            if (value == null) {
                                $cordovaPreferences.store(payMethods[pm], false);
                            }
                        });
                }

                $.support.cors = true;
                $.ajax({
                    dataType: "json",
                    url: "http://www.jeroensteen.nl/techpopulation/get_customers_at_cash_registers.php",
                    success: function (customers_at_cash_registers) {

                        var prefsIterator = 0;
                        $cordovaPreferences.fetch("payCash")
                            .success(function (value) {
                                //console.log("payCash "+value);
                                paySettings.payCash = value;
                                prefsIterator++;
                            });
                        $cordovaPreferences.fetch("payMobile")
                            .success(function (value) {
                                //console.log("payMobile "+value);
                                paySettings.payMobile = value;
                                prefsIterator++;
                            });
                        $cordovaPreferences.fetch("payPin")
                            .success(function (value) {
                                //console.log("payPin "+value);
                                paySettings.payPin = value;
                                prefsIterator++;
                            });
                        console.log(paySettings);

                        var prefsCondition = function () {
                            return prefsIterator == payMethods.length;
                        };
                        until(prefsCondition, function () {

                            var less_customers = 9999999999999999999999999;
                            for (cc = 0; cc < customers_at_cash_registers.length; cc++) {
                                var cash_register_id = customers_at_cash_registers[cc].cash_register_id;
                                var pay_method = customers_at_cash_registers[cc].pay_method;
                                var num_customers = customers_at_cash_registers[cc].num_customers;
                                var crowded = customers_at_cash_registers[cc].crowded;

                                if (/*!crowded &&*/ getPaySetting(String(pay_method))) {
                                    console.log("User wants pay method: " + pay_method + " " + getPaySetting(String(pay_method)));
                                    console.log("Not crowded at cash register: " + cash_register_id + ", with pay method: " + pay_method + " and " + num_customers + " customers in line.");
                                    //Amount of customers is lesser
                                    if (num_customers < less_customers) {
                                        less_customers = num_customers;
                                    }
                                }
                            }

                            console.log("Less amount of customers is: " + less_customers);

                            for (cc = 0; cc < customers_at_cash_registers.length; cc++) {
                                var cash_register_id = customers_at_cash_registers[cc].cash_register_id;
                                var pay_method = customers_at_cash_registers[cc].pay_method;
                                var num_customers = customers_at_cash_registers[cc].num_customers;
                                var crowded = customers_at_cash_registers[cc].crowded;

                                if (/*!crowded &&*/ getPaySetting(String(pay_method)) && num_customers == less_customers) {

                                    $scope.desk = cash_register_id;
                                    //cash, mobile, pin
                                    payMethodShort = pay_method.replace("pay", "").toLowerCase();
                                    $scope.method = payMethodShort;
                                    $scope.num_customers = num_customers;
                                    $scope.$apply();

                                    /*navigator.notification.alert(
                                        "Ga naar "+payMethodShort+" kassa: " + cash_register_id,
                                        function () {
                                        },
                                        "Kortste wachtrij!",
                                        "OK");*/
                                }
                            }

                        });

                    },
                    error: function () {
                        navigator.notification.alert(
                            "Geen verbinding met server",
                            function () {
                            },
                            "Oeps!",
                            "OK");
                    }
                });

            }, 8000);


        }

    })

    /*.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
     $scope.chat = Chats.get($stateParams.chatId);
     })*/

    .controller('SettingsCtrl', function ($scope, $cordovaPreferences) {

        $cordovaPreferences.fetch("payCash")
            .success(function (value) {
                $scope.payCash = value;
            });
        $cordovaPreferences.fetch("payMobile")
            .success(function (value) {
                $scope.payMobile = value;
            });
        $cordovaPreferences.fetch("payPin")
            .success(function (value) {
                $scope.payPin = value;
            });

        function changeMethod(method) {
            console.log("Found me " + method);
            $cordovaPreferences.fetch(method)
                .success(function (value) {

                    value = !value;

                    console.log("Save me as " + value);
                    $cordovaPreferences.store(method, value);

                    switch (true) {
                        case method == "payCash":
                            $scope.payCash = value;
                            break;
                        case method == "payMobile":
                            $scope.payMobile = value;
                            break;
                        case method == "payPin":
                            $scope.payPin = value;
                            break;
                    }

                });
        }

        $scope.changeCash = function () {
            console.log("change cash");
            changeMethod("payCash");
        };
        $scope.changeMobile = function () {
            console.log("change mobile");
            changeMethod("payMobile");
        };
        $scope.changePin = function () {
            console.log("change pin");
            changeMethod("payPin");
        };

    });
