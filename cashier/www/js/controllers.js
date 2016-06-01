angular.module('starter.controllers', [])

.controller('DeskCtrl', function($scope) {

  $scope.desk = null;
  $scope.method = null;
  $scope.customers = null;

  //Cashier needs to go to register
  $.support.cors = true;
    $.ajax({
        dataType: "json",
        url: "http://www.jeroensteen.nl/techpopulation/get_customers_at_cash_registers.php",
        success: function(customers_at_cash_registers) {
            for (c = 0; c < customers_at_cash_registers.length; c++) {

                //Crowded
                if(customers_at_cash_registers[c].crowded) {
                    var data = customers_at_cash_registers[c];

                    $scope.desk = data.cash_register_id;
                    //cash, mobile, pin
                    $scope.method = data.pay_method;
                    $scope.customers = data.num_customers;

                    repeatVibrate(3000);

                    break;
                }
            }
        }
    });

})

.controller('CrowdCtrl', function($scope) {
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

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
