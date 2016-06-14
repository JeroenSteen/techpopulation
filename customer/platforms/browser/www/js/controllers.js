angular.module('starter.controllers', [])

.controller('DeskCtrl', function($scope) {
    var desk = 1;
    var method = "mobile";

    $scope.desk = desk;
    //cash, mobile, pin
    $scope.method = method;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      navigator.notification.alert(
        "Ga naar kassa: "+desk,
        function(){},
        "Kortste wachtrij!",
        "OK");
    }

})

/*.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})*/

.controller('SettingsCtrl', function($scope) {
  // $scope.settings = {
  //   enableFriends: true
  // };
});
