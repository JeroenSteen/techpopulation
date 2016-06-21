function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

angular.module('starter.controllers', [])

.controller('DeskCtrl', function($scope) {
    var desk = 1;
    var method = "mobile";

    $scope.desk = desk;
    //cash, mobile, pin
    $scope.method = method;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

      function ok (val) { console.log("Okkkkkkkk: "+val); return val; }
      function fail (error) { console.log("Errrrrrr: "+error) }

      var prefs = window.plugins.appPreferences;
      //Store default pay method settings
      //prefs.remove("payCash"); prefs.remove("payMobile"); prefs.remove("payPin");
      
      if(prefs.fetch(ok, fail, "payCash") == undefined) {
        console.log("payCash is undefined");
        prefs.store(ok, fail, "payCash", false);
      }

      if(prefs.fetch(ok, fail, "payMobile") == undefined) {
        console.log("payMobile is undefined");
        prefs.store(ok, fail, "payMobile", false);
      }
      
      if(prefs.fetch(ok, fail, "payPin") == undefined) {
        console.log("payPin is undefined");
        prefs.store(ok, fail, "payPin", false);
      }

      wait(300);
      //var payCash = prefs.fetch(ok, fail, "payCash");
      //console.log("payCash: "+payCash);
      //var payMobile = prefs.fetch(ok, fail, "payMobile");
      //console.log("payMobile: "+payMobile);
      var payPin = prefs.fetch(ok, fail, "payPin");
      console.log("payPinnnnn: "+payPin);

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
