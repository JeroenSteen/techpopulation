angular.module('starter.controllers', [])

.controller('DeskCtrl', function($scope) {
    $scope.desk = 1;
    //cash, mobile, pin
    $scope.method = "mobile";

    var ble = new bluenet();
    //var bleInitialized = false;

    /*ble.init(function successCB() {
            bleInitialized = true;
        },
        function errorCB() {
            bleInitialized = false;
        }
    );

    $scope.bleInitialized = bleInitialized;*/

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
