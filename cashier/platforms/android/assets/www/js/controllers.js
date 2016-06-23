angular.module('starter.controllers', [])

    .controller('DeskCtrl', function ($scope) {

        $scope.desk = 1;
        $scope.method = "pin";
        $scope.customers = 0;

        $.support.cors = true;
        setInterval(function () {
            //Cashier needs to go to cash register
            $.ajax({
                dataType: "json",
                url: "http://www.jeroensteen.nl/techpopulation/get_customers_at_cash_registers.php",
                success: function (customers_at_cash_registers) {
                    var total_customers = 0; //Total of customers
                    var total_crowds = 0; //Number of crowded cash registers
                    for (c = 0; c < customers_at_cash_registers.length; c++) {
                        if (customers_at_cash_registers[c].crowded) {
                            total_customers += customers_at_cash_registers[c].num_customers;
                            total_crowds++;
                        }
                    }
                    console.log(total_customers);
                    console.log(total_crowds);

                    //Mean of customers at cash registers: total customers / total crowds
                    var max_allowed_customers = 5;
                    //Crowded in general
                    if ((total_customers / total_crowds) > max_allowed_customers) {

                        for (c = 0; c < customers_at_cash_registers.length; c++) {

                            //Crowded at certain cash register
                            if (customers_at_cash_registers[c].crowded) {
                                var data = customers_at_cash_registers[c];

                                $scope.desk = data.cash_register_id;
                                //cash, mobile, pin
                                payMethodShort = data.pay_method.replace("pay", "").toLowerCase();
                                $scope.method = payMethodShort;
                                $scope.customers = data.num_customers;
                                $scope.$apply();

                                //repeatVibrate(3000);

                                break;
                            }
                        }

                    }

                }
            });
        }, 8000);

    })

    .controller('CrowdCtrl', function ($scope) {
        $scope.labels = ["10:00", "11:00", "11:35", "11:40", "12:00", "13:00", "14:00"];
        $scope.series = ['Mijn kassa', 'Gehele winkel'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
    })

    /*.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
     $scope.chat = Chats.get($stateParams.chatId);
     })*/

    .controller('SettingsCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
