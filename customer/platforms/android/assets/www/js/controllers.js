angular.module('starter.controllers', [])

.controller('DeskCtrl', function($scope) {
    $scope.desk = 1;
    //cash, mobile, pin
    $scope.method = "mobile";
})

/*.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})*/

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
