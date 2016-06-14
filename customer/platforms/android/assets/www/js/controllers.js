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

.controller('SettingsCtrl', function($scope, $cordovaPreferences) {

  //https://github.com/apla/me.apla.cordova.app-preferences
  function ok (value) { console.log("Ok: "+value) }
  function fail (error) { console.log("Err: "+error) }
  var prefs = plugins.appPreferences;

  //http://codepen.io/ionic/pen/tfAzj

  $scope.payCash = { checked: true };
  $scope.changeCash = function() {
    if($scope.payCash.checked) {
      $scope.payCash.checked = false;
    } else {
      $scope.payCash.checked = true;
    }
    console.log($scope.payCash);
    prefs.store (ok, fail, 'payCash', $scope.payCash.checked);
    console.log(prefs.fetch (ok, fail, 'payCash'));
  };

});
