angular.module('starter.controllers', [])

.controller('DeskCtrl', function($scope) {
    var desk = 1;
    var method = "mobile";

    $scope.desk = desk;
    //cash, mobile, pin
    $scope.method = method;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

      function ok (val) { console.log("Ok: "+val) }
      function fail (error) { console.log("Err: "+error) }

      var prefs = window.plugins.appPreferences;
      //Store default pay method settings
      //prefs.remove("payCash"); prefs.remove("payMobile"); prefs.remove("payPin");
      console.log(prefs.fetch(ok, fail, "payCash"));
      //if(prefs.fetch("payCash") == null) storage.setItem("payCash", "false");
      //if(storage.getItem("payMobile") == null) storage.setItem("payMobile", "false");
      //if(storage.getItem("payPin") == null) storage.setItem("payPin", "false");

      //console.log( prefs.fetch (ok, fail, 'keyo') );
      //prefs.store(ok, fail, 'keyo', 'valueo');
      //console.log( prefs.fetch (ok, fail, 'keyo') );

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
  //http://codepen.io/ionic/pen/tfAzj

  var storage = window.localStorage;
  $scope.payCash = storage.getItem("payCash");
  $scope.payMobile = storage.getItem("payMobile");
  $scope.payPin = storage.getItem("payPin");

  $scope.changeCash = function() {
    if($scope.payCash == String(true)) {
      $scope.payCash = String(false);
    } else {
      $scope.payCash = String(true);
    }
    storage.removeItem("payCash");
    storage.setItem("payCash", String($scope.payCash));
  };

  $scope.changeMobile = function() {
    if($scope.payMobile == String(true)) {
      $scope.payMobile = String(false);
    } else {
      $scope.payMobile = String(true);
    }
    storage.removeItem("payMobile");
    storage.setItem("payMobile", String($scope.payMobile));
  };

  $scope.changePin = function() {
    if($scope.payPin == String(true)) {
      $scope.payPin = String(false);
    } else {
      $scope.payPin = String(true);
    }
    storage.removeItem("payPin");
    storage.setItem("payPin", String($scope.payPin));
  };

});
