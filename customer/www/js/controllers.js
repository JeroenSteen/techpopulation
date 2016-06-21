//Pay methods
var payMethods = ["payCash", "payMobile", "payPin"];

angular.module('starter.controllers', [])

.controller('DeskCtrl', function($scope, $cordovaPreferences) {
  var desk = 1;
  var method = "mobile";

  $scope.desk = desk;
    //cash, mobile, pin
    $scope.method = method;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

      if (typeof Promise === "undefined") console.error("this code snippet require Promise, WinJS.Promise or $.defered");
      
      //Fetch/Store default pay method settings
      for (pm = 0; pm < payMethods.length; pm++) {
        //$cordovaPreferences.remove(payMethods[pm]);
        $cordovaPreferences.fetch(payMethods[pm])
        .success(function(value) {
          console.log("suc"+pm+value);

          if(value == null) {
            $cordovaPreferences.store(payMethods[pm], false);
          }

        });
      }

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

  $cordovaPreferences.fetch("payCash")
  .success(function(value) {
    $scope.payCash = value;
  });
  $cordovaPreferences.fetch("payMobile")
  .success(function(value) {
    $scope.payMobile = value;
  });
  $cordovaPreferences.fetch("payPin")
  .success(function(value) {
    $scope.payPin = value;
  });

  function changeMethod(method) {
    console.log("Found me "+method);
    $cordovaPreferences.fetch(method)
    .success(function(value) {

      value = !value;

      console.log("Save me as "+value);
      $cordovaPreferences.store(method, value);

      switch(true) {
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

  $scope.changeCash = function() {
    console.log("change cash");
    changeMethod("payCash");
  };
  $scope.changeMobile = function() {
    console.log("change mobile");
    changeMethod("payMobile");
  };
  $scope.changePin = function() {
    console.log("change pin");
    changeMethod("payPin");
  };

});
